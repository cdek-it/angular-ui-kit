import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SelectButtonComponent } from '../../../lib/components/select-button/select-button.component';
import { SelectButtonSelectedComponent, Selected } from './examples/select-button-selected.component';
import { SelectButtonDisabledComponent, Disabled } from './examples/select-button-disabled.component';
import { SelectButtonSemiDisabledComponent, SemiDisabled } from './examples/select-button-semi-disabled.component';
import { SelectButtonIconsComponent, WithIcons } from './examples/select-button-icons.component';

const meta: Meta<SelectButtonComponent> = {
  title: 'Components/Form/SelectButton',
  component: SelectButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        SelectButtonComponent,
        SelectButtonSelectedComponent,
        SelectButtonDisabledComponent,
        SelectButtonSemiDisabledComponent,
        SelectButtonIconsComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Группа кнопок-переключателей с поддержкой одиночного и множественного выбора.

\`\`\`typescript
import { SelectButtonComponent, SelectButtonItem } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-selectbutton' },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Текущее выбранное значение',
      table: {
        category: 'Props',
        type: { summary: 'string | string[]' },
      },
    },
    size: {
      control: 'radio',
      options: ['default', 'sm', 'lg', 'xlg'],
      description: 'Размер компонента',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'sm' | 'lg' | 'xlg'" },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Разрешает выбор нескольких опций',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    allowEmpty: {
      control: 'boolean',
      description: 'Разрешает снятие выбора',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает весь компонент',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    options: {
      control: 'object',
      description: 'Массив опций',
      table: {
        category: 'Props',
        type: { summary: 'SelectButtonItem[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SelectButtonComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    parts.push(`[(value)]="value"`);
    parts.push(`[options]="options"`);
    if (args.size && args.size !== 'default') parts.push(`size="${args.size}"`);
    if (args.multiple)                        parts.push(`[multiple]="true"`);
    if (!args.allowEmpty)                     parts.push(`[allowEmpty]="false"`);
    if (args.disabled)                        parts.push(`[disabled]="true"`);

    const template = `<select-button\n  ${parts.join('\n  ')}\n></select-button>`;

    return { props: args, template };
  },
  args: {
    value: '1',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    size: 'default',
    multiple: false,
    allowEmpty: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый SelectButton. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Selected ──────────────────────────────────────────────────────────────────

export { Selected };

// ── Disabled ──────────────────────────────────────────────────────────────────

export { Disabled };

// ── Semi-disabled ─────────────────────────────────────────────────────────────

export { SemiDisabled };

// ── With Icons ────────────────────────────────────────────────────────────────

export { WithIcons };
