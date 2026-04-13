import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground">
  <slider [min]="0" [max]="100" [step]="10" [(ngModel)]="value"></slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-step',
  standalone: true,
  imports: [SliderComponent, FormsModule],
  template,
  styles,
})
export class SliderStepComponent {
  value = 50;
}
