import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraTextareaComponent } from '../../../lib/components/textarea/textarea.component';

type TextareaArgs = ExtraTextareaComponent & { disabled: boolean; invalid: boolean; value: string };

const meta: Meta<TextareaArgs> = {
  title: 'Components/Form/Textarea',
  component: ExtraTextareaComponent,
  tags: ['autodocs', 'textarea'],
  decorators: [
    moduleMetadata({
      imports: [ExtraTextareaComponent, ReactiveFormsModule]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-textarea' },
    docs: {
      source: {
        language: 'html',
        transform: (_code: string, context: { args: RenderArgs }) => renderTextarea(context.args).template
      },
      description: {
        component: `Многострочное текстовое поле для ввода данных.

\`\`\`typescript
import { ExtraTextareaComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/textarea.md) ─────────────────
    label: {
      control: 'text',
      description: 'Текст названия поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
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
    labelPosition: {
      control: 'select',
      options: ['default', 'float', 'left'],
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'default'" },
        type: { summary: "'default' | 'float' | 'left'" }
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
      description: 'Вариант подписи (цвет и иконка), Figma `_<Caption>` variant',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'base' | 'success' | 'warning' | 'danger' | 'info'" }
      }
    },
    info: {
      control: 'text',
      description: 'Текст тултипа иконки рядом с лейблом',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка при пустом поле',
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
    clearable: {
      control: 'boolean',
      description: 'Показывает иконку очистки при наличии значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    resizable: {
      control: 'boolean',
      description: 'Разрешает нативный resize-уголок (перетаскиванием)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
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
    autoResize: {
      control: 'boolean',
      description: 'Автоматически увеличивает высоту по мере ввода',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    rows: {
      control: 'number',
      description: 'Стартовая высота поля в строках',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '3' },
        type: { summary: 'number' }
      }
    },
    cols: {
      control: 'number',
      description: 'Ширина поля в символах',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
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
    tabindex: {
      control: { type: 'number', step: 1 },
      description: 'Порядок перехода по Tab',
      table: { category: 'Дополнительно', type: { summary: 'number' } }
    },
    autofocus: {
      control: 'boolean',
      description: 'Автофокус при монтировании компонента',
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
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — вычисляется из NgControl (Validators)',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
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
    // Hidden computed props
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    inputId: { table: { disable: true } },
    // ── События ──────────────────────────────────────────────────
    onResize: {
      control: false,
      description: 'Событие изменения высоты поля пользователем',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraTextareaResizeEvent>' }
      }
    },
    onClear: {
      control: false,
      description: 'Событие очистки поля (при clearable)',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    }
  },
  args: {
    label: 'Label',
    labelPosition: 'default',
    caption: 'Caption',
    captionSeverity: 'base',
    info: 'Info',
    placeholder: 'Placeholder',
    size: 'base',
    clearable: false,
    resizable: true,
    fluid: false,
    autoResize: false,
    rows: 3,
    autofocus: false,
    required: false,
    name: undefined,
    autocomplete: undefined,
    maxLength: undefined,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    tabindex: undefined,
    disabled: false,
    invalid: false,
    requiredMark: true,
    readonly: false,
    value: ''
  }
};

export default meta;
type Story = StoryObj<TextareaArgs>;

// ── Один рендер компонента: все свойства настраиваются в Controls ────────────
interface RenderArgs {
  label?: string;
  requiredMark?: boolean;
  labelPosition?: string;
  caption?: string;
  captionSeverity?: string;
  info?: string;
  placeholder?: string;
  size?: string;
  clearable?: boolean;
  resizable?: boolean;
  readonly?: boolean;
  fluid?: boolean;
  autoResize?: boolean;
  rows?: number;
  cols?: number;
  autofocus?: boolean;
  required?: boolean;
  name?: string;
  autocomplete?: string;
  maxLength?: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  tabindex?: number;
  invalid?: boolean;
  disabled?: boolean;
  value?: string;
}

const renderTextarea = (args: RenderArgs) => {
  const a = args;
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const parts: string[] = [];

  if (a.label) parts.push(`label="${escape(a.label)}"`);
  if (a.requiredMark) parts.push(`[requiredMark]="true"`);
  if (a.labelPosition && a.labelPosition !== 'default') parts.push(`labelPosition="${escape(a.labelPosition)}"`);
  if (a.caption) parts.push(`caption="${escape(a.caption)}"`);
  if (a.captionSeverity && a.captionSeverity !== 'base') parts.push(`captionSeverity="${escape(a.captionSeverity)}"`);
  if (a.info) parts.push(`info="${escape(a.info)}"`);
  if (a.placeholder) parts.push(`placeholder="${escape(a.placeholder)}"`);
  if (a.size && a.size !== 'base') parts.push(`size="${escape(a.size)}"`);
  if (a.clearable) parts.push(`[clearable]="true"`);
  if (!a.resizable) parts.push(`[resizable]="false"`);
  if (a.readonly) parts.push(`[readonly]="true"`);
  if (a.fluid) parts.push(`[fluid]="true"`);
  if (a.autoResize) parts.push(`[autoResize]="true"`);
  if (a.rows && a.rows !== 3) parts.push(`[rows]="${a.rows}"`);
  if (a.cols) parts.push(`[cols]="${a.cols}"`);
  if (a.autofocus) parts.push(`[autofocus]="true"`);
  if (a.required) parts.push(`[required]="true"`);
  if (a.name) parts.push(`name="${escape(a.name)}"`);
  if (a.autocomplete) parts.push(`autocomplete="${escape(a.autocomplete)}"`);
  if (a.maxLength != null) parts.push(`[maxLength]="${a.maxLength}"`);
  if (a.ariaLabel) parts.push(`ariaLabel="${escape(a.ariaLabel)}"`);
  if (a.ariaLabelledBy) parts.push(`ariaLabelledBy="${escape(a.ariaLabelledBy)}"`);
  if (a.tabindex != null) parts.push(`[tabindex]="${a.tabindex}"`);

  const validators = a.invalid ? [Validators.required] : [];
  const control = new FormControl({ value: a.invalid ? '' : (a.value ?? ''), disabled: !!a.disabled }, validators);

  const template = `<extra-textarea [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-textarea>`;

  // invalid и disabled живут во FormControl: у компонента invalid — геттер без сеттера,
  // и Storybook на попытке его присвоить роняет ошибку в консоль
  return { props: { control }, template };
};

export const Default: Story = {
  name: 'Default',
  render: (args) => renderTextarea(args),
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивное поле со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

export const Error: Story = {
  name: 'Error',
  args: { invalid: true },
  render: (args) => renderTextarea(args),
  parameters: { docs: { description: { story: 'Невалидное состояние — управляется через FormControl + Validators.' } } }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => renderTextarea(args),
  parameters: { docs: { description: { story: 'Отключённое состояние — управляется через FormControl.' } } }
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { readonly: true },
  render: (args) => renderTextarea(args),
  parameters: {
    docs: { description: { story: 'Режим только для чтения — содержимое отображается, но не редактируется. Readonly не подсвечивается при наведении, но остаётся фокусируемым: значение можно выделить и скопировать, а клавиатурный пользователь видит, где находится. Поэтому focus-ring сохраняется (WCAG 2.4.7).' } }
  }
};

export const Clearable: Story = {
  name: 'Clearable',
  args: { clearable: true, value: 'Textarea' },
  render: (args) => renderTextarea(args)
};

export const Fluid: Story = {
  name: 'Fluid',
  args: { fluid: true },
  render: (args) => renderTextarea(args)
};

export const FloatLabel: Story = {
  name: 'FloatLabel',
  argTypes: { clearable: { control: 'boolean', description: 'Показывает иконку очистки поверх float-лейбла' } },
  args: { labelPosition: 'float', label: 'FloatLabel' },
  render: (args) => renderTextarea(args),
  parameters: {
    docs: {
      description: {
        story: '`[floatLabel]="true"` — лейбл всплывает над полем при фокусе/значении, независимо от `labelPosition`.'
      }
    }
  }
};

export const AutoResize: Story = {
  name: 'AutoResize',
  args: { autoResize: true, rows: 2 },
  render: (args) => renderTextarea(args),
  parameters: {
    docs: { description: { story: 'Режим авторасширения — поле увеличивается по высоте по мере ввода текста.' } }
  }
};
