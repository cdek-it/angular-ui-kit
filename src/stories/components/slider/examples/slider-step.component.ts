import { Component } from '@angular/core';
import { SliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground">
  <slider [min]="0" [max]="100" [step]="10" [(value)]="value"></slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-step',
  standalone: true,
  imports: [SliderComponent],
  template,
  styles,
})
export class SliderStepComponent {
  value = 50;
}

export const Step = {
  render: () => ({
    template: `<app-slider-step></app-slider-step>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Слайдер с шагом изменения значения (10 кг).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-step',
  standalone: true,
  imports: [SliderComponent],
  template: \`
    <slider [min]="0" [max]="100" [step]="10" [(value)]="value"></slider>
  \`,
})
export class SliderStepComponent {
  value = 50;
}
        `,
      },
    },
  },
};
