import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraChipComponent as ChipComponent } from '../../../lib/components/chip/chip.component';
import { ChipWithIconComponent, WithIcon as WithIconStory } from './examples/chip-with-icon.component';
import { ChipRemovableComponent, Removable as RemovableStory } from './examples/chip-removable.component';
import {
  ChipRemovableWithIconComponent,
  RemovableWithIcon as RemovableWithIconStory
} from './examples/chip-removable-with-icon.component';
import { ChipDisabledComponent, Disabled as DisabledStory } from './examples/chip-disabled.component';

type ChipArgs = ChipComponent & { onRemove?: (event: MouseEvent) => void };

const meta: Meta<ChipArgs> = {
  title: 'Components/Misc/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ChipComponent,
        ChipWithIconComponent,
        ChipRemovableComponent,
        ChipRemovableWithIconComponent,
        ChipDisabledComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Чип — небольшой интерактивный элемент с текстом, иконкой и опциональной кнопкой удаления.

\`\`\`typescript
import { ChipComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-chip' }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст внутри чипа',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    icon: {
      control: 'text',
      description: 'Иконка чипа (класс Tabler Icons, например "ti ti-map-pin")',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    removable: {
      control: 'boolean',
      description: 'Отображает кнопку удаления',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает чип',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    onRemove: {
      control: false,
      description: 'Событие удаления чипа',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<MouseEvent>' }
      }
    }
  }
};

const commonTemplate = `
<extra-chip
  [label]="label"
  [icon]="icon"
  [removable]="removable"
  [disabled]="disabled"
></extra-chip>
`;

export default meta;
type Story = StoryObj<ChipArgs>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label) parts.push(`label="${args.label}"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);
    if (args.removable) parts.push(`[removable]="true"`);
    if (args.disabled) parts.push(`[disabled]="true"`);

    const template = parts.length
      ? `<extra-chip\n  ${parts.join('\n  ')}\n></extra-chip>`
      : `<extra-chip></extra-chip>`;

    return { props: args, template };
  },
  args: {
    label: 'В пути',
    icon: '',
    removable: false,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── WithIcon ──────────────────────────────────────────────────────────────────

export const WithIcon: Story = WithIconStory;

// ── Removable ─────────────────────────────────────────────────────────────────

export const Removable: Story = RemovableStory;

// ── RemovableWithIcon ─────────────────────────────────────────────────────────

export const RemovableWithIcon: Story = RemovableWithIconStory;

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = DisabledStory;
