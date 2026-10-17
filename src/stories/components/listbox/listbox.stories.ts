import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraListboxComponent } from '../../../lib/components/listbox/listbox.component';
import { Checkmark, ListboxCheckmarkComponent } from './examples/listbox-checkmark.component';
import { Checkbox, ListboxCheckboxComponent } from './examples/listbox-checkbox.component';
import { Filter, ListboxFilterComponent } from './examples/listbox-filter.component';
import { ListboxMultipleComponent, Multiple } from './examples/listbox-multiple.component';
import { Grouped, ListboxGroupedComponent } from './examples/listbox-grouped.component';
import { Custom, ListboxCustomComponent } from './examples/listbox-custom.component';
import { Disabled, ListboxDisabledComponent } from './examples/listbox-disabled.component';

type ListboxArgs = ExtraListboxComponent;

const meta: Meta<ListboxArgs> = {
  title: 'Components/Form/Listbox',
  component: ExtraListboxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraListboxComponent,
        ReactiveFormsModule,
        ListboxCheckmarkComponent,
        ListboxCheckboxComponent,
        ListboxFilterComponent,
        ListboxMultipleComponent,
        ListboxGroupedComponent,
        ListboxCustomComponent,
        ListboxDisabledComponent
      ]
    })
  ],
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
      }
    }
  },
  argTypes: {
    options: { table: { disable: true } },
    optionGroupLabel: { table: { disable: true } },
    optionGroupChildren: { table: { disable: true } },
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
    // ── События ───────────────────────────────────────────────
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
    optionLabel: 'label',
    multiple: false,
    showFilter: false,
    showCheckbox: false,
    checkmark: false,
    group: false,
    scrollHeight: '200px'
  }
};

export default meta;
type Story = StoryObj<ListboxArgs>;

const defaultOptions = [
  { label: 'New York', value: 'NY' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' }
];

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: {
      ...args,
      ctrl: new FormControl(null),
      options: defaultOptions
    },
    template: `
<extra-listbox
  [formControl]="ctrl"
  [options]="options"
  [optionLabel]="optionLabel"
  [multiple]="multiple"
  [showFilter]="showFilter"
  [filterPlaceholder]="filterPlaceholder"
  [showCheckbox]="showCheckbox"
  [checkmark]="checkmark"
  [scrollHeight]="scrollHeight"
  [emptyMessage]="emptyMessage"
></extra-listbox>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Варианты ─────────────────────────────────────────────────────────────────

export { Checkmark, Checkbox, Filter, Multiple, Grouped, Custom, Disabled };
