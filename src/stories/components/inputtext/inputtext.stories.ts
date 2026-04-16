import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from '../../../lib/components/inputtext/inputtext.component';
import { InputTextClearComponent, ClearButton } from './examples/inputtext-clear.component';
import { InputTextFloatLabelComponent, FloatLabelStory } from './examples/inputtext-float-label.component';
import { InputTextDisabledComponent, Disabled } from './examples/inputtext-disabled.component';
import { InputTextReadonlyComponent, Readonly } from './examples/inputtext-readonly.component';
import { InputTextInvalidComponent, Invalid } from './examples/inputtext-invalid.component';

type InputTextArgs = InputTextComponent;

const meta: Meta<InputTextArgs> = {
  title: 'Components/Form/InputText',
  component: InputTextComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        InputTextComponent,
        FormsModule,
        InputTextClearComponent,
        InputTextFloatLabelComponent,
        InputTextDisabledComponent,
        InputTextReadonlyComponent,
        InputTextInvalidComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-inputtext' },
    docs: {
      description: {
        component: `Текстовое поле для ввода данных. Поддерживает размеры \`small\`, \`base\`, \`large\`, \`xlarge\`, очистку значения и FloatLabel.`,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    placeholder: {
      control: 'text',
      description: 'Подсказка при пустом поле',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showClear: {
      control: 'boolean',
      description: 'Показывает иконку очистки при наличии значения',
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
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Визуальный вариант поля',
      table: {
        category: 'Props',
        defaultValue: { summary: "'outlined'" },
        type: { summary: "'outlined' | 'filled'" },
      },
    },
    // Hidden props
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },

    // ── Events ───────────────────────────────────────────────
    onClear: {
      control: false,
      description: 'Событие очистки поля (при showClear)',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<void>' },
      },
    },
  },
  args: {
    placeholder: 'Введите текст...',
    size: 'base',
    disabled: false,
    readonly: false,
    invalid: false,
    showClear: false,
    fluid: false,
    variant: 'outlined',
  },
};

export default meta;
type Story = StoryObj<InputTextArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (args.showClear) parts.push(`[showClear]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.variant && args.variant !== 'outlined') parts.push(`variant="${args.variant}"`);
    parts.push(`[(ngModel)]="value"`);

    const template = `<input-text\n  ${parts.join('\n  ')}\n></input-text>`;

    return { props: { ...args, value: '' }, template };
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
export { ClearButton, FloatLabelStory as FloatLabel, Disabled, Readonly, Invalid };
