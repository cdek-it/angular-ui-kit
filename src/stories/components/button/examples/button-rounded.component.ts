import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-end">
      <extra-button [rounded]="true" label="Primary"></extra-button>
      <extra-button [rounded]="true" variant="secondary" label="Secondary"></extra-button>
      <extra-button [rounded]="true" variant="tertiary" label="Tertiary"></extra-button>
      <extra-button [rounded]="true" icon="ti ti-check"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button severity="danger" [rounded]="true" label="Danger"></extra-button>
      <extra-button severity="warning" [rounded]="true" label="Warning"></extra-button>
      <extra-button severity="success" [rounded]="true" label="Success"></extra-button>
      <extra-button severity="info" [rounded]="true" label="Info"></extra-button>
    </div>
  </div>
</div>
`;

@Component({
  selector: 'app-button-rounded',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class ButtonRoundedComponent {}

export const Rounded: StoryObj = {
  render: () => ({
    template: `<app-button-rounded></app-button-rounded>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Скруглённая форма (rounded): варианты отображения при severity="base", семантические состояния (severity) и иконочные кнопки. Пересечения severity с вариантами не показываются — severity, кроме "base", перекрывает их.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-rounded',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <div class="flex flex-col gap-4">
      <div class="flex gap-3 items-end">
        <extra-button [rounded]="true" label="Primary"></extra-button>
        <extra-button [rounded]="true" variant="secondary" label="Secondary"></extra-button>
        <extra-button [rounded]="true" variant="tertiary" label="Tertiary"></extra-button>
        <extra-button [rounded]="true" icon="ti ti-check"></extra-button>
      </div>
      <div class="flex gap-3 items-end">
        <extra-button severity="danger" [rounded]="true" label="Danger"></extra-button>
        <extra-button severity="warning" [rounded]="true" label="Warning"></extra-button>
        <extra-button severity="success" [rounded]="true" label="Success"></extra-button>
        <extra-button severity="info" [rounded]="true" label="Info"></extra-button>
      </div>
    </div>
  \`,
})
export class ButtonRoundedComponent {}
        `
      }
    }
  }
};
