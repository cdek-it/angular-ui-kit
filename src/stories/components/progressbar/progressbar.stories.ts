import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraProgressBarComponent } from '../../../lib/components/progressbar/progressbar.component';
import { ProgressBarIndeterminateComponent } from './examples/progressbar-indeterminate.component';
import { ProgressBarNoLabelComponent } from './examples/progressbar-no-label.component';

type ProgressBarArgs = ExtraProgressBarComponent;

const meta: Meta<ProgressBarArgs> = {
  title: 'Components/Misc/ProgressBar',
  component: ExtraProgressBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraProgressBarComponent,
        ProgressBarIndeterminateComponent,
        ProgressBarNoLabelComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Информирует пользователя о статусе длительного процесса.

\`\`\`typescript
import { ExtraProgressBarComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: {
      prefix: '--p-progressbar',
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Значение прогресса (0–100)',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    mode: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Режим отображения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'determinate' },
        type: { summary: "'determinate' | 'indeterminate'" },
      },
    },
    showValue: {
      control: 'boolean',
      description: 'Отображать числовое значение',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
  },
};

const commonTemplate = `<extra-progressbar
  [value]="value"
  [mode]="mode"
  [showValue]="showValue"
></extra-progressbar>`;

export default meta;
type Story = StoryObj<ProgressBarArgs>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.value != null && args.value !== 0) parts.push(`[value]="${args.value}"`);
    if (args.mode && args.mode !== 'determinate') parts.push(`mode="${args.mode}"`);
    if (!args.showValue) parts.push(`[showValue]="false"`);

    const template = parts.length
      ? `<extra-progressbar\n  ${parts.join('\n  ')}\n></extra-progressbar>`
      : `<extra-progressbar></extra-progressbar>`;

    return { props: args, template };
  },
  args: {
    value: 50,
    mode: 'determinate',
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Stories ──────────────────────────────────────────────────────────────────

export const Indeterminate: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    mode: 'indeterminate',
    showValue: true,
  },
  parameters: {
    docs: {
      description: { story: 'Анимированный режим без конкретного значения.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-progressbar-indeterminate',
  standalone: true,
  imports: [ExtraProgressBarComponent],
  template: \`
    <div class="bg-surface-ground">
      <extra-progressbar mode="indeterminate"></extra-progressbar>
    </div>
  \`,
})
export class ProgressBarIndeterminateComponent {}`,
      },
    },
  },
};

export const NoLabel: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    value: 60,
    mode: 'determinate',
    showValue: false,
  },
  parameters: {
    docs: {
      description: { story: 'Полоса прогресса без числовой метки.' },
      source: {
        language: 'ts',
        code: `

@Component({
  selector: 'app-progressbar-no-label',
  standalone: true,
  imports: [ExtraProgressBarComponent],
  template: \`
    <div class="bg-surface-ground">
      <extra-progressbar [value]="60" [showValue]="false"></extra-progressbar>
    </div>
  \`,
})
export class ProgressBarNoLabelComponent {}`,
      },
    },
  },
};
