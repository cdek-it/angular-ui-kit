import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraTextareaComponent } from '../../../lib/components/textarea/textarea.component';
import { Disabled } from './examples/textarea-disabled.component';
import { Readonly } from './examples/textarea-readonly.component';
import { Invalid } from './examples/textarea-invalid.component';
import { AutoResize, TextareaAutoResizeComponent } from './examples/textarea-autoresize.component';
import { Sizes } from './examples/textarea-sizes.component';
import { FloatLabelStory, TextareaFloatLabelComponent } from './examples/textarea-float-label.component';

type TextareaArgs = ExtraTextareaComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<TextareaArgs> = {
  title: 'Components/Form/Textarea',
  component: ExtraTextareaComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraTextareaComponent, ReactiveFormsModule, TextareaAutoResizeComponent, TextareaFloatLabelComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-textarea' },
    docs: {
      description: {
        component: `Многострочное текстовое поле для ввода данных.

\`\`\`typescript
import { ExtraTextareaComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Подсказка при пустом поле',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие — управляется через FormControl',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — управляется через FormControl',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showClear: {
      control: 'boolean',
      description: 'Показывает иконку очистки при наличии значения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    autoResize: {
      control: 'boolean',
      description: 'Автоматически увеличивает высоту по мере ввода',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    rows: {
      control: 'number',
      description: 'Количество видимых строк',
      table: {
        category: 'Props',
        defaultValue: { summary: '3' },
        type: { summary: 'number' }
      }
    },
    cols: {
      control: 'number',
      description: 'Количество видимых столбцов',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    // Hidden computed props
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    // Events
    onResize: {
      control: false,
      description: 'Событие изменения высоты поля (при autoResize)',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<{ height: string }>' }
      }
    },
    onClear: {
      control: false,
      description: 'Событие очистки поля (при showClear)',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<void>' }
      }
    }
  },
  args: {
    placeholder: 'Введите текст...',
    size: 'base',
    disabled: false,
    invalid: false,
    readonly: false,
    showClear: false,
    fluid: false,
    autoResize: false,
    rows: 3
  }
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
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.showClear) parts.push(`[showClear]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.autoResize) parts.push(`[autoResize]="true"`);
    if (args.rows && args.rows !== 3) parts.push(`[rows]="${args.rows}"`);
    if (args.cols) parts.push(`[cols]="${args.cols}"`);

    const validators = [];
    if (args.invalid) validators.push(Validators.required);

    const control = new FormControl({ value: '', disabled: args.disabled }, validators);

    const template = `<extra-textarea [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-textarea>`;

    return { props: { ...args, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Re-exports from example components ────────────────────────────────────
export { Disabled, Readonly, Invalid, AutoResize, Sizes, FloatLabelStory as FloatLabel };
