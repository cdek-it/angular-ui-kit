import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputOtp, InputOtpChangeEvent } from 'primeng/inputotp';

export type InputOtpSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'input-otp',
  standalone: true,
  imports: [InputOtp, FormsModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOtpComponent),
      multi: true,
    },
  ],
  template: `
    <p-inputotp
      [length]="length"
      [mask]="mask"
      [integerOnly]="integerOnly"
      [disabled]="disabled"
      [readonly]="readonly"
      [invalid]="invalid"
      [size]="primeSize"
      [ngClass]="sizeClass"
      [tabindex]="tabindex"
      [autofocus]="autofocus"
      [ngModel]="modelValue"
      (ngModelChange)="onModelChange($event)"
      (onChange)="onChangeHandler($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-inputotp>
  `,
})
export class InputOtpComponent implements ControlValueAccessor {
  @Input() length = 4;
  @Input() mask = false;
  @Input() integerOnly = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input() size: InputOtpSize = 'base';
  @Input() tabindex: number | null = null;
  @Input() autofocus = false;

  @Output() onChange = new EventEmitter<InputOtpChangeEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  modelValue: any = null;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-inputotp-xlg': this.size === 'xlarge' };
  }

  onModelChange(value: any): void {
    this.modelValue = value;
    this._onChange(value);
    this._onTouched();
  }

  onChangeHandler(event: InputOtpChangeEvent): void {
    this.onChange.emit(event);
  }

  writeValue(value: any): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
