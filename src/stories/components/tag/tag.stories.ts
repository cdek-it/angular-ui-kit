import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraTagComponent } from '../../../lib/components/tag/tag.component';
import { TagSeverityComponent, Severity } from './examples/tag-severity.component';
import { TagRoundedComponent, Rounded } from './examples/tag-rounded.component';
import { TagIconComponent, WithIcon } from './examples/tag-icon.component';

type TagArgs = ExtraTagComponent;

const meta: Meta<TagArgs> = {
  title: 'Components/Misc/Tag',
  component: ExtraTagComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraTagComponent,
        TagSeverityComponent,
        TagRoundedComponent,
        TagIconComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-tag' },
    docs: {
      description: {
        component: `Компонент для цветового выделения и классификации элементов интерфейса.`,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    value: {
      control: 'text',
      description: 'Текст тега',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warn', 'danger'],
      description: 'Вариант цветового оформления',
      table: {
        category: 'Props',
        defaultValue: { summary: "'primary'" },
        type: { summary: "'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger'" },
      },
    },
    rounded: {
      control: 'boolean',
      description: 'Скруглённый вариант тега',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (например ti ti-check)',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    value: 'Tag',
    severity: 'primary',
    rounded: false,
    icon: '',
  },
};

export default meta;
type Story = StoryObj<TagArgs>;

const commonTemplate = `
<extra-tag
  [value]="value"
  [severity]="severity"
  [rounded]="rounded"
  [icon]="icon"
></extra-tag>
`;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];
    if (args.value) parts.push(`value="${args.value}"`);
    if (args.severity && args.severity !== 'primary') parts.push(`severity="${args.severity}"`);
    if (args.rounded) parts.push(`[rounded]="true"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);

    const template = parts.length
      ? `<extra-tag\n  ${parts.join('\n  ')}\n></extra-tag>`
      : `<extra-tag></extra-tag>`;

    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

export { WithIcon, Rounded, Severity };
