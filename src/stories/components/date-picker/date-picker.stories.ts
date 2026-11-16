import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { fn } from 'storybook/test';
import { ExtraDatePickerComponent } from '../../../lib/components/date-picker/date-picker.component';

type DatePickerArgs = Pick<
  ExtraDatePickerComponent,
  | 'size'
  | 'selectionMode'
  | 'showIcon'
  | 'showButtonBar'
  | 'showTime'
  | 'inline'
  | 'invalid'
  | 'readonly'
  | 'placeholder'
  | 'dateFormat'
  | 'hourLabel'
  | 'minuteLabel'
  | 'clearable'
  | 'iconDisplay'
  | 'minDate'
  | 'maxDate'
  | 'view'
  | 'showOtherMonths'
  | 'selectOtherMonths'
  | 'label'
  | 'labelPosition'
  | 'floatLabel'
  | 'caption'
  | 'captionSeverity'
  | 'info'
  | 'required'
  | 'fluid'
  | 'inputId'
  | 'name'
  | 'autocomplete'
  | 'ariaLabel'
  | 'ariaLabelledBy'
  | 'autofocus'
  | 'tabindex'
  | 'onSelect'
  | 'onMonthChange'
  | 'onYearChange'
  | 'onClear'
  | 'onInput'
  | 'onFocus'
  | 'onBlur'
  | 'onShow'
  | 'onHide'
  | 'onTodayClick'
  | 'onClearClick'
> & { hourFormat: string | number; disabled: boolean; value: Date | Date[] | number | null };
type RenderArgs = Partial<
  Omit<
    DatePickerArgs,
    | 'onSelect'
    | 'onMonthChange'
    | 'onYearChange'
    | 'onClear'
    | 'onInput'
    | 'onFocus'
    | 'onBlur'
    | 'onShow'
    | 'onHide'
    | 'onTodayClick'
    | 'onClearClick'
  >
>;
const INPUTS = [
  'size',
  'selectionMode',
  'showIcon',
  'showButtonBar',
  'showTime',
  'inline',
  'invalid',
  'readonly',
  'placeholder',
  'dateFormat',
  'hourLabel',
  'minuteLabel',
  'clearable',
  'iconDisplay',
  'hourFormat',
  'minDate',
  'maxDate',
  'view',
  'showOtherMonths',
  'selectOtherMonths',
  'label',
  'labelPosition',
  'floatLabel',
  'caption',
  'captionSeverity',
  'info',
  'required',
  'fluid',
  'inputId',
  'name',
  'autocomplete',
  'ariaLabel',
  'ariaLabelledBy',
  'autofocus',
  'tabindex'
] as const;
const SAMPLE_DATE = new Date(2026, 10, 17, 10, 30);

@Component({
  selector: 'extra-date-picker-story-host',
  standalone: true,
  template: '<ng-content />',
  encapsulation: ViewEncapsulation.None,
  styles: ['extra-date-picker-story-host { display: block; width: 100%; }']
})
class DatePickerStoryHostComponent {}

function componentInputs(args: RenderArgs) {
  return Object.fromEntries(
    INPUTS.filter((key) => key !== 'invalid' && args[key] !== undefined).map((key) => [
      key,
      key === 'hourFormat'
        ? String(args[key])
        : ['minDate', 'maxDate'].includes(key) && typeof args[key] === 'number'
          ? new Date(args[key] as number)
          : args[key]
    ])
  );
}
const DEFAULTS: Record<string, unknown> = {
  size: 'base',
  selectionMode: 'single',
  showIcon: true,
  iconDisplay: 'input',
  inline: false,
  showButtonBar: false,
  showTime: false,
  hourFormat: '24',
  clearable: false,
  readonly: false,
  invalid: false,
  view: 'day',
  showOtherMonths: true,
  selectOtherMonths: false,
  hourLabel: 'Часы',
  minuteLabel: 'Минуты',
  dateFormat: 'dd.mm.yy',
  label: '',
  labelPosition: 'top',
  floatLabel: false,
  caption: '',
  captionSeverity: 'base',
  info: '',
  required: false,
  fluid: false,
  autocomplete: 'off',
  autofocus: false
};
function datePickerSource(args: RenderArgs): string {
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const attrs = ['[formControl]="control"'];
  for (const [key, value] of Object.entries(componentInputs(args))) {
    if (DEFAULTS[key] === value) continue;
    if (typeof value === 'string') attrs.push(key + '="' + escape(value) + '"');
    else if (typeof value === 'boolean' || typeof value === 'number') attrs.push('[' + key + ']="' + value + '"');
    else attrs.push('[' + key + ']="' + key + '"');
  }
  return '<extra-date-picker\n  ' + attrs.join('\n  ') + '\n></extra-date-picker>';
}
function render(args: RenderArgs) {
  const inputs = componentInputs(args);
  let value = args.value ?? null;
  if (typeof value === 'number') value = new Date(value);
  if (value && !Array.isArray(value) && args.selectionMode !== 'single' && args.selectionMode !== undefined)
    value = [value];
  const control = new FormControl<Date | Date[] | null>(
    { value, disabled: !!args.disabled },
    args.invalid ? Validators.required : []
  );
  if (args.invalid) control.markAsTouched();
  const bindings = Object.keys(inputs).map((key) => '[' + key + ']="' + key + '"');
  return {
    props: { ...args, ...inputs, control },
    template:
      '<extra-date-picker-story-host><extra-date-picker [formControl]="control" ' +
      bindings.join(' ') +
      ' (onSelect)="onSelect($event)" (onMonthChange)="onMonthChange($event)" (onYearChange)="onYearChange($event)" (onClear)="onClear($event)" (onInput)="onInput($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)" (onShow)="onShow($event)" (onHide)="onHide($event)" (onTodayClick)="onTodayClick($event)" (onClearClick)="onClearClick($event)"></extra-date-picker></extra-date-picker-story-host>'
  };
}

const meta: Meta<DatePickerArgs> = {
  title: 'Components/Form/DatePicker',
  component: ExtraDatePickerComponent,
  tags: ['autodocs', 'datepicker'],
  decorators: [
    moduleMetadata({ imports: [ReactiveFormsModule, ExtraDatePickerComponent, DatePickerStoryHostComponent] })
  ],
  render,
  parameters: {
    docs: {
      description: {
        component: `Компонент выбора даты и времени. Реализует \`ControlValueAccessor\` — работает с реактивными формами и \`ngModel\`. [Figma Design](https://www.figma.com/design/4TYeki0MDLhfPGJstbIicf/UI-kit-PrimeFace-(DS)?node-id=484-5726).

\`\`\`typescript
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_source: string, context: { args: RenderArgs }) => datePickerSource(context.args)
      }
    },
    designTokens: { prefix: '--p-datepicker' }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля ввода',
      table: {
        category: 'Props',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'Режим выбора даты',
      table: {
        category: 'Props',
        defaultValue: { summary: 'single' },
        type: { summary: "'single' | 'multiple' | 'range'" }
      }
    },
    showIcon: {
      control: 'boolean',
      description: 'Отображает иконку календаря',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' }
      }
    },
    showButtonBar: {
      control: 'boolean',
      description: 'Отображает кнопки «Сегодня» и «Очистить» в подвале панели',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' }
      }
    },
    showTime: {
      control: 'boolean',
      description: 'Включает выбор времени',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' }
      }
    },
    inline: {
      control: 'boolean',
      description: 'Отображает календарь инлайн без поля ввода',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' }
      }
    },
    invalid: {
      control: 'boolean',
      description: 'Флаг невалидности поля (меняет цвет границ)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Управляется через FormControl (setDisabledState)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Переводит поле в режим «только чтение»',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Текст подсказки внутри поля',
      table: {
        category: 'Props'
      }
    },
    dateFormat: {
      control: 'text',
      description: 'Формат отображения даты',
      table: {
        category: 'Props',
        defaultValue: { summary: 'dd.mm.yy' }
      }
    },
    hourLabel: {
      control: 'text',
      description: 'Подпись поля часов в блоке времени',
      table: {
        category: 'Props',
        defaultValue: { summary: 'Часы' },
        type: { summary: 'string' }
      }
    },
    minuteLabel: {
      control: 'text',
      description: 'Подпись поля минут в блоке времени',
      table: {
        category: 'Props',
        defaultValue: { summary: 'Минуты' },
        type: { summary: 'string' }
      }
    },
    onSelect: {
      control: false,
      description: 'Событие выбора даты',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Date>' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Отображает иконку очистки содержимого поля',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' }
      }
    },
    iconDisplay: { control: 'select', options: ['input', 'button'], table: { category: 'Props' } },
    hourFormat: { control: 'select', options: [24, 12], table: { category: 'Props' } },
    minDate: { control: 'date', table: { category: 'Props' } },
    maxDate: { control: 'date', table: { category: 'Props' } },
    view: { control: 'select', options: ['day', 'month', 'year', 'time', 'date'], table: { category: 'Props' } },
    showOtherMonths: { control: 'boolean', table: { category: 'Props' } },
    selectOtherMonths: { control: 'boolean', table: { category: 'Props' } },
    label: { control: 'text', table: { category: 'Props' } },
    labelPosition: { control: 'select', options: ['top', 'left'], table: { category: 'Props' } },
    floatLabel: { control: 'boolean', table: { category: 'Props' } },
    caption: { control: 'text', table: { category: 'Props' } },
    captionSeverity: {
      control: 'select',
      options: ['base', 'danger', 'success', 'warning', 'info'],
      table: { category: 'Props' }
    },
    info: { control: 'text', table: { category: 'Props' } },
    required: { control: 'boolean', table: { category: 'Props' } },
    fluid: { control: 'boolean', table: { category: 'Props' } },
    inputId: { control: 'text', table: { category: 'Props' } },
    name: { control: 'text', table: { category: 'Props' } },
    autocomplete: { control: 'text', table: { category: 'Props' } },
    ariaLabel: { control: 'text', table: { category: 'Props' } },
    ariaLabelledBy: { control: 'text', table: { category: 'Props' } },
    autofocus: { control: 'boolean', table: { category: 'Props' } },
    tabindex: { control: 'number', table: { category: 'Props' } },
    value: { control: 'date', table: { category: 'Props' } },
    onMonthChange: { control: false, table: { category: 'Events' } },
    onYearChange: { control: false, table: { category: 'Events' } },
    onClear: { control: false, table: { category: 'Events' } },
    onInput: { control: false, table: { category: 'Events' } },
    onFocus: { control: false, table: { category: 'Events' } },
    onBlur: { control: false, table: { category: 'Events' } },
    onShow: { control: false, table: { category: 'Events' } },
    onHide: { control: false, table: { category: 'Events' } },
    onTodayClick: { control: false, table: { category: 'Events' } },
    onClearClick: { control: false, table: { category: 'Events' } }
  },
  args: {
    ...DEFAULTS,
    hourFormat: 24,
    size: 'base',
    selectionMode: 'single',
    showIcon: true,
    clearable: false,
    showButtonBar: false,
    showTime: false,
    inline: false,
    invalid: false,
    disabled: false,
    readonly: false,
    placeholder: 'Calendar',
    dateFormat: 'dd.mm.yy',
    label: 'Label',
    caption: 'Caption',
    info: 'Info',
    required: true,
    floatLabel: false,
    fluid: false,
    onSelect: fn(),
    onMonthChange: fn(),
    onYearChange: fn(),
    onClear: fn(),
    onInput: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onShow: fn(),
    onHide: fn(),
    onTodayClick: fn(),
    onClearClick: fn()
  }
};
export default meta;
type Story = StoryObj<DatePickerArgs>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: { story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.' }
    }
  }
};

export const Error: Story = {
  args: { invalid: true, captionSeverity: 'danger' },
  parameters: { docs: { description: { story: 'Невалидное состояние поля выбора даты.' } } }
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: { docs: { description: { story: 'Заблокированное поле выбора даты (через FormControl).' } } }
};

export const Readonly: Story = { args: { readonly: true, value: SAMPLE_DATE } };

export const FloatLabel: Story = { args: { floatLabel: true } };

export const Range: Story = {
  args: { selectionMode: 'range', placeholder: 'Период доставки' },
  parameters: {
    docs: { description: { story: 'Выбор диапазона дат для указания периода доставки.' } }
  }
};

export const Clearable: Story = {
  args: { clearable: true, value: SAMPLE_DATE },
  parameters: { docs: { description: { story: 'Иконка очистки для быстрого сброса выбранной даты.' } } }
};

export const Fluid: Story = { args: { fluid: true } };

export const Inline: Story = {
  args: { inline: true, label: '', caption: '' },
  parameters: { docs: { description: { story: 'Инлайн-календарь без поля ввода.' } } }
};

export const Time: Story = {
  args: { showTime: true },
  parameters: { docs: { description: { story: 'Выбор даты и времени для указания точного момента отправки.' } } }
};

export const TimeOnly: Story = { args: { view: 'time' } };

export const ButtonBar: Story = {
  args: { showButtonBar: true },
  parameters: { docs: { description: { story: 'Панель кнопок «Сегодня» и «Очистить» для быстрого выбора.' } } }
};
