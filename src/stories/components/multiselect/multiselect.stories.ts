import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraMultiSelectComponent } from '../../../lib/components/multiselect/multiselect.component';
import { MultiSelectLabelsComponent, Labels } from './examples/multiselect-labels.component';
import { MultiSelectGroupedComponent, Grouped } from './examples/multiselect-grouped.component';
import { MultiSelectChipsComponent, Chips } from './examples/multiselect-chips.component';
import { Disabled } from './examples/multiselect-disabled.component';
import { Invalid } from './examples/multiselect-invalid.component';

const CITIES = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' }
];

type MultiSelectArgs = ExtraMultiSelectComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<MultiSelectArgs> = {
  title: 'Components/Form/MultiSelect',
  component: ExtraMultiSelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraMultiSelectComponent,
        ReactiveFormsModule,
        MultiSelectLabelsComponent,
        MultiSelectGroupedComponent,
        MultiSelectChipsComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-multiselect' },
    docs: {
      description: {
        component: `Выпадающий список для выбора нескольких значений из набора опций. Поддерживает чекбоксы у опций, отображение выбранных значений как chips, группировку и фильтрацию.

Реализован по спецификации \`docs/components-api/multiselect.md\`.

\`\`\`typescript
import { ExtraMultiSelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства ─────────────────────────────────────────────
    placeholder: {
      control: 'text',
      description: 'Текст подсказки при пустом поле',
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
    // Hidden props (заданы через рендер Default, не выносятся в Controls)
    options: { table: { disable: true } },
    optionLabel: { table: { disable: true } },
    optionValue: { table: { disable: true } },
    optionDisabled: { table: { disable: true } },
    optionGroupLabel: { table: { disable: true } },
    optionGroupChildren: { table: { disable: true } },
    group: { table: { disable: true } },
    chipIcon: { table: { disable: true } },
    filterPlaceholder: { table: { disable: true } },
    appendTo: { table: { disable: true } },
    emptyMessage: { table: { disable: true } },
    emptyFilterMessage: { table: { disable: true } },
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
    // Hidden computed/internal members
    modelValue: { table: { disable: true } },
    multiselectClasses: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    inputId: { table: { disable: true } },
    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } },
    handleChange: { table: { disable: true } },
    handleClear: { table: { disable: true } },
    handleRemove: { table: { disable: true } },
    handleFocus: { table: { disable: true } },
    handleBlur: { table: { disable: true } },
    // ── События ────────────────────────────────────────────────
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
    placeholder: 'Выберите города',
    label: '',
    labelPosition: 'top',
    floatLabel: false,
    showChips: false,
    chipClearable: true,
    clearable: false,
    showCheckbox: true,
    showFilter: false,
    caption: '',
    info: '',
    size: 'base',
    readonly: false,
    loading: false,
    fluid: false,
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<MultiSelectArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'top') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.floatLabel) parts.push(`[floatLabel]="true"`);
    if (args.showChips) parts.push(`[showChips]="true"`);
    if (!args.chipClearable) parts.push(`[chipClearable]="false"`);
    if (args.clearable) parts.push(`[clearable]="true"`);
    if (!args.showCheckbox) parts.push(`[showCheckbox]="false"`);
    if (args.showFilter) parts.push(`[showFilter]="true"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.info) parts.push(`info="${args.info}"`);
    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.loading) parts.push(`[loading]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);

    const validators = args.invalid ? [Validators.required] : [];
    const control = new FormControl<any[] | null>({ value: null, disabled: args.disabled }, validators);
    if (args.invalid) control.markAsTouched();

    const template = `<extra-multi-select\n  [formControl]="control"\n  [options]="options"\n  optionLabel="name"\n  ${parts.join('\n  ')}\n></extra-multi-select>`;

    return { props: { ...args, control, options: CITIES }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Re-exports from example components ────────────────────────────────────
export { Labels, Grouped, Chips, Disabled, Invalid };
