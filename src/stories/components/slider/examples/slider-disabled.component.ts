import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraSliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground" style="width: 320px">
  <extra-slider [disabled]="true"></extra-slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-disabled',
  standalone: true,
  imports: [ExtraSliderComponent],
  template,
  styles,
})
export class SliderDisabledComponent {}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-slider-disabled></app-slider-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Слайдер в отключённом состоянии.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraSliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-disabled',
  standalone: true,
  imports: [ExtraSliderComponent],
  template: \`
    <extra-slider [disabled]="true"></extra-slider>
  \`,
})
export class SliderDisabledComponent {}
        `,
      },
    },
  },
};
