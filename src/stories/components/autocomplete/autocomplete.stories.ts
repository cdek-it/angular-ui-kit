import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { AutoCompleteComponent } from '../../../lib/components/autocomplete/autocomplete.component';
import { AutoCompleteDropdownComponent, Dropdown } from './examples/autocomplete-dropdown.component';
import { AutoCompleteMultipleComponent, Multiple } from './examples/autocomplete-multiple.component';
import { AutoCompleteObjectsComponent, Objects } from './examples/autocomplete-objects.component';
import { AutoCompleteDisabledComponent, Disabled } from './examples/autocomplete-disabled.component';
import { AutoCompleteInvalidComponent, Invalid } from './examples/autocomplete-invalid.component';

const CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Самара', 'Омск'];

const meta: Meta<AutoCompleteComponent> = {
  title: 'Components/Form/AutoComplete',
  component: AutoCompleteComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        AutoCompleteComponent,
        FormsModule,
        AutoCompleteDropdownComponent,
        AutoCompleteMultipleComponent,
        AutoCompleteObjectsComponent,
        AutoCompleteDisabledComponent,
        AutoCompleteInvalidComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-autocomplete' },
    docs: {
      description: {
        component: `Поле ввода с автодополнением, поддерживающее одиночный и множественный выбор, объекты, кнопку выпадающего списка и фильтрацию.

\`\`\`typescript
import { AutoCompleteComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
      story: { height: '300px' },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Текст-подсказка',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Режим множественного выбора',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    dropdown: {
      control: 'boolean',
      description: 'Показывать кнопку выпадающего списка',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showClear: {
      control: 'boolean',
      description: 'Показывать кнопку очистки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    forceSelection: {
      control: 'boolean',
      description: 'Ограничить ввод только значениями из списка',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Props',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает возможность взаимодействия',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Подсвечивает поле как невалидное',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    // Hidden props
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
    readonly: { table: { disable: true } },
    unique: { table: { disable: true } },
    dataKey: { table: { disable: true } },
    inputStyleClass: { table: { disable: true } },
    inputId: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    ariaLabelledBy: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    computedInputStyleClass: { table: { disable: true } },

    // Events
    completeMethod: {
      control: false,
      description: 'Событие запроса автодополнения',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<AutoCompleteCompleteEvent>' },
      },
    },
    onSelect: {
      control: false,
      description: 'Событие выбора элемента',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<AutoCompleteSelectEvent>' },
      },
    },
    onUnselect: {
      control: false,
      description: 'Событие отмены выбора (multiple)',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<AutoCompleteUnselectEvent>' },
      },
    },
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Event>' },
      },
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Event>' },
      },
    },
    onClear: {
      control: false,
      description: 'Событие очистки значения',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<void>' },
      },
    },
    onDropdownClick: {
      control: false,
      description: 'Событие клика по кнопке dropdown',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<AutoCompleteDropdownClickEvent>' },
      },
    },
  },
  args: {
    placeholder: 'Начните ввод...',
    multiple: false,
    dropdown: false,
    showClear: false,
    forceSelection: false,
    size: 'base',
    disabled: false,
    invalid: false,
    fluid: false,
  },
};

export default meta;
type Story = StoryObj<AutoCompleteComponent>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.placeholder)                  parts.push(`placeholder="${args.placeholder}"`);
    if (args.multiple)                     parts.push(`[multiple]="true"`);
    if (args.dropdown)                     parts.push(`[dropdown]="true"`);
    if (args.showClear)                    parts.push(`[showClear]="true"`);
    if (args.forceSelection)               parts.push(`[forceSelection]="true"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.disabled)                     parts.push(`[disabled]="true"`);
    if (args.invalid)                      parts.push(`[invalid]="true"`);
    if (args.fluid)                        parts.push(`[fluid]="true"`);

    parts.push(`[suggestions]="filtered"`);
    parts.push(`(completeMethod)="search($event)"`);
    parts.push(`[(ngModel)]="value"`);

    const template = `<auto-complete\n  ${parts.join('\n  ')}\n></auto-complete>`;

    const props: Record<string, any> = {
      ...args,
      value: null,
      filtered: [] as string[],
      search: (event: any) => {
        props['filtered'] = CITIES.filter(c =>
          c.toLowerCase().includes((event.query || '').toLowerCase())
        );
      },
    };

    return { props, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Re-exports from example components ────────────────────────────────────
export { Dropdown, Multiple, Objects, Disabled, Invalid };
