import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputMaskComponent } from '../../../lib/components/inputmask/inputmask.component';
import { InputMaskLabelsComponent, Labels } from './examples/inputmask-labels.component';
import { InputMaskSizesComponent, Sizes } from './examples/inputmask-sizes.component';
import { InputMaskClearableComponent, Clearable } from './examples/inputmask-clearable.component';
import { InputMaskStatesComponent, States } from './examples/inputmask-states.component';
import { InputMaskFluidComponent, Fluid } from './examples/inputmask-fluid.component';
import { InputMaskReactiveFormsComponent, ReactiveForms } from './examples/inputmask-reactive-forms.component';

type InputMaskArgs = ExtraInputMaskComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<InputMaskArgs> = {
  title: 'Components/Form/InputMask',
  component: ExtraInputMaskComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraInputMaskComponent,
        ReactiveFormsModule,
        InputMaskLabelsComponent,
        InputMaskSizesComponent,
        InputMaskClearableComponent,
        InputMaskStatesComponent,
        InputMaskFluidComponent,
        InputMaskReactiveFormsComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-inputmask' },
    docs: {
      description: {
        component: `Поле ввода по маске. Используется для данных в фиксированном формате: дата, телефон, серийный номер и т.д.

Реализовано по спецификации [inputmask.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/inputmask.md).

\`\`\`typescript
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/inputmask.md) ───────────────
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
      description: 'Плавающий лейбл внутри поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    mask: {
      control: 'text',
      description: 'Маска ввода (9 — цифра, a — буква, * — цифра или буква)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    slotChar: {
      control: 'text',
      description: 'Символ-заполнитель маски',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'_'" },
        type: { summary: 'string' }
      }
    },
    unmask: {
      control: 'boolean',
      description: 'Возвращать значение без маски (raw), а не отформатированное',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    autoClear: {
      control: 'boolean',
      description: 'Очищать поле при неполном вводе (на blur)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
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
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
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
      description: 'Срабатывает при очистке поля иконкой × (только при clearable)',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onFocus: {
      control: false,
      description: 'Срабатывает при фокусе',
      table: { category: 'События', type: { summary: 'EventEmitter<Event>' } }
    },
    onBlur: {
      control: false,
      description: 'Срабатывает при потере фокуса',
      table: { category: 'События', type: { summary: 'EventEmitter<Event>' } }
    },
    // Hidden computed props
    control: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    fieldClass: { table: { disable: true } },
    fieldPlaceholder: { table: { disable: true } },
    inputId: { table: { disable: true } },
    handleBlur: { table: { disable: true } },
    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } }
  },
  args: {
    placeholder: '(___) ___-____',
    label: '',
    labelPosition: 'top',
    floatLabel: false,
    mask: '(999) 999-9999',
    slotChar: '_',
    unmask: false,
    autoClear: true,
    clearable: false,
    caption: '',
    info: '',
    size: 'base',
    fluid: false,
    readonly: false,
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<InputMaskArgs>;

// ── Default (интерактивная) ──────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.mask) parts.push(`mask="${args.mask}"`);
    if (args.slotChar && args.slotChar !== '_') parts.push(`slotChar="${args.slotChar}"`);
    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'top') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.floatLabel) parts.push(`[floatLabel]="true"`);
    if (args.unmask) parts.push(`[unmask]="true"`);
    if (!args.autoClear) parts.push(`[autoClear]="false"`);
    if (args.clearable) parts.push(`clearable`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.info) parts.push(`info="${args.info}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.readonly) parts.push(`[readonly]="true"`);

    const validators = args.invalid ? [Validators.required] : [];
    const control = new FormControl({ value: '', disabled: args.disabled }, validators);

    const template = `<extra-input-mask [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-input-mask>`;

    // В props уходит только control: все остальные args уже зашиты в template.
    // Storybook присваивает «не-@Input» пропсы прямо на инстанс ExtraInputMaskComponent
    // (StorybookWrapperComponent.ngAfterViewInit), а invalid у него — геттер из NgControl,
    // поэтому ...args ронял стори с TypeError: Cannot set property invalid ... only a getter.
    return { props: { control }, template };
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

export { Labels, Sizes, Clearable, States, Fluid, ReactiveForms };
