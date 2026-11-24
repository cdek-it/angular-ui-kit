import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fn } from 'storybook/test';
import { ExtraInputNumberComponent } from '../../../lib/components/inputnumber/inputnumber.component';
const INPUTS = [
  'placeholder',
  'label',
  'labelPosition',
  'floatLabel',
  'clearable',
  'caption',
  'captionSeverity',
  'info',
  'size',
  'showButtons',
  'buttonLayout',
  'mode',
  'currency',
  'locale',
  'readonly',
  'fluid',
  'min',
  'max',
  'step',
  'prefix',
  'suffix',
  'minFractionDigits',
  'maxFractionDigits',
  'useGrouping',
  'incrementButtonIcon',
  'decrementButtonIcon',
  'required',
  'name',
  'autocomplete',
  'ariaLabel',
  'ariaLabelledBy',
  'autofocus',
  'tabindex'
] as const;
type NumberArgs = Pick<
  ExtraInputNumberComponent,
  (typeof INPUTS)[number] | 'onInput' | 'onClear' | 'modelValue' | 'inputSizeClass' | 'sizeClass' | 'inputId'
> & { value: number | null; disabled: boolean; invalid: boolean };
type RenderArgs = Partial<Pick<NumberArgs, (typeof INPUTS)[number] | 'value' | 'disabled' | 'invalid'>>;
function source(args: RenderArgs) {
  const parts = ['[formControl]="control"'];
  const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  for (const key of INPUTS) {
    const value = args[key];
    if (value === undefined) continue;
    if (typeof value === 'string') parts.push(key + '="' + escape(value) + '"');
    else parts.push('[' + key + ']="' + value + '"');
  }
  return '<extra-input-number\n  ' + parts.join('\n  ') + '\n></extra-input-number>';
}
const meta: Meta<NumberArgs> = {
  title: 'Components/Form/InputNumber',
  component: ExtraInputNumberComponent,
  tags: ['autodocs', 'inputnumber'],
  decorators: [moduleMetadata({ imports: [ExtraInputNumberComponent, ReactiveFormsModule] })],
  render: (args) => {
    const control = new FormControl<number | null>(
      { value: args.value ?? null, disabled: !!args.disabled },
      args.invalid ? () => ({ storyInvalid: true }) : []
    );
    if (args.invalid) control.markAsTouched();
    return {
      props: {
        ...Object.fromEntries(INPUTS.map((k) => [k, args[k]])),
        control,
        onInput: args.onInput,
        onClear: args.onClear
      },
      template:
        '<extra-input-number [formControl]="control" ' +
        INPUTS.map((k) => '[' + k + ']="' + k + '"').join(' ') +
        ' (onInput)="onInput($event)" (onClear)="onClear()"></extra-input-number>'
    };
  },
  parameters: {
    designTokens: { prefix: '--p-inputnumber' },
    docs: {
      description: {
        component: `Числовое поле ввода с поддержкой форматирования, валюты, кнопок увеличения/уменьшения и встроенных label/caption/info.

\`\`\`typescript
import { ExtraInputNumberComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_code: string, context: { args: RenderArgs }) => source(context.args)
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
      if: { arg: 'floatLabel', truthy: false },
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'top'" },
        type: { summary: "'top' | 'left'" }
      }
    },
    floatLabel: {
      control: 'boolean',
      description: 'Плавающий лейбл внутри поля; несовместим со `showButtons`',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Отображение иконки для очистки поля',
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
    captionSeverity: {
      control: 'select',
      options: ['base', 'success', 'warning', 'danger', 'info'],
      description: 'Вариант подписи (цвет и иконка)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'base' },
        type: { summary: "'base' | 'success' | 'warning' | 'danger' | 'info'" }
      }
    },
    required: {
      control: 'boolean',
      description: 'Пустое поле делает FormControl невалидным',
      table: { category: 'Свойства', defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
    },
    name: {
      control: 'text',
      description: 'Имя поля для браузерного автозаполнения',
      table: { category: 'Свойства', type: { summary: 'string' } }
    },
    autocomplete: {
      control: 'text',
      description: 'Значение нативного атрибута autocomplete',
      table: { category: 'Свойства', type: { summary: 'string' } }
    },
    incrementButtonIcon: {
      control: 'text',
      description: 'CSS-класс иконки увеличения (при showButtons)',
      table: { category: 'Кнопки', type: { summary: 'string' } }
    },
    decrementButtonIcon: {
      control: 'text',
      description: 'CSS-класс иконки уменьшения (при showButtons)',
      table: { category: 'Кнопки', type: { summary: 'string' } }
    },
    ariaLabel: {
      control: 'text',
      description: 'Метка для программ экранного доступа',
      table: { category: 'Дополнительно', type: { summary: 'string' } }
    },
    ariaLabelledBy: {
      control: 'text',
      description: 'ID внешнего элемента-метки',
      table: { category: 'Дополнительно', type: { summary: 'string' } }
    },
    autofocus: {
      control: 'boolean',
      description: 'Автофокус при монтировании поля',
      table: { category: 'Дополнительно', defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
    },
    tabindex: {
      control: { type: 'number', step: 1 },
      description: 'Порядок перехода по Tab',
      table: { category: 'Дополнительно', type: { summary: 'number' } }
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
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    showButtons: {
      control: 'boolean',
      if: { arg: 'floatLabel', truthy: false },
      description: 'Отображает кнопки увеличения/уменьшения; недоступно при `floatLabel: true`',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    buttonLayout: {
      control: 'select',
      if: { arg: 'showButtons', truthy: true },
      options: ['stacked', 'horizontal', 'vertical'],
      description: 'Расположение кнопок',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'stacked'" },
        type: { summary: "'stacked' | 'horizontal' | 'vertical'" }
      }
    },
    mode: {
      control: 'select',
      options: ['decimal', 'currency'],
      description: 'Режим форматирования',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'decimal'" },
        type: { summary: "'decimal' | 'currency'" }
      }
    },
    currency: {
      control: 'text',
      description: 'ISO 4217 код валюты (при `mode="currency"`)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    locale: {
      control: 'text',
      description: 'Локаль для форматирования',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
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
    min: {
      control: 'number',
      description: 'Минимальное значение',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    max: {
      control: 'number',
      description: 'Максимальное значение',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    step: {
      control: 'number',
      description: 'Шаг изменения значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '1' },
        type: { summary: 'number' }
      }
    },
    useGrouping: {
      control: 'boolean',
      description: 'Использовать разделитель групп разрядов',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    prefix: {
      control: 'text',
      description: 'Текст перед значением',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    suffix: {
      control: 'text',
      description: 'Текст после значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    minFractionDigits: {
      control: 'number',
      description: 'Минимальное количество знаков после запятой',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    maxFractionDigits: {
      control: 'number',
      description: 'Максимальное количество знаков после запятой',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    // ── Состояния (управляются через FormControl) ─────────────
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие — управляется через FormControl',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — вычисляется из NgControl (Validators)',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // Hidden computed props
    modelValue: { table: { disable: true }, description: 'Текущее значение поля (для formControl)' },
    inputSizeClass: { table: { disable: true }, description: 'CSS-класс нативного input — под размер поля' },
    sizeClass: { table: { disable: true }, description: 'CSS-класс корневого элемента — под размер поля' },
    inputId: { table: { disable: true }, description: 'id нативного input — для связки с внешним <label>' },

    // ── События ────────────────────────────────────────────────
    onInput: {
      control: false,
      description: 'Срабатывает при вводе значения',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraInputNumberInputEvent>' }
      }
    },
    onClear: {
      control: false,
      description: 'Срабатывает при очистке значения (иконка `clearable`)',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    value: { control: 'number', description: 'Значение поля ввода числа' }
  },
  args: {
    ...{
      placeholder: 'Введите число...',
      label: '',
      labelPosition: 'top',
      floatLabel: false,
      clearable: false,
      caption: '',
      captionSeverity: 'base',
      required: true,
      name: undefined,
      autocomplete: undefined,
      incrementButtonIcon: undefined,
      decrementButtonIcon: undefined,
      ariaLabel: undefined,
      ariaLabelledBy: undefined,
      autofocus: false,
      tabindex: undefined,
      info: '',
      size: 'base',
      showButtons: false,
      buttonLayout: 'stacked',
      mode: 'decimal',
      disabled: false,
      invalid: false,
      readonly: false,
      fluid: false,
      step: 1,
      useGrouping: true
    },
    placeholder: 'Placeholder',
    label: 'Label',
    caption: 'Caption',
    info: 'Info',
    size: 'small',
    buttonLayout: 'horizontal',
    value: null,
    onInput: fn(),
    onClear: fn()
  }
};
export default meta;
type Story = StoryObj<NumberArgs>;
export const Default: Story = {
  name: 'Default',
  args: {},
  parameters: {
    docs: {
      description: { story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.' }
    }
  }
};
export const Buttons: Story = {
  name: 'Buttons',
  args: { showButtons: true },
  parameters: {
    docs: {
      description: {
        story:
          'Числовое поле с кнопками увеличения/уменьшения в горизонтальной раскладке. Кастомные SVG-иконки +/− используются по умолчанию.'
      }
    }
  }
};
export const FloatLabel: Story = {
  name: 'FloatLabel',
  args: { floatLabel: true, label: 'FloatLabel' },
  parameters: {
    docs: {
      description: {
        story:
          'Плавающая метка внутри поля через `[floatLabel]="true"` — обёртка сама рисует `p-floatlabel` и лейбл, ничего дополнительно оборачивать не нужно. Несовместимо с `showButtons` (кнопки будут скрыты).'
      }
    }
  }
};
export const Clearable: Story = {
  name: 'Clearable',
  args: { clearable: true, value: 42 },
  parameters: {
    docs: {
      description: {
        story:
          'Поле с иконкой очистки (clearable) — соответствует PrimeNG `showClear`. Иконка появляется только при наличии значения.'
      }
    }
  }
};
export const Currency: Story = {
  name: 'Currency',
  args: { mode: 'currency', currency: 'RUB', locale: 'ru-RU', value: 1234.5 },
  parameters: {
    docs: {
      description: {
        story:
          'Форматирование значения как валюты через `suffix`. Режим `mode="currency"` не используется из-за известного бага PrimeNG с кареткой.'
      }
    }
  }
};
export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  parameters: {
    docs: { description: { story: 'Отключённое состояние — поле и кнопки недоступны для взаимодействия.' } }
  }
};
export const Error: Story = { name: 'Error', args: { invalid: true, captionSeverity: 'danger' } };
export const Readonly: Story = { name: 'Readonly', args: { readonly: true, value: 42 },
  parameters: {
    docs: {
      description: {
        story:
          'Readonly не подсвечивается при наведении, но остаётся фокусируемым: значение можно выделить и скопировать, а клавиатурный пользователь видит, где находится. Поэтому focus-ring сохраняется (WCAG 2.4.7).'
      }
    }
  }
};
export const LabelLeft: Story = {
  name: 'LabelLeft',
  args: { labelPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story:
          'Положения лейбла (labelPosition): top — сверху (по умолчанию), left — слева от поля; floatLabel — плавающий лейбл внутри поля (несовместим с showButtons). Info показывается иконкой ti-info-circle с тултипом, caption — пояснение под полем.'
      }
    }
  }
};
export const WithoutLabel: Story = { name: 'WithoutLabel', args: { label: '', caption: '', info: '' } };
export const Fluid: Story = { name: 'Fluid', args: { fluid: true } };
