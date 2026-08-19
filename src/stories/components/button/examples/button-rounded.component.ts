import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    @for (severity of severities; track severity) {
      <div class="flex gap-3 items-end">
        <extra-button [severity]="severity" [rounded]="true" label="Primary"></extra-button>
        <extra-button [severity]="severity" [rounded]="true" variant="secondary" label="Secondary"></extra-button>
        <extra-button [severity]="severity" [rounded]="true" variant="tertiary" label="Tertiary"></extra-button>
        <extra-button [severity]="severity" [rounded]="true" icon="ti ti-check"></extra-button>
      </div>
    }
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
export class ButtonRoundedComponent {
  severities = ['base', 'danger', 'warning', 'success', 'info'];
}

export const Rounded: StoryObj = {
  render: () => ({
    template: `<app-button-rounded></app-button-rounded>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Скруглённая форма (rounded) во всех severity и вариантах, включая иконочные кнопки.'
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
    <div class="flex gap-3 items-end">
      <extra-button [rounded]="true" label="Primary"></extra-button>
      <extra-button [rounded]="true" variant="secondary" label="Secondary"></extra-button>
      <extra-button [rounded]="true" variant="tertiary" label="Tertiary"></extra-button>
      <extra-button [rounded]="true" icon="ti ti-check"></extra-button>
    </div>
    <div class="flex gap-3 items-end">
      <extra-button severity="danger" [rounded]="true" label="Danger"></extra-button>
      <extra-button severity="danger" [rounded]="true" variant="secondary" label="Danger / Secondary"></extra-button>
      <extra-button severity="danger" [rounded]="true" variant="tertiary" label="Danger / Tertiary"></extra-button>
      <extra-button severity="danger" [rounded]="true" icon="ti ti-trash"></extra-button>
    </div>
    <!-- аналогично для severity="warning" | "success" | "info" -->
  \`,
})
export class ButtonRoundedComponent {}
        `
      }
    }
  }
};
