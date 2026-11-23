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
  tags: ['autodocs', 'multiselect'],
  decorators: [
    moduleMetadata({
      imports: [ExtraMultiSelectComponent, ReactiveFormsModule, MultiSelectStoryHostComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-multiselect' },
    docs: {
      source: {
        language: 'html',
        transform: (_code: string, context: { args: RenderArgs }) => multiSelectExample(context.args).template
      },
      description: {
        component: `Выпадающий список для выбора нескольких значений из набора опций. Поддерживает чекбоксы у опций, отображение выбранных значений как chips, группировку и фильтрацию.

\`\`\`typescript
import { ExtraMultiSelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
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
      if: { arg: 'floatLabel', truthy: false },
      description: 'Положение лейбла; игнорируется при floatLabel=true',
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
    showChips: {
      control: 'boolean',
      description: 'Отображать выбранные значения в виде chips вместо списка через запятую',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    chipClearable: {
      control: 'boolean',
      if: { arg: 'showChips', truthy: true },
      description: 'Отображение иконки удаления chip (при showChips)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Отображение иконки для очистки всего поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Отображать чекбокс у каждой опции в панели',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showFilter: {
      control: 'boolean',
      description: 'Отображать строку поиска в выпадающей панели',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    filterPlaceholder: {
      control: 'text',
      if: { arg: 'showFilter', truthy: true },
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
      description: 'Текст с доп. информацией (показывается в тултипе иконки ti-info-circle)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Текст подсказки при пустом поле',
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
      description: 'Режим только для чтения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки опций',
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
      if: { arg: 'showChips', truthy: true },
      description: 'Иконка chip (переопределяется шаблоном)',
      table: { category: 'Дополнительно', type: { summary: 'string' } }
    },
    primeSize: { table: { disable: true } },
    multiselectClasses: { table: { disable: true } },
    inputId: { table: { disable: true } },
    invalid: { control: 'boolean', description: 'Невалидное состояние — вычисляется из NgControl (Validators)' },
    disabled: { control: 'boolean', description: 'Отключает взаимодействие — управляется через FormControl' },
    modelValue: { table: { disable: true } },
    // ── Состояния (управляются через FormControl) ──────────────────────────
    // ── События ────────────────────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Срабатывает при изменении выбора',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraMultiSelectChangeEvent>' } }
    },
    onFilter: {
      control: false,
      description: 'Срабатывает при вводе в строку фильтра',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraMultiSelectFilterEvent>' } }
    },
    onClear: {
      control: false,
      description: 'Срабатывает при очистке всех значений',
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

const MULTISELECT_INPUTS = [
  'placeholder',
  'label',
  'labelPosition',
  'floatLabel',
  'showChips',
  'chipIcon',
  'chipClearable',
  'clearable',
  'showCheckbox',
  'showFilter',
  'filterPlaceholder',
  'options',
  'optionLabel',
  'optionValue',
  'optionDisabled',
  'optionGroupLabel',
  'optionGroupChildren',
  'group',
  'caption',
  'captionSeverity',
  'info',
  'size',
  'readonly',
  'required',
  'ariaLabel',
  'ariaLabelledBy',
  'autofocus',
  'tabindex',
  'loading',
  'fluid',
  'appendTo',
  'emptyMessage',
  'emptyFilterMessage'
] as const;
type RenderArgs = Partial<
  Pick<MultiSelectArgs, (typeof MULTISELECT_INPUTS)[number] | 'disabled' | 'invalid' | 'value'>
>;

const multiSelectExample = (args: RenderArgs) => {
  const options = args.group
    ? [
        { [args.optionGroupLabel ?? 'name']: 'Группа 1', [args.optionGroupChildren ?? 'items']: OPTIONS.slice(0, 2) },
        { [args.optionGroupLabel ?? 'name']: 'Группа 2', [args.optionGroupChildren ?? 'items']: OPTIONS.slice(2) }
      ]
    : args.options;
  const values = {
    ...args,
    options,
    optionGroupLabel: args.group ? (args.optionGroupLabel ?? 'name') : args.optionGroupLabel
  };
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const parts = ['[formControl]="control"'];
  for (const key of MULTISELECT_INPUTS) {
    const value = values[key];
    if (value === undefined) continue;
    if (typeof value === 'string') parts.push(key + '="' + escape(value) + '"');
    else if (typeof value === 'boolean' || typeof value === 'number' || value === null)
      parts.push('[' + key + ']="' + value + '"');
    else parts.push('[' + key + ']="' + key + '"');
  }
  return { values, template: '<extra-multi-select\n  ' + parts.join('\n  ') + '\n></extra-multi-select>' };
};

const renderMultiSelect = (args: RenderArgs) => {
  const example = multiSelectExample(args);
  const control = new FormControl<any[] | null>(
    { value: args.value ?? null, disabled: !!args.disabled },
    args.invalid ? [Validators.required] : []
  );
  if (args.invalid) control.markAsTouched();
  const template = args.fluid
    ? example.template
    : '<multiselect-story-host>' + example.template + '</multiselect-story-host>';
  return {
    props: { ...Object.fromEntries(MULTISELECT_INPUTS.map((key) => [key, example.values[key]])), control },
    template
  };
};

export const Default: Story = {
  name: 'Default',
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: { story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.' }
    }
  }
};

export const Error: Story = {
  name: 'Error',
  args: { invalid: true },
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: {
        story:
          'Невалидное состояние — определяется через валидаторы `FormControl` (нужно, чтобы контрол также был touched).'
      }
    }
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => renderMultiSelect(args),
  parameters: { docs: { description: { story: 'Отключённое состояние — управляется через FormControl.' } } }
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { readonly: true, value: [OPTIONS[0], OPTIONS[1]] },
  render: (args) => renderMultiSelect(args),
  parameters: {
    docs: {
      description: {
        story:
          'Readonly не подсвечивается при наведении, но остаётся фокусируемым: значение можно выделить и скопировать, а клавиатурный пользователь видит, где находится. Поэтому focus-ring сохраняется (WCAG 2.4.7).'
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
          'Выбранные значения отображаются как chips (`showChips`) вместо списка через запятую. Каждый chip можно удалить по крестику — событие `(onRemove)`.'
      }
    }
  }
};

export const Fluid: Story = {
  name: 'Fluid',
  args: { fluid: true },
  render: (args) => renderMultiSelect(args)
};

export const FloatLabel: Story = {
  name: 'FloatLabel',
  args: { floatLabel: true, label: 'FloatLabel' },
  render: (args) => renderMultiSelect(args),
  parameters: {
    controls: { exclude: ['labelPosition'] },
    docs: {
      description: {
        story:
          'Плавающий лейбл внутри поля. labelPosition здесь не применяется: при floatLabel=true лейбл всегда внутри поля, поэтому контрол скрыт. Info показывается иконкой ti-info-circle с тултипом, caption — пояснение под полем.'
      }
    }
  }
};
