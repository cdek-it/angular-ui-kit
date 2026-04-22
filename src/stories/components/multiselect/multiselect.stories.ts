import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel as PrimeFloatLabel } from 'primeng/floatlabel';
import { MultiSelectComponent } from '../../../lib/components/multiselect/multiselect.component';
import { MultiSelectChipsComponent, Chips as ChipsStory } from './examples/multiselect-chips.component';
import { Disabled as DisabledStory } from './examples/multiselect-disabled.component';
import { MultiSelectFloatLabelComponent, FloatLabelStory } from './examples/multiselect-float-label.component';

const BASIC_OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' },
];

type MultiSelectArgs = Pick<MultiSelectComponent, 'size' | 'placeholder' | 'showClear' | 'filter' | 'display' | 'readonly'> & {
  disabled: boolean;
  invalid: boolean;
};

const meta: Meta<MultiSelectArgs> = {
  title: 'Components/Form/MultiSelect',
  component: MultiSelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        MultiSelectComponent,
        ReactiveFormsModule,
        PrimeFloatLabel,
        MultiSelectChipsComponent,
        MultiSelectFloatLabelComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Выпадающий список для выбора нескольких значений из набора опций. Поддерживает отображение выбранных значений через запятую или в виде чипов.

\`\`\`typescript
import { MultiSelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-multiselect' },
  },
  argTypes: {
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
    display: {
      control: 'select',
      options: ['comma', 'chip'],
      description: 'Способ отображения выбранных значений',
      table: {
        category: 'Props',
        defaultValue: { summary: "'comma'" },
        type: { summary: "'comma' | 'chip'" },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Текст подсказки при пустом поле',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    showClear: {
      control: 'boolean',
      description: 'Отображает иконку очистки выбранных значений',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    filter: {
      control: 'boolean',
      description: 'Включает строку поиска в выпадающем списке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие — управляется через FormControl',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — управляется через FormControl',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    size: 'base',
    display: 'comma',
    placeholder: 'Выберите города...',
    showClear: true,
    filter: false,
    readonly: false,
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<MultiSelectArgs>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const control = new FormControl(
      { value: null, disabled: !!args['disabled'] },
      args['invalid'] ? [Validators.required] : []
    );
    if (args['invalid']) control.markAsTouched();

    return {
      props: { ...args, control, options: BASIC_OPTIONS },
      template: `
        <multiselect-field
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          [placeholder]="placeholder"
          [size]="size"
          [display]="display"
          [showClear]="showClear"
          [filter]="filter"
          [readonly]="readonly"
        ></multiselect-field>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Chips ─────────────────────────────────────────────────────────────────────

export const Chips: Story = ChipsStory;

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = DisabledStory;

// ── FloatLabel ────────────────────────────────────────────────────────────────

export const FloatLabel: Story = FloatLabelStory;
