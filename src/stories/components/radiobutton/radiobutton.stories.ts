import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraRadiobuttonComponent as RadiobuttonComponent } from '../../../lib/components/radiobutton/radiobutton.component';
import { RadiobuttonGroupComponent, Group } from './examples/radiobutton-group.component';
import { RadiobuttonInvalidComponent, Invalid } from './examples/radiobutton-invalid.component';
import { RadiobuttonDisabledComponent, Disabled } from './examples/radiobutton-disabled.component';

type RadiobuttonArgs = RadiobuttonComponent;

const meta: Meta<RadiobuttonArgs> = {
  title: 'Components/Form/RadioButton',
  component: RadiobuttonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RadiobuttonComponent,
        FormsModule,
        RadiobuttonGroupComponent,
        RadiobuttonInvalidComponent,
        RadiobuttonDisabledComponent,
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-radiobutton' },
    docs: {
      description: {
        component: `Компонент для выбора одного варианта из группы.`,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    disabled: {
      control: 'boolean',
      description: 'Отключает возможность взаимодействия',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Подсвечивает поле как невалидное',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    variant: { table: { disable: true } },
    // Hidden props
    value: { table: { disable: true } },
    name: { table: { disable: true } },
    size: { table: { disable: true } },
    inputId: { table: { disable: true } },
    tabindex: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    ariaLabelledBy: { table: { disable: true } },
    autofocus: { table: { disable: true } },

    // ── Events ───────────────────────────────────────────────
    onClick: {
      control: false,
      description: 'Событие выбора радиокнопки',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<RadioButtonClickEvent>' },
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
    disabled: false,
    invalid: false,
    variant: 'outlined',
  },
};

export default meta;
type Story = StoryObj<RadiobuttonArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [`value="option1"`, `name="demo"`, `[(ngModel)]="selected"`];
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (args.variant && args.variant !== 'outlined') parts.push(`variant="${args.variant}"`);

    const template = `<extra-radiobutton\n  ${parts.join('\n  ')}\n></extra-radiobutton>`;
    return { props: { ...args, selected: 'option1' }, template };
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
export { Group, Invalid, Disabled };
