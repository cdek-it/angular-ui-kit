import { Component, EventEmitter, Input, Output } from '@angular/core';
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
      [ngModel]="value"
      (ngModelChange)="valueChange.emit($event)"
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
export class SliderComponent {
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
}
