import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import type { SliderSlideEndEvent } from 'primeng/slider';
import { Slider } from 'primeng/slider';
import { Subscription } from 'rxjs';

export type ExtraSliderOrientation = 'horizontal' | 'vertical';
export type ExtraSliderSlideEndEvent = SliderSlideEndEvent;

@Component({
  selector: 'extra-slider',
  host: { style: 'display: block' },
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
      (onSlideEnd)="onSlideEnd.emit($event)"
    ></p-slider>
  `
})
export class ExtraSliderComponent implements ControlValueAccessor, OnChanges, OnDestroy {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step: number | undefined = undefined;
  @Input() range = false;
  @Input() orientation: ExtraSliderOrientation = 'horizontal';
  @Input() set disabled(value: boolean) {
    value ? this.control.disable() : this.control.enable();
  }
  @Output() onSlideEnd = new EventEmitter<ExtraSliderSlideEndEvent>();

  readonly control = new FormControl<number | number[]>(0, { nonNullable: true });

  private _onChange: (value: number | number[]) => void = () => {};
  private _onTouched: () => void = () => {};
  private readonly _sub: Subscription;

  constructor() {
    this._sub = this.control.valueChanges.subscribe((v) => this._onChange(v));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['range']) {
      const current = this.control.value;
      if (this.range && !Array.isArray(current)) {
        this.control.setValue([this.min, this.max], { emitEvent: false });
      } else if (!this.range && Array.isArray(current)) {
        this.control.setValue(current[0], { emitEvent: false });
      }
    }
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  writeValue(value: number | number[]): void {
    this.control.setValue(this.normalize(value ?? 0), { emitEvent: false });
  }

  registerOnChange(fn: (value: number | number[]) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  private normalize(value: number | number[]): number | number[] {
    if (this.range && !Array.isArray(value)) return [this.min, this.max];
    if (!this.range && Array.isArray(value)) return value[0];
    return value;
  }
}
