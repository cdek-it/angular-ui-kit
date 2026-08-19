import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-end">
      <extra-button size="small" label="Small"></extra-button>
      <extra-button size="base" label="Base"></extra-button>
      <extra-button size="large" label="Large"></extra-button>
      <extra-button size="xlarge" label="XLarge"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button size="small" icon="ti ti-check" label="Small"></extra-button>
      <extra-button size="base" icon="ti ti-check" label="Base"></extra-button>
      <extra-button size="large" icon="ti ti-check" label="Large"></extra-button>
      <extra-button size="xlarge" icon="ti ti-check" label="XLarge"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button size="small" [rounded]="true" label="Small"></extra-button>
      <extra-button size="base" [rounded]="true" label="Base"></extra-button>
      <extra-button size="large" [rounded]="true" label="Large"></extra-button>
      <extra-button size="xlarge" [rounded]="true" label="XLarge"></extra-button>
    </div>
  </div>
</div>
`;

@Component({
  selector: 'app-button-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class ButtonSizesComponent {}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-button-sizes></app-button-sizes>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Размеры кнопки: small, base, large, xlarge — обычные, с иконкой и скруглённые.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-sizes',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <div class="flex gap-3 items-end">
      <extra-button size="small" label="Small"></extra-button>
      <extra-button size="base" label="Base"></extra-button>
      <extra-button size="large" label="Large"></extra-button>
      <extra-button size="xlarge" label="XLarge"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button size="small" icon="ti ti-check" label="Small"></extra-button>
      <extra-button size="base" icon="ti ti-check" label="Base"></extra-button>
      <extra-button size="large" icon="ti ti-check" label="Large"></extra-button>
      <extra-button size="xlarge" icon="ti ti-check" label="XLarge"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button size="small" [rounded]="true" label="Small"></extra-button>
      <extra-button size="base" [rounded]="true" label="Base"></extra-button>
      <extra-button size="large" [rounded]="true" label="Large"></extra-button>
      <extra-button size="xlarge" [rounded]="true" label="XLarge"></extra-button>
    </div>
  \`,
})
export class ButtonSizesComponent {}
        `
      }
    }
  }
};
