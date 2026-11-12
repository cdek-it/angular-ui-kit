import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Textarea } from 'primeng/textarea';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';
import { ExtraCaptionComponent, ExtraCaptionSeverity } from '@cdek-it/angular-ui-kit/components/caption';

export type ExtraTextareaSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraTextareaLabelPosition = 'default' | 'float' | 'left';
export type ExtraTextareaResizeEvent = Event | Record<string, unknown>;

let nextInputId = 0;

@Component({
  selector: 'extra-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Textarea,
    IconField,
    InputIcon,
    FloatLabel,
    NgClass,
    NgTemplateOutlet,
    ExtraTooltipDirective,
    ExtraCaptionComponent
  ],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraTextareaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExtraTextareaComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где textarea обязана быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-textarea" [class.extra-textarea--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left') {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-textarea-body">
          @if (labelPosition === 'float') {
            <p-floatlabel variant="in">
              <ng-container [ngTemplateOutlet]="fieldTpl" />
              @if (label) {
                <ng-container [ngTemplateOutlet]="labelTpl" />
              }
            </p-floatlabel>
          } @else {
            @if (label && labelPosition === 'default') {
              <ng-container [ngTemplateOutlet]="labelTpl" />
            }
            <ng-container [ngTemplateOutlet]="fieldTpl" />
          }
          @if (caption) {
            <extra-caption [severity]="captionSeverity">{{ caption }}</extra-caption>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-textarea-label" [for]="inputId">
        @if (requiredMark) {
          <span class="extra-textarea-required" aria-hidden="true">*</span>
        }
        {{ label }}
        @if (info && labelPosition !== 'float') {
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
            [attr.name]="name || null"
            [attr.autocomplete]="autocomplete || null"
            [attr.maxlength]="maxLength ?? null"
            [attr.aria-label]="ariaLabel || null"
            [attr.aria-labelledby]="ariaLabelledBy || null"
            [attr.tabindex]="tabindex ?? null"
            [attr.required]="required || null"
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
          [autofocus]="autofocus"
          [attr.name]="name || null"
          [attr.autocomplete]="autocomplete || null"
          [attr.maxlength]="maxLength ?? null"
          [attr.aria-label]="ariaLabel || null"
          [attr.aria-labelledby]="ariaLabelledBy || null"
          [attr.tabindex]="tabindex ?? null"
          [attr.required]="required || null"
          [value]="modelValue"
          (input)="onInput($event)"
          (blur)="onTouched()"
          (onResize)="onResize.emit($event)"
        ></textarea>
      }
    </ng-template>
  `
})
export class ExtraTextareaComponent implements ControlValueAccessor, OnInit, OnChanges, Validator, AfterViewInit {
  private readonly _injector = inject(Injector);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  // Атрибут autofocus на элементе, созданном Angular после загрузки страницы, браузер игнорирует
  ngAfterViewInit(): void {
    if (this.autofocus) this._host.nativeElement.querySelector('textarea')?.focus();
  }

  @Input() placeholder = '';
  @Input() label = '';
  /** Показывает маркер «*» перед лейблом (визуальный, валидацию не включает). */
  @Input() requiredMark = false;
  @Input() labelPosition: ExtraTextareaLabelPosition = 'default';
  @Input() caption = '';
  @Input() captionSeverity: ExtraCaptionSeverity = 'base';
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
  /** Поле обязательно для заполнения; в Angular работает как NG_VALIDATORS-валидатор. */
  @Input({ transform: booleanAttribute }) required = false;
  @Input() name: string | undefined = undefined;
  @Input() autocomplete: string | undefined = undefined;
  @Input() maxLength: number | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() tabindex: number | undefined = undefined;

  private _onValidatorChange: () => void = () => {};

  /** NG_VALIDATORS: `[required]="true"` делает контрол невалидным, пока поле пусто. */
  validate(control: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.required(control) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) this._onValidatorChange();
  }

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
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }
}
