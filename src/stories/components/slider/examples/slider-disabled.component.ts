import { Component } from '@angular/core';
import { SliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground" style="width: 320px">
  <slider [value]="50" [disabled]="true"></slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-disabled',
  standalone: true,
  imports: [SliderComponent],
  template,
  styles,
})
export class SliderDisabledComponent {}
