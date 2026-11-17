import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { fn } from 'storybook/test';
import {
  ExtraListboxComponent,
  ExtraListboxItemDirective,
  ExtraListboxGroupDirective
} from '../../../lib/components/listbox/listbox.component';

const OPTIONS = [
  { label: 'Option', code: 'one', icon: 'ti ti-user', caption: 'caption' },
  { label: 'Second option', code: 'two', icon: 'ti ti-settings', caption: 'caption' },
  { label: 'Third option', code: 'three', icon: 'ti ti-message', caption: 'caption' }
];
const INPUTS = [
  'options',
  'optionLabel',
  'optionValue',
  'showHeader',
  'showClose',
  'overlay',
  'striped',
  'multiple',
  'showFilter',
  'filterPlaceholder',
  'showCheckbox',
  'checkmark',
  'group',
  'optionGroupLabel',
  'optionGroupChildren',
  'scrollHeight',
  'emptyMessage',
  'readonly',
  'required',
  'ariaLabel',
  'ariaLabelledBy',
  'autofocus',
  'tabindex'
] as const;
type ListboxArgs = Pick<
  ExtraListboxComponent,
  (typeof INPUTS)[number] | 'onChange' | 'onFilter' | 'onSelectAll' | 'onFocus' | 'onBlur' | 'onClose'
> & { disabled: boolean; invalid: boolean; value: any; custom: boolean; groupIcon: boolean };
type RenderArgs = Partial<
  Pick<ListboxArgs, (typeof INPUTS)[number] | 'disabled' | 'invalid' | 'value' | 'custom' | 'groupIcon'>
>;
const CUSTOM = `
  <ng-template extraListboxItem let-item>
    <i [class]="item.icon" aria-hidden="true"></i>
    <div class="p-listbox-option-label-group">
      <span>{{ item.label }}</span>
      <small class="p-listbox-option-caption">{{ item.caption }}</small>
    </div>
  </ng-template>`;
function example(args: RenderArgs) {
  let options = args.options ?? OPTIONS;
  if (args.group && options.length && !Array.isArray(options[0]?.[args.optionGroupChildren ?? 'items'])) {
    options = [{ [args.optionGroupLabel ?? 'label']: 'Group', [args.optionGroupChildren ?? 'items']: options }];
  }
  const values = { ...args, options };
  const escape = (v: string) => v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  const fields = ['[formControl]="control"'];
  for (const key of INPUTS) {
    const value = values[key];
    if (value === undefined) continue;
    if (typeof value === 'string') fields.push(key + '="' + escape(value) + '"');
    else if (typeof value === 'boolean' || typeof value === 'number' || value === null)
      fields.push('[' + key + ']="' + value + '"');
    else fields.push('[' + key + ']="' + key + '"');
  }
  return {
    values,
    template:
      '<extra-listbox\n  ' +
      fields.join('\n  ') +
      '\n>' +
      (args.groupIcon
        ? '<ng-template extraListboxGroup let-group><i class="ti ti-check" aria-hidden="true"></i>{{ group.label }}</ng-template>'
        : '') +
      (args.custom ? CUSTOM : '') +
      '</extra-listbox>'
  };
}

const meta: Meta<ListboxArgs> = {
  title: 'Components/Form/Listbox',
  component: ExtraListboxComponent,
  tags: ['autodocs', 'listbox'],
  decorators: [
    moduleMetadata({
      imports: [ExtraListboxComponent, ExtraListboxItemDirective, ExtraListboxGroupDirective, ReactiveFormsModule]
    })
  ],
  render: (args) => {
    const data = example(args);
    const control = new FormControl(
      { value: args.value ?? null, disabled: !!args.disabled },
      args.invalid ? Validators.required : []
    );
    if (args.invalid) control.markAsTouched();
    return {
      props: {
        ...Object.fromEntries(INPUTS.map((key) => [key, data.values[key]])),
        control,
        onChange: args.onChange,
        onFilter: args.onFilter,
        onSelectAll: args.onSelectAll,
        onFocus: args.onFocus,
        onBlur: args.onBlur,
        onClose: args.onClose
      },
      template:
        '<div style="width: 240px">' +
        data.template
          .replace('</extra-listbox>', '</extra-listbox>')
          .replace(
            '\n>',
            '\n (onChange)="onChange($event)" (onFilter)="onFilter($event)" (onSelectAll)="onSelectAll($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onClose)="onClose($event)">'
          ) +
        '</div>'
    };
  },
  parameters: {
    designTokens: { prefix: '--p-listbox' },
    docs: {
      description: {
        component: `Список опций с поддержкой одиночного и множественного выбора. Поддерживает группировку, фильтрацию, галочку выбора и кастомные шаблоны пунктов.

Шаблон (передаётся между тегами компонента):
- \`extraListboxItem\` — пункт списка (контекст \`let-item\`)

\`\`\`typescript
import { ExtraListboxComponent, ExtraListboxItemDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_code: string, context: { args: RenderArgs }) => example(context.args).template
      }
    }
  },
  argTypes: {
    options: { control: 'object' },
    optionGroupLabel: { control: 'text' },
    optionGroupChildren: { control: 'text' },
    // ── Props ────────────────────────────────────────────────
    optionLabel: {
      control: 'text',
      description: 'Поле объекта для отображения текста элемента',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'label' },
        type: { summary: 'string' }
      }
    },
    optionValue: {
      control: 'text',
      description: 'Поле объекта, используемое как значение',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    multiple: {
      control: 'boolean',
      description: 'Множественный выбор (кратность значения в модели)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showFilter: {
      control: 'boolean',
      description: 'Показывать строку фильтрации',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    filterPlaceholder: {
      control: 'text',
      description: 'Placeholder строки фильтрации',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Чекбоксы у элементов и «выбрать всё» в заголовке',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    checkmark: {
      control: 'boolean',
      description: 'Показывать галочку у выбранного элемента',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    group: {
      control: 'boolean',
      description: 'Группировка элементов',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    scrollHeight: {
      control: 'text',
      description: 'Высота прокручиваемой области',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '200px' },
        type: { summary: 'string' }
      }
    },
    emptyMessage: {
      control: 'text',
      description: 'Текст при пустом списке',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    readonly: { control: 'boolean', description: 'Только для чтения' },
    required: { control: 'boolean', description: 'Обязательный выбор' },
    ariaLabel: { control: 'text', description: 'Метка списка для программ экранного доступа' },
    ariaLabelledBy: { control: 'text', description: 'ID внешнего заголовка списка' },
    autofocus: { control: 'boolean', description: 'Автофокус на списке после монтирования' },
    tabindex: { control: 'number', description: 'Порядок перехода по Tab' },
    showHeader: { control: 'boolean', description: 'Отображать шапку списка' },
    showClose: { control: 'boolean', description: 'Кнопка закрытия в шапке списка' },
    overlay: { control: 'boolean', description: 'Тень списка как у оверлея' },
    striped: { control: 'boolean', description: 'Чередование фона строк' },
    disabled: { control: 'boolean', description: 'Отключение через FormControl' },
    invalid: { control: 'boolean', description: 'Ошибка FormControl' },
    groupIcon: { control: 'boolean' },
    custom: { control: 'boolean', description: 'Шаблон пункта с иконкой и подписью' },
    value: { control: 'object', description: 'Значение FormControl' },
    onClose: { control: false, description: 'Запрос закрытия списка' },
    // ── События ───────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Событие изменения выбора',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraListboxChangeEvent>' }
      }
    },
    onFilter: {
      control: false,
      description: 'Событие фильтрации',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraListboxFilterEvent>' }
      }
    },
    onSelectAll: {
      control: false,
      description: 'Событие переключения «выбрать всё»',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraListboxSelectAllChangeEvent>' }
      }
    },
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    }
  },
  args: {
    options: OPTIONS,
    optionLabel: 'label',
    optionValue: undefined,
    multiple: true,
    showFilter: true,
    filterPlaceholder: 'Filter',
    showCheckbox: true,
    checkmark: false,
    group: false,
    optionGroupLabel: 'label',
    optionGroupChildren: 'items',
    scrollHeight: '108px',
    emptyMessage: 'Text empty',
    readonly: false,
    required: false,
    ariaLabel: 'Список опций',
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    showHeader: true,
    showClose: true,
    overlay: false,
    striped: false,
    disabled: false,
    invalid: false,
    value: [],
    custom: false,
    groupIcon: false,
    onChange: fn(),
    onFilter: fn(),
    onSelectAll: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClose: fn()
  }
};
export default meta;
type Story = StoryObj<ListboxArgs>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: { story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.' }
    }
  }
};

export const Error: Story = {
  name: 'Error',
  args: { invalid: true }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  parameters: { docs: { description: { story: 'Список в отключённом состоянии — взаимодействие заблокировано.' } } }
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { readonly: true }
};

export const Empty: Story = {
  name: 'Empty',
  args: { options: [] }
};

export const WithoutHeader: Story = {
  name: 'WithoutHeader',
  args: { showHeader: false }
};

export const Overlay: Story = {
  name: 'Overlay',
  args: { overlay: true }
};

export const Checkmark: Story = {
  name: 'Checkmark',
  args: { checkmark: true, showCheckbox: false, multiple: false, value: OPTIONS[0] },
  parameters: { docs: { description: { story: 'Галочка рядом с выбранным элементом.' } } }
};

export const Checkbox: Story = {
  name: 'Checkbox',
  args: { multiple: true, showCheckbox: true, value: [] },
  parameters: {
    docs: {
      description: {
        story: 'Чекбоксы у элементов и чекбокс «выбрать всё» в заголовке (`showCheckbox`, требует `multiple=true`).'
      }
    }
  }
};

export const Multiple: Story = {
  name: 'Multiple',
  args: { multiple: true, showCheckbox: false, value: [] },
  parameters: { docs: { description: { story: 'Множественный выбор элементов.' } } }
};

export const Filter: Story = {
  name: 'Filter',
  args: { showFilter: true },
  parameters: { docs: { description: { story: 'Фильтрация списка по введённому тексту.' } } }
};

export const Grouped: Story = {
  name: 'Grouped',
  args: { group: true },
  parameters: { docs: { description: { story: 'Группировка элементов с заголовками категорий.' } } }
};

export const Custom: Story = {
  name: 'Custom',
  args: { custom: true, showCheckbox: false, multiple: false, value: null },
  parameters: {
    docs: {
      description: { story: 'Кастомный шаблон элемента с иконкой и подписью через директиву `extraListboxItem`.' }
    }
  }
};

export const Striped: Story = {
  name: 'Striped',
  args: { striped: true }
};

export const GroupedIcon: Story = {
  name: 'GroupedIcon',
  args: { group: true, groupIcon: true }
};
