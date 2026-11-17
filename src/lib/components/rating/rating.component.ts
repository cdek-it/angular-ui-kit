import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Rating } from 'primeng/rating';

export type ExtraRatingValue = number | null;
export type ExtraRatingSize = 'small' | 'base' | 'large';
export type ExtraRatingVariant = 'display' | 'interactive';

export interface ExtraRatingRateEvent {
  value: number;
  originalEvent: Event;
}

@Component({
  selector: 'extra-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Rating, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ExtraRatingComponent), multi: true }],
  template: `
    <div
      class="extra-rating"
      [class]="'extra-rating--' + size"
      [class.extra-rating--interactive]="variant === 'interactive'"
    >
      <div class="extra-rating-row">
        @if (clearable && !isReadonly) {
          <button
            type="button"
            class="extra-rating-clear"
            [disabled]="disabled"
            [attr.aria-label]="clearAriaLabel"
            (click)="handleClear($event)"
            (blur)="handleBlur($event)"
          >
            <i class="ti ti-ban" aria-hidden="true"></i>
          </button>
        }
        @for (count of [stars]; track count) {
          <p-rating
            [ngModel]="modelValue"
            [ngModelOptions]="{ standalone: true }"
            (ngModelChange)="handleChange($event)"
            [stars]="count"
            [readonly]="isReadonly"
            [disabled]="disabled"
            [autofocus]="false"
            [pt]="ratingPt"
            (onRate)="handleRate($event)"
            (onFocus)="onFocus.emit($event)"
            (onBlur)="handleBlur($event)"
            (keydown)="handleKeydown($event)"
            (pointerover)="handleHover($event)"
            (pointerleave)="hoverValue = 0"
          >
            <ng-template #onicon let-index let-iconClass="class">
              <i
                [class]="iconClass + ' ti ti-star-filled'"
                [class.extra-rating-preview]="hoverValue >= index"
                aria-hidden="true"
              ></i>
            </ng-template>
            <ng-template #officon let-index let-iconClass="class">
              <i
                [class]="iconClass + ' ti ti-star'"
                [class.extra-rating-preview]="hoverValue >= index"
                aria-hidden="true"
              ></i>
            </ng-template>
          </p-rating>
        }
      </div>
      @if (showLabels) {
        <div class="extra-rating-labels">
          <span>{{ labelMin }}</span
          ><span>{{ labelMax }}</span>
        </div>
      }
    </div>
  `
})
export class ExtraRatingComponent implements ControlValueAccessor, OnChanges {
  @Input() stars = 5;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input() clearAriaLabel = 'Сбросить оценку';
  @Input() size: ExtraRatingSize = 'small';
  @Input() variant: ExtraRatingVariant = 'interactive';
  @Input({ transform: booleanAttribute }) showLabels = false;
  @Input() labelMin = 'Неудобно';
  @Input() labelMax = 'Очень удобно';
  @Input() ariaLabel = 'Оценка';
  @Input() ariaLabelledBy: string | undefined = undefined;

  @Output() onRate = new EventEmitter<ExtraRatingRateEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  @ViewChild(Rating, { read: ElementRef }) private rating?: ElementRef<HTMLElement>;
  private readonly cdr = inject(ChangeDetectorRef);
  disabled = false;
  modelValue: ExtraRatingValue = null;
  protected hoverValue = 0;
  private hoverOrigin: { x: number; y: number } | null = null;
  private hoverLocked = false;
  private onChange: (value: ExtraRatingValue) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    afterNextRender(() => {
      queueMicrotask(() => {
        if (this.autofocus && !this.disabled && !this.isReadonly) {
          const inputs = [...(this.rating?.nativeElement.querySelectorAll<HTMLInputElement>('input') ?? [])];
          (inputs.find((_input, index) => index + 1 === this.modelValue) ?? inputs[0])?.focus();
        }
      });
    });
  }

  get isReadonly(): boolean {
    return this.readonly || this.variant === 'display';
  }

  get ratingPt() {
    return {
      root: {
        role: 'radiogroup',
        'aria-label': this.ariaLabel || undefined,
        'aria-labelledby': this.ariaLabelledBy || undefined,
        'aria-readonly': this.isReadonly || undefined,
        'aria-disabled': this.disabled || undefined
      },
      hiddenOptionInput: { tabindex: this.isReadonly || this.disabled ? -1 : undefined }
    };
  }

  ngOnChanges(): void {
    this.hoverValue = 0;
  }

  handleChange(value: ExtraRatingValue): void {
    if (this.disabled || this.isReadonly) return;
    this.modelValue = value;
    this.onChange(value);
  }

  handleRate(event: { value: ExtraRatingValue; originalEvent: Event }): void {
    if (this.disabled || this.isReadonly) return;
    if (event.value === null) this.onClear.emit();
    else this.onRate.emit({ value: event.value, originalEvent: event.originalEvent });
  }

  handleBlur(event: FocusEvent): void {
    this.onTouched();
    this.onBlur.emit(event);
  }

  handleClear(event: Event): void {
    if (this.disabled || this.isReadonly) return;
    event.stopPropagation();
    this.handleChange(null);
    this.onClear.emit();
  }

  handleHover(event: PointerEvent): void {
    if (this.disabled || this.isReadonly || !(event.target instanceof Element)) return;
    // Браузер повторно присылает pointerover, когда разметка под неподвижным курсором
    // меняется после выбора с клавиатуры. Такой повтор не должен возвращать предпросмотр,
    // поэтому hover включается только при реальном смещении указателя.
    const moved =
      this.hoverOrigin === null || this.hoverOrigin.x !== event.clientX || this.hoverOrigin.y !== event.clientY;
    this.hoverOrigin = { x: event.clientX, y: event.clientY };
    if (this.hoverLocked && !moved) return;
    this.hoverLocked = false;
    const option = event.target.closest('.p-rating-option');
    if (option)
      this.hoverValue =
        [...(this.rating?.nativeElement.querySelectorAll('.p-rating-option') ?? [])].indexOf(option) + 1;
  }

  handleKeydown(event: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', ' ', 'Enter'].includes(event.key)) return;
    event.preventDefault();
    if (this.disabled || this.isReadonly) return;
    this.hoverValue = 0;
    this.hoverLocked = true;
    const inputs = [...(this.rating?.nativeElement.querySelectorAll<HTMLInputElement>('input[type="radio"]') ?? [])];
    if (!inputs.length) return;
    const current = Math.max(0, inputs.indexOf(event.target as HTMLInputElement));
    let next = current;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = inputs.length - 1;
    else if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (current + 1) % inputs.length;
    else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (current + inputs.length - 1) % inputs.length;
    const toggle = [' ', 'Enter'].includes(event.key) && this.modelValue === next + 1;
    const value = toggle ? null : next + 1;
    inputs[next].focus();
    this.handleChange(value);
    this.handleRate({ value, originalEvent: event });
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
    this.hoverValue = 0;
    this.cdr.markForCheck();
  }
}
