import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraTagComponent } from '../../../lib/components/tag/tag.component';
import { Severity, TagSeverityComponent } from './examples/tag-severity.component';
import { Rounded, TagRoundedComponent } from './examples/tag-rounded.component';
import { TagIconComponent, WithIcon } from './examples/tag-icon.component';

type TagArgs = ExtraTagComponent;

const meta: Meta<TagArgs> = {
  title: 'Components/Misc/Tag',
  component: ExtraTagComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraTagComponent, TagSeverityComponent, TagRoundedComponent, TagIconComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-tag' },
    docs: {
      description: {
        component: `Маркер для элементов интерфейса.

Реализован по спецификации \`docs/components-api/tag.md\`.

\`\`\`typescript
import { ExtraTagComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/tag.md) ─────────────────
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger'],
      description: 'Вариант стиля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'primary'" },
        type: { summary: "'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'" }
      }
    },
    value: {
      control: 'text',
      description: 'Текст тега',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    rounded: {
      control: 'boolean',
      description: 'Полное скругление углов',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    icon: {
      control: 'text',
      description: 'Класс иконки tabler icon',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    }
  },
  args: {
    severity: 'primary',
    value: 'Tag',
    rounded: false,
    icon: ''
  }
};

export default meta;
type Story = StoryObj<TagArgs>;

// ── Primary (интерактивная) ──────────────────────────────────────────────────

export const Default: Story = {
  name: 'Primary',
  render: (args) => {
    const parts: string[] = [];
    if (args.value) parts.push(`value="${args.value}"`);
    if (args.severity && args.severity !== 'primary') parts.push(`severity="${args.severity}"`);
    if (args.rounded) parts.push(`[rounded]="true"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);

    const template = parts.length ? `<extra-tag\n  ${parts.join('\n  ')}\n></extra-tag>` : `<extra-tag></extra-tag>`;

    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный тег со всеми свойствами спецификации (по умолчанию — primary). Используйте Controls для изменения пропсов.'
      }
    }
  }
};

export { Severity, WithIcon, Rounded };
