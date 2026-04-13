import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MeterGroupComponent } from '../../../lib/components/metergroup/metergroup.component';
import { MeterGroupHorizontalComponent } from './examples/metergroup-horizontal.component';
import { MeterGroupVerticalComponent } from './examples/metergroup-vertical.component';
import { MeterGroupIconComponent } from './examples/metergroup-icon.component';
import { MeterGroupLabelStartComponent } from './examples/metergroup-label-start.component';
import { MeterGroupLabelVerticalComponent } from './examples/metergroup-label-vertical.component';
import { defaultValue, iconValue } from './metergroup.data';

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
import { MeterGroupComponent } from '@cdek-it/angular-ui-kit';
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

const commonTemplate = `<metergroup
  [value]="value"
  [orientation]="orientation"
  [labelPosition]="labelPosition"
  [labelOrientation]="labelOrientation"
></metergroup>`;

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

// ── Stories ──────────────────────────────────────────────────────────────────


export const Horizontal: Story = {
  render: (args) => ({
    props: { ...args, value: defaultValue },
    template: commonTemplate,
  }),
  args: {
    orientation: 'horizontal',
    labelPosition: 'end',
    labelOrientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: { story: 'Горизонтальная ориентация (по умолчанию).' },
      source: {
        language: 'ts',
        code: `
<metergroup [value]="value" orientation="horizontal"></metergroup>`,
      },
    },
  },
};

export const Vertical: Story = {
  render: (args) => ({
    props: { ...args, value: defaultValue },
    template: `<div style="height: 300px; display: flex"><metergroup
  [value]="value"
  orientation="vertical"
  [labelPosition]="labelPosition"
  [labelOrientation]="labelOrientation"
></metergroup></div>`,
  }),
  args: {
    orientation: 'vertical',
    labelPosition: 'end',
    labelOrientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: { story: 'Вертикальная ориентация полосы.' },
      source: {
        language: 'ts',
        code: `
<metergroup [value]="value" orientation="vertical" style="height: 200px"></metergroup>`,
      },
    },
  },
};

export const Icon: Story = {
  render: (args) => ({
    props: { ...args, value: iconValue },
    template: commonTemplate,
  }),
  args: {
    orientation: 'horizontal',
    labelPosition: 'end',
    labelOrientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: { story: 'Элементы с иконками в метках.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MeterGroupComponent } from '@shared/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';

@Component({
  selector: 'app-metergroup-icon',
  standalone: true,
  imports: [MeterGroupComponent],
  template: \`
    <div class="bg-surface-ground">
      <metergroup [value]="value"></metergroup>
    </div>
  \`,
})
export class MeterGroupIconComponent {
  value: MeterItem[] = [
    { label: 'Apps', color: '#34d399', value: 16, icon: 'ti ti-apps' },
    { label: 'Messages', color: '#fbbf24', value: 8, icon: 'ti ti-message' },
    { label: 'System', color: '#60a5fa', value: 24, icon: 'ti ti-cpu' },
  ];
}`,
      },
    },
  },
};

export const LabelStart: Story = {
  render: (args) => ({
    props: { ...args, value: defaultValue },
    template: commonTemplate,
  }),
  args: {
    orientation: 'horizontal',
    labelPosition: 'start',
    labelOrientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: { story: 'Метки расположены над полосой (labelPosition="start").' },
      source: {
        language: 'ts',
        code: `
<metergroup [value]="value" labelPosition="start"></metergroup>`,
      },
    },
  },
};

export const LabelVertical: Story = {
  render: (args) => ({
    props: { ...args, value: defaultValue },
    template: commonTemplate,
  }),
  args: {
    orientation: 'horizontal',
    labelPosition: 'end',
    labelOrientation: 'vertical',
  },
  parameters: {
    docs: {
      description: { story: 'Метки расположены вертикально (labelOrientation="vertical").' },
      source: {
        language: 'ts',
        code: `
<metergroup [value]="value" labelOrientation="vertical"></metergroup>`,
      },
    },
  },
};
