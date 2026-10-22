import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Rating } from 'primeng/rating';

export type ExtraRatingValue = number | null;

export interface ExtraRatingRateEvent {
  value: number;
  originalEvent: Event;
}

@Component({
  selector: 'extra-rating',
  host: { style: 'display: inline-flex; align-items: center; gap: var(--p-rating-gap, 0.25rem)' },
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
    @if (clearable && !readonly) {
      <button
        type="button"
        class="extra-rating-clear ti ti-ban"
        [disabled]="disabled"
        [attr.aria-label]="clearAriaLabel"
        (click)="handleClear($event)"
      ></button>
    }
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
  @Input() autofocus = false;
  @Input() clearable = false;
  /** Метка кнопки сброса для скринридера; вынесена в инпут, чтобы строка не была
   *  зашита в шаблон (у PrimeNG нет aria-ключа под неё). */
  @Input() clearAriaLabel = 'Сбросить оценку';

  disabled = false;

  @Output() onRate = new EventEmitter<ExtraRatingRateEvent>();
  /** Сброс оценки кнопкой: (rate) по спеке несёт выставленное значение, поэтому
   *  очистка эмитится отдельным событием, иначе о ней нельзя узнать без модели. */
  @Output() onClear = new EventEmitter<void>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  modelValue: ExtraRatingValue = null;

  private readonly cdr = inject(ChangeDetectorRef);

  private onChange: (value: ExtraRatingValue) => void = () => {};
  private onTouched: () => void = () => {};

  handleChange(value: ExtraRatingValue): void {
    this.modelValue = value;
    this.onChange(value);
    this.onTouched();
  }

  handleClear(event: Event): void {
    if (this.disabled) return;
    event.stopPropagation();
    this.modelValue = null;
    this.onChange(null);
    this.onTouched();
    this.onClear.emit();
  }

  writeValue(value: ExtraRatingValue): void {
    this.modelValue = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: ExtraRatingValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
