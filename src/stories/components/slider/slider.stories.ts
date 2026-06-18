import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraSliderComponent as SliderComponent } from '../../../lib/components/slider/slider.component';
import { Range, SliderRangeComponent } from './examples/slider-range.component';
import { SliderStepComponent, Step } from './examples/slider-step.component';
import { SliderVerticalComponent, Vertical } from './examples/slider-vertical.component';
import { Disabled, SliderDisabledComponent } from './examples/slider-disabled.component';

const meta: Meta<SliderComponent> = {
  title: 'Components/Form/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        SliderComponent,
        SliderRangeComponent,
        SliderStepComponent,
        SliderVerticalComponent,
        SliderDisabledComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Слайдер позволяет выбрать числовое значение или диапазон путём перемещения ползунка.

\`\`\`typescript
import { ExtraSliderComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-slider' }
  },
  argTypes: {
    min: {
      control: 'number',
      description: 'Минимальное значение',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
      }
    },
    max: {
      control: 'number',
      description: 'Максимальное значение',
      table: {
        category: 'Props',
        defaultValue: { summary: '100' },
        type: { summary: 'number' }
      }
    },
    step: {
      control: 'number',
      description: 'Шаг изменения значения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number | undefined' }
      }
    },
    range: {
      control: 'boolean',
      description: 'Режим выбора диапазона с двумя ползунками',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация слайдера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие с компонентом',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    onSlideEnd: {
      control: false,
      description: 'Событие завершения перетаскивания ползунка',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<SliderSlideEndEvent>' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SliderComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.min !== 0) parts.push(`[min]="${args.min}"`);
    if (args.max !== 100) parts.push(`[max]="${args.max}"`);
    if (args.step !== undefined) parts.push(`[step]="${args.step}"`);
    if (args.range) parts.push(`[range]="true"`);
    if (args.orientation !== 'horizontal') parts.push(`orientation="${args.orientation}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);

    const template = parts.length
      ? `<extra-slider\n  ${parts.join('\n  ')}\n></extra-slider>`
      : `<extra-slider></extra-slider>`;

    return { props: args, template };
  },
  args: {
    min: 0,
    max: 100,
    step: undefined,
    range: false,
    orientation: 'horizontal',
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

// ── Re-exports from example components ────────────────────────────────────
export { Range, Step, Vertical, Disabled };
