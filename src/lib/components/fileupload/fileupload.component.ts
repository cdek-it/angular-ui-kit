import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { ProgressBar } from 'primeng/progressbar';
import { Message } from 'primeng/message';
import { PrimeTemplate } from 'primeng/api';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'fileupload',
  standalone: true,
  imports: [FileUpload, ProgressBar, Message, PrimeTemplate, ButtonComponent, NgClass],
  host: { style: 'display: contents' },
  template: `
    <p-fileupload
      #fuRef
      [name]="name"
      [url]="url"
      [multiple]="multiple"
      [accept]="accept"
      [maxFileSize]="maxFileSize"
      [fileLimit]="fileLimit"
      [disabled]="disabled"
      [customUpload]="true"
      [auto]="false"
      [invalidFileSizeMessageSummary]="invalidFileSizeMessageSummary"
      [invalidFileSizeMessageDetail]="invalidFileSizeMessageDetail"
      [invalidFileTypeMessageSummary]="invalidFileTypeMessageSummary"
      [invalidFileTypeMessageDetail]="invalidFileTypeMessageDetail"
      [invalidFileLimitMessageSummary]="invalidFileLimitMessageSummary"
      [invalidFileLimitMessageDetail]="invalidFileLimitMessageDetail"
      (onSelect)="onSelectedFiles($event)"
      (uploadHandler)="onUploader($event)"
      (onRemove)="onRemoveEvent.emit($event)"
      (onClear)="onClearEvent.emit()"
      (onError)="onError.emit($event)"
    >
      <ng-template pTemplate="header" let-uploadCallback="uploadCallback" let-clearCallback="clearCallback">
        <div class="fu-header" [attr.data-ref]="storeCallbacks(uploadCallback, clearCallback)">
          <div class="fu-dropzone" (click)="onChooseClick()">
            <i class="ti ti-upload fu-dropzone__icon"></i>
            <div class="fu-dropzone__info">
              <span class="fu-dropzone__title">{{ dropzoneTitle }}</span>
              <span class="fu-dropzone__caption">
                <i class="ti ti-info-circle"></i>
                {{ dropzoneCaption }}
              </span>
            </div>
          </div>
        </div>
      </ng-template>

      <ng-template pTemplate="content"
        let-removeFileCallback="removeFileCallback" let-removeUploadedFileCallback="removeUploadedFileCallback">
        <div class="fu-content">
          @if (isUploading) {
            <p-progressBar [value]="totalSizePercent" [showValue]="false"></p-progressBar>
          }
          @if (uploadSuccess) {
            <p-message severity="success" icon="ti ti-circle-check" [closable]="true" (onClose)="uploadSuccess = false">
              Файлы успешно загружены
            </p-message>
          }
          @if (selectedFiles.length > 0) {
            <div class="fu-file-list">
              @for (file of selectedFiles; track file.name + file.size; let i = $index) {
                <div class="fu-file-card">
                  <div class="fu-file-card__wrap">
                    @if (isImage(file)) {
                      <img [src]="file.objectURL" [alt]="file.name" class="fu-file-card__thumbnail" />
                    } @else {
                      <i class="ti ti-file fu-file-card__icon"></i>
                    }
                    <div class="fu-file-card__info">
                      <span class="fu-file-card__name">{{ file.name }}</span>
                      <span class="fu-file-card__size">
                        <i class="ti ti-info-circle"></i>
                        {{ formatSize(file.size) }}
                      </span>
                    </div>
                  </div>
                  <button icon="ti ti-trash" variant="text" [rounded]="true" size="small" [iconOnly]="true"
                    (click)="onRemoveFile(file, removeFileCallback, i)"></button>
                </div>
              }
            </div>
          }
          @if (uploadedFiles.length > 0) {
            <div class="fu-file-list">
              @for (file of uploadedFiles; track file.name + file.size; let i = $index) {
                <div class="fu-file-card fu-file-card--uploaded">
                  <div class="fu-file-card__wrap">
                    <i class="ti ti-file-check fu-file-card__icon"></i>
                    <div class="fu-file-card__info">
                      <span class="fu-file-card__name">{{ file.name }}</span>
                      <span class="fu-file-card__size">Загружено</span>
                    </div>
                  </div>
                  <button icon="ti ti-trash" variant="text" [rounded]="true" size="small" [iconOnly]="true"
                    (click)="removeUploadedFileCallback(i)"></button>
                </div>
              }
            </div>
          }
          @if (selectedFiles.length > 0 || uploadedFiles.length > 0) {
            <div class="fu-footer">
              <button label="Отправить" [disabled]="!selectedFiles.length" (click)="uploadCb?.()"></button>
              <button label="Очистить" severity="danger" variant="text"
                [disabled]="!selectedFiles.length && !uploadedFiles.length" (click)="onClearUpload()"></button>
            </div>
          }
        </div>
      </ng-template>
    </p-fileupload>
  `,
})
export class FileUploadComponent {
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  @ViewChild('fuRef') fuRef!: FileUpload;

  @Input() name = 'files[]';
  @Input() url = '/api/upload';
  @Input() multiple = true;
  @Input() accept = 'image/*,.pdf,.doc,.docx';
  @Input() maxFileSize = 1000000;
  @Input() fileLimit: number | undefined = undefined;
  @Input() disabled = false;
  @Input() dropzoneTitle = 'Чтобы загрузить файлы кликните или перетащите их в эту область';
  @Input() dropzoneCaption = 'Можно загрузить не более 10 файлов размером 1 MB';

  @Input() invalidFileSizeMessageSummary = '{0}: Некорректный размер файла';
  @Input() invalidFileSizeMessageDetail = 'Максимальный размер — {0}';
  @Input() invalidFileTypeMessageSummary = '{0}: Некорректный тип файла';
  @Input() invalidFileTypeMessageDetail = 'Допустимые типы: {0}';
  @Input() invalidFileLimitMessageSummary = 'Превышен лимит файлов';
  @Input() invalidFileLimitMessageDetail = 'Максимум: {0}';

  @Output() onSelectEvent = new EventEmitter<any>();
  @Output() onRemoveEvent = new EventEmitter<any>();
  @Output() onClearEvent = new EventEmitter<void>();
  @Output() onError = new EventEmitter<any>();
  @Output() onUpload = new EventEmitter<any>();

  selectedFiles: any[] = [];
  uploadedFiles: any[] = [];
  totalSize = 0;
  totalSizePercent = 0;
  uploadSuccess = false;
  isUploading = false;

  private uploadCbRef: (() => void) | null = null;
  private clearCbRef: (() => void) | null = null;

  get uploadCb(): (() => void) | null {
    return this.uploadCbRef;
  }

  storeCallbacks(upload: () => void, clear: () => void): string {
    this.uploadCbRef = upload;
    this.clearCbRef = clear;
    return '';
  }

  onChooseClick(): void {
    const input = this.el.nativeElement.querySelector('input[type="file"]') as HTMLInputElement;
    input?.click();
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(3)) + ' ' + sizes[i];
  }

  onSelectedFiles(event: any): void {
    this.selectedFiles = [...(this.fuRef?.files || [])];
    this.totalSize = this.selectedFiles.reduce((acc, f) => acc + f.size, 0);
    this.uploadSuccess = false;
    this.isUploading = this.selectedFiles.length > 0;
    this.totalSizePercent = 0;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      this.totalSizePercent = Math.min(progress, 100);
      if (progress >= 100) clearInterval(interval);
      this.cdr.markForCheck();
    }, 40);

    this.cdr.detectChanges();
    this.onSelectEvent.emit(event);
  }

  onUploader(event: any): void {
    setTimeout(() => {
      this.clearCbRef?.();
      this.selectedFiles = [];
      this.uploadedFiles = [...(event.files || [])];
      this.totalSize = 0;
      this.totalSizePercent = 0;
      this.uploadSuccess = true;
      this.isUploading = false;
      this.cdr.detectChanges();
    }, 1500);
    this.onUpload.emit(event);
  }

  onRemoveFile(file: File, removeFileCallback: (index: number) => void, index: number): void {
    removeFileCallback(index);
    this.selectedFiles = [...(this.fuRef?.files || [])];
    this.totalSize -= file.size;
    this.totalSizePercent = Math.min((this.totalSize / (this.maxFileSize || 1000000)) * 100, 100);
    if (this.totalSize <= 0) {
      this.isUploading = false;
    }
    this.cdr.detectChanges();
  }

  onClearUpload(): void {
    this.clearCbRef?.();
    this.selectedFiles = [];
    this.uploadedFiles = [];
    this.totalSize = 0;
    this.totalSizePercent = 0;
    this.uploadSuccess = false;
    this.isUploading = false;
    this.cdr.detectChanges();
  }
}
