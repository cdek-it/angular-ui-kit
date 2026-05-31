import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { RadioButton, RadioButtonClickEvent } from 'primeng/radiobutton';

export type RadiobuttonVariant = 'outlined' | 'filled';
export type RadiobuttonSize = 'small' | 'base' | 'large';

@Component({
  selector: 'extra-radiobutton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RadioButton, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraRadiobuttonComponent),
      multi: true,
    },
  ],
  template: `
    <p-radiobutton
      [value]="value"
      [name]="name ?? ''"
      [disabled]="disabled"
      [invalid]="invalid"
      [(ngModel)]="modelValue"
      [variant]="primeVariant"
      [size]="primeSize"
      [inputId]="inputId"
      [tabindex]="tabindex"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [autofocus]="autofocus"
      (onClick)="onClickHandler($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-radiobutton>
  `,
})
export class ExtraRadiobuttonComponent implements ControlValueAccessor {
  @Input() value: any = null;
  @Input() name: string | undefined = undefined;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() variant: RadiobuttonVariant = 'outlined';
  @Input() size: RadiobuttonSize = 'base';
  @Input() inputId: string | undefined = undefined;
  @Input() tabindex: number | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() autofocus = false;

  @Output() onClick = new EventEmitter<RadioButtonClickEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  modelValue: any = null;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get primeVariant(): 'filled' | undefined {
    return this.variant === 'filled' ? 'filled' : undefined;
  }

  onClickHandler(event: RadioButtonClickEvent): void {
    this._onChange(event.value);
    this._onTouched();
    this.onClick.emit(event);
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
