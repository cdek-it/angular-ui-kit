import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground" style="width: 320px">
  <slider [disabled]="true"></slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SliderComponent],
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
import { SliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SliderComponent],
  template: \`
    <slider [disabled]="true"></slider>
  \`,
})
export class SliderDisabledComponent {}
        `,
      },
    },
  },
};
