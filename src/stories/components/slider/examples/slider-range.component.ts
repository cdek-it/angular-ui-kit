import { Component } from '@angular/core';
import { SliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground">
  <slider [min]="0" [max]="100" [range]="true" [(value)]="value"></slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-range',
  standalone: true,
  imports: [SliderComponent],
  template,
  styles,
})
export class SliderRangeComponent {
  value: number[] = [20, 80];
}
