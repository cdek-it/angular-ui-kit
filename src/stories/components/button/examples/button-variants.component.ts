import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    @for (severity of severities; track severity) {
      <div class="flex gap-3 items-end">
        <extra-button [severity]="severity" variant="primary" [label]="'Primary / ' + severity"></extra-button>
        <extra-button [severity]="severity" variant="secondary" [label]="'Secondary / ' + severity"></extra-button>
        <extra-button [severity]="severity" variant="tertiary" [label]="'Tertiary / ' + severity"></extra-button>
        <extra-button [severity]="severity" variant="text" [label]="'Text / ' + severity"></extra-button>
        <extra-button [severity]="severity" variant="link" [label]="'Link / ' + severity"></extra-button>
      </div>
    }
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
export class ButtonVariantsComponent {
  severities = ['base', 'danger', 'warning', 'success', 'info'];
}

export const Variants: StoryObj = {
  render: () => ({
    template: `<app-button-variants></app-button-variants>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Все варианты отображения (variant) в сочетании со всеми семантическими состояниями (severity).'
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
        <extra-button variant="text" label="Text"></extra-button>
        <extra-button variant="link" label="Link"></extra-button>
      </div>
      <div class="flex gap-3 items-end">
        <extra-button severity="danger" label="Primary / Danger"></extra-button>
        <extra-button severity="danger" variant="secondary" label="Secondary / Danger"></extra-button>
        <extra-button severity="danger" variant="tertiary" label="Tertiary / Danger"></extra-button>
        <extra-button severity="danger" variant="text" label="Text / Danger"></extra-button>
        <extra-button severity="danger" variant="link" label="Link / Danger"></extra-button>
      </div>
      <!-- аналогично для severity="warning" | "success" | "info" -->
    </div>
  \`,
})
export class ButtonVariantsComponent {}
        `
      }
    }
  }
};
