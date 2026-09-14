import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraSelectComponent } from '../../../lib/components/select/select.component';
import { Filter as FilterStory, SelectFilterComponent } from './examples/select-filter.component';
import { Grouped as GroupedStory, SelectGroupedComponent } from './examples/select-grouped.component';
import { Custom as CustomStory, SelectCustomComponent } from './examples/select-custom.component';
import {
  SelectedItem as SelectedItemStory,
  SelectSelectedItemComponent
} from './examples/select-selected-item.component';
import { Editable as EditableStory, SelectEditableComponent } from './examples/select-editable.component';
import { Disabled as DisabledStory } from './examples/select-disabled.component';
import { LabelPosition as LabelPositionStory, SelectLabelPositionComponent } from './examples/select-label-position.component';

const BASIC_OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' }
];

type SelectArgs = Pick<
  ExtraSelectComponent,
  | 'size'
  | 'placeholder'
  | 'label'
  | 'labelPosition'
  | 'caption'
  | 'info'
  | 'clearable'
  | 'showFilter'
  | 'readonly'
  | 'showCheckbox'
  | 'onChange'
  | 'onShow'
  | 'onHide'
  | 'onClear'
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
        SelectSelectedItemComponent,
        SelectEditableComponent,
        SelectLabelPositionComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-select' },
    docs: {
      description: {
        component: `Single-select — выпадающий список для выбора одного значения из набора опций.

Реализован по спецификации [select.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/select.md).

\`\`\`typescript
import { ExtraSelectComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Шаблоны (передаются между тегами компонента):
- \`extraSelectOption\` — пункт списка (контекст \`let-option\`)
- \`extraSelectSelectedItem\` — выбранное значение в закрытом состоянии (контекст \`let-option\`)
- \`extraSelectOptionGroup\` — заголовок группы (контекст \`let-group\`)

\`\`\`typescript
import { ExtraSelectOptionDirective, ExtraSelectSelectedItemDirective, ExtraSelectOptionGroupDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/select.md) ──────────────
    placeholder: {
      control: 'text',
      description: 'Текст подсказки внутри поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    label: {
      control: 'text',
      description: 'Текст названия поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left', 'float'],
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'top' },
        type: { summary: "'left' | 'top' | 'float'" }
      }
    },
    caption: {
      control: 'text',
      description: 'Текст пояснения под полем',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    info: {
      control: 'text',
      description: 'Текст с доп. информацией (показывается в тултипе иконки ti-info-circle)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Отображение иконки для очистки поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Отображать отметку выбранного option',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showFilter: {
      control: 'boolean',
      description: 'Включает строку поиска в выпадающем списке',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── Состояния (управляются через FormControl) ───────────────────
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие — управляется через FormControl',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — вычисляется из NgControl',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── События ──────────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Срабатывает при выборе значения',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraSelectChangeEvent>' }
      }
    },
    onShow: {
      control: false,
      description: 'Срабатывает при открытии списка',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    onHide: {
      control: false,
      description: 'Срабатывает при закрытии списка',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    onClear: {
      control: false,
      description: 'Срабатывает при очистке значения',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    }
  },
  args: {
    size: 'base',
    placeholder: 'Выберите город...',
    label: '',
    labelPosition: 'top',
    caption: '',
    info: '',
    clearable: true,
    showFilter: false,
    readonly: false,
    showCheckbox: true,
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
          [label]="label"
          [labelPosition]="labelPosition"
          [caption]="caption"
          [info]="info"
          [size]="size"
          [clearable]="clearable"
          [showFilter]="showFilter"
          [readonly]="readonly"
          [showCheckbox]="showCheckbox"
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

// ── Комбинаторные истории ──────────────────────────────────────────────────

export const Filter: Story = FilterStory;
export const Grouped: Story = GroupedStory;
export const Custom: Story = CustomStory;
export const SelectedItem: Story = SelectedItemStory;
export const Editable: Story = EditableStory;
export const Disabled: Story = DisabledStory;
export const LabelPosition: Story = LabelPositionStory;
