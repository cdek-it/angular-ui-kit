import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ExtraToggleButtonComponent } from '../../../lib/components/togglebutton/togglebutton.component';
import { ToggleButtonIconsComponent, Icons } from './examples/togglebutton-icons.component';
import { ToggleButtonIconOnlyComponent, IconOnly } from './examples/togglebutton-icon-only.component';
import { ToggleButtonDisabledComponent, Disabled } from './examples/togglebutton-disabled.component';

type ToggleButtonArgs = ExtraToggleButtonComponent & { disabled: boolean };

const meta: Meta<ToggleButtonArgs> = {
  title: 'Components/Form/ToggleButton',
  component: ExtraToggleButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraToggleButtonComponent, ReactiveFormsModule, ToggleButtonIconsComponent, ToggleButtonIconOnlyComponent, ToggleButtonDisabledComponent],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-togglebutton' },
    docs: {
      description: {
        component: `Кнопка-переключатель для выбора булевого значения.

Реализовано по спецификации [togglebutton.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/togglebutton.md).

\`\`\`typescript
import { ExtraToggleButtonComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Отключённое состояние управляется через FormControl, не через проп.`,
      },
    },
  },
  argTypes: {
    // ── Свойства (docs/components-api/togglebutton.md) ─────────────
    label: {
      control: 'text',
      description: 'Текст кнопки — один и тот же в обоих состояниях',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (tabler), один и тот же в обоих состояниях',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция иконки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'left'" },
        type: { summary: "'left' | 'right'" },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер кнопки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Режим «только иконка» без текста',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает кнопку на всю ширину контейнера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    // ── Состояния (управляются через FormControl) ───────────────────
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние — управляется через FormControl',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    // Hidden props
    allowEmpty: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    ariaLabelledBy: { table: { disable: true } },
    inputId: { table: { disable: true } },
    tabindex: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    extraClasses: { table: { disable: true } },

    // ── События ──────────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Событие изменения значения',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraToggleButtonChangeEvent>' },
      },
    },
  },
  args: {
    label: 'Подписка',
    icon: '',
    iconPosition: 'left',
    size: 'base',
    iconOnly: false,
    fluid: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ToggleButtonArgs>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (!args.iconOnly && args.label) parts.push(`label="${args.label}"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);
    if (args.iconPosition && args.iconPosition !== 'left') parts.push(`iconPosition="${args.iconPosition}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.iconOnly) parts.push(`[iconOnly]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);

    const control = new FormControl({ value: false, disabled: args.disabled });
    const template = `<extra-togglebutton [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-togglebutton>`;

    // disabled живёт во FormControl, у компонента нет такого @Input — Storybook ругается в консоль
    // на попытку присвоить его напрямую
    const { disabled, ...rest } = args;

    return { props: { ...rest, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивная кнопка со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled управляется через FormControl.',
      },
    },
  },
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { Icons, IconOnly, Disabled };
