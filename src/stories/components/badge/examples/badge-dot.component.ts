import { Component, Input } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { BadgeComponent, BadgeSeverity } from '../../../../lib/components/badge/badge.component';

const template = `
<div class="bg-surface-ground p-4">
  <badge [severity]="severity"></badge>
</div>
`;

const styles = '';

@Component({
  selector: 'app-badge-dot',
  standalone: true,
  imports: [BadgeComponent],
  template,
  styles
})
export class BadgeDotComponent {
  @Input() severity: BadgeSeverity = null;
}

export const Dot: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<app-badge-dot [severity]="severity"></app-badge-dot>`
  }),
  args: {
    severity: null
  },
  argTypes: {
    severity: {
      control: 'select',
      options: [null, 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'contrast'],
      description: 'Цветовая схема бейджа'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Без значения — отображается как точка-индикатор.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { BadgeComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-badge-dot',
  standalone: true,
  imports: [BadgeComponent],
  template: \`${template}\`
})
export class BadgeDotComponent {}
        `
      }
    }
  }
};
