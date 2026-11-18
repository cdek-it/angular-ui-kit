import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { fn } from 'storybook/test';
import { ExtraToggleButtonComponent } from '../../../lib/components/togglebutton/togglebutton.component';

type ToggleButtonArgs = Pick<
  ExtraToggleButtonComponent,
  | 'label'
  | 'icon'
  | 'iconPosition'
  | 'size'
  | 'iconOnly'
  | 'allowEmpty'
  | 'fluid'
  | 'ariaLabel'
  | 'ariaLabelledBy'
  | 'inputId'
  | 'tabindex'
  | 'autofocus'
  | 'required'
  | 'onChange'
> & { disabled: boolean; checked: boolean };
const INPUTS = [
  'label',
  'icon',
  'iconPosition',
  'size',
  'iconOnly',
  'allowEmpty',
  'fluid',
  'ariaLabel',
  'ariaLabelledBy',
  'inputId',
  'tabindex',
  'autofocus',
  'required'
] as const;
const DEFAULTS = {
  label: '',
  icon: '',
  iconPosition: 'left',
  size: 'base',
  iconOnly: false,
  allowEmpty: true,
  fluid: false,
  autofocus: false,
  required: false
} as const;
function source(args: Partial<ToggleButtonArgs>): string {
  const fields = ['[formControl]="control"'];
  for (const key of INPUTS) {
    const value = args[key];
    if (value === undefined || value === (DEFAULTS as Record<string, unknown>)[key]) continue;
    if (typeof value === 'boolean' || typeof value === 'number') fields.push('[' + key + ']="' + value + '"');
    else
      fields.push(
        key + '="' + String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;') + '"'
      );
  }
  return '<extra-togglebutton\n  ' + fields.join('\n  ') + '\n></extra-togglebutton>';
}
const meta: Meta<ToggleButtonArgs> = {
  title: 'Components/Form/ToggleButton',
  component: ExtraToggleButtonComponent,
  tags: ['autodocs', 'togglebutton'],
  decorators: [moduleMetadata({ imports: [ExtraToggleButtonComponent, ReactiveFormsModule] })],
  render: (args) => {
    const inputs = Object.fromEntries(
      INPUTS.map((key) => [key, args[key] ?? (DEFAULTS as Record<string, unknown>)[key]])
    );
    return {
      props: {
        ...inputs,
        onChange: args.onChange,
        control: new FormControl({ value: !!args.checked, disabled: !!args.disabled }, { nonNullable: true })
      },
      template:
        '<extra-togglebutton [formControl]="control" ' +
        INPUTS.map((key) => '[' + key + ']="' + key + '"').join(' ') +
        ' (onChange)="onChange($event)"></extra-togglebutton>'
    };
  },
  parameters: {
    designTokens: { prefix: '--p-togglebutton' },
    docs: {
      description: {
        component: `Кнопка-переключатель для выбора булевого значения.

Реализовано по спецификации [togglebutton.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/togglebutton.md).

\`\`\`typescript
import { ExtraToggleButtonComponent } from '@cdek-it/angular-ui-kit/components/togglebutton';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Отключённое состояние управляется через FormControl, не через проп.`
      },
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_code: string, context: { args: Partial<ToggleButtonArgs> }) => source(context.args)
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/togglebutton.md) ─────────────
    label: {
      control: 'text',
      description: 'Текст кнопки — один и тот же в обоих состояниях',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (tabler), один и тот же в обоих состояниях',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция иконки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'left'" },
        type: { summary: "'left' | 'right'" }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер кнопки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Режим «только иконка» без текста',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает кнопку на всю ширину контейнера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
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
    allowEmpty: {
      control: 'boolean',
      description: 'Разрешает снимать выбор повторным нажатием',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    required: {
      control: 'boolean',
      description:
        'Делает FormControl невалидным, пока кнопка не включена (реализует Validator через Validators.requiredTrue)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    checked: {
      control: 'boolean',
      description: 'Начальное состояние кнопки: включена (true) или выключена (false)',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Текст для скринридеров, когда у кнопки нет видимой подписи (обязателен для icon-only)',
      table: {
        category: 'Доступность',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    ariaLabelledBy: {
      control: 'text',
      description: 'id элемента, текст которого подписывает кнопку',
      table: {
        category: 'Доступность',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    inputId: {
      control: 'text',
      description: 'id нативной кнопки — для связки с внешним <label>',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    tabindex: {
      control: 'number',
      description: 'Порядок фокуса при навигации клавиатурой; для disabled всегда -1',
      table: {
        category: 'Доступность',
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
      }
    },
    autofocus: {
      control: 'boolean',
      description: 'Ставит фокус на кнопку после первого рендера; для disabled не срабатывает',
      table: {
        category: 'Доступность',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },

    // ── События ──────────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Событие изменения значения',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraToggleButtonChangeEvent>' }
      }
    }
  },
  args: { ...DEFAULTS, label: 'ToggleButton', checked: false, disabled: false, onChange: fn() }
};
export default meta;
type Story = StoryObj<ToggleButtonArgs>;
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивная кнопка со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled управляется через FormControl.'
      }
    }
  }
};
export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          'Отключённое состояние управляется через `FormControl`: `new FormControl({ value: false, disabled: true })` или `control.disable()`.'
      }
    }
  }
};
export const WithIcon: Story = {
  args: { icon: 'ti ti-arrow-down-right' },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с иконкой через `icon` — та же иконка в обоих состояниях. Позиция управляется `iconPosition`.'
      }
    }
  }
};
export const IconOnly: Story = {
  args: { icon: 'ti ti-arrow-down-right', iconOnly: true, ariaLabel: 'В избранное' },
  parameters: {
    docs: {
      description: {
        story:
          'Icon-only вариант: квадратная кнопка без текста. Размер регулируется через `size`, для доступности обязателен `ariaLabel`.'
      }
    }
  }
};
export const Fluid: Story = {
  args: { fluid: true },
  parameters: {
    docs: {
      description: {
        story: 'С `[fluid]="true"` кнопка занимает всю ширину контейнера — серая подложка показывает его границы.'
      }
    }
  }
};
