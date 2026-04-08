import { Component } from '@angular/core';
import { SliderComponent } from '../../../../lib/components/slider/slider.component';

const template = `
<div class="bg-surface-ground" style="height: 220px">
  <slider orientation="vertical" [(value)]="value" style="height: 200px"></slider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-slider-vertical',
  standalone: true,
  imports: [SliderComponent],
  template,
  styles,
})
export class SliderVerticalComponent {
  value = 50;
}

export const Vertical = {
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
import { SliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-vertical',
  standalone: true,
  imports: [SliderComponent],
  template: \`
    <div style="height: 220px">
      <slider orientation="vertical" [(value)]="value" style="height: 200px"></slider>
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
