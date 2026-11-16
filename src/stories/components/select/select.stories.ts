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
      description: {
        component: `Single-select — выпадающий список для выбора одного значения из набора опций.

Реализован по спецификации [select.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/select.md).

\`\`\`typescript
import { ExtraSelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.

Шаблоны (передаются между тегами компонента):
- \`extraSelectOption\` — пункт списка (контекст \`let-option\`)
- \`extraSelectSelectedItem\` — выбранное значение в закрытом состоянии (контекст \`let-option\`)
- \`extraSelectOptionGroup\` — заголовок группы (контекст \`let-group\`)`
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
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'top'" },
        type: { summary: "'top' | 'left'" }
      }
    },
    floatLabel: {
      control: 'boolean',
      description: 'Лейбл-плейсхолдер, всплывающий над полем при фокусе/значении',
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
      description: 'Иконка очистки поля при наличии значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Отметка выбранной опции в панели',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showFilter: {
      control: 'boolean',
      description: 'Строка поиска в выпадающей панели',
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
    invalid: { table: { disable: true } },
    disabled: { table: { disable: true } },
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
      description: 'Срабатывает при очистке поля',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onShow: {
      control: false,
      description: 'Срабатывает при открытии панели',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onHide: {
      control: false,
      description: 'Срабатывает при закрытии панели',
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
    showCheckbox: true,
    showFilter: false,
    readonly: false,
    loading: false,
    fluid: false,
    required: false,
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
interface RenderArgs {
  label?: string;
  labelPosition?: string;
  floatLabel?: boolean;
  caption?: string;
  captionSeverity?: string;
  info?: string;
  placeholder?: string;
  size?: string;
  editable?: boolean;
  clearable?: boolean;
  showCheckbox?: boolean;
  showFilter?: boolean;
  readonly?: boolean;
  loading?: boolean;
  fluid?: boolean;
  required?: boolean;
  group?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  autofocus?: boolean;
  tabindex?: number;
  optionLabel?: string;
  inputId?: string;
  invalid?: boolean;
  disabled?: boolean;
  value?: { name: string; code: string } | null;
}

const renderSelect = (args: RenderArgs, forced: { floatLabel?: boolean } = {}) => {
  const a = { ...args, ...forced };
  const parts: string[] = [];

  if (a.label) parts.push(`label="${a.label}"`);
  if (a.labelPosition && a.labelPosition !== 'top') parts.push(`labelPosition="${a.labelPosition}"`);
  if (a.floatLabel) parts.push(`[floatLabel]="true"`);
  if (a.caption) parts.push(`caption="${a.caption}"`);
  if (a.captionSeverity && a.captionSeverity !== 'base') parts.push(`captionSeverity="${a.captionSeverity}"`);
  if (a.info) parts.push(`info="${a.info}"`);
  if (a.placeholder) parts.push(`placeholder="${a.placeholder}"`);
  if (a.size && a.size !== 'base') parts.push(`size="${a.size}"`);
  if (a.editable) parts.push(`[editable]="true"`);
  if (a.clearable) parts.push(`[clearable]="true"`);
  if (!a.showCheckbox) parts.push(`[showCheckbox]="false"`);
  if (a.showFilter) parts.push(`[showFilter]="true"`);
  if (a.readonly) parts.push(`[readonly]="true"`);
  if (a.loading) parts.push(`[loading]="true"`);
  if (a.fluid) parts.push(`[fluid]="true"`);
  if (a.required) parts.push(`required`);
  if (a.group) parts.push(`[group]="true" optionGroupLabel="name"`);
  if (a.ariaLabel) parts.push(`ariaLabel="${a.ariaLabel}"`);
  if (a.ariaLabelledBy) parts.push(`ariaLabelledBy="${a.ariaLabelledBy}"`);
  if (a.autofocus) parts.push(`[autofocus]="true"`);
  if (a.tabindex != null) parts.push(`[tabindex]="${a.tabindex}"`);
  if (a.optionLabel) parts.push(`optionLabel="${a.optionLabel}"`);
  if (a.inputId) parts.push(`inputId="${a.inputId}"`);

  const validators = a.invalid ? [Validators.required] : [];
  const control = new FormControl<any>({ value: a.value ?? null, disabled: !!a.disabled }, validators);
  if (a.invalid) control.markAsTouched();

  const options = a.group
    ? [
        { name: 'Группа 1', items: OPTIONS.slice(0, 2) },
        { name: 'Группа 2', items: OPTIONS.slice(2) }
      ]
    : OPTIONS;

  // Ширина поля в примерах зафиксирована шириной референса Figma (272px): сверки идут 1:1
  // с макетом, поле не растягивается на всё превью. Fluid-пример — без обёртки:
  // там поле обязано занять контейнер.
  const template = `${a.fluid ? '' : '<select-story-host>'}<extra-select [formControl]="control"\n  [options]="options"\n  ${parts.join('\n  ')}\n></extra-select>${a.fluid ? '' : '</select-story-host>'}`;

  // invalid и disabled живут во FormControl: у компонента invalid — геттер без сеттера,
  // и Storybook на попытке его присвоить роняет ошибку в консоль
  return { props: { control, options }, template };
};

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => renderSelect(args),
  parameters: {
    docs: {
      description: {
        story:
          'Поле с лейблом сверху (labelPosition="top") или слева (labelPosition="left"). Размер (small, base, large, xlarge), caption, info, фильтр, группировка, editable, clearable, fluid, readonly, disabled и invalid меняются в Controls; disabled и invalid управляются через FormControl.'
      },
      source: {
        language: 'html',
        code: `<!-- лейбл сверху -->
<extra-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption" info="Info" placeholder="Placeholder"></extra-select>

<!-- лейбл слева -->
<extra-select [formControl]="control" [options]="options" optionLabel="name" labelPosition="left" label="Label"></extra-select>

<!-- без label и caption поле не оборачивается -->
<extra-select [formControl]="control" [options]="options" optionLabel="name" placeholder="Без лейбла"></extra-select>

<!-- группировка -->
<extra-select [formControl]="control" [options]="grouped" optionLabel="name" [group]="true"></extra-select>

<!-- размеры -->
<extra-select [formControl]="control" [options]="options" optionLabel="name" size="small"></extra-select>
<extra-select [formControl]="control" [options]="options" optionLabel="name" size="large"></extra-select>
<extra-select [formControl]="control" [options]="options" optionLabel="name" size="xlarge"></extra-select>

<!-- состояния: disabled и invalid через FormControl -->
control = new FormControl<any>({ value: null, disabled: true });
control = new FormControl<any>(null, Validators.required);

<!-- readonly -->
<extra-select [formControl]="control" [options]="options" optionLabel="name" [readonly]="true"></extra-select>`
      }
    }
  }
};

// ── Error / Disabled / Readonly / Fluid: пресеты Figma ───────────────────────
export const Error: Story = {
  name: 'Error',
  args: { invalid: true },
  render: (args) => renderSelect(args),
  parameters: {
    docs: {
      description: { story: 'Figma `state=danger`. Невалидность берётся из NgControl: красная рамка по Validators.' },
      source: {
        language: 'html',
        code: `<!-- control = new FormControl(null, Validators.required) -->
<extra-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption"></extra-select>`
      }
    }
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => renderSelect(args),
  parameters: {
    docs: {
      description: { story: 'Figma `state=disabled`. Отключение через FormControl.' },
      source: {
        language: 'html',
        code: `<!-- control = new FormControl({ value: null, disabled: true }) -->
<extra-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption"></extra-select>`
      }
    }
  }
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { readonly: true, value: OPTIONS[0] },
  render: (args) => renderSelect(args),
  parameters: {
    docs: {
      description: { story: 'Figma `state=readonly`. Значение видно, но панель не открывается.' },
      source: {
        language: 'html',
        code: `<extra-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption" [readonly]="true"></extra-select>`
      }
    }
  }
};

export const Fluid: Story = {
  name: 'Fluid',
  args: { fluid: true },
  render: (args) => renderSelect(args),
  parameters: {
    docs: {
      description: { story: 'Свойство кода `fluid`: поле растягивается на всю ширину контейнера.' },
      source: {
        language: 'html',
        code: `<extra-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption" [fluid]="true"></extra-select>`
      }
    }
  }
};

// ── FloatLabel: плавающий лейбл внутри поля ──────────────────────────────────
export const FloatLabel: Story = {
  name: 'FloatLabel',
  args: { floatLabel: true, label: 'FloatLabel' },
  argTypes: {
    floatLabel: { control: false },
    labelPosition: { control: false }
  },
  render: (args) => renderSelect(args, { floatLabel: true }),
  parameters: {
    docs: {
      description: {
        story:
          'Figma `has-float-label=true`. Плавающий лейбл (`[floatLabel]="true"`): в покое стоит в поле, при фокусе и значении поднимается над ним. labelPosition в этом виде не действует.'
      },
      source: {
        language: 'html',
        code: `<extra-select [formControl]="control" [options]="options" optionLabel="name" label="FloatLabel" [floatLabel]="true"></extra-select>`
      }
    }
  }
};
