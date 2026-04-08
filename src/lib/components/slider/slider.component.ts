import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';
import type { SliderChangeEvent, SliderSlideEndEvent } from 'primeng/slider';

export type SliderOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'slider',
  host: { style: 'display: block' },
  standalone: true,
  imports: [Slider, FormsModule],
  template: `
    <p-slider
      [ngModel]="normalizedValue"
      (ngModelChange)="onNgModelChange($event)"
      [min]="min"
      [max]="max"
      [step]="step"
      [range]="range"
      [orientation]="orientation"
      [disabled]="disabled"
      (onChange)="onChange.emit($event)"
      (onSlideEnd)="onSlideEnd.emit($event)"
    ></p-slider>
  `,
})
export class SliderComponent implements OnChanges {
  @Input() value: number | number[] = 0;
  @Output() valueChange = new EventEmitter<number | number[]>();
  @Input() min = 0;
  @Input() max = 100;
  @Input() step: number | undefined = undefined;
  @Input() range = false;
  @Input() orientation: SliderOrientation = 'horizontal';
  @Input() disabled = false;
  @Output() onChange = new EventEmitter<SliderChangeEvent>();
  @Output() onSlideEnd = new EventEmitter<SliderSlideEndEvent>();

  get normalizedValue(): number | number[] {
    if (this.range && !Array.isArray(this.value)) {
      return [this.min, this.max];
    }
    if (!this.range && Array.isArray(this.value)) {
      return this.value[0];
    }
    return this.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['range']) {
      if (this.range && !Array.isArray(this.value)) {
        this.value = [this.min, this.max];
      } else if (!this.range && Array.isArray(this.value)) {
        this.value = this.value[0];
      }
    }
  }

  onNgModelChange(v: number | number[]): void {
    this.value = v;
    this.valueChange.emit(v);
  }
}
