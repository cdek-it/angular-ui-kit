import { Component, ChangeDetectionStrategy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground" style="height: 220px">
  <extra-slider orientation="vertical" [(ngModel)]="value" style="height: 200px"></extra-slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-vertical',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraSliderComponent, FormsModule],
  template,
  styles,
})
export class SliderVerticalComponent {
  value = 50;
}

export const Vertical: StoryObj = {
  render: () => ({
    template: `<app-slider-vertical></app-slider-vertical>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Слайдер с вертикальной ориентацией.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtraSliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-vertical',
  standalone: true,
  imports: [ExtraSliderComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div style="height: 220px">
      <extra-slider orientation="vertical" [(ngModel)]="value" style="height: 200px"></extra-slider>
    </div>
  \`,
})
export class SliderVerticalComponent {
  value = 50;
}
        `,
      },
    },
  },
};
