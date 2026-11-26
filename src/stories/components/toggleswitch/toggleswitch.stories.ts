import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { fn } from 'storybook/test';
import {
  ExtraToggleSwitchComponent,
  ExtraToggleSwitchChangeEvent
} from '../../../lib/components/toggleswitch/toggleswitch.component';

type ToggleSwitchArgs = Omit<Partial<ExtraToggleSwitchComponent>, 'onChange' | 'onFocus' | 'onBlur'> & {
  disabled: boolean;
  invalid: boolean;
  value: boolean;
  onChange: (event: ExtraToggleSwitchChangeEvent) => void;
  onFocus: (event: Event) => void;
  onBlur: (event: Event) => void;
};

const escapeAttribute = (value: unknown): string =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');

const templateFor = (args: ToggleSwitchArgs): string => {
  const parts = ['[formControl]="switchControl"'];
  for (const name of ['label', 'caption', 'ariaLabel', 'ariaLabelledBy'] as const) {
    if (args[name]) parts.push(name + '="' + escapeAttribute(args[name]) + '"');
  }
  if (args.labelPosition && args.labelPosition !== 'right') parts.push('labelPosition="' + args.labelPosition + '"');
  // disabled и invalid живут в FormControl: invalid — геттер без сеттера, disabled — состояние CVA
  for (const name of ['autofocus', 'readonly', 'required'] as const) {
    if (args[name]) parts.push('[' + name + ']="' + args[name] + '"');
  }
  if (args.tabindex != null) parts.push('[tabindex]="' + args.tabindex + '"');
  parts.push('(onChange)="onChange($event)"', '(onFocus)="onFocus($event)"', '(onBlur)="onBlur($event)"');
  return '<extra-toggleswitch\n  ' + parts.join('\n  ') + '\n></extra-toggleswitch>';
};

const meta: Meta<ToggleSwitchArgs> = {
  title: 'Components/Form/ToggleSwitch',
  component: ExtraToggleSwitchComponent,
  tags: ['autodocs', 'toggleswitch'],
  decorators: [moduleMetadata({ imports: [ExtraToggleSwitchComponent, ReactiveFormsModule] })],
  parameters: {
    designTokens: { prefix: '--p-toggleswitch' },
    docs: {
      description: {
        component: `Переключатель-свитч для мгновенного включения/выключения одной бинарной настройки.

\`\`\`typescript
import { ExtraToggleSwitchComponent } from '@cdek-it/angular-ui-kit/components/toggleswitch';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      },
      source: {
        language: 'html',
        type: 'code',
        transform: (_code: string, context: { args: ToggleSwitchArgs }) => templateFor(context.args)
      }
    }
  },
  render: (args) => {
    // disabled и invalid — состояние FormControl, а не входы: invalid у компонента геттер без сеттера
    const { disabled, invalid, ...inputs } = args;
    return {
      props: {
        ...inputs,
        switchControl: new FormControl({ value: args.value, disabled }, invalid ? [Validators.requiredTrue] : [])
      },
      template: templateFor(args)
    };
  },
  argTypes: {
    label: { control: 'text', description: 'Текст названия рядом с переключателем' },
    labelPosition: {
      control: 'select',
      options: ['right', 'left'],
      description: 'Положение лейбла'
    },
    caption: { control: 'text', description: 'Текст пояснения под лейблом' },
    ariaLabel: { control: 'text', description: 'Доступное имя; обязателен, когда свитч используется без label' },
    ariaLabelledBy: { control: 'text' },
    autofocus: { control: 'boolean' },
    tabindex: { control: 'number' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean', description: 'Отключённое состояние — управляется через FormControl' },
    invalid: { control: 'boolean', description: 'Невалидное состояние — вычисляется из NgControl (Validators)' },
    value: { control: 'boolean' },
    onChange: { control: false, description: 'Событие изменения состояния' },
    onFocus: { control: false, description: 'Событие фокуса' },
    onBlur: { control: false, description: 'Событие потери фокуса' }
  },
  args: {
    label: 'Label',
    labelPosition: 'right',
    caption: 'Caption',
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    readonly: false,
    required: false,
    disabled: false,
    invalid: false,
    value: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn()
  }
};
export default meta;
type Story = StoryObj<ToggleSwitchArgs>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный переключатель со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

export const Checked: Story = {
  args: { value: true }
};

export const Danger: Story = {
  args: { invalid: true, caption: 'Обязательное поле' }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const LabelLeft: Story = {
  args: { labelPosition: 'left', caption: 'Подпись слева от свитча' }
};
