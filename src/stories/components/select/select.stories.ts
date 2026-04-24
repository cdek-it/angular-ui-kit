import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent } from '../../../lib/components/select/select.component';
import { SelectFilterComponent, Filter as FilterStory } from './examples/select-filter.component';
import { SelectGroupedComponent, Grouped as GroupedStory } from './examples/select-grouped.component';
import { SelectCustomComponent, Custom as CustomStory } from './examples/select-custom.component';
import { SelectEditableComponent, Editable as EditableStory } from './examples/select-editable.component';
import { Disabled as DisabledStory } from './examples/select-disabled.component';
import { SelectFloatLabelComponent, FloatLabelStory } from './examples/select-float-label.component';


const BASIC_OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' },
];

type SelectArgs = Pick<SelectComponent, 'size' | 'placeholder' | 'showClear' | 'filter' | 'readonly' | 'checkmark'> & {
  disabled: boolean;
  invalid: boolean;
};

const meta: Meta<SelectArgs> = {
  title: 'Components/Form/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        SelectComponent,
        ReactiveFormsModule,
        SelectFilterComponent,
        SelectGroupedComponent,
        SelectCustomComponent,
        SelectEditableComponent,
        SelectFloatLabelComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Выпадающий список для выбора одного значения из набора опций. Поддерживает фильтрацию, группировку, кастомные шаблоны и редактируемый ввод.

\`\`\`typescript
import { SelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-select' },
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
      description: 'Отображает иконку очистки выбранного значения',
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
    checkmark: {
      control: 'boolean',
      description: 'Отображает иконку выбранного элемента в списке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
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
    placeholder: 'Выберите город...',
    showClear: true,
    filter: false,
    readonly: false,
    checkmark: true,
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<SelectArgs>;

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
        <select-field
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          [placeholder]="placeholder"
          [size]="size"
          [showClear]="showClear"
          [filter]="filter"
          [readonly]="readonly"
          [checkmark]="checkmark"
        ></select-field>
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

// ── Filter ────────────────────────────────────────────────────────────────────

export const Filter: Story = FilterStory;

// ── Grouped ───────────────────────────────────────────────────────────────────

export const Grouped: Story = GroupedStory;

// ── Custom ────────────────────────────────────────────────────────────────────

export const Custom: Story = CustomStory;

// ── Editable ──────────────────────────────────────────────────────────────────

export const Editable: Story = EditableStory;

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = DisabledStory;

// ── FloatLabel ────────────────────────────────────────────────────────────────

export const FloatLabel: Story = FloatLabelStory;
