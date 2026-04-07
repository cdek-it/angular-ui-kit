import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'toggleswitch',
  standalone: true,
  imports: [ToggleSwitch, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true,
    },
  ],
  template: `
    <p-toggleswitch
      [ngModel]="modelValue"
      (ngModelChange)="handleChange($event)"
      [invalid]="invalid"
      [disabled]="disabled"
      (onChange)="onChange.emit($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-toggleswitch>
  `,
})
export class ToggleSwitchComponent implements ControlValueAccessor {
  @Input() invalid = false;
  @Input() disabled = false;

  @Output() onChange = new EventEmitter<any>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  modelValue = false;

  private _onChange: (value: boolean) => void = () => {};
  private _onTouched: () => void = () => {};

  handleChange(value: boolean): void {
    this.modelValue = value;
    this._onChange(value);
    this._onTouched();
  }

  writeValue(value: boolean): void {
    this.modelValue = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
