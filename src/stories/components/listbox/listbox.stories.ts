import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';
import { ExtraListboxComponent } from '../../../lib/components/listbox/listbox.component';
import { Checkmark, ListboxCheckmarkComponent } from './examples/listbox-checkmark.component';
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
        Listbox,
        ListboxCheckmarkComponent,
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

\`\`\`typescript
import { ExtraListboxComponent } from '@cdek-it/angular-ui-kit';
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
        category: 'Props',
        defaultValue: { summary: 'label' },
        type: { summary: 'string' }
      }
    },
    optionValue: {
      control: 'text',
      description: 'Поле объекта, используемое как значение',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    multiple: {
      control: 'boolean',
      description: 'Множественный выбор',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    filter: {
      control: 'boolean',
      description: 'Показывать строку фильтрации',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    filterPlaceHolder: {
      control: 'text',
      description: 'Placeholder строки фильтрации',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    checkmark: {
      control: 'boolean',
      description: 'Показывать галочку у выбранного элемента',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    group: {
      control: 'boolean',
      description: 'Группировка элементов',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    scrollHeight: {
      control: 'text',
      description: 'Высота прокручиваемой области',
      table: {
        category: 'Props',
        defaultValue: { summary: '200px' },
        type: { summary: 'string' }
      }
    },
    emptyMessage: {
      control: 'text',
      description: 'Текст при пустом списке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    // ── Events ───────────────────────────────────────────────
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    }
  },
  args: {
    optionLabel: 'label',
    multiple: false,
    filter: false,
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
  [filter]="filter"
  [filterPlaceHolder]="filterPlaceHolder"
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

export { Checkmark, Filter, Multiple, Grouped, Custom, Disabled };
