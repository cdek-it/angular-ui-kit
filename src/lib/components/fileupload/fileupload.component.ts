import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, inject, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  FileUpload,
  FileSelectEvent,
  FileRemoveEvent,
  FileUploadErrorEvent,
  FileUploadHandlerEvent,
} from 'primeng/fileupload';
import { PrimeTemplate } from 'primeng/api';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit/components/button';
import { ExtraBadgeComponent, ExtraBadgeSeverity } from '@cdek-it/angular-ui-kit/components/badge';
import { ExtraMessageComponent } from '@cdek-it/angular-ui-kit/components/message';
import { ExtraProgressBarComponent } from '@cdek-it/angular-ui-kit/components/progressbar';

// PrimeNG добавляет objectURL для превью изображений в рантайме, но не типизирует его
type PreviewFile = File & { objectURL?: string };

export type ExtraFileUploadMode = 'auto' | 'manual' | 'basic';
export type ExtraFileUploadStatus = 'pending' | 'uploading' | 'success' | 'error';

export interface ExtraFileUploadFile {
  file: File;
  status: ExtraFileUploadStatus;
  progress?: number;
  errorMessage?: string;
}

export interface ExtraFileUploadLabels {
  dropzoneTitle?: string;
  dropzoneCaption?: string;
  chooseButton?: string;
  uploadButton?: string;
  cancelButton?: string;
}

export interface ExtraFileUploadMessageTemplate {
  summary: string;
  detail: string;
}

export interface ExtraFileUploadMessages {
  invalidFileSize?: ExtraFileUploadMessageTemplate;
  invalidFileType?: ExtraFileUploadMessageTemplate;
  invalidFileLimit?: ExtraFileUploadMessageTemplate;
}

// Формы событий совпадают 1:1 с PrimeNG — переиспользуем их под своими именами,
// чтобы публичное API не заставляло консьюмера импортировать что-то из primeng/fileupload.
export type ExtraFileUploadSelectEvent = FileSelectEvent;
export type ExtraFileUploadRemoveEvent = FileRemoveEvent;
export type ExtraFileUploadUploadEvent = FileUploadHandlerEvent;
export type ExtraFileUploadErrorEvent = FileUploadErrorEvent;

const DEFAULT_LABELS: Required<ExtraFileUploadLabels> = {
  dropzoneTitle: 'Чтобы загрузить файлы кликните или перетащите их в эту область',
  dropzoneCaption: 'Можно загрузить не более 10 файлов размером 1 MB',
  chooseButton: 'Выбрать файл',
  uploadButton: 'Отправить',
  cancelButton: 'Очистить',
};

const DEFAULT_MESSAGES: Required<ExtraFileUploadMessages> = {
  invalidFileSize: { summary: '{0}: Некорректный размер файла', detail: 'Максимальный размер — {0}' },
  invalidFileType: { summary: '{0}: Некорректный тип файла', detail: 'Допустимые типы: {0}' },
  invalidFileLimit: { summary: 'Превышен лимит файлов', detail: 'Максимум: {0}' },
};

const STATUS_LABEL: Record<ExtraFileUploadStatus, string> = {
  pending: 'Ожидает',
  uploading: 'Ожидает',
  success: 'Загружено',
  error: 'Ошибка',
};

const STATUS_SEVERITY: Record<ExtraFileUploadStatus, ExtraBadgeSeverity> = {
  pending: 'info',
  uploading: 'info',
  success: 'success',
  error: 'danger',
};

/** Имитация прогресса пачки (демо-режим без реального backend, см. `upload`/customUpload). */
const UPLOAD_TICK_MS = 150;
const UPLOAD_TICK_STEP = 10;

@Component({
  selector: 'extra-fileupload',
  standalone: true,
  imports: [FileUpload, PrimeTemplate, ExtraButtonComponent, ExtraBadgeComponent, ExtraMessageComponent, ExtraProgressBarComponent],
  host: { style: 'display: contents' },
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ExtraFileUploadComponent), multi: true }],
  template: `
    <p-fileupload
      #fuRef
      mode="advanced"
      [name]="name"
      [url]="url"
      [multiple]="multiple"
      [accept]="accept"
      [maxFileSize]="maxFileSize"
      [fileLimit]="fileLimit"
      [disabled]="disabled"
      [customUpload]="true"
      [auto]="mode === 'auto'"
      [invalidFileSizeMessageSummary]="resolvedMessages.invalidFileSize.summary"
      [invalidFileSizeMessageDetail]="resolvedMessages.invalidFileSize.detail"
      [invalidFileTypeMessageSummary]="resolvedMessages.invalidFileType.summary"
      [invalidFileTypeMessageDetail]="resolvedMessages.invalidFileType.detail"
      [invalidFileLimitMessageSummary]="resolvedMessages.invalidFileLimit.summary"
      [invalidFileLimitMessageDetail]="resolvedMessages.invalidFileLimit.detail"
      (onSelect)="onSelectedFiles($event)"
      (uploadHandler)="onUploader($event)"
      (onRemove)="onRemove.emit($event)"
      (onClear)="onClear.emit()"
      (onError)="onError.emit($event)"
    >
      <ng-template pTemplate="header">
        @if (mode === 'basic') {
          <div class="fu-header">
            <div class="fu-basic-choose" (dragover)="$event.preventDefault()" (drop)="fuRef.onDrop($event)">
              <extra-button [label]="resolvedLabels.chooseButton" [disabled]="disabled || !!fuRef.isChooseDisabled()" (click)="fuRef.choose()"></extra-button>
            </div>
          </div>
        } @else if (!dragAndDrop) {
          <div class="fu-header">
            <extra-button [label]="resolvedLabels.chooseButton" [disabled]="disabled || !!fuRef.isChooseDisabled()" (click)="fuRef.choose()"></extra-button>
          </div>
        }
      </ng-template>

      <ng-template pTemplate="content" let-messages="messages" let-removeFileCallback="removeFileCallback">
        @if (mode !== 'basic') {
          <div class="fu-content">
            @if (dragAndDrop) {
              <div class="fu-dropzone" [class.fu-dropzone--disabled]="disabled || !!fuRef.isChooseDisabled()" (click)="fuRef.choose()">
                <i class="ti ti-upload fu-dropzone__icon"></i>
                <div class="fu-dropzone__info">
                  <span class="fu-dropzone__title">{{ resolvedLabels.dropzoneTitle }}</span>
                  <span class="fu-dropzone__caption">
                    <i class="ti ti-info-circle"></i>
                    {{ resolvedLabels.dropzoneCaption }}
                  </span>
                </div>
              </div>
            }

            @if (isUploading) {
              <extra-progressbar [value]="totalSizePercent" [showValue]="false"></extra-progressbar>
            }

            @for (msg of messages; track $index) {
              <extra-message severity="danger" [message]="msg.text"></extra-message>
            }

            @if (uploadSuccess) {
              <extra-message severity="success" message="Файлы успешно загружены" [showClose]="true" (onClose)="uploadSuccess = false"></extra-message>
            }

            @if (uploadError) {
              <extra-message severity="danger" [message]="uploadError"></extra-message>
            }

            @if (files.length > 0) {
              <div class="fu-file-list">
                @for (entry of files; track entry.file; let i = $index) {
                  <div class="fu-file-card" [class.fu-file-card--uploaded]="entry.status === 'success'">
                    <div class="fu-file-card__wrap">
                      @if (isImage(entry.file)) {
                        <img [src]="previewUrl(entry.file)" [alt]="entry.file.name" class="fu-file-card__thumbnail" />
                      } @else {
                        <i class="ti ti-file fu-file-card__icon"></i>
                      }
                      <div class="fu-file-card__info">
                        <span class="fu-file-card__name">{{ entry.file.name }}</span>
                        <span class="fu-file-card__size">
                          <i class="ti ti-info-circle"></i>
                          {{ formatSize(entry.file.size) }}
                        </span>
                        <extra-badge [value]="statusLabel(entry.status)" [severity]="statusSeverity(entry.status)"></extra-badge>
                      </div>
                    </div>
                    <extra-button icon="ti ti-trash" variant="text" [rounded]="true" size="small"
                      [disabled]="disabled"
                      (click)="onRemoveFile(entry, $event, removeFileCallback)"></extra-button>
                  </div>
                }
              </div>
            }

            @if (files.length > 0) {
              <div class="fu-footer">
                @if (mode === 'manual') {
                  <extra-button [label]="resolvedLabels.uploadButton" [disabled]="disabled || !hasPending" (click)="fuRef.upload()"></extra-button>
                }
                <extra-button [label]="resolvedLabels.cancelButton" severity="danger" variant="text"
                  [disabled]="disabled" (click)="onClearAll()"></extra-button>
              </div>
            }
          </div>
        }
      </ng-template>
    </p-fileupload>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtraFileUploadComponent implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);
  @ViewChild('fuRef') fuRef!: FileUpload;

  @Input() name = 'files[]';
  @Input() url = '/api/upload';
  @Input() multiple = true;
  @Input() accept = 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  @Input() maxFileSize = 1000000;
  @Input() fileLimit: number | undefined = undefined;
  @Input() dragAndDrop = true;
  @Input() mode: ExtraFileUploadMode = 'manual';
  @Input() disabled = false;
  @Input() labels: ExtraFileUploadLabels = {};
  @Input() messages: ExtraFileUploadMessages = {};
  /**
   * Текст ошибки реальной отправки (XHR ≥400 / сеть). Компонент всегда работает в customUpload —
   * сам запрос и решение об ошибке остаются за приложением, оно и выставляет этот проп после
   * своего вызова; компонент только рисует сообщение в нужном месте разметки (после зоны дропа,
   * перед списком файлов — как success-сообщение). Сбрасывается приложением же (например, перед
   * повторной отправкой).
   */
  @Input() uploadError: string | null = null;

  @Output() onSelect = new EventEmitter<ExtraFileUploadSelectEvent>();
  @Output() onRemove = new EventEmitter<ExtraFileUploadRemoveEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onUpload = new EventEmitter<ExtraFileUploadUploadEvent>();
  @Output() onError = new EventEmitter<ExtraFileUploadErrorEvent>();

  files: ExtraFileUploadFile[] = [];
  totalSizePercent = 0;
  uploadSuccess = false;
  isUploading = false;

  private onChange: (files: File[]) => void = () => {};
  private onTouched: () => void = () => {};

  get resolvedLabels(): Required<ExtraFileUploadLabels> {
    return { ...DEFAULT_LABELS, ...this.labels };
  }

  get resolvedMessages(): Required<ExtraFileUploadMessages> {
    return {
      invalidFileSize: { ...DEFAULT_MESSAGES.invalidFileSize, ...this.messages.invalidFileSize },
      invalidFileType: { ...DEFAULT_MESSAGES.invalidFileType, ...this.messages.invalidFileType },
      invalidFileLimit: { ...DEFAULT_MESSAGES.invalidFileLimit, ...this.messages.invalidFileLimit },
    };
  }

  get hasPending(): boolean {
    return this.files.some(f => f.status === 'pending');
  }

  writeValue(files: File[] | null): void {
    this.files = (files ?? []).map(file => ({ file, status: 'pending' as const }));
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (files: File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  statusLabel(status: ExtraFileUploadStatus): string {
    return STATUS_LABEL[status];
  }

  statusSeverity(status: ExtraFileUploadStatus): ExtraBadgeSeverity {
    return STATUS_SEVERITY[status];
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  previewUrl(file: File): string | undefined {
    return (file as PreviewFile).objectURL;
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(3)) + ' ' + sizes[i];
  }

  onSelectedFiles(event: FileSelectEvent): void {
    const current = this.fuRef?.files ?? [];
    const known = new Set(this.files.map(f => f.file));
    const added = current.filter(f => !known.has(f)).map(file => ({ file, status: 'pending' as const }));
    this.files = [...this.files, ...added];
    this.uploadSuccess = false;
    this.onChange(this.pendingNativeFiles());
    this.onTouched();
    this.cdr.markForCheck();
    this.onSelect.emit(event);
  }

  onUploader(event: FileUploadHandlerEvent): void {
    const pending = this.files.filter(f => f.status === 'pending');
    pending.forEach(f => (f.status = 'uploading'));
    this.isUploading = true;
    this.totalSizePercent = 0;
    this.cdr.markForCheck();

    let progress = 0;
    const interval = setInterval(() => {
      progress += UPLOAD_TICK_STEP;
      this.totalSizePercent = Math.min(progress, 100);
      if (progress >= 100) {
        clearInterval(interval);
        pending.forEach(f => (f.status = 'success'));
        this.isUploading = false;
        this.uploadSuccess = true;
        // Сбрасываем внутреннюю очередь PrimeNG напрямую через сеттер files, а не через
        // clearCallback()/clear() — тот безусловно эмитит onClear, а это не пользовательская очистка.
        this.fuRef.files = [];
        this.onChange(this.pendingNativeFiles());
      }
      this.cdr.markForCheck();
    }, UPLOAD_TICK_MS);

    this.onUpload.emit(event);
  }

  onRemoveFile(
    entry: ExtraFileUploadFile,
    originalEvent: Event,
    removeFileCallback: (event: Event, index: number) => void,
  ): void {
    if (entry.status === 'pending' || entry.status === 'uploading') {
      const primeIndex = this.fuRef.files.indexOf(entry.file);
      removeFileCallback(originalEvent, primeIndex); // сам эмитит onRemove через (onRemove) на <p-fileupload>
    } else {
      this.onRemove.emit({ file: entry.file, originalEvent });
    }
    this.files = this.files.filter(f => f !== entry);
    this.onChange(this.pendingNativeFiles());
    this.cdr.markForCheck();
  }

  onClearAll(): void {
    this.fuRef.clear(); // пользовательская очистка — эмитит onClear легитимно
    this.files = [];
    this.uploadSuccess = false;
    this.isUploading = false;
    this.totalSizePercent = 0;
    this.onChange([]);
    this.cdr.markForCheck();
  }

  private pendingNativeFiles(): File[] {
    return this.files.filter(f => f.status === 'pending' || f.status === 'uploading').map(f => f.file);
  }
}
