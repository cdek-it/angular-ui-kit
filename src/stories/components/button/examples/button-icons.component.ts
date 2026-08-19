import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-end">
      <extra-button icon="ti ti-plus" label="Иконка слева"></extra-button>
      <extra-button icon="ti ti-plus" iconPosition="left" label="left (явно)"></extra-button>
      <extra-button icon="ti ti-arrow-right" iconPosition="right" label="Иконка справа"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button icon="ti ti-trash"></extra-button>
      <extra-button icon="ti ti-pencil"></extra-button>
      <extra-button icon="ti ti-settings" size="small"></extra-button>
      <extra-button icon="ti ti-settings"></extra-button>
      <extra-button icon="ti ti-settings" size="large"></extra-button>
      <extra-button icon="ti ti-settings" size="xlarge"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button icon="ti ti-check" [rounded]="true"></extra-button>
      <extra-button icon="ti ti-plus" [rounded]="true" variant="secondary"></extra-button>
      <extra-button icon="ti ti-x" [rounded]="true" variant="tertiary"></extra-button>
      <extra-button icon="ti ti-x" [rounded]="true" variant="text"></extra-button>
    </div>
  </div>
</div>
`;

@Component({
  selector: 'app-button-icons',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class ButtonIconsComponent {}

export const Icons: StoryObj = {
  render: () => ({
    template: `<app-button-icons></app-button-icons>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Кнопки с иконкой: позиции icon-position (left / right, по умолчанию left), кнопки только с иконкой (пустой label) во всех размерах и вариантах.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-icons',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <extra-button icon="ti ti-plus" label="Иконка слева"></extra-button>
    <extra-button icon="ti ti-arrow-right" iconPosition="right" label="Иконка справа"></extra-button>

    <!-- только иконка (label пустой) -->
    <extra-button icon="ti ti-trash"></extra-button>
    <extra-button icon="ti ti-settings" size="small"></extra-button>
    <extra-button icon="ti ti-settings"></extra-button>
    <extra-button icon="ti ti-settings" size="large"></extra-button>
    <extra-button icon="ti ti-settings" size="xlarge"></extra-button>

    <!-- скруглённые иконочные -->
    <extra-button icon="ti ti-check" [rounded]="true"></extra-button>
    <extra-button icon="ti ti-plus" [rounded]="true" variant="secondary"></extra-button>
    <extra-button icon="ti ti-x" [rounded]="true" variant="tertiary"></extra-button>
    <extra-button icon="ti ti-x" [rounded]="true" variant="text"></extra-button>
  \`,
})
export class ButtonIconsComponent {}
        `
      }
    }
  }
};
