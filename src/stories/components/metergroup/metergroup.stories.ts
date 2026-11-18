import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraMeterGroupComponent } from '../../../lib/components/metergroup/metergroup.component';
import { defaultValue, iconValue } from './metergroup.data';

type MeterArgs = Partial<ExtraMeterGroupComponent>;

const meta: Meta<MeterArgs> = {
  title: 'Components/Misc/MeterGroup',
  component: ExtraMeterGroupComponent,
  tags: ['autodocs', 'metergroup'],
  decorators: [moduleMetadata({ imports: [ExtraMeterGroupComponent] })],
  parameters: {
    controls: { expanded: true },
    designTokens: { prefix: '--p-metergroup' },
    docs: {
      description: {
        component: `Визуализирует несколько числовых значений в виде единой полосы прогресса с подписями.

\`\`\`typescript
import { ExtraMeterGroupComponent } from '@cdek-it/angular-ui-kit/components/metergroup';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'code',
        transform: () => '<extra-metergroup [value]="value"></extra-metergroup>'
      }
    }
  },
  argTypes: {
    value: { control: 'object', description: 'Массив элементов с полями label, color, value и опционально icon' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'], description: 'Ориентация полосы' },
    labelPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Позиция списка меток относительно полосы'
    },
    labelOrientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация списка меток'
    },
    ariaLabel: { control: 'text', description: 'Подпись диаграммы для скринридеров' },
    ariaLabelledBy: { control: 'text', description: 'id элемента, который подписывает диаграмму' }
  },
  args: { value: defaultValue }
};
export default meta;
type Story = StoryObj<MeterArgs>;

export const Default: Story = {
  args: { value: defaultValue },
  render: (args) => ({ props: args, template: '<extra-metergroup [value]="value"></extra-metergroup>' }),
  parameters: {
    docs: {
      description: { story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.' },
      source: { language: 'html', type: 'code', code: '<extra-metergroup [value]="value"></extra-metergroup>' }
    }
  }
};

export const Horizontal: Story = {
  args: { value: defaultValue },
  render: (args) => ({
    props: args,
    template: '<extra-metergroup [value]="value" orientation="horizontal"></extra-metergroup>'
  }),
  parameters: {
    docs: {
      description: { story: 'Горизонтальная ориентация (по умолчанию).' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-metergroup [value]="value" orientation="horizontal"></extra-metergroup>'
      }
    }
  }
};

export const Vertical: Story = {
  args: { value: defaultValue },
  render: (args) => ({
    props: args,
    template: '<extra-metergroup [value]="value" orientation="vertical"></extra-metergroup>'
  }),
  parameters: {
    docs: {
      description: { story: 'Вертикальная ориентация полосы.' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-metergroup [value]="value" orientation="vertical"></extra-metergroup>'
      }
    }
  }
};

export const Icon: Story = {
  args: { value: iconValue },
  render: (args) => ({ props: args, template: '<extra-metergroup [value]="value"></extra-metergroup>' }),
  parameters: {
    docs: {
      description: { story: 'Элементы с иконками в метках.' },
      source: { language: 'html', type: 'code', code: '<extra-metergroup [value]="value"></extra-metergroup>' }
    }
  }
};

export const LabelStart: Story = {
  args: { value: defaultValue },
  render: (args) => ({
    props: args,
    template: '<extra-metergroup [value]="value" labelPosition="start"></extra-metergroup>'
  }),
  parameters: {
    docs: {
      description: { story: 'Метки расположены над полосой (labelPosition="start").' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-metergroup [value]="value" labelPosition="start"></extra-metergroup>'
      }
    }
  }
};

export const LabelVertical: Story = {
  args: { value: defaultValue },
  render: (args) => ({
    props: args,
    template: '<extra-metergroup [value]="value" labelOrientation="vertical"></extra-metergroup>'
  }),
  parameters: {
    docs: {
      description: { story: 'Метки расположены вертикально (labelOrientation="vertical").' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-metergroup [value]="value" labelOrientation="vertical"></extra-metergroup>'
      }
    }
  }
};
