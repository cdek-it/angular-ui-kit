import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4" style="max-width: 320px">
    <extra-button [fluid]="true" label="Primary"></extra-button>
    <extra-button [fluid]="true" variant="secondary" label="Secondary"></extra-button>
    <extra-button [fluid]="true" variant="tertiary" label="Tertiary"></extra-button>
    <extra-button [fluid]="true" icon="ti ti-check" label="Иконка + текст"></extra-button>
  </div>
</div>
`;

@Component({
  selector: 'app-button-fluid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class ButtonFluidComponent {}

export const Fluid: StoryObj = {
  render: () => ({
    template: `<app-button-fluid></app-button-fluid>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Растягивание на всю ширину контейнера (fluid). При `[fluid]="true"` кнопка занимает 100% ширины родителя — удобно для форм и мобильных раскладок. Контейнер в примере ограничен шириной 320px, чтобы эффект был нагляден.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-fluid',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <div class="flex flex-col gap-4" style="max-width: 320px">
      <extra-button [fluid]="true" label="Primary"></extra-button>
      <extra-button [fluid]="true" variant="secondary" label="Secondary"></extra-button>
      <extra-button [fluid]="true" variant="tertiary" label="Tertiary"></extra-button>
      <extra-button [fluid]="true" icon="ti ti-check" label="Иконка + текст"></extra-button>
    </div>
  \`,
})
export class ButtonFluidComponent {}
        `
      }
    }
  }
};
