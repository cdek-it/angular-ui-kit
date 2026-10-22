import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraProgressSpinnerComponent } from '../../../../lib/components/progressspinner/progressspinner.component';

const template = `
<div class="flex gap-6 items-center">
  <extra-progressspinner size="small" ariaLabel="Загрузка"></extra-progressspinner>
  <extra-progressspinner size="base" ariaLabel="Загрузка"></extra-progressspinner>
  <extra-progressspinner size="large" ariaLabel="Загрузка"></extra-progressspinner>
  <extra-progressspinner size="xlarge" ariaLabel="Загрузка"></extra-progressspinner>
</div>
`;

@Component({
  selector: 'app-progressspinner-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template
})
export class ProgressSpinnerSizesComponent {}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-progressspinner-sizes></app-progressspinner-sizes>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Размеры спиннера: 16 / 32 / 48 / 56px.' },
      source: {
        language: 'html',
        code: `<extra-progressspinner size="small" ariaLabel="Загрузка"></extra-progressspinner>
<extra-progressspinner size="base" ariaLabel="Загрузка"></extra-progressspinner>
<extra-progressspinner size="large" ariaLabel="Загрузка"></extra-progressspinner>
<extra-progressspinner size="xlarge" ariaLabel="Загрузка"></extra-progressspinner>`
      }
    }
  }
};
