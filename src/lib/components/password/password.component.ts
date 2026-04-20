import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Password } from 'primeng/password';

export type PasswordSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'password',
  host: { style: 'display: block' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Password, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
  template: `
    <p-password
      [ngModel]="modelValue"
      (ngModelChange)="handleChange($event)"
      [feedback]="feedback"
      [toggleMask]="toggleMask"
      [inputStyleClass]="computedInputStyleClass"
      [disabled]="disabled"
      [placeholder]="placeholder"
      [variant]="variant"
      [fluid]="fluid"
      [invalid]="invalid"
      [inputId]="inputId"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [autofocus]="autofocus"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-password>
  `,
})
export class PasswordComponent implements ControlValueAccessor {
  @Input() feedback = true;
  @Input() toggleMask = false;
  @Input() disabled = false;
  @Input() placeholder: string | undefined = undefined;
  @Input() size: PasswordSize = 'base';
  @Input() variant: 'filled' | 'outlined' = 'outlined';
  @Input() fluid = false;
  @Input() invalid = false;
  @Input() inputId: string | undefined = undefined;
  @Input() inputStyleClass: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() autofocus = false;

  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  get sizeClass(): string {
    return this.size === 'xlarge' ? 'p-inputtext-xlg' : '';
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
    this._onTouched();
  }

  writeValue(value: string | null): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
