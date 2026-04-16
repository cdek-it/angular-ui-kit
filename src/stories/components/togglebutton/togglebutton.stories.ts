import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ToggleButtonComponent } from '../../../lib/components/togglebutton/togglebutton.component';
import { ToggleButtonSizesComponent, Sizes } from './examples/togglebutton-sizes.component';
import { ToggleButtonIconsComponent, Icons } from './examples/togglebutton-icons.component';
import { ToggleButtonIconOnlyComponent, IconOnly } from './examples/togglebutton-icon-only.component';
import { ToggleButtonDisabledComponent, Disabled } from './examples/togglebutton-disabled.component';

type ToggleButtonArgs = ToggleButtonComponent;

const meta: Meta<ToggleButtonArgs> = {
  title: 'Components/Form/ToggleButton',
  component: ToggleButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ToggleButtonComponent,
        FormsModule,
        ToggleButtonSizesComponent,
        ToggleButtonIconsComponent,
        ToggleButtonIconOnlyComponent,
        ToggleButtonDisabledComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-togglebutton' },
    docs: {
      description: {
        component: `Кнопка-переключатель для выбора булевого значения. Поддерживает размеры \`sm\`, \`base\`, \`lg\`, \`xlg\`, иконки и icon-only вариант.`,
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
      options: ['sm', 'base', 'lg', 'xlg'],
      description: 'Размер кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'sm' | 'base' | 'lg' | 'xlg'" },
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

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    parts.push(`onLabel="${args.onLabel}"`);
    parts.push(`offLabel="${args.offLabel}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.onIcon) parts.push(`onIcon="${args.onIcon}"`);
    if (args.offIcon) parts.push(`offIcon="${args.offIcon}"`);
    if (args.iconPos && args.iconPos !== 'left') parts.push(`iconPos="${args.iconPos}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.iconOnly) parts.push(`[iconOnly]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    parts.push(`[(ngModel)]="checked"`);

    const template = `<toggle-button\n  ${parts.join('\n  ')}\n></toggle-button>`;

    return { props: { ...args, checked: false }, template };
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
export { Sizes, Icons, IconOnly, Disabled };
