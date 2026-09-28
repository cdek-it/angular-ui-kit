import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraAutoCompleteComponent } from '../../../lib/components/autocomplete/autocomplete.component';
import { AutoCompleteDropdownComponent, Dropdown } from './examples/autocomplete-dropdown.component';
import { AutoCompleteMultipleComponent, Multiple } from './examples/autocomplete-multiple.component';
import { AutoCompleteObjectsComponent, Objects } from './examples/autocomplete-objects.component';
import { AutoCompleteDisabledComponent, Disabled } from './examples/autocomplete-disabled.component';
import { AutoCompleteInvalidComponent, Invalid } from './examples/autocomplete-invalid.component';
import { AutoCompleteLabelsComponent, Labels } from './examples/autocomplete-labels.component';
import { AutoCompleteClearableComponent, Clearable } from './examples/autocomplete-clearable.component';

const CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Самара',
  'Омск'
];

type AutoCompleteArgs = ExtraAutoCompleteComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<AutoCompleteArgs> = {
  title: 'Components/Form/AutoComplete',
  component: ExtraAutoCompleteComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraAutoCompleteComponent,
        ReactiveFormsModule,
        AutoCompleteDropdownComponent,
        AutoCompleteMultipleComponent,
        AutoCompleteObjectsComponent,
        AutoCompleteDisabledComponent,
        AutoCompleteInvalidComponent,
        AutoCompleteLabelsComponent,
        AutoCompleteClearableComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-autocomplete' },
    docs: {
      description: {
        component: `Поле ввода с автодополнением, поддерживающее одиночный и множественный выбор, объекты, кнопку выпадающего списка, группировку и фильтрацию. Поддерживает встроенные label/caption/info.

Реализован по спецификации \`docs/components-api/autocomplete.md\`.

\`\`\`typescript
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      story: { height: '300px' }
    }
  },
  argTypes: {
    // ── Свойства ─────────────────────────────────────────────
    placeholder: {
      control: 'text',
      description: 'Текст-подсказка при пустом поле',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
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
    multiple: {
      control: 'boolean',
      description: 'Режим множественного выбора (chips)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Отображать чекбокс у каждой опции в списке',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    chipClearable: {
      control: 'boolean',
      description: 'Отображение иконки удаления chip (при multiple)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    dropdown: {
      control: 'boolean',
      description: 'Показывать кнопку выпадающего списка',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Показывать иконку очистки поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    forceSelection: {
      control: 'boolean',
      description: 'Ограничить ввод только значениями из списка',
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
    // Hidden props (демонстрируются в отдельных стори или не выносятся в Controls)
    suggestions: { table: { disable: true } },
    optionLabel: { table: { disable: true } },
    optionValue: { table: { disable: true } },
    optionDisabled: { table: { disable: true } },
    optionGroupLabel: { table: { disable: true } },
    optionGroupChildren: { table: { disable: true } },
    group: { table: { disable: true } },
    dropdownMode: { table: { disable: true } },
    completeOnFocus: { table: { disable: true } },
    minLength: { table: { disable: true } },
    delay: { table: { disable: true } },
    scrollHeight: { table: { disable: true } },
    emptyMessage: { table: { disable: true } },
    unique: { table: { disable: true } },
    dataKey: { table: { disable: true } },
    chipIcon: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    ariaLabelledBy: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    // Hidden computed/internal members
    modelValue: { table: { disable: true } },
    inputId: { table: { disable: true } },
    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } },
    computedInputStyleClass: { table: { disable: true } },
    isOptionSelected: { table: { disable: true } },
    getOptionLabel: { table: { disable: true } },
    handleChange: { table: { disable: true } },
    handleBlur: { table: { disable: true } },
    handleClear: { table: { disable: true } },
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
    // ── События ────────────────────────────────────────────────
    completeMethod: {
      control: false,
      description: 'Срабатывает при вводе — обработчик должен заполнить suggestions',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraAutoCompleteCompleteEvent>' } }
    },
    onSelect: {
      control: false,
      description: 'Срабатывает при выборе варианта',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraAutoCompleteSelectEvent>' } }
    },
    onUnselect: {
      control: false,
      description: 'Срабатывает при снятии выбора (multiple)',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraAutoCompleteUnselectEvent>' } }
    },
    onDropdownClick: {
      control: false,
      description: 'Срабатывает при клике по кнопке dropdown',
      table: { category: 'События', type: { summary: 'EventEmitter<ExtraAutoCompleteDropdownClickEvent>' } }
    },
    onShow: {
      control: false,
      description: 'Срабатывает при открытии оверлея с подсказками',
      table: { category: 'События', type: { summary: 'EventEmitter<Event>' } }
    },
    onHide: {
      control: false,
      description: 'Срабатывает при закрытии оверлея',
      table: { category: 'События', type: { summary: 'EventEmitter<Event>' } }
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
    },
    onClear: {
      control: false,
      description: 'Срабатывает при очистке значения (иконка clearable)',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    }
  },
  args: {
    placeholder: 'Начните ввод...',
    label: '',
    labelPosition: 'top',
    floatLabel: false,
    multiple: false,
    showCheckbox: false,
    chipClearable: true,
    dropdown: false,
    clearable: false,
    forceSelection: false,
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
type Story = StoryObj<AutoCompleteArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'top') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.floatLabel) parts.push(`[floatLabel]="true"`);
    if (args.multiple) parts.push(`[multiple]="true"`);
    if (args.showCheckbox) parts.push(`[showCheckbox]="true"`);
    if (!args.chipClearable) parts.push(`[chipClearable]="false"`);
    if (args.dropdown) parts.push(`[dropdown]="true"`);
    if (args.clearable) parts.push(`[clearable]="true"`);
    if (args.forceSelection) parts.push(`[forceSelection]="true"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.info) parts.push(`info="${args.info}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.readonly) parts.push(`[readonly]="true"`);

    parts.push(`[suggestions]="filtered"`);
    parts.push(`(completeMethod)="search($event)"`);
    parts.push(`[formControl]="control"`);

    const template = `<extra-auto-complete\n  ${parts.join('\n  ')}\n></extra-auto-complete>`;

    const validators = args.invalid ? [Validators.required] : [];
    const control = new FormControl<any>({ value: args.multiple ? [] : null, disabled: args.disabled }, validators);
    if (args.invalid) control.markAsTouched();

    const props: Record<string, any> = {
      ...args,
      control,
      filtered: [] as string[],
      search(this: any, event: any) {
        this.filtered = CITIES.filter((c: string) => c.toLowerCase().includes((event.query || '').toLowerCase()));
      }
    };

    return { props, template };
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
export { Dropdown, Multiple, Objects, Disabled, Invalid, Labels, Clearable };
