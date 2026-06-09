import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { BadgeSeverity, BadgeSize, ExtraBadgeComponent } from '../../../../lib/components/badge/badge.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-badge [value]="value" [severity]="severity" [size]="size"></extra-badge>
</div>
`;

const styles = '';

@Component({
  selector: 'app-badge-severity',
  standalone: true,
  imports: [ExtraBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class BadgeSeverityComponent {
  @Input() value: string | number = '8';
  @Input() severity: BadgeSeverity = 'success';
  @Input() size: BadgeSize = 'base';
}

export const Severity: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<app-badge-severity [value]="value" [severity]="severity" [size]="size"></app-badge-severity>`
  }),
  args: {
    value: '8',
    severity: 'success'
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger'],
      description: 'Цветовая схема бейджа'
    },
    value: {
      control: 'text',
      description: 'Отображаемое значение бейджа'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Цветовые схемы: primary, success, info, warning, danger.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraBadgeComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-badge-severity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent],
  template: \`${template}\`
})
export class BadgeSeverityComponent {}
        `
      }
    }
  }
};
