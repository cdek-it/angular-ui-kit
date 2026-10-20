import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraProgressSpinnerComponent } from '../../../../lib/components/progressspinner/progressspinner.component';

const template = `
<div class="bg-surface-inverse p-6 flex gap-6 items-center" style="background: #2b2e33">
  <extra-progressspinner fill="white" size="base" ariaLabel="Загрузка"></extra-progressspinner>
  <extra-progressspinner fill="white" size="large" ariaLabel="Загрузка"></extra-progressspinner>
</div>
`;

@Component({
  selector: 'app-progressspinner-monochrome',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template
})
export class ProgressSpinnerMonochromeComponent {}

export const Monochrome: StoryObj = {
  render: () => ({
    template: `<app-progressspinner-monochrome></app-progressspinner-monochrome>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Одноцветный вариант (`fill="white"`) — предназначен для цветной/тёмной подложки, поэтому показан на ней. ' +
          'Цвет дуги сейчас берётся из токена `color.bg.brand.strong.default` (зелёный), а не белый — расхождение с Figma, см. контракт компонента.'
      },
      source: {
        language: 'html',
        code: `<extra-progressspinner fill="white" ariaLabel="Загрузка"></extra-progressspinner>`
      }
    }
  }
};
