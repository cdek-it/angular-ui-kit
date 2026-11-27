import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  viewChild
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
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { SharedModule } from 'primeng/api';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';
import { ExtraCaptionComponent, ExtraCaptionSeverity } from '@cdek-it/angular-ui-kit/components/caption';

export type ExtraInputNumberSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraInputNumberButtonLayout = 'stacked' | 'horizontal' | 'vertical';
export type ExtraInputNumberLabelPosition = 'top' | 'left';
export type ExtraInputNumberMode = 'decimal' | 'currency';

export interface ExtraInputNumberInputEvent {
  value: number | null;
  formattedValue: string;
  originalEvent: Event;
}

let nextInputId = 0;

@Component({
  selector: 'extra-input-number',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputNumber,
    SharedModule,
    FormsModule,
    NgClass,
    NgTemplateOutlet,
    FloatLabel,
    ExtraTooltipDirective,
    ExtraCaptionComponent
  ],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraInputNumberComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExtraInputNumberComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где input обязан быть прямым flex-элементом). -->
    @if (label || caption) {
      <div
        class="extra-inputnumber"
        [class.extra-inputnumber--left]="labelPosition === 'left' && !floatLabel"
        [class.extra-inputnumber--fluid]="fluid"
      >
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-inputnumber-body">
          @if (label && labelPosition === 'top' && !floatLabel) {
            <ng-container [ngTemplateOutlet]="labelTpl" />
          }
          @if (floatLabel) {
            <p-floatlabel variant="in">
              <ng-container [ngTemplateOutlet]="fieldTpl" />
              @if (label) {
                <ng-container [ngTemplateOutlet]="labelTpl" />
              }
            </p-floatlabel>
          } @else {
            <ng-container [ngTemplateOutlet]="fieldTpl" />
          }
          @if (caption) {
            <extra-caption [id]="inputId + '-caption'" [severity]="captionSeverity">{{ caption }}</extra-caption>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-inputnumber-label" [for]="inputId">
        @if (required) {
          <span class="extra-inputnumber-required" aria-hidden="true">*</span>
        }
        {{ label }}
        @if (info) {
          <i class="extra-inputnumber-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #fieldTpl>
      @if (clearable) {
        <span class="extra-inputnumber-field" [class.extra-inputnumber-field--fluid]="fluid">
          <ng-container [ngTemplateOutlet]="numberTpl" />
          @if (modelValue !== null && !disabled && !readonly) {
            <button
              type="button"
              class="p-inputnumber-clear-icon extra-inputnumber-clear"
              aria-label="Очистить поле"
              (click)="clearValue()"
            >
              <i class="ti ti-x" aria-hidden="true"></i>
            </button>
          }
        </span>
      } @else {
        <ng-container [ngTemplateOutlet]="numberTpl" />
      }
    </ng-template>
    <ng-template #numberTpl>
      <p-inputNumber
        [ngClass]="sizeClass"
        [inputStyleClass]="inputSizeClass"
        [inputId]="inputId"
        [showButtons]="showButtons"
        [buttonLayout]="buttonLayout"
        [mode]="mode"
        [currency]="currency"
        [locale]="locale"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [invalid]="invalid"
        [readonly]="readonly"
        [name]="name ?? ''"
        [autocomplete]="autocomplete"
        [ariaLabel]="ariaLabel || (!label ? 'Число' : undefined)"
        [ariaDescribedBy]="caption ? inputId + '-caption' : undefined"
        [ariaRequired]="required"
        [ariaLabelledBy]="ariaLabelledBy"
        [autofocus]="autofocus && !disabled"
        [tabindex]="disabled ? -1 : tabindex"
        [fluid]="fluid"
        [min]="min"
        [max]="max"
        [step]="step"
        [prefix]="prefix"
        [suffix]="suffix"
        [minFractionDigits]="minFractionDigits"
        [maxFractionDigits]="maxFractionDigits"
        [useGrouping]="useGrouping"
        [incrementButtonIcon]="incrementButtonIcon"
        [decrementButtonIcon]="decrementButtonIcon"
        [ngModel]="modelValue"
        (ngModelChange)="handleModelChange($event)"
        (onInput)="handleInput($event)"
        (onClear)="handleClear()"
        (onBlur)="onTouched()"
      >
        @if (!incrementButtonIcon) {
          <ng-template pTemplate="incrementbuttonicon"><i class="ti ti-plus" aria-hidden="true"></i></ng-template>
        }
        @if (!decrementButtonIcon) {
          <ng-template pTemplate="decrementbuttonicon"><i class="ti ti-minus" aria-hidden="true"></i></ng-template>
        }
      </p-inputNumber>
    </ng-template>
  `
})
export class ExtraInputNumberComponent implements ControlValueAccessor, OnInit, OnChanges, Validator {
  private readonly _injector = inject(Injector);
  private readonly _cdr = inject(ChangeDetectorRef);
  private _ngControl: NgControl | null = null;
  private readonly number = viewChild(InputNumber);

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder = '';
  @Input() label = '';
  @Input() labelPosition: ExtraInputNumberLabelPosition = 'top';
  @Input({ transform: booleanAttribute }) floatLabel = false;
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input() caption = '';
  @Input() captionSeverity: ExtraCaptionSeverity = 'base';
  @Input() info = '';
  @Input() size: ExtraInputNumberSize = 'base';
  @Input({ transform: booleanAttribute }) showButtons = false;
  @Input() buttonLayout: ExtraInputNumberButtonLayout = 'stacked';
  @Input() mode: ExtraInputNumberMode = 'decimal';
  @Input() currency: string | undefined;
  @Input() locale: string | undefined;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) fluid = false;
  @Input() min: number | undefined;
  @Input() max: number | undefined;
  @Input() step = 1;
  @Input() prefix: string | undefined;
  @Input() suffix: string | undefined;
  @Input() minFractionDigits: number | undefined;
  @Input() maxFractionDigits: number | undefined;
  @Input({ transform: booleanAttribute }) useGrouping = true;
  @Input() incrementButtonIcon: string | undefined;
  @Input() decrementButtonIcon: string | undefined;
  /** Поле обязательно для заполнения; в Angular работает как NG_VALIDATORS-валидатор. */
  @Input({ transform: booleanAttribute }) required = true;
  @Input() name: string | undefined = undefined;
  @Input() autocomplete: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @Input() tabindex: number | undefined = undefined;

  private _onValidatorChange: () => void = () => {};

  /** NG_VALIDATORS: `[required]="true"` делает контрол невалидным при пустом значении. */
  validate(control: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.required(control) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) this._onValidatorChange();
  }

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-input-number-${nextInputId++}`;

  disabled = false;

  get invalid(): boolean {
    return !!(this._ngControl?.invalid && (this._ngControl.touched || this._ngControl.dirty));
  }

  get inputSizeClass(): string {
    if (this.size === 'small') return 'p-inputtext-sm';
    if (this.size === 'large' || this.size === 'xlarge') return 'p-inputtext-lg';
    return '';
  }

  get sizeClass(): Record<string, boolean> {
    return {
      'p-inputnumber-sm': this.size === 'small',
      'p-inputnumber-base': this.size === 'base',
      'p-inputnumber-lg': this.size === 'large',
      'p-inputnumber-xlg': this.size === 'xlarge'
    };
  }

  @Output() onInput = new EventEmitter<ExtraInputNumberInputEvent>();
  @Output() onClear = new EventEmitter<void>();

  modelValue: number | null = null;

  private _onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  handleInput(event: ExtraInputNumberInputEvent): void {
    this.handleModelChange(event.value);
    this.onInput.emit({ ...event, formattedValue: this.number()?.input?.nativeElement.value ?? event.formattedValue });
  }

  handleModelChange(value: number | null): void {
    if (this.modelValue === value) return;
    this.modelValue = value;
    this._onChange(value);
  }

  clearValue(): void {
    if (!this.disabled && !this.readonly) this.number()?.clear();
  }

  handleClear(): void {
    this.handleModelChange(null);
    this.onClear.emit();
  }

  writeValue(value: number | null): void {
    this.modelValue = value ?? null;
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: number | null) => void): void {
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
