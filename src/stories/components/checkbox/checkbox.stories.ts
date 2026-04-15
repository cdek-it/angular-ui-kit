import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from '../../../lib/components/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { CheckboxGroupComponent, Group } from './examples/checkbox-group.component';
import { CheckboxIndeterminateComponent, Indeterminate } from './examples/checkbox-indeterminate.component';
import { CheckboxDisabledComponent, Disabled } from './examples/checkbox-disabled.component';
import { CheckboxInvalidComponent, Invalid } from './examples/checkbox-invalid.component';
import { CheckboxLabelComponent, Label } from './examples/checkbox-label.component';
import { CheckboxCustomLabelComponent, CustomLabel } from './examples/checkbox-custom-label.component';

type CheckboxArgs = CheckboxComponent & { label?: string };

const meta: Meta<CheckboxArgs> = {
  title: 'Components/Form/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CheckboxComponent,
        FormsModule,
        CheckboxGroupComponent,
        CheckboxIndeterminateComponent,
        CheckboxDisabledComponent,
        CheckboxInvalidComponent,
        CheckboxLabelComponent,
        CheckboxCustomLabelComponent,
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-checkbox' },
    docs: {
      description: {
        component: `Компонент для выбора одного или нескольких вариантов.`,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    binary: { table: { disable: true } },
    invalid: {
      control: 'boolean',
      description: 'Подсвечивает поле как невалидное',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает возможность взаимодействия',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Устанавливает неопределенное состояние',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    // Hidden props
    size: { table: { disable: true } },
    readonly: { table: { disable: true } },
    checkboxIcon: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    ariaLabelledBy: { table: { disable: true } },
    tabindex: { table: { disable: true } },
    inputId: { table: { disable: true } },
    trueValue: { table: { disable: true } },
    falseValue: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    variant: { table: { disable: true } },
    value: { table: { disable: true } },
    label: { table: { disable: true } },

    // ── Events ───────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Событие изменения значения',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<CheckboxChangeEvent>' },
      },
    },
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Event>' },
      },
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Event>' },
      },
    },
  },
  args: {
    binary: true,
    disabled: false,
    invalid: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];
    if (args.binary) parts.push(`[binary]="true"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (args.indeterminate) parts.push(`[indeterminate]="true"`);
    parts.push(`[(ngModel)]="checked"`);

    const template = `<checkbox\n  ${parts.join('\n  ')}\n></checkbox>`;

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
export { Invalid, Disabled, Indeterminate, Group, Label, CustomLabel };
