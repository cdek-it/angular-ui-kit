import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DividerComponent } from '../../../lib/components/divider/divider.component';
import { DividerWithContentComponent, WithContent as WithContentStory } from './examples/divider-with-content.component';
import { DividerWithIconComponent, WithIcon as WithIconStory } from './examples/divider-with-icon.component';
import { DividerAlignLeftComponent, AlignLeft as AlignLeftStory } from './examples/divider-align-left.component';

const meta: Meta<DividerComponent> = {
  title: 'Components/Panel/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        DividerComponent,
        DividerWithContentComponent,
        DividerWithIconComponent,
        DividerAlignLeftComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Разделитель для визуального разделения контента. Поддерживает горизонтальную и вертикальную ориентацию, различные стили линии и выравнивание.

\`\`\`typescript
import { DividerModule } from 'primeng/divider';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-divider' },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация разделителя',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    type: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Стиль линии разделителя',
      table: {
        category: 'Props',
        defaultValue: { summary: 'solid' },
        type: { summary: "'solid' | 'dashed' | 'dotted'" },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'top', 'bottom'],
      description: 'Выравнивание контента внутри разделителя',
      table: {
        category: 'Props',
        defaultValue: { summary: 'center' },
        type: { summary: "'left' | 'center' | 'right' | 'top' | 'bottom'" },
      },
    },
  },
};

const commonTemplate = `
<divider
  [layout]="layout"
  [type]="type"
  [align]="align"
></divider>
`;

export default meta;
type Story = StoryObj<DividerComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.layout && args.layout !== 'horizontal') parts.push(`layout="${args.layout}"`);
    if (args.type && args.type !== 'solid') parts.push(`type="${args.type}"`);
    if (args.align && args.align !== 'center') parts.push(`align="${args.align}"`);

    const template = parts.length
      ? `<divider\n  ${parts.join('\n  ')}\n></divider>`
      : `<divider></divider>`;

    return { props: args, template };
  },
  args: {
    layout: 'horizontal',
    type: 'solid',
    align: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── WithContent ───────────────────────────────────────────────────────────────

export const WithContent: Story = WithContentStory;

// ── WithIcon ──────────────────────────────────────────────────────────────────

export const WithIcon: Story = WithIconStory;

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    layout: 'vertical',
    type: 'solid',
    align: 'center',
  },
  parameters: {
    docs: {
      description: { story: 'Вертикальный разделитель для разделения контента по горизонтали.' },
      source: {
        code: `<divider layout="vertical"></divider>`,
      },
    },
  },
};

// ── Type ──────────────────────────────────────────────────────────────────────

export const TypeDashed: Story = {
  name: 'Dashed',
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    layout: 'horizontal',
    type: 'dashed',
    align: 'center',
  },
  parameters: {
    docs: {
      description: { story: 'Разделитель с пунктирной линией.' },
      source: {
        code: `<divider type="dashed"></divider>`,
      },
    },
  },
};

export const TypeDotted: Story = {
  name: 'Dotted',
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    layout: 'horizontal',
    type: 'dotted',
    align: 'center',
  },
  parameters: {
    docs: {
      description: { story: 'Разделитель с точечной линией.' },
      source: {
        code: `<divider type="dotted"></divider>`,
      },
    },
  },
};

// ── Align ─────────────────────────────────────────────────────────────────────

export const AlignLeft: Story = AlignLeftStory;
