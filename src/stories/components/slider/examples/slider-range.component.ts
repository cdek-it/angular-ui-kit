import { Component } from '@angular/core';
import { SliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground">
  <slider [min]="0" [max]="100" [range]="true" [(value)]="value"></slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-range',
  standalone: true,
  imports: [SliderComponent],
  template,
  styles,
})
export class SliderRangeComponent {
  value: number[] = [20, 80];
}

export const Range = {
  render: () => ({
    template: `<app-slider-range></app-slider-range>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Выбор диапазона значений с двумя ползунками.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-range',
  standalone: true,
  imports: [SliderComponent],
  template: \`
    <slider [min]="0" [max]="100" [range]="true" [(value)]="value"></slider>
  \`,
})
export class SliderRangeComponent {
  value: number[] = [20, 80];
}
        `,
      },
    },
  },
};
