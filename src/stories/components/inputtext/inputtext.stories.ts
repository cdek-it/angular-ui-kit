import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputTextComponent } from '../../../lib/components/inputtext/inputtext.component';
import { InputTextClearableComponent, Clearable } from './examples/inputtext-clearable.component';
import { InputTextLabelsComponent, Labels } from './examples/inputtext-labels.component';
import { InputTextSizesComponent, Sizes } from './examples/inputtext-sizes.component';
import { InputTextStatesComponent, States } from './examples/inputtext-states.component';
import { InputTextTypesComponent, Types } from './examples/inputtext-types.component';
import { InputTextFluidComponent, Fluid } from './examples/inputtext-fluid.component';
import { InputTextReactiveFormsComponent, ReactiveForms } from './examples/inputtext-reactive-forms.component';

type InputTextArgs = ExtraInputTextComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<InputTextArgs> = {
  title: 'Components/Form/InputText',
  component: ExtraInputTextComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraInputTextComponent,
        ReactiveFormsModule,
        InputTextLabelsComponent,
        InputTextSizesComponent,
        InputTextClearableComponent,
        InputTextTypesComponent,
        InputTextStatesComponent,
        InputTextFluidComponent,
        InputTextReactiveFormsComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Текстовое поле для ввода данных.

Реализовано по спецификации [inputtext.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/inputtext.md).

\`\`\`typescript
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/inputtext.md) ───────────────
    placeholder: {
      control: 'text',
      description: 'Текст подсказки внутри поля',
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
        defaultValue: { summary: 'top' },
        type: { summary: "'top' | 'left'" }
      }
    },
    floatLabel: {
      control: 'boolean',
      description: 'Плавающий лейбл внутри поля (перекрывает labelPosition)',
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
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'Тип поля input',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'text' },
        type: { summary: "'text' | 'password'" }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Только чтение; очистка поля недоступна',
      table: { category: 'Свойства', defaultValue: { summary: 'false' }, type: { summary: 'boolean' } }
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
    maxLength: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Максимальное количество символов',
      table: { category: 'Свойства', type: { summary: 'number' } }
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
    // ── Состояния (управляются через FormControl) ────────────────
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние — управляется через FormControl',
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
    // ── События ───────────────────────────────────────────────────
    onClear: {
      control: false,
      description: 'Срабатывает при очистке поля иконкой × (только при clearable)',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    // Hidden computed props
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    inputId: { table: { disable: true } }
  },
  args: {
    placeholder: 'Введите текст...',
    label: '',
    labelPosition: 'top',
    floatLabel: false,
    clearable: false,
    caption: '',
    info: '',
    size: 'base',
    fluid: false,
    type: 'text',
    readonly: false,
    required: false,
    name: undefined,
    autocomplete: undefined,
    maxLength: undefined,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<InputTextArgs>;

// ── Default (интерактивная) ──────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.placeholder) parts.push('[placeholder]="placeholder"');
    if (args.label) parts.push('[label]="label"');
    if (args.labelPosition && args.labelPosition !== 'top') parts.push('[labelPosition]="labelPosition"');
    if (args.floatLabel) parts.push('[floatLabel]="floatLabel"');
    if (args.clearable) parts.push('[clearable]="clearable"');
    if (args.caption) parts.push('[caption]="caption"');
    if (args.info) parts.push('[info]="info"');
    if (args.size && args.size !== 'base') parts.push('[size]="size"');
    if (args.fluid) parts.push('[fluid]="fluid"');
    if (args.type && args.type !== 'text') parts.push('[type]="type"');
    if (args.readonly) parts.push('[readonly]="readonly"');
    if (args.required) parts.push('[required]="required"');
    if (args.name) parts.push('[name]="name"');
    if (args.autocomplete) parts.push('[autocomplete]="autocomplete"');
    if (args.maxLength != null) parts.push('[maxLength]="maxLength"');
    if (args.ariaLabel) parts.push('[ariaLabel]="ariaLabel"');
    if (args.ariaLabelledBy) parts.push('[ariaLabelledBy]="ariaLabelledBy"');
    if (args.autofocus) parts.push('[autofocus]="autofocus"');
    if (args.tabindex != null) parts.push('[tabindex]="tabindex"');

    const validators = args.invalid ? [Validators.required] : [];
    const control = new FormControl({ value: '', disabled: args.disabled }, validators);

    const template = `<extra-input-text [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-input-text>`;

    // invalid — геттер компонента, disabled меняется через CVA: передаём эти состояния только форме.
    const { disabled, invalid, ...inputs } = args;
    return { props: { ...inputs, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивное поле со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

// ── Комбинаторные истории ────────────────────────────────────────────────────

export { Labels, Sizes, Clearable, Types, States, Fluid, ReactiveForms };
