import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fn } from 'storybook/test';
import { ExtraSliderComponent, ExtraSliderChangeEvent } from '../../../lib/components/slider/slider.component';

type SliderArgs = Omit<Partial<ExtraSliderComponent>, 'onChange' | 'onSlideEnd'> & {
  disabled: boolean;
  value: number | number[];
  onChange: (event: ExtraSliderChangeEvent) => void;
  onSlideEnd: () => void;
};

const templateFor = (args: SliderArgs): string => {
  const parts = ['[formControl]="sliderControl"'];
  if (args.min !== 0) parts.push('[min]="' + args.min + '"');
  if (args.max !== 100) parts.push('[max]="' + args.max + '"');
  if (args.step != null) parts.push('[step]="' + args.step + '"');
  if (args.range) parts.push('[range]="true"');
  if (args.orientation && args.orientation !== 'horizontal') parts.push('orientation="' + args.orientation + '"');
  if (args.animate) parts.push('[animate]="true"');
  if (args.required) parts.push('[required]="true"');
  if (args.autofocus) parts.push('[autofocus]="true"');
  if (args.tabindex !== 0) parts.push('[tabindex]="' + args.tabindex + '"');
  if (args.ariaLabel) parts.push('ariaLabel="' + args.ariaLabel + '"');
  if (args.ariaLabelledBy) parts.push('ariaLabelledBy="' + args.ariaLabelledBy + '"');
  parts.push('(onChange)="onChange($event)"', '(onSlideEnd)="onSlideEnd()"');
  const height = args.orientation === 'vertical' ? ' style="height: 200px"' : '';
  return '<extra-slider\n  ' + parts.join('\n  ') + '\n' + height + '></extra-slider>';
};

const meta: Meta<SliderArgs> = {
  title: 'Components/Form/Slider',
  component: ExtraSliderComponent,
  tags: ['autodocs', 'slider'],
  decorators: [moduleMetadata({ imports: [ExtraSliderComponent, ReactiveFormsModule] })],
  parameters: {
    docs: {
      description: {
        component: `Слайдер позволяет выбрать числовое значение или диапазон путём перемещения ползунка.

\`\`\`typescript
import { ExtraSliderComponent } from '@cdek-it/angular-ui-kit/components/slider';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Отключённое состояние управляется через FormControl.`
      },
      source: {
        language: 'html',
        type: 'code',
        transform: (_code: string, context: { args: SliderArgs }) => templateFor(context.args)
      }
    },
    designTokens: { prefix: '--p-slider' }
  },
  render: (args) => ({
    props: {
      ...args,
      sliderControl: new FormControl<number | number[]>(
        { value: args.value, disabled: args.disabled },
        { nonNullable: true }
      )
    },
    template: templateFor(args)
  }),
  argTypes: {
    min: { control: 'number', description: 'Минимальное значение' },
    max: { control: 'number', description: 'Максимальное значение' },
    step: {
      control: 'number',
      description: 'Шаг изменения значения',
      table: { defaultValue: { summary: 'undefined' }, type: { summary: 'number | undefined' } }
    },
    range: { control: 'boolean', description: 'Режим выбора диапазона с двумя ползунками' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация слайдера'
    },
    animate: { control: 'boolean', description: 'Анимация прыжка бегунка при клике по шкале' },
    disabled: { control: 'boolean', description: 'Отключённое состояние — управляется через FormControl' },
    ariaLabel: {
      control: 'text',
      description: 'Метка для программ экранного доступа — задавайте её всегда, иначе у слайдера нет доступного имени'
    },
    ariaLabelledBy: { control: 'text' },
    tabindex: { control: 'number' },
    autofocus: { control: 'boolean' },
    required: { control: 'boolean' },
    value: { control: 'object' },
    onChange: { control: false, description: 'Срабатывает при каждом изменении значения во время перетаскивания' },
    onSlideEnd: { control: false, description: 'Срабатывает после завершения перетаскивания ползунка' }
  },
  args: {
    min: 0,
    max: 100,
    step: undefined,
    range: false,
    orientation: 'horizontal',
    animate: false,
    ariaLabel: 'Громкость',
    ariaLabelledBy: undefined,
    tabindex: 0,
    autofocus: false,
    required: false,
    disabled: false,
    value: 50,
    onChange: fn(),
    onSlideEnd: fn()
  }
};
export default meta;
type Story = StoryObj<SliderArgs>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный слайдер со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled управляется через FormControl.'
      }
    }
  }
};

export const Disabled: Story = {
  args: { disabled: true, value: 30 },
  parameters: {
    docs: { description: { story: 'Слайдер в отключённом состоянии — управляется через FormControl.' } }
  }
};

export const Range: Story = {
  args: { range: true, value: [20, 80], ariaLabel: 'Диапазон цены' },
  parameters: {
    docs: {
      description: { story: 'Выбор диапазона значений с двумя ползунками. Модель — массив `[from, to]`.' }
    }
  }
};

export const Vertical: Story = {
  args: { orientation: 'vertical', ariaLabel: 'Яркость' },
  parameters: {
    docs: {
      description: {
        story: 'Слайдер с вертикальной ориентацией — высота задаётся на `<extra-slider>`.'
      }
    }
  }
};
