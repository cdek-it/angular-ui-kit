import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { fn } from 'storybook/test';
import {
  ExtraInputMaskComponent,
  ExtraInputMaskLabelPosition,
  ExtraInputMaskSize
} from '../../../lib/components/inputmask/inputmask.component';
import type { ExtraCaptionSeverity } from '../../../lib/components/caption/caption.component';

type InputMaskArgs = Omit<
  Partial<ExtraInputMaskComponent>,
  'onComplete' | 'onInput' | 'onClear' | 'onFocus' | 'onBlur'
> & {
  disabled: boolean;
  invalid: boolean;
  value: string;
  captionSeverity: ExtraCaptionSeverity;
  onComplete: () => void;
  onInput: (event: Event) => void;
  onClear: () => void;
  onFocus: (event: Event) => void;
  onBlur: (event: Event) => void;
};

const escapeAttribute = (value: unknown): string =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');

const templateFor = (args: InputMaskArgs): string => {
  const parts = ['[formControl]="fieldControl"'];
  for (const name of [
    'mask',
    'placeholder',
    'label',
    'caption',
    'info',
    'slotChar',
    'characterPattern',
    'autocomplete',
    'name',
    'ariaLabel',
    'ariaLabelledBy'
  ] as const) {
    if (args[name] != null && args[name] !== '') parts.push(name + '="' + escapeAttribute(args[name]) + '"');
  }
  if (args.labelPosition && args.labelPosition !== 'top') parts.push('labelPosition="' + args.labelPosition + '"');
  if (args.captionSeverity && args.captionSeverity !== 'base')
    parts.push('captionSeverity="' + args.captionSeverity + '"');
  if (args.size && args.size !== 'base') parts.push('size="' + args.size + '"');
  for (const name of [
    'floatLabel',
    'clearable',
    'unmask',
    'readonly',
    'fluid',
    'required',
    'autofocus',
    'keepBuffer'
  ] as const) {
    if (args[name]) parts.push('[' + name + ']="' + args[name] + '"');
  }
  if (args.autoClear === false) parts.push('[autoClear]="false"');
  if (args.tabindex != null) parts.push('[tabindex]="' + args.tabindex + '"');
  parts.push(
    '(onComplete)="onComplete()"',
    '(onInput)="onInput($event)"',
    '(onClear)="onClear()"',
    '(onFocus)="onFocus($event)"',
    '(onBlur)="onBlur($event)"'
  );
  return '<extra-input-mask\n  ' + parts.join('\n  ') + '\n></extra-input-mask>';
};

const meta: Meta<InputMaskArgs> = {
  title: 'Components/Form/InputMask',
  component: ExtraInputMaskComponent,
  tags: ['autodocs', 'inputmask'],
  decorators: [moduleMetadata({ imports: [ExtraInputMaskComponent, ReactiveFormsModule] })],
  parameters: {
    designTokens: { prefix: '--p-inputtext' },
    docs: {
      description: {
        component: `Поле ввода по маске. Используется для данных в фиксированном формате: дата, телефон, серийный номер и т.д.

\`\`\`typescript
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      },
      source: {
        language: 'html',
        type: 'code',
        transform: (_code: string, context: { args: InputMaskArgs }) => templateFor(context.args)
      }
    }
  },
  render: (args) => ({
    // disabled и invalid — состояние FormControl, а не входы компонента
    props: {
      fieldControl: new FormControl(
        { value: args.value, disabled: args.disabled },
        args.invalid ? [Validators.required] : []
      ),
      onComplete: args.onComplete,
      onInput: args.onInput,
      onClear: args.onClear,
      onFocus: args.onFocus,
      onBlur: args.onBlur
    },
    template: templateFor(args)
  }),
  argTypes: {
    mask: { control: 'text', description: 'Маска ввода (9 — цифра, a — буква, * — цифра или буква)' },
    slotChar: { control: 'text', description: 'Символ-заполнитель маски' },
    autoClear: { control: 'boolean', description: 'Очищать поле при неполном вводе (на blur)' },
    unmask: { control: 'boolean', description: 'Возвращать значение без маски (raw), а не отформатированное' },
    characterPattern: { control: 'text', description: 'Регулярное выражение для символов типа a в маске' },
    keepBuffer: { control: 'boolean', description: 'Сохранять введённые символы при очистке маски' },
    placeholder: { control: 'text', description: 'Текст подсказки внутри поля' },
    label: { control: 'text', description: 'Текст названия поля' },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'] satisfies ExtraInputMaskLabelPosition[],
      description: 'Положение лейбла'
    },
    floatLabel: { control: 'boolean', description: 'Плавающий лейбл внутри поля' },
    caption: { control: 'text', description: 'Текст пояснения под полем' },
    captionSeverity: { control: 'select', options: ['base', 'info', 'success', 'warning', 'danger'] },
    info: { control: 'text', description: 'Текст с доп. информацией (показывается в тултипе иконки ti-info-circle)' },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'] satisfies ExtraInputMaskSize[],
      description: 'Размер поля'
    },
    clearable: { control: 'boolean', description: 'Отображение иконки для очистки поля' },
    fluid: { control: 'boolean', description: 'Растягивает поле на всю ширину контейнера' },
    readonly: { control: 'boolean', description: 'Только для чтения' },
    autocomplete: { control: 'text', description: 'Значение атрибута autocomplete для input' },
    required: { control: 'boolean' },
    name: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
    autofocus: { control: 'boolean' },
    tabindex: { control: 'number' },
    disabled: { control: 'boolean', description: 'Отключённое состояние — управляется через FormControl' },
    invalid: { control: 'boolean', description: 'Невалидное состояние — вычисляется из NgControl (Validators)' },
    value: { control: 'text' },
    onComplete: { control: false, description: 'Срабатывает при полном заполнении маски' },
    onInput: { control: false, description: 'Срабатывает при вводе значения' },
    onClear: { control: false, description: 'Срабатывает при очистке поля иконкой × (только при clearable)' },
    onFocus: { control: false, description: 'Срабатывает при фокусе' },
    onBlur: { control: false, description: 'Срабатывает при потере фокуса' }
  },
  args: {
    mask: '999-999-99-99',
    slotChar: '_',
    autoClear: true,
    unmask: false,
    characterPattern: '[A-Za-z]',
    keepBuffer: false,
    placeholder: '999-999-99-99',
    label: 'Телефон',
    labelPosition: 'top',
    floatLabel: false,
    caption: '',
    captionSeverity: 'base',
    info: '',
    size: 'base',
    clearable: false,
    fluid: false,
    readonly: false,
    autocomplete: 'off',
    required: false,
    name: undefined,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    disabled: false,
    invalid: false,
    value: '111-111-11-11',
    onComplete: fn(),
    onInput: fn(),
    onClear: fn(),
    onFocus: fn(),
    onBlur: fn()
  }
};
export default meta;
type Story = StoryObj<InputMaskArgs>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивное поле со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

export const Danger: Story = {
  args: { invalid: true, value: '', caption: 'Поле обязательно', captionSeverity: 'danger' }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Readonly: Story = {
  args: { readonly: true }
};

export const FloatLabel: Story = {
  args: { floatLabel: true, label: 'FloatLabel', placeholder: '' }
};

export const Clearable: Story = {
  args: { clearable: true },
  parameters: {
    docs: {
      description: {
        story:
          'Поле с иконкой очистки (clearable). Иконка × появляется только при заполненном значении; по клику значение сбрасывается и срабатывает `(onClear)`.'
      }
    }
  }
};

export const Fluid: Story = {
  args: { fluid: true },
  parameters: {
    docs: {
      description: {
        story:
          'Растягивание на всю ширину контейнера (fluid). При `[fluid]="true"` поле занимает 100% ширины родителя вместо собственной ширины по умолчанию. Контейнер в примере — 600px и обведён пунктиром, чтобы было видно, что поле тянется ровно по его границам.'
      }
    }
  }
};
