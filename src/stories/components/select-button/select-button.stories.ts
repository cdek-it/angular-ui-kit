import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraSelectButtonComponent } from '../../../lib/components/select-button/select-button.component';
import { SelectButtonSelectedComponent, Selected as SelectedStory } from './examples/select-button-selected.component';
import { SelectButtonDisabledComponent, Disabled as DisabledStory } from './examples/select-button-disabled.component';
import { SelectButtonSemiDisabledComponent, SemiDisabled as SemiDisabledStory } from './examples/select-button-semi-disabled.component';
import { SelectButtonIconsComponent, WithIcons as WithIconsStory } from './examples/select-button-icons.component';

type SelectButtonArgs = ExtraSelectButtonComponent;

const meta: Meta<SelectButtonArgs> = {
  title: 'Components/Form/SelectButton',
  component: ExtraSelectButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraSelectButtonComponent,
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
import { ExtraSelectButtonComponent, ExtraSelectButtonItem } from '@cdek-it/angular-ui-kit';
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
      options: ['base', 'small', 'large', 'xLarge'],
      description: 'Размер компонента',
      table: {
        category: 'Props',
        defaultValue: { summary: 'base' },
        type: { summary: "'base' | 'small' | 'large' | 'xLarge'" },
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
    options: {
      control: 'object',
      description: 'Массив опций',
      table: {
        category: 'Props',
        type: { summary: 'ExtraSelectButtonItem[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SelectButtonArgs>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    parts.push(`[(value)]="value"`);
    parts.push(`[options]="options"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.multiple)                        parts.push(`[multiple]="true"`);
    if (!args.allowEmpty)                     parts.push(`[allowEmpty]="false"`);

    const template = `<extra-select-button\n  ${parts.join('\n  ')}\n></extra-select-button>`;

    return { props: args, template };
  },
  args: {
    value: '1',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    size: 'base',
    multiple: false,
    allowEmpty: true,
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

export const Selected: Story = SelectedStory;

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = DisabledStory;

// ── Semi-disabled ─────────────────────────────────────────────────────────────

export const SemiDisabled: Story = SemiDisabledStory;

// ── With Icons ────────────────────────────────────────────────────────────────

export const WithIcons: Story = WithIconsStory;
