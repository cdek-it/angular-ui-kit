import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ToggleButton, ToggleButtonChangeEvent } from 'primeng/togglebutton';

export type ExtraToggleButtonSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraToggleButtonIconPosition = 'left' | 'right';

export interface ExtraToggleButtonChangeEvent {
  checked: boolean;
  originalEvent: Event;
}

@Component({
  selector: 'extra-togglebutton',
  host: { '(focusout)': 'markTouched()' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToggleButton, NgClass, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraToggleButtonComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExtraToggleButtonComponent),
      multi: true
    }
  ],
  template: `
    <p-togglebutton
      [ngClass]="extraClasses"
      [onLabel]="label"
      [offLabel]="label"
      [onIcon]="icon"
      [offIcon]="icon"
      [iconPos]="iconPosition"
      [size]="primeSize!"
      [disabled]="disabled"
      [attr.aria-disabled]="disabled ? true : null"
      [allowEmpty]="allowEmpty"
      [fluid]="fluid"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [inputId]="inputId"
      [tabindex]="tabindex ?? 0"
      [autofocus]="autofocus"
      [(ngModel)]="modelValue"
      (onChange)="onChangeHandler($event)"
    ></p-togglebutton>
  `
})
export class ExtraToggleButtonComponent implements ControlValueAccessor, OnChanges, Validator {
  private readonly _cdr = inject(ChangeDetectorRef);

  @Input() label = '';
  @Input() icon = '';
  @Input() iconPosition: ExtraToggleButtonIconPosition = 'left';
  @Input() size: ExtraToggleButtonSize = 'base';
  @Input() iconOnly = false;
  @Input() allowEmpty: boolean | undefined = undefined;
  @Input() fluid = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() inputId: string | undefined = undefined;
  @Input() tabindex: number | undefined = undefined;
  @Input() autofocus: boolean | undefined = undefined;
  /** Поле обязательно для заполнения (должно быть включено); в Angular работает как NG_VALIDATORS-валидатор. */
  @Input({ transform: booleanAttribute }) required = false;

  private _onValidatorChange: () => void = () => {};

  /** NG_VALIDATORS: `[required]="true"` делает контрол невалидным, пока кнопка не включена. */
  validate(control: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.requiredTrue(control) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) this._onValidatorChange();
  }

  @Output() onChange = new EventEmitter<ExtraToggleButtonChangeEvent>();

  /** Управляется только через ControlValueAccessor.setDisabledState, не публичный @Input. */
  disabled = false;
  modelValue = false;

  private _onChange: (value: boolean) => void = () => {};
  private _onTouched: () => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  get extraClasses(): Record<string, boolean> {
    return {
      'p-togglebutton-xlarge': this.size === 'xlarge',
      'p-togglebutton-icon-only': this.iconOnly
    };
  }

  /** Кнопка потеряла фокус — помечаем контрол как touched. */
  markTouched(): void {
    this._onTouched();
  }

  onChangeHandler(event: ToggleButtonChangeEvent): void {
    const checked = !!event.checked;
    this.modelValue = checked;
    this._onChange(checked);
    this._onTouched();
    this.onChange.emit({ checked, originalEvent: event.originalEvent as Event });
  }

  writeValue(value: boolean): void {
    this.modelValue = !!value;
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
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
