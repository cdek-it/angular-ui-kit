import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToggleButtonComponent } from '../../../lib/components/togglebutton/togglebutton.component';

type ToggleButtonArgs = ToggleButtonComponent;

const meta: Meta<ToggleButtonArgs> = {
  title: 'Components/Form/ToggleButton',
  component: ToggleButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ToggleButtonComponent, ReactiveFormsModule],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-togglebutton' },
    docs: {
      description: {
        component: `Кнопка-переключатель для выбора булевого значения. Поддерживает размеры \`small\`, \`base\`, \`large\`, \`xlarge\`, иконки и icon-only вариант.`,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    onLabel: {
      control: 'text',
      description: 'Текст в активном состоянии',
      table: {
        category: 'Props',
        defaultValue: { summary: "'Вкл'" },
        type: { summary: 'string' },
      },
    },
    offLabel: {
      control: 'text',
      description: 'Текст в неактивном состоянии',
      table: {
        category: 'Props',
        defaultValue: { summary: "'Выкл'" },
        type: { summary: 'string' },
      },
    },
    onIcon: {
      control: 'text',
      description: 'CSS-класс иконки в активном состоянии',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    offIcon: {
      control: 'text',
      description: 'CSS-класс иконки в неактивном состоянии',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    iconPos: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция иконки',
      table: {
        category: 'Props',
        defaultValue: { summary: "'left'" },
        type: { summary: "'left' | 'right'" },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер кнопки',
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
    iconOnly: {
      control: 'boolean',
      description: 'Скрывает label, делает кнопку квадратной',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает кнопку на всю ширину контейнера',
      table: {
        category: 'Props',
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

    // ── Events ───────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Событие изменения значения',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<ToggleButtonChangeEvent>' },
      },
    },
  },
  args: {
    onLabel: 'Вкл',
    offLabel: 'Выкл',
    size: 'base',
    disabled: false,
    iconOnly: false,
    fluid: false,
  },
};

export default meta;
type Story = StoryObj<ToggleButtonArgs>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildTemplate(args: any): string {
  const parts: string[] = [];

  if (!args.iconOnly) {
    parts.push(`onLabel="${args.onLabel}"`);
    parts.push(`offLabel="${args.offLabel}"`);
  }
  if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
  if (args.onIcon) parts.push(`onIcon="${args.onIcon}"`);
  if (args.offIcon) parts.push(`offIcon="${args.offIcon}"`);
  if (args.iconPos && args.iconPos !== 'left') parts.push(`iconPos="${args.iconPos}"`);
  if (args.disabled) parts.push(`[disabled]="true"`);
  if (args.iconOnly) parts.push(`[iconOnly]="true"`);
  if (args.fluid) parts.push(`[fluid]="true"`);
  parts.push(`[formControl]="control"`);

  return `<toggle-button\n  ${parts.join('\n  ')}\n></toggle-button>`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderStory(args: any) {
  return { props: { ...args, control: new FormControl(false) }, template: buildTemplate(args) };
}

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => renderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Sizes ────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: (args) => renderStory(args),
  args: { size: 'xlarge' },
  parameters: {
    docs: {
      description: {
        story: 'Размер компонента задаётся через проп `size`: `small`, `base`, `large`, `xlarge`.',
      },
    },
  },
};

// ── Icons ────────────────────────────────────────────────────────────────────
export const Icons: Story = {
  render: (args) => renderStory(args),
  args: {
    onLabel: 'Включено',
    offLabel: 'Выключено',
    onIcon: 'ti ti-check',
    offIcon: 'ti ti-x',
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с иконками через `onIcon`/`offIcon`. Позиция иконки управляется `iconPos`.',
      },
    },
  },
};

// ── IconOnly ─────────────────────────────────────────────────────────────────
export const IconOnly: Story = {
  render: (args) => renderStory(args),
  args: {
    onIcon: 'ti ti-star-filled',
    offIcon: 'ti ti-star',
    iconOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only вариант: квадратная кнопка без текста. Размер регулируется через `size`.',
      },
    },
  },
};

// ── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  render: () => ({
    props: { control: new FormControl({ value: false, disabled: true }) },
    template: `<toggle-button onLabel="Вкл" offLabel="Выкл" [formControl]="control"></toggle-button>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Отключённое состояние управляется через `FormControl`: `new FormControl({ value: false, disabled: true })` или `control.disable()`.',
      },
    },
  },
};
