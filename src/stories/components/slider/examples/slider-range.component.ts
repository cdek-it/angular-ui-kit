import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground">
  <extra-slider
    [min]="0"
    [max]="100"
    [range]="true"
    ariaLabel="Диапазон цены"
    [(ngModel)]="value"
  ></extra-slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-range',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraSliderComponent, FormsModule],
  template,
  styles
})
export class SliderRangeComponent {
  value: number[] = [20, 80];
}

export const Range: StoryObj = {
  render: () => ({
    template: `<app-slider-range></app-slider-range>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Выбор диапазона значений с двумя ползунками. Модель — массив `[from, to]`.' },
      source: {
        language: 'html',
        code: `<extra-slider [min]="0" [max]="100" [range]="true" ariaLabel="Диапазон цены" [(ngModel)]="value"></extra-slider>`
      }
    }
  }
};
