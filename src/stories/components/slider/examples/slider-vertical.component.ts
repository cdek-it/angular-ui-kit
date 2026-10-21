import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground flex items-center justify-center" style="height: 240px; width: 320px">
  <extra-slider
    orientation="vertical"
    ariaLabel="Яркость"
    [(ngModel)]="value"
    style="height: 200px"
  ></extra-slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-vertical',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraSliderComponent, FormsModule],
  template,
  styles
})
export class SliderVerticalComponent {
  value = 50;
}

export const Vertical: StoryObj = {
  render: () => ({
    template: `<app-slider-vertical></app-slider-vertical>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Слайдер с вертикальной ориентацией — высота задаётся на `<extra-slider>`.'
      },
      source: {
        language: 'html',
        code: `<extra-slider orientation="vertical" ariaLabel="Яркость" [(ngModel)]="value" style="height: 200px"></extra-slider>`
      }
    }
  }
};
