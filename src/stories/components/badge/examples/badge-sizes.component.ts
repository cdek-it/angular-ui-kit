import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { BadgeSize, ExtraBadgeComponent } from '../../../../lib/components/badge/badge.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-badge [value]="value" [size]="size"></extra-badge>
</div>
`;

const styles = '';

@Component({
  selector: 'app-badge-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBadgeComponent],
  template,
  styles
})
export class BadgeSizesComponent {
  @Input() value: string | number = '8';
  @Input() size: BadgeSize = 'large';
}

export const Sizes: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<app-badge-sizes [value]="value" [size]="size"></app-badge-sizes>`
  }),
  args: {
    value: '8',
    size: 'large'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['base', 'large', 'xlarge'],
      description: 'Размер бейджа'
    },
    value: {
      control: 'text',
      description: 'Отображаемое значение бейджа'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Все доступные размеры: base, large, xlarge.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraBadgeComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-badge-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent],
  template: \`${template}\`
})
export class BadgeSizesComponent {}
        `
      }
    }
  }
};
