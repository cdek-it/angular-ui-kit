import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fn } from 'storybook/test';
import { ExtraRadiobuttonComponent } from '../../../lib/components/radiobutton/radiobutton.component';
const INPUTS = [
  'label',
  'labelPosition',
  'caption',
  'value',
  'name',
  'required',
  'ariaLabel',
  'ariaLabelledBy',
  'autofocus',
  'tabindex'
] as const;
type RadioArgs = Pick<
  ExtraRadiobuttonComponent,
  (typeof INPUTS)[number] | 'onClick' | 'onFocus' | 'onBlur' | 'modelValue' | 'inputId'
> & { checked: boolean; disabled: boolean; invalid: boolean };
type RenderArgs = Partial<Pick<RadioArgs, (typeof INPUTS)[number] | 'checked' | 'disabled' | 'invalid'>>;
function source(args: RenderArgs) {
  const parts = ['[formControl]="control"'];
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  for (const key of INPUTS) {
    const value = args[key];
    if (value === undefined) continue;
    if (typeof value === 'string') parts.push(key + '="' + escape(value) + '"');
    else parts.push('[' + key + ']="' + escape(JSON.stringify(value)) + '"');
  }
  return '<extra-radiobutton\n  ' + parts.join('\n  ') + '\n></extra-radiobutton>';
}
const meta: Meta<RadioArgs> = {
  title: 'Components/Form/RadioButton',
  component: ExtraRadiobuttonComponent,
  tags: ['autodocs', 'radiobutton'],
  decorators: [moduleMetadata({ imports: [ExtraRadiobuttonComponent, ReactiveFormsModule] })],
  render: (args) => {
    const control = new FormControl(
      { value: args.checked ? args.value : undefined, disabled: !!args.disabled },
      { validators: args.invalid ? () => ({ storyInvalid: true }) : [] }
    );
    if (args.invalid) control.markAsTouched();
    return {
      props: {
        ...Object.fromEntries(INPUTS.map((key) => [key, args[key]])),
        control,
        onClick: args.onClick,
        onFocus: args.onFocus,
        onBlur: args.onBlur
      },
      template:
        '<extra-radiobutton [formControl]="control" ' +
        INPUTS.map((key) => '[' + key + ']="' + key + '"').join(' ') +
        ' (onClick)="onClick($event)" (onFocus)="onFocus($event)" (onBlur)="onBlur($event)"></extra-radiobutton>'
    };
  },
  parameters: {
    designTokens: { prefix: '--p-radiobutton' },
    docs: {
      description: {
        component: `Радиокнопка для выбора одного варианта из взаимоисключающей группы.

\`\`\`typescript
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Внутри группы радиокнопки объединяются общим \`name\` и одной моделью. Состояния disabled и invalid управляются через FormControl.

\`value\` (\`any\`, по умолчанию \`null\`) — значение опции: именно оно попадает в модель при выборе этой радиокнопки, а выбранной она считается, когда значение модели равно её \`value\`. На оформление не влияет, поэтому в Controls не выведено — см. истории Group и Caption.`
      },
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_code: string, context: { args: RenderArgs }) => source(context.args)
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/radiobutton.md) ──────────────
    label: {
      control: 'text',
      description: 'Текст названия',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    labelPosition: {
      control: 'select',
      options: ['right', 'left'],
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'right' },
        type: { summary: "'right' | 'left'" }
      }
    },
    caption: {
      control: 'text',
      description: 'Текст пояснения под лейблом',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    // ── Состояния (управляются через FormControl) ───────────────────
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние — управляется через FormControl',
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
    // ── События ──────────────────────────────────────────────────
    onClick: {
      control: false,
      description: 'Срабатывает при выборе опции',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraRadioButtonClickEvent>' }
      }
    },
    onFocus: {
      control: false,
      description: 'Срабатывает при получении фокуса',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<Event>' }
      }
    },
    onBlur: {
      control: false,
      description: 'Срабатывает при потере фокуса',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<Event>' }
      }
    },
    // Hidden props
    value: { control: 'object', table: { category: 'Свойства' }, description: 'Значение радио-варианта' },
    name: { control: 'text', table: { category: 'Свойства' }, description: 'Имя группы радио-кнопок в HTML-форме' },
    modelValue: { table: { disable: true }, description: 'Выбранное значение (для [(ngModel)]/formControl)' },
    inputId: { table: { disable: true }, description: 'id нативного input — для связки с внешним <label>' },
    required: { control: 'boolean', description: 'Группа обязательна для заполнения' },
    ariaLabel: { control: 'text', description: 'Текст для скринридеров, если нет видимой подписи' },
    ariaLabelledBy: { control: 'text', description: 'id элемента, текст которого подписывает радиокнопку' },
    autofocus: { control: 'boolean', description: 'Ставит фокус на радиокнопку после первого рендера' },
    tabindex: { control: 'number', description: 'Порядок фокуса при навигации клавиатурой' },
    checked: { control: 'boolean', description: 'Начальное состояние: выбрано или нет' }
  },
  args: {
    label: 'label',
    caption: 'Caption',
    labelPosition: 'right',
    value: 'option',
    name: 'radio-default',
    required: false,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    checked: false,
    disabled: false,
    invalid: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn()
  }
};
export default meta;
type Story = StoryObj<RadioArgs>;
export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивная радиокнопка со всеми свойствами спецификации — каждый контрол в панели Controls влияет на то, что видно в канвасе. Выбор ставится кликом; `disabled` и `invalid` управляются через FormControl. Взаимоисключающий выбор внутри группы показывает история Group.'
      }
    }
  }
};
export const Error: Story = {
  argTypes: {
    label: { description: 'Текст названия' },
    invalid: { description: 'Невалидное состояние — вычисляется из NgControl (Validators.required)' }
  },
  name: 'Error',
  args: { invalid: true },
  parameters: {
    docs: {
      description: {
        story:
          'Невалидная группа — вычисляется из `NgControl` автоматически, переключите control «invalid» в панели Controls. Ошибка форсирована искусственным валидатором, поэтому не зависит от того, выбран пункт или нет — оба пункта на одном FormControl.'
      }
    }
  }
};
export const Disabled: Story = {
  argTypes: {
    label: { description: 'Текст названия' },
    disabled: { description: 'Отключённое состояние — управляется через FormControl.disable()/enable()' }
  },
  name: 'Disabled',
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          'Отключённая группа — управляется через `FormControl.disable()` / `enable()`, переключите control «disabled» в панели Controls. Оба пункта на одном FormControl: выбор взаимоисключающий, как у настоящей radio-группы.'
      }
    }
  }
};
export const WithoutLabel: Story = { name: 'WithoutLabel', args: { label: '', caption: '' } };
export const WithoutCaption: Story = { name: 'WithoutCaption', args: { caption: '' } };
export const LabelLeft: Story = {
  name: 'LabelLeft',
  args: { labelPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Положения лейбла (`label-position`): `right` (по умолчанию) — справа от индикатора, `left` — слева.'
      }
    }
  }
};
