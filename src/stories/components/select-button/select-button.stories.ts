import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fn } from 'storybook/test';
import {
  ExtraSelectButtonChangeEvent,
  ExtraSelectButtonComponent
} from '../../../lib/components/select-button/select-button.component';

type SelectButtonArgs = Omit<Partial<ExtraSelectButtonComponent>, 'onChange'> & {
  disabled: boolean;
  value: any;
  onChange: (event: ExtraSelectButtonChangeEvent) => void;
};

const escapeAttribute = (value: unknown): string =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');

const templateFor = (args: SelectButtonArgs): string => {
  const parts = ['[formControl]="control"', '[options]="options"'];
  if (args.size && args.size !== 'base') parts.push('size="' + args.size + '"');
  for (const name of ['multiple', 'allowEmpty', 'fluid', 'required', 'autofocus'] as const) {
    if (name === 'allowEmpty' ? args.allowEmpty === false : !!args[name])
      parts.push('[' + name + ']="' + args[name] + '"');
  }
  for (const name of ['optionLabel', 'optionValue', 'optionDisabled', 'ariaLabel', 'ariaLabelledBy'] as const) {
    const fallback = { optionLabel: 'name', optionValue: 'code', optionDisabled: 'disabled' } as Record<string, string>;
    if (args[name] != null && args[name] !== fallback[name])
      parts.push(name + '="' + escapeAttribute(args[name]) + '"');
  }
  parts.push('(onChange)="onChange($event)"');
  return '<extra-select-button\n  ' + parts.join('\n  ') + '\n></extra-select-button>';
};

const selectionFor = (args: SelectButtonArgs): any => {
  const value = args.value;
  if (args.multiple) return Array.isArray(value) ? value : value == null ? [] : [value];
  return Array.isArray(value) ? (value[0] ?? null) : value;
};

const meta: Meta<SelectButtonArgs> = {
  title: 'Components/Form/SelectButton',
  component: ExtraSelectButtonComponent,
  tags: ['autodocs', 'selectbutton'],
  decorators: [moduleMetadata({ imports: [ExtraSelectButtonComponent, ReactiveFormsModule] })],
  parameters: {
    designTokens: { prefix: '--p-selectbutton' },
    docs: {
      description: {
        component: `Группа кнопок-переключателей с поддержкой одиночного и множественного выбора.

\`\`\`typescript
import { ExtraSelectButtonComponent, ExtraSelectButtonOption } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'code',
        transform: (_code: string, context: { args: SelectButtonArgs }) => templateFor(context.args)
      }
    }
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ value: selectionFor(args), disabled: args.disabled })
    },
    template: templateFor(args)
  }),
  argTypes: {
    options: {
      control: 'object',
      description: 'Массив опций',
      table: { category: 'Свойства', type: { summary: 'ExtraSelectButtonOption[] | any[]' } }
    },
    optionLabel: { control: 'text', description: 'Имя поля объекта опции с отображаемым значением' },
    optionValue: { control: 'text', description: 'Имя поля объекта опции со значением модели' },
    optionDisabled: { control: 'text', description: 'Имя поля объекта опции, отключающего сегмент' },
    size: { control: 'radio', options: ['small', 'base', 'large', 'xlarge'], description: 'Размер компонента' },
    multiple: { control: 'boolean', description: 'Разрешает выбор нескольких опций' },
    allowEmpty: { control: 'boolean', description: 'Разрешает снятие выбора' },
    fluid: { control: 'boolean', description: 'Растягивает группу на всю ширину контейнера' },
    required: { control: 'boolean', description: 'Контрол невалиден, пока значение не выбрано' },
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
    autofocus: { control: 'boolean' },
    disabled: { control: 'boolean', description: 'Отключённое состояние через FormControl' },
    value: { control: 'object', description: 'Значение FormControl; при multiple — массив' },
    onChange: { control: false, description: 'Событие изменения выбора' }
  },
  args: {
    options: [
      { name: 'Option 1', code: '1', icon: 'ti ti-arrow-down-right' },
      { name: 'Option 2', code: '2', icon: 'ti ti-arrow-down-right' },
      { name: 'Option 3', code: '3', icon: 'ti ti-arrow-down-right' }
    ],
    optionLabel: 'name',
    optionValue: 'code',
    optionDisabled: 'disabled',
    size: 'base',
    multiple: false,
    allowEmpty: true,
    fluid: false,
    required: false,
    autofocus: false,
    ariaLabel: 'Вариант',
    ariaLabelledBy: undefined,
    disabled: false,
    value: '1',
    onChange: fn()
  }
};
export default meta;
type Story = StoryObj<SelectButtonArgs>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Базовый SelectButton. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

export const Disabled: Story = {
  args: { disabled: true, value: null },
  parameters: {
    docs: { description: { story: 'Весь компонент отключён через `FormControl`.' } }
  }
};

export const Fluid: Story = {
  args: { fluid: true },
  parameters: {
    docs: {
      description: {
        story:
          'Растягивание на всю ширину контейнера (fluid). При `[fluid]="true"` группа занимает 100% ширины родителя, а сегменты делят её поровну — удобно для форм и мобильных раскладок. Третья группа — без `fluid`, для сравнения. Контейнер ограничен шириной 420px, чтобы эффект был нагляден.'
      }
    }
  }
};
