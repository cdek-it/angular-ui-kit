import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputMaskComponent } from '../../../lib/components/inputmask/inputmask.component';
import { FloatLabelStory, InputMaskFloatLabelComponent } from './examples/inputmask-float-label.component';
import { InputMaskLabelsComponent, Labels } from './examples/inputmask-labels.component';
import { InputMaskClearableComponent, Clearable } from './examples/inputmask-clearable.component';
import { Sizes } from './examples/inputmask-sizes.component';
import { Disabled } from './examples/inputmask-disabled.component';
import { Readonly } from './examples/inputmask-readonly.component';
import { Invalid } from './examples/inputmask-invalid.component';

type InputMaskArgs = ExtraInputMaskComponent;

const meta: Meta<InputMaskArgs> = {
  title: 'Components/Form/InputMask',
  component: ExtraInputMaskComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraInputMaskComponent,
        FormsModule,
        ReactiveFormsModule,
        InputMaskFloatLabelComponent,
        InputMaskLabelsComponent,
        InputMaskClearableComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-inputmask' },
    docs: {
      description: {
        component: `Компонент текстового ввода по маске. Используется для ввода данных в определённом формате: дата, телефон, серийный номер и т.д. Поддерживает встроенные label/caption/info.

Реализован по спецификации \`docs/components-api/inputmask.md\`.

\`\`\`typescript
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства ─────────────────────────────────────────────
    placeholder: {
      control: 'text',
      description: 'Подсказка при пустом поле',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    label: {
      control: 'text',
      description: 'Текст названия поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'top'" },
        type: { summary: "'top' | 'left'" }
      }
    },
    floatLabel: {
      control: 'boolean',
      description: 'Плавающий лейбл внутри поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    mask: {
      control: 'text',
      description: 'Маска ввода (9 — цифра, a — буква, * — любой символ)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    slotChar: {
      control: 'text',
      description: 'Символ-заполнитель для пустых позиций маски',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'_'" },
        type: { summary: 'string' }
      }
    },
    unmask: {
      control: 'boolean',
      description: 'Возвращать чистое значение без символов маски',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    autoClear: {
      control: 'boolean',
      description: 'Очищать незавершённое значение при потере фокуса',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Показывает иконку очистки при наличии значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    caption: {
      control: 'text',
      description: 'Текст пояснения под полем',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    info: {
      control: 'text',
      description: 'Текст с доп. информацией (показывается в тултипе иконки ti-info-circle)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'] as const,
      description: 'Размер поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    characterPattern: {
      control: 'text',
      description: 'Регулярное выражение для символов типа a в маске',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'[A-Za-z]'" },
        type: { summary: 'string' }
      }
    },
    keepBuffer: {
      control: 'boolean',
      description: 'Сохранять введённые символы при очистке маски',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    autocomplete: {
      control: 'text',
      description: 'Значение атрибута autocomplete для input',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    // Hidden computed/internal members
    control: { table: { disable: true } },
    invalid: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    inputId: { table: { disable: true } },
    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } },
    handleBlur: { table: { disable: true } },
    // ── События ────────────────────────────────────────────────
    onComplete: {
      control: false,
      description: 'Срабатывает при полном заполнении маски',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onInput: {
      control: false,
      description: 'Срабатывает при вводе значения',
      table: { category: 'События', type: { summary: 'EventEmitter<Event>' } }
    },
    onClear: {
      control: false,
      description: 'Срабатывает при очистке значения (иконка `clearable`)',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onFocus: {
      control: false,
      description: 'Срабатывает при получении фокуса',
      table: { category: 'События', type: { summary: 'EventEmitter<Event>' } }
    },
    onBlur: {
      control: false,
      description: 'Срабатывает при потере фокуса',
      table: { category: 'События', type: { summary: 'EventEmitter<Event>' } }
    }
  },
  args: {
    placeholder: '99-99-99',
    label: '',
    labelPosition: 'top',
    floatLabel: false,
    mask: '99-99-99',
    slotChar: '_',
    unmask: false,
    autoClear: true,
    clearable: false,
    caption: '',
    info: '',
    size: 'base',
    readonly: false,
    fluid: false
  }
};

export default meta;
type Story = StoryObj<InputMaskArgs>;

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.mask) parts.push(`mask="${args.mask}"`);
    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'top') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.floatLabel) parts.push(`[floatLabel]="true"`);
    if (args.slotChar && args.slotChar !== '_') parts.push(`slotChar="${args.slotChar}"`);
    if (args.unmask) parts.push(`[unmask]="true"`);
    if (!args.autoClear) parts.push(`[autoClear]="false"`);
    if (args.clearable) parts.push(`[clearable]="true"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.info) parts.push(`info="${args.info}"`);
    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    parts.push(`[formControl]="control"`);

    const template = `<extra-input-mask\n  ${parts.join('\n  ')}\n></extra-input-mask>`;

    return { props: { ...args, control: new FormControl('') }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

export { Sizes, FloatLabelStory as FloatLabel, Disabled, Readonly, Invalid, Labels, Clearable };
