import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Textarea } from 'primeng/textarea';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';

export type ExtraTextareaSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraTextareaLabelPosition = 'top' | 'left';
export type ExtraTextareaResizeEvent = Event | Record<string, unknown>;

let nextInputId = 0;

@Component({
  selector: 'extra-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, IconField, InputIcon, FloatLabel, NgClass, NgTemplateOutlet, ExtraTooltipDirective],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraTextareaComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где textarea обязана быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-textarea" [class.extra-textarea--left]="labelPosition === 'left' && !floatLabel">
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-textarea-body">
          @if (floatLabel) {
            <p-floatlabel variant="in">
              <ng-container [ngTemplateOutlet]="fieldTpl" />
              @if (label) {
                <ng-container [ngTemplateOutlet]="labelTpl" />
              }
            </p-floatlabel>
          } @else {
            @if (label && labelPosition === 'top') {
              <ng-container [ngTemplateOutlet]="labelTpl" />
            }
            <ng-container [ngTemplateOutlet]="fieldTpl" />
          }
          @if (caption) {
            <div class="extra-textarea-caption">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-textarea-label" [for]="inputId">
        {{ label }}
        @if (info) {
          <i class="extra-textarea-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #fieldTpl>
      @if (clearable) {
        <p-iconfield [ngClass]="{ '!w-full': fluid }">
          <textarea
            pTextarea
            [id]="inputId"
            [ngClass]="sizeClass"
            [pSize]="primeSize"
            [disabled]="disabled"
            [readOnly]="readonly"
            [invalid]="invalid"
            [fluid]="fluid"
            [autoResize]="autoResize"
            [rows]="rows"
            [cols]="cols"
            [style.resize]="resizable ? 'vertical' : 'none'"
            [placeholder]="placeholder"
            [autofocus]="autofocus"
            [value]="modelValue"
            (input)="onInput($event)"
            (blur)="onTouched()"
            (onResize)="onResize.emit($event)"
          ></textarea>
          <p-inputicon
            class="ti ti-x"
            tabindex="0"
            [style.visibility]="modelValue ? 'visible' : 'hidden'"
            [style.pointerEvents]="modelValue ? 'auto' : 'none'"
            (click)="clearValue()"
            (keydown.enter)="clearValue()"
            (keydown.space)="clearValue()"
          ></p-inputicon>
        </p-iconfield>
      } @else {
        <textarea
          pTextarea
          [id]="inputId"
          [ngClass]="sizeClass"
          [pSize]="primeSize"
          [disabled]="disabled"
          [readOnly]="readonly"
          [invalid]="invalid"
          [fluid]="fluid"
          [autoResize]="autoResize"
          [rows]="rows"
          [cols]="cols"
          [style.resize]="resizable ? 'vertical' : 'none'"
          [placeholder]="placeholder"
          [value]="modelValue"
          (input)="onInput($event)"
          (blur)="onTouched()"
          (onResize)="onResize.emit($event)"
        ></textarea>
      }
    </ng-template>
  `
})
export class ExtraTextareaComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder = '';
  @Input() label = '';
  @Input() labelPosition: ExtraTextareaLabelPosition = 'top';
  @Input({ transform: booleanAttribute }) floatLabel = false;
  @Input() caption = '';
  @Input() info = '';
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input({ transform: booleanAttribute }) resizable = true;
  @Input() size: ExtraTextareaSize = 'base';
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) fluid = false;
  @Input({ transform: booleanAttribute }) autoResize = false;
  @Input() rows = 3;
  @Input() cols?: number;
  @Input({ transform: booleanAttribute }) autofocus = false;

  /** Уникальный id поля для связи label ↔ textarea. */
  readonly inputId = `extra-textarea-${nextInputId++}`;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  @Output() onResize = new EventEmitter<ExtraTextareaResizeEvent>();
  @Output() onClear = new EventEmitter<void>();

  modelValue = '';

  private _onChange: (value: string) => void = () => {};

  get primeSize(): 'small' | 'large' | never {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined as never;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-textarea-xlg': this.size === 'xlarge' };
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.modelValue = value;
    this._onChange(value);
  }

  onTouched: () => void = () => {};

  clearValue(): void {
    this.modelValue = '';
    this._onChange('');
    this.onClear.emit();
  }

  writeValue(value: string): void {
    this.modelValue = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
