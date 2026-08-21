import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-end">
      <extra-button label="Primary"></extra-button>
      <extra-button label="Disabled" [disabled]="true"></extra-button>
      <extra-button label="Loading" [loading]="true"></extra-button>
      <extra-button label="Loading + иконка" icon="ti ti-send" [loading]="true"></extra-button>
    </div>

    @for (variant of variants; track variant) {
      <div class="flex gap-3 items-end">
        <extra-button [variant]="variant" [label]="capitalize(variant)"></extra-button>
        <extra-button [variant]="variant" label="Disabled" [disabled]="true"></extra-button>
        <extra-button [variant]="variant" label="Loading" [loading]="true"></extra-button>
      </div>
    }

    @for (severity of severities; track severity) {
      <div class="flex gap-3 items-end">
        <extra-button [severity]="severity" [label]="capitalize(severity)"></extra-button>
        <extra-button [severity]="severity" label="Disabled" [disabled]="true"></extra-button>
        <extra-button [severity]="severity" label="Loading" [loading]="true"></extra-button>
      </div>
    }
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
  variants = ['secondary', 'tertiary', 'text', 'link'];
  severities = ['danger', 'warning', 'success', 'info'];

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

export const States: StoryObj = {
  render: () => ({
    template: `<app-button-states></app-button-states>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Состояния disabled и loading (спиннер, кнопка неактивна) для каждого variant и каждого severity. Первая кнопка в ряду названа по variant/severity.'
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
      <extra-button label="Primary"></extra-button>
      <extra-button label="Disabled" [disabled]="true"></extra-button>
      <extra-button label="Loading" [loading]="true"></extra-button>
      <extra-button label="Loading + иконка" icon="ti ti-send" [loading]="true"></extra-button>
    </div>

    <!-- disabled / loading работают во всех variant -->
    <extra-button variant="secondary" label="Secondary" [disabled]="true"></extra-button>
    <extra-button variant="tertiary" label="Tertiary" [loading]="true"></extra-button>
    <extra-button variant="text" label="Text" [disabled]="true"></extra-button>
    <extra-button variant="link" label="Link" [loading]="true"></extra-button>

    <!-- disabled / loading работают со всеми severity -->
    <extra-button severity="danger" label="Danger" [disabled]="true"></extra-button>
    <extra-button severity="danger" label="Danger" [loading]="true"></extra-button>
    <extra-button severity="warning" label="Warning" [loading]="true"></extra-button>
    <extra-button severity="success" label="Success" [loading]="true"></extra-button>
    <extra-button severity="info" label="Info" [loading]="true"></extra-button>
  \`,
})
export class ButtonStatesComponent {}
        `
      }
    }
  }
};
