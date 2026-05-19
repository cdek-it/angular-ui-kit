import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraMeterGroupComponent as MeterGroupComponent } from '../../../lib/components/metergroup/metergroup.component';
import { MeterGroupHorizontalComponent, Horizontal } from './examples/metergroup-horizontal.component';
import { MeterGroupVerticalComponent, Vertical } from './examples/metergroup-vertical.component';
import { MeterGroupIconComponent, Icon } from './examples/metergroup-icon.component';
import { MeterGroupLabelStartComponent, LabelStart } from './examples/metergroup-label-start.component';
import { MeterGroupLabelVerticalComponent, LabelVertical } from './examples/metergroup-label-vertical.component';
import { defaultValue } from './metergroup.data';

type MeterGroupArgs = MeterGroupComponent;

const meta: Meta<MeterGroupArgs> = {
  title: 'Components/Misc/MeterGroup',
  component: MeterGroupComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        MeterGroupComponent,
        MeterGroupHorizontalComponent,
        MeterGroupVerticalComponent,
        MeterGroupIconComponent,
        MeterGroupLabelStartComponent,
        MeterGroupLabelVerticalComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Визуализирует несколько числовых значений в виде единой полосы прогресса с подписями.

\`\`\`typescript
import { ExtraMeterGroupComponent as MeterGroupComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: {
      prefix: '--p-metergroup',
    },
  },
  argTypes: {
    value: {
      control: false,
      description: 'Массив элементов с полями label, color, value и опционально icon',
      table: {
        category: 'Props',
        type: { summary: 'MeterItem[]' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация полосы',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    labelPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Позиция списка меток относительно полосы',
      table: {
        category: 'Props',
        defaultValue: { summary: 'end' },
        type: { summary: "'start' | 'end'" },
      },
    },
    labelOrientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация списка меток',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
  },
};

const commonTemplate = `<extra-metergroup
  [value]="value"
  [orientation]="orientation"
  [labelPosition]="labelPosition"
  [labelOrientation]="labelOrientation"
></extra-metergroup>`;

export default meta;
type Story = StoryObj<MeterGroupArgs>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: { ...args, value: defaultValue },
    template: args.orientation === 'vertical'
      ? `<div style="height: 300px; display: flex">${commonTemplate}</div>`
      : commonTemplate,
  }),
  args: {
    orientation: 'horizontal',
    labelPosition: 'end',
    labelOrientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Re-exports from example components ────────────────────────────────────
export { Horizontal, Vertical, Icon, LabelStart, LabelVertical };
