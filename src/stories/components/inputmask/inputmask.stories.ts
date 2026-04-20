import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from '../../../lib/components/inputmask/inputmask.component';
import { InputMaskFloatLabelComponent, FloatLabelStory } from './examples/inputmask-float-label.component';
import { Sizes } from './examples/inputmask-sizes.component';
import { Disabled } from './examples/inputmask-disabled.component';
import { Readonly } from './examples/inputmask-readonly.component';
import { Invalid } from './examples/inputmask-invalid.component';

type InputMaskArgs = InputMaskComponent;

const meta: Meta<InputMaskArgs> = {
  title: 'Components/Form/InputMask',
  component: InputMaskComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        InputMaskComponent,
        FormsModule,
        InputMaskFloatLabelComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-inputmask' },
    docs: {
      description: {
        component: `Компонент текстового ввода по маске. Используется для ввода данных в определённом формате: дата, телефон, серийный номер и т.д.

\`\`\`typescript
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
  },
  argTypes: {
    mask: {
      control: 'text',
      description: 'Маска ввода (9 — цифра, a — буква, * — любой символ)',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    slotChar: {
      control: 'text',
      description: 'Символ-заполнитель для пустых позиций маски',
      table: {
        category: 'Props',
        defaultValue: { summary: "'_'" },
        type: { summary: 'string' },
      },
    },
    unmask: {
      control: 'boolean',
      description: 'Возвращать чистое значение без символов маски',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    autoClear: {
      control: 'boolean',
      description: 'Очищать незавершённое значение при потере фокуса',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showClear: {
      control: 'boolean',
      description: 'Показывает иконку очистки при наличии значения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка при пустом поле',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Визуальный вариант поля',
      table: {
        category: 'Props',
        defaultValue: { summary: "'outlined'" },
        type: { summary: "'outlined' | 'filled'" },
      },
    },
    characterPattern: {
      control: 'text',
      description: 'Регулярное выражение для символов типа a в маске',
      table: {
        category: 'Props',
        defaultValue: { summary: "'[A-Za-z]'" },
        type: { summary: 'string' },
      },
    },
    keepBuffer: {
      control: 'boolean',
      description: 'Сохранять введённые символы при очистке маски',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    autocomplete: {
      control: 'text',
      description: 'Значение атрибута autocomplete для input',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    onTouched: { table: { disable: true } },
    onModelChange: { table: { disable: true } },
    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } },
    onComplete: {
      control: false,
      description: 'Событие завершения ввода маски',
      table: { category: 'Events', type: { summary: 'EventEmitter<void>' } },
    },
    onFocusEvent: {
      control: false,
      description: 'Событие фокуса',
      table: { category: 'Events', type: { summary: 'EventEmitter<Event>' } },
    },
    onBlurEvent: {
      control: false,
      description: 'Событие потери фокуса',
      table: { category: 'Events', type: { summary: 'EventEmitter<Event>' } },
    },
    onInputEvent: {
      control: false,
      description: 'Событие ввода',
      table: { category: 'Events', type: { summary: 'EventEmitter<Event>' } },
    },
    onKeydownEvent: {
      control: false,
      description: 'Событие нажатия клавиши',
      table: { category: 'Events', type: { summary: 'EventEmitter<Event>' } },
    },
    onClearEvent: {
      control: false,
      description: 'Событие очистки поля',
      table: { category: 'Events', type: { summary: 'EventEmitter<void>' } },
    },
  },
  args: {
    mask: '99-99-99',
    slotChar: '_',
    unmask: false,
    autoClear: true,
    showClear: false,
    placeholder: '99-99-99',
    size: 'base',
    disabled: false,
    readonly: false,
    invalid: false,
    fluid: false,
    variant: 'outlined',
  },
};

export default meta;
type Story = StoryObj<InputMaskArgs>;

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.mask) parts.push(`mask="${args.mask}"`);
    if (args.slotChar && args.slotChar !== '_') parts.push(`slotChar="${args.slotChar}"`);
    if (args.unmask) parts.push(`[unmask]="true"`);
    if (!args.autoClear) parts.push(`[autoClear]="false"`);
    if (args.showClear) parts.push(`[showClear]="true"`);
    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.variant && args.variant !== 'outlined') parts.push(`variant="${args.variant}"`);
    parts.push(`[(ngModel)]="value"`);

    const template = `<input-mask\n  ${parts.join('\n  ')}\n></input-mask>`;

    return { props: { ...args, value: '' }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

export { Sizes, FloatLabelStory as FloatLabel, Disabled, Readonly, Invalid };
