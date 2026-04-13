import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground" style="height: 220px">
  <slider orientation="vertical" [(ngModel)]="value" style="height: 200px"></slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-vertical',
  standalone: true,
  imports: [SliderComponent, FormsModule],
  template,
  styles,
})
export class SliderVerticalComponent {
  value = 50;
}
