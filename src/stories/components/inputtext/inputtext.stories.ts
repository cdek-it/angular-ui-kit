import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputTextComponent } from '../../../lib/components/inputtext/inputtext.component';
import { InputTextReactiveFormsComponent, ReactiveForms } from './examples/inputtext-reactive-forms.component';

type InputTextArgs = ExtraInputTextComponent & { disabled: boolean; invalid: boolean; value: string };

const meta: Meta<InputTextArgs> = {
  title: 'Components/Form/InputText',
  component: ExtraInputTextComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraInputTextComponent, ReactiveFormsModule, InputTextReactiveFormsComponent]
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
      options: ['default', 'float', 'left'],
      description: 'Положение лейбла: сверху, плавающий внутри поля или слева',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'float' | 'left'" }
      }
    },
    requiredMark: {
      control: 'boolean',
      description: 'Маркер «*» перед лейблом (только визуальный)',
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
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения: значение видно и выделяется, но не редактируется',
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
      description: 'Вариант подписи под полем: меняет цвет и иконку',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'base' | 'success' | 'warning' | 'danger' | 'info'" }
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
    value: {
      control: 'text',
      description: 'Значение FormControl',
      table: {
        category: 'Состояния',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
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
    placeholder: 'Placeholder',
    label: 'Label',
    labelPosition: 'default',
    requiredMark: true,
    clearable: false,
    readonly: false,
    caption: 'Caption',
    captionSeverity: 'base',
    info: 'Info',
    size: 'base',
    fluid: false,
    type: 'text',
    required: false,
    name: undefined,
    autocomplete: undefined,
    maxLength: undefined,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    disabled: false,
    invalid: false,
    value: ''
  }
};

export default meta;
type Story = StoryObj<InputTextArgs>;

// ── Один рендер компонента ───────────────────────────────────────────────────
// Каждая сторис — пресет варианта Figma (comp-json/FORM/InputText/STORIES.md): в args задана
// только её ось, остальное равно варианту Figma по умолчанию и меняется в Controls.
const renderInputText = (args: Partial<Omit<InputTextArgs, 'onClear'>>) => {
  const parts: string[] = [];

  if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
  if (args.label) parts.push(`label="${args.label}"`);
  if (args.labelPosition && args.labelPosition !== 'default') parts.push(`labelPosition="${args.labelPosition}"`);
  if (args.requiredMark) parts.push(`[requiredMark]="true"`);
  if (args.clearable) parts.push(`clearable`);
  if (args.readonly) parts.push(`readonly`);
  if (args.caption) parts.push(`caption="${args.caption}"`);
  if (args.captionSeverity && args.captionSeverity !== 'base') parts.push(`captionSeverity="${args.captionSeverity}"`);
  if (args.info) parts.push(`info="${args.info}"`);
  if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
  if (args.fluid) parts.push(`[fluid]="true"`);
  if (args.type && args.type !== 'text') parts.push(`type="${args.type}"`);
  if (args.required) parts.push(`required`);
  if (args.name) parts.push(`name="${args.name}"`);
  if (args.autocomplete) parts.push(`autocomplete="${args.autocomplete}"`);
  if (args.maxLength != null) parts.push(`[maxLength]="${args.maxLength}"`);
  if (args.ariaLabel) parts.push(`ariaLabel="${args.ariaLabel}"`);
  if (args.ariaLabelledBy) parts.push(`ariaLabelledBy="${args.ariaLabelledBy}"`);
  if (args.autofocus) parts.push(`autofocus`);
  if (args.tabindex != null) parts.push(`[tabindex]="${args.tabindex}"`);

  const validators = args.invalid ? [Validators.required] : [];
  const control = new FormControl(
    { value: args.invalid ? '' : (args.value ?? ''), disabled: !!args.disabled },
    validators
  );

  const template = `<extra-input-text [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-input-text>`;

  // В props уходит только control: Storybook присваивает «не-@Input» пропсы прямо на инстанс,
  // а invalid у компонента — геттер из NgControl, и присваивание роняет сторис с TypeError.
  return { props: { control }, template };
};

export const Default: Story = {
  name: 'Default',
  render: (args) => renderInputText(args),
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивное поле со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      },
      source: {
        language: 'html',
        code: `<extra-input-text
  [formControl]="control"
  label="Label"
  [requiredMark]="true"
  info="Info"
  caption="Caption"
  placeholder="Placeholder"
></extra-input-text>`
      }
    }
  }
};

export const Error: Story = {
  name: 'Error',
  args: { invalid: true },
  render: (args) => renderInputText(args),
  parameters: {
    docs: {
      description: {
        story:
          'Невалидное состояние: invalid вычисляется из NgControl автоматически (Validators), красная рамка появляется без отдельного пропа.'
      },
      source: {
        language: 'html',
        code: `<extra-input-text [formControl]="control" label="Label" caption="Caption"></extra-input-text>`
      }
    }
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => renderInputText(args),
  parameters: {
    docs: {
      description: { story: 'Отключённое состояние управляется через FormControl: disable() / enable().' },
      source: {
        language: 'html',
        code: `<extra-input-text [formControl]="control" label="Label"></extra-input-text>`
      }
    }
  }
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { readonly: true },
  render: (args) => renderInputText(args),
  parameters: {
    docs: {
      description: { story: 'Режим только для чтения (readonly): значение видно и выделяется, но не редактируется.' },
      source: {
        language: 'html',
        code: `<extra-input-text [formControl]="control" label="Label" readonly></extra-input-text>`
      }
    }
  }
};

export const FloatLabel: Story = {
  name: 'FloatLabel',
  args: { labelPosition: 'float', label: 'FloatLabel' },
  render: (args) => renderInputText(args),
  parameters: {
    docs: {
      description: {
        story:
          'Плавающий лейбл (labelPosition="float"): в покое лежит внутри поля, при фокусе и наличии значения поднимается вверх и уменьшается.'
      },
      source: {
        language: 'html',
        code: `<extra-input-text [formControl]="control" label="FloatLabel" labelPosition="float"></extra-input-text>`
      }
    }
  }
};

export const Clearable: Story = {
  name: 'Clearable',
  args: { clearable: true, value: 'InputText' },
  render: (args) => renderInputText(args),
  parameters: {
    docs: {
      description: {
        story:
          'Поле с иконкой очистки (clearable). Иконка × доступна с клавиатуры (Enter / Space) и появляется только при наличии значения; клик очищает поле и вызывает onClear.'
      },
      source: {
        language: 'html',
        code: `<extra-input-text [formControl]="control" label="Label" clearable (onClear)="onClear()"></extra-input-text>`
      }
    }
  }
};

export const Fluid: Story = {
  name: 'Fluid',
  args: { fluid: true },
  render: (args) => renderInputText(args),
  parameters: {
    docs: {
      description: {
        story:
          'Растягивание на всю ширину контейнера (fluid). При `[fluid]="true"` поле занимает 100% ширины родителя вместо собственной ширины по умолчанию.'
      },
      source: {
        language: 'html',
        code: `<extra-input-text [formControl]="control" label="Label" [fluid]="true"></extra-input-text>`
      }
    }
  }
};

export { ReactiveForms };
