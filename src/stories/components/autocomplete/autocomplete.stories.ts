import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraAutoCompleteComponent } from '../../../lib/components/autocomplete/autocomplete.component';

/** Хост-обёртка сториса: фиксирует ширину поля шириной референса Figma (272px).
 *  encapsulation: None — стили должны действовать на PrimeNG-разметку внутри extra-autocomplete. */
@Component({
  selector: 'autocomplete-story-host',
  standalone: true,
  imports: [ExtraAutoCompleteComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="autocomplete-story-fix"><ng-content></ng-content></div>`,
  styles: `
    .autocomplete-story-fix {
      width: 272px;
    }

    .autocomplete-story-fix .p-autocomplete {
      width: 100%;
    }
  `
})
class AutoCompleteStoryHostComponent {}

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

const GROUPED_CITIES = [
  { label: 'Города', items: ['Москва', 'Санкт-Петербург'] },
  { label: 'Регионы', items: ['Новосибирск', 'Екатеринбург'] }
];

type AutoCompleteArgs = ExtraAutoCompleteComponent & {
  disabled: boolean;
  invalid: boolean;
};

const meta: Meta<AutoCompleteArgs> = {
  title: 'Components/Form/AutoComplete',
  component: ExtraAutoCompleteComponent,
  tags: ['autodocs', 'autocomplete'],
  decorators: [
    moduleMetadata({
      imports: [ExtraAutoCompleteComponent, ReactiveFormsModule, AutoCompleteStoryHostComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-autocomplete' },
    docs: {
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_source: string, context: { args: Partial<AutoCompleteArgs> }) => autoCompleteSource(context.args)
      },
      description: {
        component: `Поле ввода с автодополнением, поддерживающее одиночный и множественный выбор, объекты, кнопку выпадающего списка, группировку и фильтрацию. Поддерживает встроенные label/caption/info.

Реализован по спецификации \`docs/components-api/autocomplete.md\`.

\`\`\`typescript
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства ─────────────────────────────────────────────
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
      description: 'Текст-подсказка при пустом поле',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
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
      description: 'Группировка подсказок (suggestions с группами)',
      table: {
        category: 'Данные',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    suggestions: {
      control: 'object',
      description: 'Массив подсказок или групп (заполняется обработчиком completeMethod)',
      table: { category: 'Данные', type: { summary: 'any[]' } }
    },
    optionLabel: {
      control: 'text',
      description: 'Поле опции с текстом',
      table: { category: 'Данные', type: { summary: 'string' } }
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
    dropdownMode: {
      control: 'select',
      options: ['blank', 'current'],
      description: 'Режим кнопки dropdown: подсказки с нуля или от текущего значения',
      table: {
        category: 'Данные',
        defaultValue: { summary: "'blank'" },
        type: { summary: "'blank' | 'current'" }
      }
    },
    completeOnFocus: {
      control: 'boolean',
      description: 'Показывать подсказки при фокусе',
      table: {
        category: 'Данные',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    minLength: {
      control: { type: 'number', step: 1 },
      description: 'Минимальная длина запроса для подсказок',
      table: {
        category: 'Данные',
        defaultValue: { summary: '1' },
        type: { summary: 'number' }
      }
    },
    delay: {
      control: { type: 'number', step: 50 },
      description: 'Задержка перед вызовом completeMethod, мс',
      table: {
        category: 'Данные',
        defaultValue: { summary: '300' },
        type: { summary: 'number' }
      }
    },
    scrollHeight: {
      control: 'text',
      description: 'Высота прокрутки списка подсказок',
      table: {
        category: 'Данные',
        defaultValue: { summary: "'200px'" },
        type: { summary: 'string' }
      }
    },
    emptyMessage: {
      control: 'text',
      description: 'Текст при пустом списке подсказок',
      table: { category: 'Данные', type: { summary: 'string' } }
    },
    unique: {
      control: 'boolean',
      description: 'Запрет повторного выбора значения (multiple)',
      table: {
        category: 'Данные',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    dataKey: {
      control: 'text',
      description: 'Ключ сравнения объектов-значений',
      table: { category: 'Данные', type: { summary: 'string' } }
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
    name: {
      control: 'text',
      description: 'Атрибут name нативного input',
      table: { category: 'Дополнительно', type: { summary: 'string' } }
    },
    autocomplete: {
      control: 'text',
      description: 'Атрибут autocomplete нативного input',
      table: { category: 'Дополнительно', type: { summary: 'string' } }
    },
    chipIcon: {
      control: 'text',
      description: 'Класс иконки удаления chip',
      table: { category: 'Дополнительно', type: { summary: 'string' } }
    },
    // ── Внутренние (не контролируются) ─────────────────────────
    computedInputStyleClass: { table: { disable: true } },
    invalid: { control: 'boolean', description: 'Невалидное состояние — вычисляется из NgControl (Validators)' },
    disabled: { control: 'boolean', description: 'Отключает взаимодействие — управляется через FormControl' },
    modelValue: { table: { disable: true } },
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
    label: 'Label',
    labelPosition: 'top',
    floatLabel: false,
    multiple: false,
    showCheckbox: false,
    chipClearable: true,
    dropdown: false,
    clearable: false,
    forceSelection: false,
    caption: 'Caption',
    captionSeverity: 'base',
    info: 'Info',
    placeholder: 'Placeholder',
    size: 'base',
    readonly: false,
    fluid: false,
    required: false,
    group: false,
    suggestions: [],
    optionLabel: undefined,
    optionValue: undefined,
    optionDisabled: undefined,
    optionGroupLabel: 'label',
    optionGroupChildren: 'items',
    dropdownMode: 'blank',
    completeOnFocus: false,
    minLength: 1,
    delay: 300,
    scrollHeight: '200px',
    emptyMessage: undefined,
    unique: false,
    dataKey: undefined,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    name: undefined,
    autocomplete: undefined,
    chipIcon: undefined,
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<AutoCompleteArgs>;

// ── Один рендер компонента: все свойства настраиваются в Controls ────────────
type RenderArgs = Partial<
  Pick<
    AutoCompleteArgs,
    'multiple' | 'disabled' | 'invalid' | 'group' | 'fluid' | 'suggestions' | 'optionLabel' | 'optionGroupChildren'
  >
>;

const autoCompleteSource = (args: Partial<AutoCompleteArgs>): string => {
  const defaults: Record<string, unknown> = {
    ...meta.args,
    label: '',
    caption: '',
    info: '',
    placeholder: undefined,
    optionGroupLabel: undefined,
    optionGroupChildren: undefined
  };
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const attributes = Object.entries(args)
    .filter(([key, value]) => {
      const input = meta.argTypes?.[key as keyof AutoCompleteArgs];
      return (
        !['invalid', 'disabled', 'suggestions'].includes(key) &&
        !!input?.control &&
        value !== undefined &&
        value !== defaults[key as keyof AutoCompleteArgs]
      );
    })
    .map(([key, value]) =>
      typeof value === 'string' ? `${key}="${escape(value)}"` : `[${key}]="${escape(JSON.stringify(value))}"`
    );
  return `<extra-auto-complete
  [formControl]="control"
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  ${attributes.join('\n  ')}
></extra-auto-complete>`;
};

const renderAutoComplete = (args: RenderArgs) => {
  const inputs = Object.keys(meta.argTypes ?? {}).filter(
    (key) =>
      !['invalid', 'disabled', 'suggestions'].includes(key) && !!meta.argTypes?.[key as keyof AutoCompleteArgs]?.control
  );
  const bindings = inputs.map((key) => `[${key}]="${key}"`).join('\n  ');
  const field = `<extra-auto-complete
  ${bindings}
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [formControl]="control"
></extra-auto-complete>`;
  const control = new FormControl<string | string[] | null>(
    { value: args.multiple ? [] : null, disabled: !!args.disabled },
    args.invalid ? [Validators.required] : []
  );
  if (args.invalid) control.markAsTouched();

  const { invalid: _invalid, disabled: _disabled, ...inputArgs } = args;
  return {
    props: {
      ...inputArgs,
      control,
      filtered: args.suggestions ?? [],
      search(this: { filtered: unknown[] }, event: { query: string }) {
        const query = (event.query || '').toLowerCase();
        const source = args.suggestions?.length ? args.suggestions : args.group ? GROUPED_CITIES : CITIES;
        const matches = (option: unknown) => {
          const label =
            args.optionLabel && typeof option === 'object' && option !== null
              ? (option as Record<string, unknown>)[args.optionLabel]
              : option;
          return String(label ?? '')
            .toLowerCase()
            .includes(query);
        };
        const children = args.optionGroupChildren ?? 'items';
        this.filtered = args.group
          ? source
              .map((group) => ({
                ...group,
                [children]: (group[children] ?? []).filter(matches)
              }))
              .filter((group) => group[children].length > 0)
          : source.filter(matches);
      }
    },
    template: args.fluid ? field : `<autocomplete-story-host>${field}</autocomplete-story-host>`
  };
};

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => renderAutoComplete(args),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Error / Disabled / Dropdown / Multiple / Grouped / Fluid: пресеты Figma ──
export const Error: Story = {
  name: 'Error',
  args: { invalid: true, captionSeverity: 'danger' },
  render: (args) => renderAutoComplete(args),
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
  render: (args) => renderAutoComplete(args),
  parameters: {
    docs: {
      description: { story: 'Поле автодополнения в отключённом состоянии — управляется через FormControl.' }
    }
  }
};

export const Dropdown: Story = {
  name: 'Dropdown',
  args: { dropdown: true },
  render: (args) => renderAutoComplete(args),
  play: async ({ canvasElement, args }) => {
    if (args.disabled || args.readonly || !args.dropdown || args.multiple || args.group || args.suggestions?.length)
      return;
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    const button = canvasElement.querySelector<HTMLButtonElement>('.p-autocomplete-dropdown');
    await expect(button).not.toBeNull();
    await expect(button!.getBoundingClientRect().width).toBeLessThan(60);
    await userEvent.click(button!);
    await userEvent.click(await canvas.findByRole('option', { name: 'Москва' }));
    await expect(input).toHaveValue('Москва');
    await userEvent.clear(input);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(canvasElement.querySelector('.p-autocomplete-overlay')).toBeNull());
    await userEvent.tab();
  },
  parameters: {
    docs: {
      description: { story: 'Автодополнение с кнопкой выпадающего списка для отображения всех вариантов.' }
    }
  }
};

export const Multiple: Story = {
  name: 'Multiple',
  args: { multiple: true, showCheckbox: true },
  render: (args) => renderAutoComplete(args),
  play: async ({ canvasElement, args }) => {
    if (args.disabled || args.readonly || !args.multiple || args.group || args.suggestions?.length) return;
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    const expectedHeight = { small: 36, base: 42, large: 50, xlarge: 56 }[args.size ?? 'base'];
    if (!args.floatLabel) {
      await expect(canvasElement.querySelector('.p-autocomplete-input-multiple')!.getBoundingClientRect().height).toBe(
        expectedHeight
      );
    }
    await userEvent.type(input, 'Мо');
    await userEvent.click(await canvas.findByRole('option', { name: 'Москва' }));
    await expect(canvasElement.querySelector('.p-chip-label')).toHaveTextContent('Москва');
    const remove = canvasElement.querySelector<HTMLElement>('.p-chip-remove-icon');
    if (args.chipClearable) {
      await userEvent.click(remove!);
      await waitFor(() => expect(canvasElement.querySelector('.p-chip')).toBeNull());
    } else {
      await expect(remove).not.toBeVisible();
      await userEvent.click(input);
      await userEvent.keyboard('{Backspace}');
    }
    await userEvent.tab();
  },
  parameters: {
    docs: {
      description: {
        story:
          'Множественный выбор с отображением выбранных значений в виде chips и чекбоксом (`showCheckbox`) у каждой опции в списке.'
      }
    }
  }
};

export const Grouped: Story = {
  name: 'Grouped',
  args: { group: true },
  render: (args) => renderAutoComplete(args)
};

export const Fluid: Story = {
  name: 'Fluid',
  args: { fluid: true },
  render: (args) => renderAutoComplete(args)
};
