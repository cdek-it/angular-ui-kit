import { Component, EventEmitter, forwardRef, inject, Injector, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'toggleswitch',
  standalone: true,
  imports: [ToggleSwitch, FormsModule],
   providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true,
  }],
  template: `
    <p-toggleswitch
      [ngModel]="modelValue"
      (ngModelChange)="handleChange($event)"
      [invalid]="isInvalid"
      [disabled]="isDisabled"
      (onChange)="onChange.emit($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-toggleswitch>
  `,
})
export class ToggleSwitchComponent implements OnInit, ControlValueAccessor {
  @Output() onChange = new EventEmitter<unknown>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  modelValue = false;
  ngControl: NgControl | null = null;
  
  private injector = inject(Injector);
  
  private _disabled = false;

  private _onChange: (value: boolean) => void = () => {};
  private _onTouched: () => void = () => {};


  get isDisabled(): boolean {
    return this._disabled;
  }

  get isInvalid(): boolean {
    return !!this.ngControl?.invalid;
  }

  ngOnInit(): void {
     this.ngControl = this.injector.get(NgControl, null, { self: true });
  }

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
    this._disabled = isDisabled;
  }
}
