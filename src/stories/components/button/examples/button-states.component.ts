import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-end">
      <extra-button label="Обычная"></extra-button>
      <extra-button label="Disabled" [disabled]="true"></extra-button>
      <extra-button label="Loading" [loading]="true"></extra-button>
      <extra-button label="Loading + иконка" icon="ti ti-send" [loading]="true"></extra-button>
    </div>

    @for (variant of variants; track variant) {
      <div class="flex gap-3 items-end">
        <extra-button [variant]="variant" label="Обычная"></extra-button>
        <extra-button [variant]="variant" label="Disabled" [disabled]="true"></extra-button>
        <extra-button [variant]="variant" label="Loading" [loading]="true"></extra-button>
      </div>
    }

    <div class="flex gap-3 items-end">
      <extra-button severity="danger" label="Обычная"></extra-button>
      <extra-button severity="danger" label="Disabled" [disabled]="true"></extra-button>
      <extra-button severity="danger" label="Loading" [loading]="true"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button severity="warning" label="Обычная"></extra-button>
      <extra-button severity="warning" label="Disabled" [disabled]="true"></extra-button>
      <extra-button severity="warning" label="Loading" [loading]="true"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button severity="success" label="Обычная"></extra-button>
      <extra-button severity="success" label="Disabled" [disabled]="true"></extra-button>
      <extra-button severity="success" label="Loading" [loading]="true"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button severity="info" label="Обычная"></extra-button>
      <extra-button severity="info" label="Disabled" [disabled]="true"></extra-button>
      <extra-button severity="info" label="Loading" [loading]="true"></extra-button>
    </div>
  </div>
</div>
`;

@Component({
  selector: 'app-button-states',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class ButtonStatesComponent {
  variants = ['primary', 'secondary', 'tertiary', 'text', 'link'];
}

export const States: StoryObj = {
  render: () => ({
    template: `<app-button-states></app-button-states>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Состояния disabled и loading: спиннер, кнопка неактивна. Показаны для каждого variant и каждого severity.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-states',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <div class="flex gap-3 items-end">
      <extra-button label="Обычная"></extra-button>
      <extra-button label="Disabled" [disabled]="true"></extra-button>
      <extra-button label="Loading" [loading]="true"></extra-button>
      <extra-button label="Loading + иконка" icon="ti ti-send" [loading]="true"></extra-button>
    </div>

    <!-- disabled / loading работают во всех variant -->
    <extra-button variant="secondary" label="Disabled" [disabled]="true"></extra-button>
    <extra-button variant="tertiary" label="Loading" [loading]="true"></extra-button>
    <extra-button variant="text" label="Disabled" [disabled]="true"></extra-button>
    <extra-button variant="link" label="Loading" [loading]="true"></extra-button>

    <!-- disabled / loading работают со всеми severity -->
    <extra-button severity="danger" label="Disabled" [disabled]="true"></extra-button>
    <extra-button severity="danger" label="Loading" [loading]="true"></extra-button>
    <extra-button severity="warning" label="Loading" [loading]="true"></extra-button>
    <extra-button severity="success" label="Loading" [loading]="true"></extra-button>
    <extra-button severity="info" label="Loading" [loading]="true"></extra-button>
  \`,
})
export class ButtonStatesComponent {}
        `
      }
    }
  }
};
