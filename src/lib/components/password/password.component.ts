import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Password } from 'primeng/password';
import { PrimeTemplate } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraCaptionComponent, ExtraCaptionSeverity } from '@cdek-it/angular-ui-kit/components/caption';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';

export type ExtraPasswordSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraPasswordLabelPosition = 'top' | 'left';

let nextInputId = 0;

@Directive({ selector: '[extraPasswordHeader]', standalone: true })
export class ExtraPasswordHeaderDirective {}

@Directive({ selector: '[extraPasswordFooter]', standalone: true })
export class ExtraPasswordFooterDirective {}

@Component({
  selector: 'extra-password',
  host: { style: 'display: contents' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Password,
    FormsModule,
    FloatLabel,
    NgTemplateOutlet,
    PrimeTemplate,
    ExtraTooltipDirective,
    ExtraCaptionComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraPasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExtraPasswordComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где поле обязано быть прямым flex-элементом). -->
    @if (label || caption) {
      <!-- floatLabel перекрывает labelPosition: лейбл уезжает внутрь поля, строчной раскладки нет -->
      <div
        class="extra-password"
        [class.extra-password--left]="labelPosition === 'left' && !floatLabel"
        [class.extra-password--fluid]="fluid"
      >
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-password-body">
          @if (label && labelPosition === 'top' && !floatLabel) {
            <ng-container [ngTemplateOutlet]="labelTpl" />
          }
          @if (floatLabel) {
            <p-floatlabel variant="in">
              <ng-container [ngTemplateOutlet]="passwordTpl" />
              @if (label) {
                <ng-container [ngTemplateOutlet]="labelTpl" />
              }
            </p-floatlabel>
          } @else {
            <ng-container [ngTemplateOutlet]="passwordTpl" />
          }
          @if (caption) {
            <extra-caption [id]="captionId" [severity]="invalid ? 'danger' : captionSeverity">{{
              caption
            }}</extra-caption>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="passwordTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-password-label" [for]="inputId">
        @if (required || requiredMark) {
          <span class="extra-password-required" aria-hidden="true">*</span>
        }
        {{ label }}
        @if (info) {
          <i class="extra-password-label-icon ti ti-info-circle" [extra-tooltip]="info" aria-hidden="true"></i>
        }
      </label>
    </ng-template>

    <ng-template #passwordTpl>
      <p-password
        [ngModel]="modelValue"
        [ngModelOptions]="{ standalone: true }"
        [styleClass]="rootClass"
        (ngModelChange)="handleChange($event)"
        [feedback]="showFeedback && !readonly && !disabled"
        [toggleMask]="showMaskToggle"
        [showClear]="clearable && !readonly && !disabled && !!modelValue"
        [required]="required"
        [inputStyleClass]="computedInputStyleClass"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [promptLabel]="promptLabel"
        [weakLabel]="weakLabel"
        [mediumLabel]="mediumLabel"
        [strongLabel]="strongLabel"
        [variant]="variant"
        [fluid]="fluid"
        [invalid]="invalid"
        [inputId]="inputId"
        [ariaLabel]="ariaLabel ?? (!label && !ariaLabelledBy ? 'Пароль' : undefined)"
        [ariaLabelledBy]="ariaLabelledBy"
        [appendTo]="appendTo"
        [autofocus]="autofocus"
        [name]="name ?? ''"
        [autocomplete]="autocomplete"
        [maxLength]="maxLength"
        [tabindex]="tabindex"
        [pt]="passwordPt"
        (onFocus)="onFocus.emit($event)"
        (onBlur)="handleBlur($event)"
        (onClear)="onClear.emit()"
      >
        <ng-template #showicon>
          <button
            class="extra-password-mask-toggle"
            type="button"
            aria-label="Показать пароль"
            [attr.aria-controls]="inputId"
            [disabled]="disabled"
            (mousedown)="$event.preventDefault()"
          >
            <i class="ti ti-eye" aria-hidden="true"></i>
          </button>
        </ng-template>
        <ng-template #hideicon>
          <button
            class="extra-password-mask-toggle"
            type="button"
            aria-label="Скрыть пароль"
            [attr.aria-controls]="inputId"
            [disabled]="disabled"
            (mousedown)="$event.preventDefault()"
          >
            <i class="ti ti-eye-off" aria-hidden="true"></i>
          </button>
        </ng-template>
        <ng-template #clearicon>
          <button
            class="extra-password-clear"
            type="button"
            aria-label="Очистить пароль"
            [attr.aria-controls]="inputId"
            (mousedown)="$event.preventDefault()"
          >
            <i class="ti ti-x" aria-hidden="true"></i>
          </button>
        </ng-template>
        @if (headerTemplate) {
          <ng-template pTemplate="header">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
          </ng-template>
        }
        @if (footerTemplate) {
          <ng-template pTemplate="footer">
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
          </ng-template>
        }
      </p-password>
    </ng-template>
  `
})
export class ExtraPasswordComponent implements ControlValueAccessor, OnInit, OnChanges, Validator {
  private readonly _injector = inject(Injector);
  private readonly _cdr = inject(ChangeDetectorRef);
  private _ngControl: NgControl | null = null;

  @ContentChild(ExtraPasswordHeaderDirective, { read: TemplateRef }) headerTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraPasswordFooterDirective, { read: TemplateRef }) footerTemplate: TemplateRef<any> | null = null;

  /** Показывать панель с индикатором сложности и подсказками. */
  @Input({ transform: booleanAttribute }) showFeedback = true;
  /** Показывать иконку-переключатель видимости пароля. */
  @Input({ transform: booleanAttribute }) showMaskToggle = false;
  @Input() placeholder: string | undefined = undefined;
  @Input() size: ExtraPasswordSize = 'base';
  @Input() variant: 'filled' | 'outlined' = 'outlined';
  @Input({ transform: booleanAttribute }) fluid = false;
  @Input() label = '';
  @Input() labelPosition: ExtraPasswordLabelPosition = 'top';
  /** Плавающий лейбл внутри поля (PrimeNG `p-floatlabel`); перекрывает `labelPosition`. */
  @Input({ transform: booleanAttribute }) floatLabel = false;
  @Input() caption = '';
  @Input() captionSeverity: ExtraCaptionSeverity = 'base';
  @Input({ transform: booleanAttribute }) requiredMark = false;
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input() info = '';
  @Input() promptLabel = 'Введите пароль';
  @Input() weakLabel = 'Слабый';
  @Input() mediumLabel = 'Средний';
  @Input() strongLabel = 'Надёжный';
  @Input() inputStyleClass: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() appendTo: any = 'body';
  @Input({ transform: booleanAttribute }) autofocus = false;
  /** Поле обязательно для заполнения; в Angular работает как NG_VALIDATORS-валидатор. */
  @Input({ transform: booleanAttribute }) required = true;
  @Input() name: string | undefined = undefined;
  @Input() autocomplete: string | undefined = undefined;
  @Input() maxLength: number | undefined = undefined;
  @Input() tabindex: number | undefined = undefined;
  /** Только для чтения; PrimeNG не пробрасывает readonly — ставим атрибут через passthrough. */
  @Input({ transform: booleanAttribute }) readonly = false;

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

  /** `readonly` у p-password нет — атрибут на внутренний input через pt-секцию pcInputText.root. */
  get passwordPt() {
    return {
      maskIcon: { class: 'p-password-toggle-mask-icon p-password-mask-icon' },
      unmaskIcon: { class: 'p-password-toggle-mask-icon p-password-unmask-icon' },
      clearIcon: { class: 'p-password-clear-icon' },
      pcInputText: {
        root: {
          readonly: this.readonly ? true : undefined,
          tabindex: this.tabindex ?? 0,
          maxlength: this.maxLength ?? null,
          'aria-required': this.required || undefined,
          'aria-invalid': this.invalid || undefined,
          'aria-describedby': this.caption ? this.captionId : undefined
        }
      }
    };
  }

  @Output() onClear = new EventEmitter<void>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-password-${nextInputId++}`;

  readonly captionId = `${this.inputId}-caption`;

  disabled = false;

  get invalid(): boolean {
    return !!(this._ngControl?.invalid && (this._ngControl.touched || this._ngControl.dirty));
  }

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  get rootClass(): string {
    return 'extra-password-field extra-password-field--' + this.size;
  }

  get sizeClass(): string {
    if (this.size === 'small') return 'p-inputtext-sm';
    if (this.size === 'large') return 'p-inputtext-lg';
    if (this.size === 'xlarge') return 'p-inputtext-lg p-inputtext-xlg';
    return '';
  }

  get computedInputStyleClass(): string {
    return [this.sizeClass, this.inputStyleClass].filter(Boolean).join(' ');
  }

  modelValue: string | null = null;

  private _onChange: (value: string | null) => void = () => {};
  private _onTouched: () => void = () => {};

  handleChange(value: string | null): void {
    this.modelValue = value;
    this._onChange(value);
  }

  handleBlur(event: Event): void {
    this._onTouched();
    this.onBlur.emit(event);
    this._cdr.markForCheck();
  }

  writeValue(value: string | null): void {
    this.modelValue = value;
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }
}
