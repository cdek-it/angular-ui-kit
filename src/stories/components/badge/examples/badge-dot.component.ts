import { Component, Input } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { BadgeComponent, BadgeSeverity, BadgeSize } from '../../../../lib/components/badge/badge.component';

const template = `
<div class="bg-surface-ground p-4">
  <badge [severity]="severity" [size]="size"></badge>
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
  @Input() severity: BadgeSeverity = 'primary';
  @Input() size: BadgeSize = 'base';
}

export const Dot: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<app-badge-dot [severity]="severity" [size]="size"></app-badge-dot>`
  }),
  args: {
    severity: 'primary'
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger'],
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
