import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground">
  <extra-slider [min]="0" [max]="100" [step]="10" ariaLabel="Масштаб" [(ngModel)]="value"></extra-slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-step',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraSliderComponent, FormsModule],
  template,
  styles
})
export class SliderStepComponent {
  value = 50;
}

export const Step: StoryObj = {
  render: () => ({
    template: `<app-slider-step></app-slider-step>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Слайдер с шагом изменения значения.' },
      source: {
        language: 'html',
        code: `<extra-slider [min]="0" [max]="100" [step]="10" ariaLabel="Масштаб" [(ngModel)]="value"></extra-slider>`
      }
    }
  }
};
