import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground" style="width: 320px">
  <extra-slider [formControl]="control"></extra-slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-disabled',
  standalone: true,
  imports: [ExtraSliderComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class SliderDisabledComponent {
  control = new FormControl<number>({ value: 30, disabled: true }, { nonNullable: true });
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-slider-disabled></app-slider-disabled>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Слайдер в отключённом состоянии — управляется через FormControl.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraSliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-disabled',
  standalone: true,
  imports: [ExtraSliderComponent, ReactiveFormsModule],
  template: \`
    <extra-slider [formControl]="control"></extra-slider>
  \`,
})
export class SliderDisabledComponent {
  control = new FormControl<number>({ value: 30, disabled: true }, { nonNullable: true });
}
        `
      }
    }
  }
};
