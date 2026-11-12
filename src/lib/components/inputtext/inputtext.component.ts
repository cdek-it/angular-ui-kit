import {
  booleanAttribute,
  Component,
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
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';
import { ExtraCaptionComponent, ExtraCaptionSeverity } from '@cdek-it/angular-ui-kit/components/caption';

export type ExtraInputTextSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraInputTextLabelPosition = 'default' | 'float' | 'left';
export type ExtraInputTextType = 'text' | 'password';

let nextInputId = 0;

@Component({
  selector: 'extra-input-text',
  standalone: true,
  imports: [
    InputText,
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
      useExisting: forwardRef(() => ExtraInputTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExtraInputTextComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где input обязан быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-inputtext" [class.extra-inputtext--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left') {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-inputtext-body">
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
      <label class="extra-inputtext-label" [for]="inputId">
        @if (requiredMark) {
          <span class="extra-inputtext-required" aria-hidden="true">*</span>
        }
        {{ label }}
        @if (info && labelPosition !== 'float') {
          <i class="extra-inputtext-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #fieldTpl>
      @if (clearable) {
        <p-iconfield>
          <input
            pInputText
            [id]="inputId"
            [ngClass]="sizeClass"
            [pSize]="primeSize!"
            [fluid]="fluid"
            [type]="type"
            [disabled]="disabled"
            [readOnly]="readonly"
            [invalid]="invalid"
            [autofocus]="autofocus"
            [attr.placeholder]="placeholder || null"
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
          />
          <p-inputicon
            class="ti ti-x"
            role="button"
            aria-label="Очистить поле"
            tabindex="0"
            [style.visibility]="modelValue && !readonly && !disabled ? 'visible' : 'hidden'"
            [style.pointerEvents]="modelValue && !readonly && !disabled ? 'auto' : 'none'"
            (click)="clearValue()"
            (keydown.enter)="clearValue()"
            (keydown.space)="$event.preventDefault(); clearValue()"
          ></p-inputicon>
        </p-iconfield>
      } @else {
        <input
          pInputText
          [id]="inputId"
          [ngClass]="sizeClass"
          [pSize]="primeSize!"
          [fluid]="fluid"
          [type]="type"
          [disabled]="disabled"
          [readOnly]="readonly"
          [invalid]="invalid"
          [autofocus]="autofocus"
          [attr.placeholder]="placeholder || null"
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
        />
      }
    </ng-template>
  `
})
export class ExtraInputTextComponent implements ControlValueAccessor, OnInit, OnChanges, Validator {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder = '';
  @Input() label = '';
  /** Показывает маркер «*» перед лейблом (визуальный, валидацию не включает). */
  @Input() requiredMark = false;
  @Input() labelPosition: ExtraInputTextLabelPosition = 'default';
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input() caption = '';
  @Input() captionSeverity: ExtraCaptionSeverity = 'base';
  @Input() info = '';
  @Input() size: ExtraInputTextSize = 'base';
  /** Растягивает поле на всю ширину контейнера. */
  @Input({ transform: booleanAttribute }) fluid = false;
  @Input() type: ExtraInputTextType = 'text';
  /** Поле обязательно для заполнения; в Angular работает как NG_VALIDATORS-валидатор. */
  @Input({ transform: booleanAttribute }) required = false;
  @Input() name: string | undefined = undefined;
  @Input() autocomplete: string | undefined = undefined;
  @Input() maxLength: number | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @Input() tabindex: number | undefined = undefined;

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-input-text-${nextInputId++}`;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  @Output() onClear = new EventEmitter<void>();

  modelValue = '';

  private _onChange: (value: string) => void = () => {};

  private _onValidatorChange: () => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-inputtext-xlg': this.size === 'xlarge' };
  }

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

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.modelValue = value;
    this._onChange(value);
  }

  onTouched: () => void = () => {};

  clearValue(): void {
    if (this.readonly || this.disabled || !this.modelValue) return;
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
