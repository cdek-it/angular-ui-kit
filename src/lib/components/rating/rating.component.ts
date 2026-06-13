import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Rating } from 'primeng/rating';

export type ExtraRatingValue = number | null;

@Component({
  selector: 'extra-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Rating, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraRatingComponent),
      multi: true
    }
  ],
  template: `
    <p-rating
      [ngModel]="modelValue"
      (ngModelChange)="handleChange($event)"
      [stars]="stars"
      [readonly]="readonly"
      [disabled]="disabled"
      [autofocus]="autofocus"
      (onRate)="onRate.emit($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-rating>
  `
})
export class ExtraRatingComponent implements ControlValueAccessor {
  @Input() stars = 5;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() autofocus = false;

  @Output() onRate = new EventEmitter<any>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  modelValue: ExtraRatingValue = null;

  private onChange: (value: ExtraRatingValue) => void = () => {};
  private onTouched: () => void = () => {};

  handleChange(value: ExtraRatingValue): void {
    this.modelValue = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: ExtraRatingValue): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (value: ExtraRatingValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
