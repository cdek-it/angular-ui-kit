import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-end">
      <extra-button label="Primary"></extra-button>
      <extra-button variant="secondary" label="Secondary"></extra-button>
      <extra-button variant="tertiary" label="Tertiary"></extra-button>
      <extra-button variant="outlined" label="Outlined"></extra-button>
      <extra-button variant="text" label="Text"></extra-button>
      <extra-button variant="link" label="Link"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button severity="danger" label="Danger"></extra-button>
      <extra-button severity="warning" label="Warning"></extra-button>
      <extra-button severity="success" label="Success"></extra-button>
      <extra-button severity="info" label="Info"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button variant="outlined" severity="danger" label="Danger"></extra-button>
      <extra-button variant="outlined" severity="warning" label="Warning"></extra-button>
      <extra-button variant="outlined" severity="success" label="Success"></extra-button>
      <extra-button variant="outlined" severity="info" label="Info"></extra-button>
    </div>
  </div>
</div>
`;

@Component({
  selector: 'app-button-variants',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class ButtonVariantsComponent {}

export const Variants: StoryObj = {
  render: () => ({
    template: `<app-button-variants></app-button-variants>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Варианты отображения (variant) при severity="base", семантические состояния (severity) при variant="primary" (сплошная заливка) и variant="outlined" × severity (контурная кнопка с цветной рамкой). "outlined" — самостоятельное значение variant, не зависит от severity: при severity="base" даёт нейтральную контурную кнопку (см. первый ряд), в остальных случаях рамка окрашивается по severity.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-variants',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <div class="flex flex-col gap-4">
      <div class="flex gap-3 items-end">
        <extra-button label="Primary"></extra-button>
        <extra-button variant="secondary" label="Secondary"></extra-button>
        <extra-button variant="tertiary" label="Tertiary"></extra-button>
        <extra-button variant="outlined" label="Outlined"></extra-button>
        <extra-button variant="text" label="Text"></extra-button>
        <extra-button variant="link" label="Link"></extra-button>
      </div>
      <div class="flex gap-3 items-end">
        <extra-button severity="danger" label="Danger"></extra-button>
        <extra-button severity="warning" label="Warning"></extra-button>
        <extra-button severity="success" label="Success"></extra-button>
        <extra-button severity="info" label="Info"></extra-button>
      </div>
      <!-- variant="outlined" + severity — контурная кнопка, цвет рамки берётся из severity -->
      <div class="flex gap-3 items-end">
        <extra-button variant="outlined" severity="danger" label="Danger"></extra-button>
        <extra-button variant="outlined" severity="warning" label="Warning"></extra-button>
        <extra-button variant="outlined" severity="success" label="Success"></extra-button>
        <extra-button variant="outlined" severity="info" label="Info"></extra-button>
      </div>
    </div>
  \`,
})
export class ButtonVariantsComponent {}
        `
      }
    }
  }
};
