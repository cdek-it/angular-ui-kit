import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraSelectComponent } from '../../../lib/components/select/select.component';
import { Filter as FilterStory, SelectFilterComponent } from './examples/select-filter.component';
import { Grouped as GroupedStory, SelectGroupedComponent } from './examples/select-grouped.component';
import { Custom as CustomStory, SelectCustomComponent } from './examples/select-custom.component';
import { Editable as EditableStory, SelectEditableComponent } from './examples/select-editable.component';
import { Disabled as DisabledStory } from './examples/select-disabled.component';
import { FloatLabelStory, SelectFloatLabelComponent } from './examples/select-float-label.component';

const BASIC_OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' }
];

type SelectArgs = Pick<
  ExtraSelectComponent,
  'size' | 'placeholder' | 'showClear' | 'filter' | 'readonly' | 'checkmark'
> & {
  disabled: boolean;
  invalid: boolean;
};

const meta: Meta<SelectArgs> = {
  title: 'Components/Form/Select',
  component: ExtraSelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraSelectComponent,
        ReactiveFormsModule,
        SelectFilterComponent,
        SelectGroupedComponent,
        SelectCustomComponent,
        SelectEditableComponent,
        SelectFloatLabelComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Выпадающий список для выбора одного значения из набора опций. Поддерживает фильтрацию, группировку, кастомные шаблоны и редактируемый ввод.

\`\`\`typescript
import { ExtraSelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-select' }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Текст подсказки при пустом поле',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    showClear: {
      control: 'boolean',
      description: 'Отображает иконку очистки выбранного значения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    filter: {
      control: 'boolean',
      description: 'Включает строку поиска в выпадающем списке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    checkmark: {
      control: 'boolean',
      description: 'Отображает иконку выбранного элемента в списке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие — управляется через FormControl',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — управляется через FormControl',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    size: 'base',
    placeholder: 'Выберите город...',
    showClear: true,
    filter: false,
    readonly: false,
    checkmark: true,
    disabled: false,
    invalid: false
  }
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
        <extra-select
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          [placeholder]="placeholder"
          [size]="size"
          [showClear]="showClear"
          [filter]="filter"
          [readonly]="readonly"
          [checkmark]="checkmark"
        ></extra-select>
      `
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
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
