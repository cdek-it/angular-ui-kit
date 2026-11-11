import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraSelectButtonComponent } from '../../../lib/components/select-button/select-button.component';
import { SelectButtonSelectedComponent, Selected as SelectedStory } from './examples/select-button-selected.component';
import { SelectButtonDisabledComponent, Disabled as DisabledStory } from './examples/select-button-disabled.component';
import {
  SelectButtonSemiDisabledComponent,
  SemiDisabled as SemiDisabledStory
} from './examples/select-button-semi-disabled.component';
import { SelectButtonIconsComponent, WithIcons as WithIconsStory } from './examples/select-button-icons.component';
import { SelectButtonFluidComponent, Fluid as FluidStory } from './examples/select-button-fluid.component';

type SelectButtonArgs = ExtraSelectButtonComponent & { disabled: boolean };

const meta: Meta<SelectButtonArgs> = {
  title: 'Components/Form/SelectButton',
  component: ExtraSelectButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        ExtraSelectButtonComponent,
        SelectButtonSelectedComponent,
        SelectButtonDisabledComponent,
        SelectButtonSemiDisabledComponent,
        SelectButtonIconsComponent,
        SelectButtonFluidComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Группа кнопок-переключателей с поддержкой одиночного и множественного выбора.

\`\`\`typescript
import { ExtraSelectButtonComponent, ExtraSelectButtonOption } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-selectbutton' }
  },
  argTypes: {
    value: {
      control: 'object',
      description: 'Значение FormControl; при multiple — массив',
      table: {
        category: 'Свойства',
        type: { summary: 'string | string[]' }
      }
    },
    size: {
      control: 'radio',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер компонента',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    multiple: {
      control: 'boolean',
      description: 'Разрешает выбор нескольких опций',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    allowEmpty: {
      control: 'boolean',
      description: 'Разрешает снятие выбора',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает группу на всю ширину контейнера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    options: {
      control: 'object',
      description: 'Массив опций',
      table: {
        category: 'Свойства',
        type: { summary: 'ExtraSelectButtonOption[]' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Контрол невалиден, пока значение не выбрано',
      table: { category: 'Свойства', defaultValue: { summary: 'false' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние через FormControl',
      table: { category: 'Состояния', defaultValue: { summary: 'false' } }
    },
    ariaLabel: { control: 'text', table: { category: 'Дополнительно' } },
    ariaLabelledBy: { control: 'text', table: { category: 'Дополнительно' } },
    autofocus: { control: 'boolean', table: { category: 'Дополнительно' } },
    tabindex: { control: 'number', table: { category: 'Дополнительно' } },
    isDisabled: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    selectButtonPt: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<SelectButtonArgs>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    parts.push(`[formControl]="control"`);
    parts.push(`[options]="options"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.multiple) parts.push(`[multiple]="true"`);
    if (!args.allowEmpty) parts.push(`[allowEmpty]="false"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.required) parts.push('[required]="required"');
    if (args.ariaLabel) parts.push('[ariaLabel]="ariaLabel"');
    if (args.ariaLabelledBy) parts.push('[ariaLabelledBy]="ariaLabelledBy"');
    if (args.autofocus) parts.push('[autofocus]="autofocus"');
    if (args.tabindex != null) parts.push('[tabindex]="tabindex"');

    const template = `<extra-select-button\n  ${parts.join('\n  ')}\n></extra-select-button>`;

    const { value, disabled, ...inputs } = args;
    const selection = args.multiple
      ? Array.isArray(value)
        ? value
        : value == null
          ? []
          : [value]
      : Array.isArray(value)
        ? (value[0] ?? null)
        : value;
    const control = new FormControl({ value: selection, disabled });
    return { props: { ...inputs, control }, template };
  },
  args: {
    value: '1',
    options: [
      { name: 'Option 1', code: '1' },
      { name: 'Option 2', code: '2' },
      { name: 'Option 3', code: '3' }
    ],
    size: 'base',
    multiple: false,
    allowEmpty: true,
    fluid: false,
    required: false,
    disabled: false,
    autofocus: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый SelectButton. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Selected ──────────────────────────────────────────────────────────────────

export const Selected: Story = SelectedStory;

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = DisabledStory;

// ── Semi-disabled ─────────────────────────────────────────────────────────────

export const SemiDisabled: Story = SemiDisabledStory;

// ── With Icons ────────────────────────────────────────────────────────────────

export const WithIcons: Story = WithIconsStory;

// ── Fluid ─────────────────────────────────────────────────────────────────────

export const Fluid: Story = FluidStory;
