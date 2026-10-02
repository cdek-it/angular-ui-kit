import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraTextareaComponent } from '../../../lib/components/textarea/textarea.component';
import { Disabled } from './examples/textarea-disabled.component';
import { Readonly } from './examples/textarea-readonly.component';
import { Invalid } from './examples/textarea-invalid.component';
import { AutoResize, TextareaAutoResizeComponent } from './examples/textarea-autoresize.component';
import { Sizes } from './examples/textarea-sizes.component';
import { FloatLabelStory } from './examples/textarea-float-label.component';
import { Labels, TextareaLabelsComponent } from './examples/textarea-labels.component';

type TextareaArgs = ExtraTextareaComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<TextareaArgs> = {
  title: 'Components/Form/Textarea',
  component: ExtraTextareaComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraTextareaComponent, ReactiveFormsModule, TextareaAutoResizeComponent, TextareaLabelsComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-textarea' },
    docs: {
      description: {
        component: `Многострочное текстовое поле для ввода данных.

Реализовано по спецификации [textarea.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/textarea.md).

\`\`\`typescript
import { ExtraTextareaComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/textarea.md) ─────────────────
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
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'top'" },
        type: { summary: "'top' | 'left'" }
      }
    },
    floatLabel: {
      control: 'boolean',
      description: 'Лейбл-плейсхолдер, всплывающий над полем при фокусе/значении',
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
    info: {
      control: 'text',
      description: 'Текст тултипа иконки рядом с лейблом',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка при пустом поле',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
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
    clearable: {
      control: 'boolean',
      description: 'Показывает иконку очистки при наличии значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    resizable: {
      control: 'boolean',
      description: 'Разрешает нативный resize-уголок (перетаскиванием)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
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
    autoResize: {
      control: 'boolean',
      description: 'Автоматически увеличивает высоту по мере ввода',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    rows: {
      control: 'number',
      description: 'Стартовая высота поля в строках',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '3' },
        type: { summary: 'number' }
      }
    },
    cols: {
      control: 'number',
      description: 'Ширина поля в символах',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    autofocus: {
      control: 'boolean',
      description: 'Автофокус при монтировании компонента',
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
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — вычисляется из NgControl (Validators)',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // Hidden computed props
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    inputId: { table: { disable: true } },
    // ── События ──────────────────────────────────────────────────
    onResize: {
      control: false,
      description: 'Событие изменения высоты поля пользователем',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraTextareaResizeEvent>' }
      }
    },
    onClear: {
      control: false,
      description: 'Событие очистки поля (при clearable)',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    }
  },
  args: {
    label: 'Комментарий',
    labelPosition: 'top',
    floatLabel: false,
    caption: '',
    info: '',
    placeholder: 'Введите текст...',
    size: 'base',
    clearable: false,
    resizable: true,
    fluid: false,
    autoResize: false,
    rows: 3,
    autofocus: false,
    disabled: false,
    invalid: false,
    readonly: false
  }
};

export default meta;
type Story = StoryObj<TextareaArgs>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'top') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.floatLabel) parts.push(`[floatLabel]="true"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.info) parts.push(`info="${args.info}"`);
    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.clearable) parts.push(`[clearable]="true"`);
    if (!args.resizable) parts.push(`[resizable]="false"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.autoResize) parts.push(`[autoResize]="true"`);
    if (args.rows && args.rows !== 3) parts.push(`[rows]="${args.rows}"`);
    if (args.cols) parts.push(`[cols]="${args.cols}"`);
    if (args.autofocus) parts.push(`[autofocus]="true"`);

    const validators = args.invalid ? [Validators.required] : [];
    const control = new FormControl({ value: '', disabled: args.disabled }, validators);

    const template = `<extra-textarea [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-textarea>`;

    // invalid и disabled живут во FormControl: у компонента invalid — геттер без сеттера,
    // и Storybook на попытке его присвоить роняет ошибку в консоль
    const { invalid, disabled, ...rest } = args;

    return { props: { ...rest, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивное поле со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { Labels, Disabled, Readonly, Invalid, AutoResize, Sizes, FloatLabelStory as FloatLabel };
