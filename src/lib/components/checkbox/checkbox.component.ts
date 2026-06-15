import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Checkbox, CheckboxChangeEvent } from 'primeng/checkbox';

export type ExtraCheckboxSize = 'small' | 'base' | 'large';
export type ExtraCheckboxVariant = 'outlined' | 'filled';
export type ExtraCheckboxChangeEvent = CheckboxChangeEvent;

@Component({
  selector: 'extra-checkbox',
  standalone: true,
  imports: [Checkbox, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraCheckboxComponent),
      multi: true
    }
  ],
  template: `
    <p-checkbox
      [value]="value"
      [binary]="binary"
      [(ngModel)]="modelValue"
      [disabled]="disabled"
      [readonly]="readonly"
      [indeterminate]="indeterminate"
      [styleClass]="indeterminate ? 'p-checkbox-indeterminate' : ''"
      [invalid]="invalid"
      [size]="primeSize"
      [variant]="primeVariant"
      [checkboxIcon]="checkboxIcon"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [tabindex]="tabindex"
      [inputId]="inputId"
      [trueValue]="trueValue"
      [falseValue]="falseValue"
      [autofocus]="autofocus"
      (onChange)="onChangeHandler($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-checkbox>
  `
})
export class ExtraCheckboxComponent implements ControlValueAccessor {
  @Input() value: any = null;
  @Input() binary = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() indeterminate = false;
  @Input() invalid = false;
  @Input() size: ExtraCheckboxSize = 'base';
  @Input() variant: ExtraCheckboxVariant = 'outlined';
  @Input() checkboxIcon: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() tabindex: number | undefined = undefined;
  @Input() inputId: string | undefined = undefined;
  @Input() trueValue: any = true;
  @Input() falseValue: any = false;
  @Input() autofocus = false;

  @Output() onChange = new EventEmitter<ExtraCheckboxChangeEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  modelValue: any = false;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  // Геттеры — маппинг в PrimeNG API
  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get primeVariant(): 'filled' | 'outlined' | undefined {
    if (this.variant === 'filled') return 'filled';
    return undefined;
  }

  onChangeHandler(event: ExtraCheckboxChangeEvent): void {
    this._onChange(event.checked);
    this._onTouched();
    this.onChange.emit(event);
  }

  // ControlValueAccessor
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
