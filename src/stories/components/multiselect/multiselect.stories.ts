import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraMultiSelectComponent } from '../../../lib/components/multiselect/multiselect.component';

/** Хост-обёртка сториса: фиксирует ширину поля шириной референса Figma (272px).
 *  encapsulation: None — стили должны действовать на PrimeNG-разметку внутри extra-multi-select,
 *  обычный scoped-стиль сториса её не видит. */
@Component({
  selector: 'multiselect-story-host',
  standalone: true,
  imports: [ExtraMultiSelectComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="multiselect-story-fix"><ng-content></ng-content></div>`,
  styles: `
    .multiselect-story-fix {
      width: 272px;
    }

    .multiselect-story-fix .p-multiselect {
      width: 100%;
    }
  `
})
class MultiSelectStoryHostComponent {}

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' }
];

type MultiSelectArgs = ExtraMultiSelectComponent & {
  disabled: boolean;
  invalid: boolean;
  value: { name: string; code: string }[];
};

const meta: Meta<MultiSelectArgs> = {
  title: 'Components/Form/MultiSelect',
  component: ExtraMultiSelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraMultiSelectComponent, ReactiveFormsModule, MultiSelectStoryHostComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-multiselect' },
    docs: {
      description: {
        component: `Выпадающий список для выбора нескольких значений из набора опций. Поддерживает чекбоксы у опций, отображение выбранных значений как chips, группировку и фильтрацию.

Реализовано по спецификации [multiselect.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/multiselect.md).

\`\`\`typescript
import { ExtraMultiSelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/multiselect.md) ─────────────────────
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
    showChips: {
      control: 'boolean',
      description: 'Выбранные значения в виде chips вместо строки через запятую',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    chipClearable: {
      control: 'boolean',
      description: 'Иконка удаления у chip (при showChips)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Иконка очистки всего поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Чекбокс у каждой опции в панели',
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
    filterPlaceholder: {
      control: 'text',
      description: 'Подсказка в строке поиска (при showFilter)',
      table: {
        category: 'Свойства',
        type: { summary: 'string' }
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
    // ── Данные ─────────────────────────────────────────────────────────────
    options: {
      control: 'object',
      description: 'Массив опций или групп',
      table: {
        category: 'Данные',
        type: { summary: 'ExtraMultiSelectOption[] | ExtraMultiSelectGroup[]' }
      }
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
      table: {
        category: 'Данные',
        type: { summary: 'string' }
      }
    },
    optionDisabled: {
      control: 'text',
      description: 'Поле опции с признаком disabled',
      table: {
        category: 'Данные',
        type: { summary: 'string' }
      }
    },
    optionGroupLabel: {
      control: 'text',
      description: 'Поле группы с заголовком',
      table: {
        category: 'Данные',
        type: { summary: 'string' }
      }
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
    // ── Дополнительно ──────────────────────────────────────────────────────
    ariaLabel: {
      control: 'text',
      description: 'Метка для программ экранного доступа',
      table: {
        category: 'Дополнительно',
        type: { summary: 'string' }
      }
    },
    ariaLabelledBy: {
      control: 'text',
      description: 'ID внешнего элемента-метки',
      table: {
        category: 'Дополнительно',
        type: { summary: 'string' }
      }
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
      table: {
        category: 'Дополнительно',
        type: { summary: 'number' }
      }
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
    // ── Внутренние (не контролируются) ─────────────────────────────────────
    chipIcon: {
      control: 'text',
      description: 'Иконка chip (переопределяется шаблоном)',
      table: { category: 'Дополнительно', type: { summary: 'string' } }
    },
    primeSize: { table: { disable: true } },
    multiselectClasses: { table: { disable: true } },
    inputId: { table: { disable: true } },
    invalid: { table: { disable: true } },
    disabled: { table: { disable: true } },
    modelValue: { table: { disable: true } },
    // ── Состояния (управляются через FormControl) ──────────────────────────
    // ── События ────────────────────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Срабатывает при выборе значения',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraMultiSelectChangeEvent>' } }
    },
    onFilter: {
      control: false,
      description: 'Срабатывает при вводе в строку поиска',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraMultiSelectFilterEvent>' } }
    },
    onClear: {
      control: false,
      description: 'Срабатывает при очистке поля',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onShow: {
      control: false,
      description: 'Срабатывает при открытии панели',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraMultiSelectAnimationEvent>' } }
    },
    onHide: {
      control: false,
      description: 'Срабатывает при закрытии панели',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraMultiSelectAnimationEvent>' } }
    },
    onRemove: {
      control: false,
      description: 'Срабатывает при удалении значения (например, через chip)',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraMultiSelectRemoveEvent>' } }
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
    labelPosition: 'top',
    floatLabel: false,
    showChips: false,
    chipClearable: true,
    clearable: false,
    showCheckbox: true,
    showFilter: false,
    filterPlaceholder: undefined,
    caption: 'Caption',
    captionSeverity: 'base',
    info: 'Info',
    placeholder: 'Placeholder',
    size: 'base',
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
    chipIcon: undefined,
    disabled: false,
    invalid: false,
    value: []
  }
};

export default meta;
type Story = StoryObj<MultiSelectArgs>;

// ── Один рендер компонента: все свойства настраиваются в Controls ────────────
interface RenderArgs {
  label?: string;
  labelPosition?: string;
  floatLabel?: boolean;
  showChips?: boolean;
  chipClearable?: boolean;
  clearable?: boolean;
  showCheckbox?: boolean;
  showFilter?: boolean;
  filterPlaceholder?: string;
  caption?: string;
  captionSeverity?: string;
  info?: string;
  placeholder?: string;
  size?: string;
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
  invalid?: boolean;
  disabled?: boolean;
  value?: { name: string; code: string }[];
}

const renderMultiSelect = (args: RenderArgs, forced: { floatLabel?: boolean; showChips?: boolean } = {}) => {
  const a = { ...args, ...forced };
  const parts: string[] = [];

  if (a.label) parts.push(`label="${a.label}"`);
  if (a.labelPosition && a.labelPosition !== 'top') parts.push(`labelPosition="${a.labelPosition}"`);
  if (a.floatLabel) parts.push(`[floatLabel]="true"`);
  if (a.showChips) parts.push(`[showChips]="true"`);
  if (!a.chipClearable) parts.push(`[chipClearable]="false"`);
  if (a.clearable) parts.push(`[clearable]="true"`);
  if (!a.showCheckbox) parts.push(`[showCheckbox]="false"`);
  if (a.showFilter) parts.push(`[showFilter]="true"`);
  if (a.filterPlaceholder) parts.push(`filterPlaceholder="${a.filterPlaceholder}"`);
  if (a.caption) parts.push(`caption="${a.caption}"`);
  if (a.captionSeverity && a.captionSeverity !== 'base') parts.push(`captionSeverity="${a.captionSeverity}"`);
  if (a.info) parts.push(`info="${a.info}"`);
  if (a.placeholder) parts.push(`placeholder="${a.placeholder}"`);
  if (a.size && a.size !== 'base') parts.push(`size="${a.size}"`);
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

  const validators = a.invalid ? [Validators.required] : [];
  const control = new FormControl<any[] | null>({ value: a.value ?? null, disabled: !!a.disabled }, validators);
  if (a.invalid) control.markAsTouched();

  const options = a.group
    ? [
        { name: 'Группа 1', items: OPTIONS.slice(0, 2) },
        { name: 'Группа 2', items: OPTIONS.slice(2) }
      ]
    : OPTIONS;

  // Ширина поля в примерах зафиксирована шириной референса Figma (272px): сверки идут 1:1
  // с макетом, поле не растягивается на всё превью и не раздувается контентом (chips/список
  // значений уходят в ellipsis). Fluid-пример — без обёртки: там поле обязано занять контейнер.
  const template = `${a.fluid ? '' : '<multiselect-story-host>'}<extra-multi-select [formControl]="control"\n  [options]="options"\n  ${parts.join('\n  ')}\n></extra-multi-select>${a.fluid ? '' : '</multiselect-story-host>'}`;

  // invalid и disabled живут во FormControl: у компонента invalid — геттер без сеттера,
  // и Storybook на попытке его присвоить роняет ошибку в консоль
  return { props: { control, options }, template };
};

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: {
        story:
          'Поле с лейблом сверху (labelPosition="top") или слева (labelPosition="left"). Размер (small, base, large, xlarge), chips, caption, info, фильтр, группировка, fluid, readonly, disabled и invalid меняются в Controls; disabled и invalid управляются через FormControl.'
      },
      source: {
        language: 'html',
        code: `<!-- лейбл сверху -->
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption" info="Info" placeholder="Placeholder"></extra-multi-select>

<!-- лейбл слева -->
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" labelPosition="left" label="Label"></extra-multi-select>

<!-- без label и caption поле не оборачивается -->
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" placeholder="Без лейбла"></extra-multi-select>

<!-- группировка -->
<extra-multi-select [formControl]="control" [options]="grouped" optionLabel="name" [group]="true"></extra-multi-select>

<!-- размеры -->
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" size="small"></extra-multi-select>
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" size="large"></extra-multi-select>
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" size="xlarge"></extra-multi-select>

<!-- состояния: disabled и invalid через FormControl -->
control = new FormControl<any[] | null>({ value: null, disabled: true });
control = new FormControl<any[] | null>(null, Validators.required);

<!-- readonly -->
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" [readonly]="true"></extra-multi-select>`
      }
    }
  }
};

// ── Error / Disabled / Readonly / Chips / Fluid: пресеты Figma ───────────────
export const Error: Story = {
  name: 'Error',
  args: { invalid: true },
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: { story: 'Figma `state=danger`. Невалидность берётся из NgControl: красная рамка по Validators.' },
      source: {
        language: 'html',
        code: `<!-- control = new FormControl(null, Validators.required) -->
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption"></extra-multi-select>`
      }
    }
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: { story: 'Figma `state=disabled`. Отключение через FormControl.' },
      source: {
        language: 'html',
        code: `<!-- control = new FormControl({ value: null, disabled: true }) -->
<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption"></extra-multi-select>`
      }
    }
  }
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { readonly: true, value: [OPTIONS[0], OPTIONS[1]] },
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: { story: 'Figma `state=readonly`. Значение видно, но панель не открывается.' },
      source: {
        language: 'html',
        code: `<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption" [readonly]="true"></extra-multi-select>`
      }
    }
  }
};

export const Chips: Story = {
  name: 'Chips',
  args: { showChips: true, value: [OPTIONS[0], OPTIONS[1]] },
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: {
        story:
          'Figma `chips=true`. Выбранные значения отображаются chips; клик по × на chip удаляет значение и зовёт `onRemove`.'
      },
      source: {
        language: 'html',
        code: `<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption" [showChips]="true"></extra-multi-select>`
      }
    }
  }
};

export const Fluid: Story = {
  name: 'Fluid',
  args: { fluid: true },
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: { story: 'Свойство кода `fluid`: поле растягивается на всю ширину контейнера.' },
      source: {
        language: 'html',
        code: `<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" label="Label" caption="Caption" [fluid]="true"></extra-multi-select>`
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
  render: (args) => renderMultiSelect(args, { floatLabel: true }),
  parameters: {
    docs: {
      description: {
        story:
          'Figma `has-float-label=true`. Плавающий лейбл (`[floatLabel]="true"`): в покое стоит в поле, при фокусе и значении поднимается над ним. labelPosition в этом виде не действует.'
      },
      source: {
        language: 'html',
        code: `<extra-multi-select [formControl]="control" [options]="options" optionLabel="name" label="FloatLabel" [floatLabel]="true"></extra-multi-select>`
      }
    }
  }
};
