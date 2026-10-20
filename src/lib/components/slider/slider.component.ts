import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import type { SliderChangeEvent } from 'primeng/slider';
import { Slider } from 'primeng/slider';
import { Subscription } from 'rxjs';

export type ExtraSliderOrientation = 'horizontal' | 'vertical';

export interface ExtraSliderChangeEvent {
  value?: number;
  values?: number[];
  originalEvent: Event;
}

@Component({
  selector: 'extra-slider',
  host: {
    style: 'display: block',
    '(mousedown)': 'rememberNativeEvent($event)',
    '(touchstart)': 'rememberNativeEvent($event)',
    '(keydown)': 'rememberNativeEvent($event)',
    '(focusout)': 'markTouched()'
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Slider, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraSliderComponent),
      multi: true
    }
  ],
  template: `
    <p-slider
      [formControl]="control"
      [min]="min"
      [max]="max"
      [step]="step"
      [range]="range"
      [orientation]="orientation"
      [animate]="animate"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [tabindex]="tabindex"
      [autofocus]="autofocus"
      [attr.aria-disabled]="control.disabled ? true : null"
      (onChange)="onChangeHandler($event)"
      (onSlideEnd)="onSlideEndHandler()"
    ></p-slider>
  `
})
export class ExtraSliderComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step: number | undefined = undefined;
  @Input() range = false;
  @Input() orientation: ExtraSliderOrientation = 'horizontal';
  /** Анимация прыжка бегунка при клике по шкале. */
  @Input() animate = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() tabindex = 0;
  @Input() autofocus = false;

  @Output() onChange = new EventEmitter<ExtraSliderChangeEvent>();
  @Output() onSlideEnd = new EventEmitter<void>();

  readonly control = new FormControl<number | number[]>(0, { nonNullable: true });

  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
  private _onChange: (value: number | number[]) => void = () => {};
  private _onTouched: () => void = () => {};
  private readonly _sub: Subscription;
  private lastNativeEvent?: Event;

  constructor() {
    this._sub = this.control.valueChanges.subscribe((v) => {
      this._onChange(v);
      this.syncRangeAria();
    });
  }

  ngAfterViewInit(): void {
    this.syncRangeAria();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['range']) {
      const current = this.control.value;
      if (this.range && !Array.isArray(current)) {
        this.updateModel([this.min, this.max]);
      } else if (!this.range && Array.isArray(current)) {
        this.updateModel(current[0]);
      }
    }

    this.syncRangeAria();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  /** Запоминает действие пользователя: PrimeNG теряет исходное событие на ветке со [step]. */
  rememberNativeEvent(event: Event): void {
    this.lastNativeEvent = event;
  }

  /** Бегунок потерял фокус — помечаем контрол как touched (onSlideEnd мышиный и клавиатуру не покрывает). */
  markTouched(): void {
    this._onTouched();
  }

  onChangeHandler(event: SliderChangeEvent): void {
    // onChange у PrimeNG возникает только в ответ на действие пользователя,
    // поэтому к этому моменту lastNativeEvent заполнен обработчиками на хосте.
    const originalEvent = (event.event ?? this.lastNativeEvent) as Event;
    this.onChange.emit({ value: event.value, values: event.values, originalEvent });
  }

  onSlideEndHandler(): void {
    this._onTouched();
    this.onSlideEnd.emit();
  }

  writeValue(value: number | number[]): void {
    this.control.setValue(this.normalize(value ?? 0), { emitEvent: false });
    this.syncRangeAria();
  }

  registerOnChange(fn: (value: number | number[]) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // emitEvent: false — иначе disable()/enable() уведомляют родительскую форму о «смене значения»
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }

  private updateModel(value: number | number[]): void {
    this.control.setValue(value, { emitEvent: false });
    this._onChange(value);
  }

  /** PrimeNG не проставляет aria-valuenow бегункам в режиме range — дополняем сами. */
  private syncRangeAria(): void {
    if (!this.range) return;

    const values = this.control.value;
    if (!Array.isArray(values)) return;

    const handles = this.el.nativeElement.querySelectorAll<HTMLElement>('.p-slider-handle');
    handles.forEach((handle, index) => {
      const value = values[index];
      if (value !== undefined) handle.setAttribute('aria-valuenow', String(value));
    });
  }

  private normalize(value: number | number[]): number | number[] {
    if (this.range && !Array.isArray(value)) return [this.min, this.max];
    if (!this.range && Array.isArray(value)) return value[0];
    return value;
  }
}
