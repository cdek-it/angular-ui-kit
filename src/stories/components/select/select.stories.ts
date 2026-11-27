import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraSelectComponent } from '../../../lib/components/select/select.component';

/** Хост-обёртка сториса: фиксирует ширину поля шириной референса Figma (272px).
 *  encapsulation: None — стили должны действовать на PrimeNG-разметку внутри extra-select,
 *  обычный scoped-стиль сториса её не видит. */
@Component({
  selector: 'select-story-host',
  standalone: true,
  imports: [ExtraSelectComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="select-story-fix"><ng-content></ng-content></div>`,
  styles: `
    .select-story-fix {
      width: 272px;
    }

    .select-story-fix .p-select {
      width: 100%;
    }
  `
})
class SelectStoryHostComponent {}

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' }
];

type SelectArgs = ExtraSelectComponent & {
  disabled: boolean;
  invalid: boolean;
  value: { name: string; code: string } | null;
};

const meta: Meta<SelectArgs> = {
  title: 'Components/Form/Select',
  component: ExtraSelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraSelectComponent, ReactiveFormsModule, SelectStoryHostComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-select' },
    docs: {
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_source: string, context: { args: RenderArgs }) => selectSource(context.args)
      },
      description: {
        component: `Single-select — выпадающий список для выбора одного значения из набора опций.

\`\`\`typescript
import { ExtraSelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Шаблоны (передаются между тегами компонента):
- \`extraSelectOption\` — пункт списка (контекст \`let-option\`)
- \`extraSelectSelectedItem\` — выбранное значение в закрытом состоянии (контекст \`let-option\`)
- \`extraSelectOptionGroup\` — заголовок группы (контекст \`let-group\`)

\`\`\`typescript
import { ExtraSelectOptionDirective, ExtraSelectSelectedItemDirective, ExtraSelectOptionGroupDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/select.md) ──────────────
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
      description: 'Плавающий лейбл внутри поля — перекрывает labelPosition',
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
    placeholder: {
      control: 'text',
      description: 'Текст подсказки внутри поля',
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
    editable: {
      control: 'boolean',
      description: 'Разрешить ввод произвольного значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      control: 'boolean',
      if: { arg: 'readonly', truthy: false },
      description: 'Отображение иконки для очистки поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showCheckmark: {
      control: 'boolean',
      description: 'Отображать отметку выбранного option',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showFilter: {
      control: 'boolean',
      if: { arg: 'editable', truthy: false },
      description: 'Включает строку поиска в выпадающем списке',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Индикатор загрузки вместо chevron',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивать поле на всю ширину контейнера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Поле обязательно для заполнения (NG_VALIDATORS)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    group: {
      control: 'boolean',
      description: 'Группировка опций (options с группами)',
      table: {
        category: 'Данные',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── Данные ─────────────────────────────────────────────────
    options: {
      control: 'object',
      description: 'Массив опций или групп',
      table: { category: 'Данные', type: { summary: 'ExtraSelectOption[] | ExtraSelectGroup[]' } }
    },
    optionLabel: {
      control: 'text',
      description: 'Поле опции с текстом',
      table: {
        category: 'Данные',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    optionValue: {
      control: 'text',
      description: 'Поле опции со значением',
      table: { category: 'Данные', type: { summary: 'string' } }
    },
    optionDisabled: {
      control: 'text',
      description: 'Поле опции с признаком disabled',
      table: { category: 'Данные', type: { summary: 'string' } }
    },
    optionGroupLabel: {
      control: 'text',
      description: 'Поле группы с заголовком',
      table: { category: 'Данные', type: { summary: 'string' } }
    },
    optionGroupChildren: {
      control: 'text',
      description: 'Поле группы со списком опций',
      table: {
        category: 'Данные',
        defaultValue: { summary: "'items'" },
        type: { summary: 'string' }
      }
    },
    // ── Дополнительно ──────────────────────────────────────────
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
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    tabindex: {
      control: { type: 'number', step: 1 },
      description: 'Порядок перехода по Tab',
      table: { category: 'Дополнительно', type: { summary: 'number' } }
    },
    appendTo: {
      control: 'text',
      description: "Куда рендерить панель ('body' или CSS-селектор)",
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: "'body'" },
        type: { summary: 'string' }
      }
    },
    emptyMessage: {
      control: 'text',
      description: 'Текст пустого списка',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: "'Нет данных'" },
        type: { summary: 'string' }
      }
    },
    emptyFilterMessage: {
      control: 'text',
      description: 'Текст при пустом результате фильтра',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: "'Результаты не найдены'" },
        type: { summary: 'string' }
      }
    },
    checkmarkIcon: {
      control: 'text',
      description: 'Код иконки отметки выбранной опции',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: "'ea5e'" },
        type: { summary: 'string' }
      }
    },
    inputId: {
      control: 'text',
      description: 'ID поля для связки с внешним label (генерируется автоматически, если не задан)',
      table: { category: 'Дополнительно', type: { summary: 'string' } }
    },
    // ── Внутренние (не контролируются) ─────────────────────────
    primeSize: { table: { disable: true } },
    selectClass: { table: { disable: true } },
    panelStyle: { table: { disable: true } },
    invalid: { control: 'boolean', description: 'Невалидное состояние — вычисляется из NgControl' },
    disabled: { control: 'boolean', description: 'Отключает взаимодействие — управляется через FormControl' },
    modelValue: { table: { disable: true } },
    // ── События ────────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Срабатывает при выборе значения',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraSelectChangeEvent>' } }
    },
    onFilter: {
      control: false,
      description: 'Срабатывает при вводе в строку поиска',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraSelectFilterEvent>' } }
    },
    onClear: {
      control: false,
      description: 'Срабатывает при очистке значения',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onShow: {
      control: false,
      description: 'Срабатывает при открытии списка',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onHide: {
      control: false,
      description: 'Срабатывает при закрытии списка',
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
    label: 'Label',
    floatLabel: false,
    caption: 'Caption',
    captionSeverity: 'base',
    info: 'Info',
    placeholder: 'Placeholder',
    size: 'base',
    editable: false,
    clearable: false,
    showCheckmark: true,
    showFilter: false,
    readonly: false,
    loading: false,
    fluid: false,
    required: true,
    group: false,
    options: OPTIONS,
    optionLabel: 'name',
    optionValue: undefined,
    optionDisabled: undefined,
    optionGroupLabel: undefined,
    optionGroupChildren: 'items',
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    appendTo: 'body',
    emptyMessage: 'Нет данных',
    emptyFilterMessage: 'Результаты не найдены',
    checkmarkIcon: 'ea5e',
    disabled: false,
    invalid: false,
    value: null
  }
};

export default meta;
type Story = StoryObj<SelectArgs>;

// ── Один рендер компонента: все свойства настраиваются в Controls ────────────
type RenderArgs = Partial<
  Omit<SelectArgs, 'onChange' | 'onFilter' | 'onClear' | 'onShow' | 'onHide' | 'onFocus' | 'onBlur'>
>;

const selectInputs = (args: RenderArgs): Record<string, unknown> => {
  const inputs = Object.fromEntries(
    Object.entries(args).filter(
      ([key, value]) =>
        !['disabled', 'invalid', 'options', 'value'].includes(key) &&
        !!meta.argTypes?.[key as keyof SelectArgs]?.control &&
        value !== undefined
    )
  );
  if (args.group) inputs['optionGroupLabel'] = args.optionGroupLabel ?? 'name';
  return inputs;
};

const selectSource = (args: RenderArgs): string => {
  const defaults: Record<string, unknown> = {
    ...meta.args,
    label: '',
    caption: '',
    info: '',
    placeholder: '',
    optionLabel: undefined,
    optionGroupLabel: undefined
  };
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const attributes = Object.entries(selectInputs(args))
    .filter(([key, value]) => value !== defaults[key])
    .map(([key, value]) =>
      typeof value === 'string' ? `${key}="${escape(value)}"` : `[${key}]="${escape(JSON.stringify(value))}"`
    );
  return `<extra-select
  [formControl]="control"
  [options]="options"
  ${attributes.join('\n  ')}
></extra-select>`;
};

const renderSelect = (args: RenderArgs) => {
  const inputs = selectInputs(args);
  const bindings = Object.keys(inputs).map((key) => `[${key}]="${key}"`);
  const validators = args.invalid ? [Validators.required] : [];
  const control = new FormControl({ value: args.value ?? null, disabled: !!args.disabled }, validators);
  if (args.invalid) control.markAsTouched();

  const source = args.options ?? OPTIONS;
  const children = args.optionGroupChildren ?? 'items';
  const groupLabel = args.optionGroupLabel ?? 'name';
  const options =
    args.group && source.length > 0 && !source.every((option) => Array.isArray(option?.[children]))
      ? [
          { [groupLabel]: 'Группа 1', [children]: source.slice(0, 2) },
          { [groupLabel]: 'Группа 2', [children]: source.slice(2) }
        ]
      : source;

  const field = `<extra-select
  [formControl]="control"
  [options]="options"
  ${bindings.join('\n  ')}
></extra-select>`;
  return {
    props: { ...inputs, control, options },
    template: args.fluid ? field : `<select-story-host>${field}</select-story-host>`
  };
};

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => renderSelect(args),
  parameters: {
    docs: {
      description: {
        story:
          'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов; disabled и invalid — не входы компонента и задаются состоянием FormControl.'
      }
    }
  }
};

// ── Error / Disabled / Readonly / Fluid: пресеты Figma ───────────────────────
export const Error: Story = {
  name: 'Error',
  args: { invalid: true },
  render: (args) => renderSelect(args)
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => renderSelect(args),
  parameters: {
    docs: {
      description: { story: 'Отключённое состояние — управляется через FormControl.' }
    }
  }
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { readonly: true, value: OPTIONS[0] },
  render: (args) => renderSelect(args),
  parameters: { controls: { exclude: ['clearable'] } }
};

export const Fluid: Story = {
  name: 'Fluid',
  args: { fluid: true },
  render: (args) => renderSelect(args)
};

// ── FloatLabel: плавающий лейбл внутри поля ──────────────────────────────────
export const FloatLabel: Story = {
  name: 'FloatLabel',
  args: { floatLabel: true, label: 'FloatLabel' },
  render: (args) => renderSelect(args)
};
