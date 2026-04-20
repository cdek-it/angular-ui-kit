import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from '../../../lib/components/textarea/textarea.component';
import { Disabled } from './examples/textarea-disabled.component';
import { Readonly } from './examples/textarea-readonly.component';
import { Invalid } from './examples/textarea-invalid.component';
import { AutoResize, TextareaAutoResizeComponent } from './examples/textarea-autoresize.component';
import { Sizes, TextareaSizesComponent } from './examples/textarea-sizes.component';

type TextareaArgs = TextareaComponent;

const meta: Meta<TextareaArgs> = {
  title: 'Components/Form/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TextareaComponent,
        FormsModule,
        TextareaAutoResizeComponent,
        TextareaSizesComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-textarea' },
    docs: {
      description: {
        component: `Многострочное текстовое поле для ввода данных. Поддерживает авторасширение, состояния disabled/readonly/invalid, размеры и интеграцию с формами через CVA.

\`\`\`typescript
import { TextareaComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
  },
  argTypes: {
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
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    autoResize: {
      control: 'boolean',
      description: 'Автоматически увеличивает высоту по мере ввода',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    rows: {
      control: 'number',
      description: 'Количество видимых строк',
      table: {
        category: 'Props',
        defaultValue: { summary: '3' },
        type: { summary: 'number' },
      },
    },
    cols: {
      control: 'number',
      description: 'Количество видимых столбцов',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
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
    // Скрыть внутренние computed props
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    // Events
    onResize: {
      control: false,
      description: 'Событие изменения высоты поля (при autoResize)',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<{ height: string }>' },
      },
    },
  },
  args: {
    placeholder: 'Введите текст...',
    size: 'base',
    disabled: false,
    readonly: false,
    invalid: false,
    fluid: false,
    autoResize: false,
    rows: 3,
    variant: 'outlined',
  },
};

export default meta;
type Story = StoryObj<TextareaArgs>;

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
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.autoResize) parts.push(`[autoResize]="true"`);
    if (args.rows && args.rows !== 3) parts.push(`[rows]="${args.rows}"`);
    if (args.cols) parts.push(`[cols]="${args.cols}"`);
    if (args.variant && args.variant !== 'outlined') parts.push(`variant="${args.variant}"`);
    parts.push(`[(ngModel)]="value"`);

    const template = `<ui-textarea\n  ${parts.join('\n  ')}\n></ui-textarea>`;

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
export { Disabled, Readonly, Invalid, AutoResize, Sizes };
