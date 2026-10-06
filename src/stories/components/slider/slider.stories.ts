import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraSliderComponent } from '../../../lib/components/slider/slider.component';
import { Range, SliderRangeComponent } from './examples/slider-range.component';
import { SliderStepComponent, Step } from './examples/slider-step.component';
import { SliderVerticalComponent, Vertical } from './examples/slider-vertical.component';
import { Disabled, SliderDisabledComponent } from './examples/slider-disabled.component';

type SliderArgs = ExtraSliderComponent & { disabled: boolean };

const meta: Meta<SliderArgs> = {
  title: 'Components/Form/Slider',
  component: ExtraSliderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraSliderComponent,
        ReactiveFormsModule,
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

Реализовано по спецификации [slider.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/slider.md).

\`\`\`typescript
import { ExtraSliderComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Отключённое состояние управляется через FormControl.`
      }
    },
    designTokens: { prefix: '--p-slider' }
  },
  argTypes: {
    // ── Свойства (docs/components-api/slider.md) ─────────────────
    min: {
      control: 'number',
      description: 'Минимальное значение',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
      }
    },
    max: {
      control: 'number',
      description: 'Максимальное значение',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '100' },
        type: { summary: 'number' }
      }
    },
    step: {
      control: 'number',
      description: 'Шаг изменения значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number | undefined' }
      }
    },
    range: {
      control: 'boolean',
      description: 'Режим выбора диапазона с двумя ползунками',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация слайдера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'horizontal'" },
        type: { summary: "'horizontal' | 'vertical'" }
      }
    },
    animate: {
      control: 'boolean',
      description: 'Анимация прыжка бегунка при клике по шкале',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── Состояния (управляются через FormControl) ───────────────────
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние — управляется через FormControl',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // Hidden props
    ariaLabel: { table: { disable: true } },
    ariaLabelledBy: { table: { disable: true } },
    tabindex: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    control: { table: { disable: true } },
    // ── События ──────────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Срабатывает при каждом изменении значения во время перетаскивания',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraSliderChangeEvent>' }
      }
    },
    onSlideEnd: {
      control: false,
      description: 'Срабатывает после завершения перетаскивания ползунка',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    }
  },
  args: {
    min: 0,
    max: 100,
    step: undefined,
    range: false,
    orientation: 'horizontal',
    animate: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<SliderArgs>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.min !== 0) parts.push(`[min]="${args.min}"`);
    if (args.max !== 100) parts.push(`[max]="${args.max}"`);
    if (args.step !== undefined) parts.push(`[step]="${args.step}"`);
    if (args.range) parts.push(`[range]="true"`);
    if (args.orientation !== 'horizontal') parts.push(`orientation="${args.orientation}"`);
    if (args.animate) parts.push(`[animate]="true"`);

    const control = new FormControl<number | number[]>({ value: args.range ? [20, 80] : 50, disabled: args.disabled }, { nonNullable: true });
    parts.push(`[formControl]="control"`);

    const template = `<extra-slider\n  ${parts.join('\n  ')}\n></extra-slider>`;

    // disabled живёт во FormControl, у компонента нет такого @Input — Storybook ругается в консоль
    // на попытку присвоить его напрямую
    const { disabled, ...rest } = args;

    return { props: { ...rest, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивный слайдер со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled управляется через FormControl.'
      }
    }
  }
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { Range, Step, Vertical, Disabled };
