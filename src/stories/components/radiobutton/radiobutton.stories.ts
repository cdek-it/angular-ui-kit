import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraRadiobuttonComponent } from '../../../lib/components/radiobutton/radiobutton.component';
import { RadiobuttonGroupComponent, Group } from './examples/radiobutton-group.component';
import { RadiobuttonDisabledComponent, Disabled } from './examples/radiobutton-disabled.component';
import { RadiobuttonInvalidComponent, Invalid } from './examples/radiobutton-invalid.component';
import { RadiobuttonLabelPositionComponent, LabelPosition } from './examples/radiobutton-labelposition.component';
import { RadiobuttonCaptionComponent, Caption } from './examples/radiobutton-caption.component';

type RadiobuttonArgs = ExtraRadiobuttonComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<RadiobuttonArgs> = {
  title: 'Components/Form/RadioButton',
  component: ExtraRadiobuttonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraRadiobuttonComponent,
        ReactiveFormsModule,
        RadiobuttonGroupComponent,
        RadiobuttonDisabledComponent,
        RadiobuttonInvalidComponent,
        RadiobuttonLabelPositionComponent,
        RadiobuttonCaptionComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-radiobutton' },
    docs: {
      description: {
        component: `Радиокнопка для выбора одного варианта из взаимоисключающей группы.

Реализовано по спецификации [radiobutton.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/radiobutton.md).

\`\`\`typescript
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Внутри группы радиокнопки объединяются общим \`name\` и одной моделью. Состояния disabled и invalid управляются через FormControl.`
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
    value: { table: { disable: true } },
    name: { table: { disable: true } },
    modelValue: { table: { disable: true } },
    inputId: { table: { disable: true } }
  },
  args: {
    label: 'Radio button',
    labelPosition: 'right',
    caption: '',
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<RadiobuttonArgs>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [`name="delivery-default"`, `value="option1"`];

    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'right') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);

    const validators = args.invalid ? [Validators.required] : [];
    // Один FormControl на оба пункта — взаимоисключающий выбор, как у настоящей radio-группы.
    const control = new FormControl({ value: args.invalid ? null : 'pickup', disabled: args.disabled }, validators);

    const template = `
<div class="flex flex-col gap-3">
  <extra-radiobutton [formControl]="control" name="delivery-default" value="pickup" label="Самовывоз"></extra-radiobutton>
  <extra-radiobutton [formControl]="control"\n    ${parts.join('\n    ')}\n  ></extra-radiobutton>
</div>`;

    return { props: { ...args, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивная радиокнопка со всеми свойствами спецификации, показана в контексте соседних пунктов группы (общий FormControl — выбор взаимоисключающий). Используйте Controls для изменения пропсов среднего пункта; disabled и invalid управляются через FormControl и относятся ко всей группе.'
      }
    }
  }
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { Group, Disabled, Invalid, LabelPosition, Caption };
