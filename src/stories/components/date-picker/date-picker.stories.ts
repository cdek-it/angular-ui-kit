import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../lib/components/date-picker/date-picker.component';
import { DatePickerBasicComponent } from './examples/date-picker-basic.component';
import { DatePickerRangeComponent } from './examples/date-picker-range.component';
import { DatePickerTimeComponent } from './examples/date-picker-time.component';
import { DatePickerButtonBarComponent } from './examples/date-picker-button-bar.component';
import { DatePickerInlineComponent } from './examples/date-picker-inline.component';
import { DatePickerDisabledComponent } from './examples/date-picker-disabled.component';
import { DatePickerInvalidComponent } from './examples/date-picker-invalid.component';
import { DatePickerClearIconComponent } from './examples/date-picker-clear-icon.component';

type DatePickerArgs = ExtraDatePickerComponent & {
  control: FormControl<Date | Date[] | null>;
};

const meta: Meta<DatePickerArgs> = {
  title: 'Components/Form/DatePicker',
  component: ExtraDatePickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        ExtraDatePickerComponent,
        DatePickerBasicComponent,
        DatePickerRangeComponent,
        DatePickerTimeComponent,
        DatePickerButtonBarComponent,
        DatePickerInlineComponent,
        DatePickerDisabledComponent,
        DatePickerInvalidComponent,
        DatePickerClearIconComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Компонент выбора даты и времени. Реализует \`ControlValueAccessor\` — работает с реактивными формами и \`ngModel\`. [Figma Design](https://www.figma.com/design/4TYeki0MDLhfPGJstbIicf/UI-kit-PrimeFace-(DS)?node-id=484-5726).

\`\`\`typescript
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: {
      prefix: '--p-datepicker',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Размер поля ввода',
      table: {
        category: 'Props',
        defaultValue: { summary: 'medium' },
        type: { summary: "'small' | 'medium' | 'large' | 'xlarge'" },
      },
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'Режим выбора даты',
      table: {
        category: 'Props',
        defaultValue: { summary: 'single' },
        type: { summary: "'single' | 'multiple' | 'range'" },
      },
    },
    showIcon: {
      control: 'boolean',
      description: 'Отображает иконку календаря',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
      },
    },
    showClear: {
      control: 'boolean',
      description: 'Отображает иконку очистки содержимого поля',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    showButtonBar: {
      control: 'boolean',
      description: 'Отображает кнопки «Сегодня» и «Очистить» в подвале панели',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    showTime: {
      control: 'boolean',
      description: 'Включает выбор времени',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    inline: {
      control: 'boolean',
      description: 'Отображает календарь инлайн без поля ввода',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Флаг невалидности поля (меняет цвет границ)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Управляется через FormControl (setDisabledState)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Переводит поле в режим «только чтение»',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Текст подсказки внутри поля',
      table: {
        category: 'Props',
      },
    },
    dateFormat: {
      control: 'text',
      description: 'Формат отображения даты',
      table: {
        category: 'Props',
        defaultValue: { summary: 'dd.mm.yy' },
      },
    },
    onSelect: {
      control: false,
      description: 'Событие выбора даты',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Date>' },
      },
    },
  },
  args: {
    size: 'medium',
    selectionMode: 'single',
    showIcon: true,
    showClear: false,
    showButtonBar: false,
    showTime: false,
    inline: false,
    invalid: false,
    disabled: false,
    readonly: false,
    placeholder: 'Выберите дату доставки',
    dateFormat: 'dd.mm.yy',
  },
};

const commonTemplate = `
<extra-date-picker
  [formControl]="control"
  [size]="size"
  [selectionMode]="selectionMode"
  [showIcon]="showIcon"
  [showClear]="showClear"
  [showButtonBar]="showButtonBar"
  [showTime]="showTime"
  [inline]="inline"
  [invalid]="invalid"
  [readonly]="readonly"
  [placeholder]="placeholder"
  [dateFormat]="dateFormat"
></extra-date-picker>
<p style="margin-top:8px;font-size:13px;color:#666">Значение: {{ control.value ?? 'не выбрано' }}</p>
`;

export default meta;
type Story = StoryObj<DatePickerArgs>;

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = ['[formControl]="control"'];

    if (args.size && args.size !== 'medium') parts.push(`size="${args.size}"`);
    if (args.selectionMode && args.selectionMode !== 'single') parts.push(`selectionMode="${args.selectionMode}"`);
    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.dateFormat && args.dateFormat !== 'dd.mm.yy') parts.push(`dateFormat="${args.dateFormat}"`);
    if (!args.showIcon) parts.push(`[showIcon]="false"`);
    if (args.showClear) parts.push(`[showClear]="true"`);
    if (args.showButtonBar) parts.push(`[showButtonBar]="true"`);
    if (args.showTime) parts.push(`[showTime]="true"`);
    if (args.inline) parts.push(`[inline]="true"`);
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (args.readonly) parts.push(`[readonly]="true"`);

    const template = `<extra-date-picker\n  ${parts.join('\n  ')}\n></extra-date-picker>\n<p style="margin-top:8px;font-size:13px;color:#666">Значение: {{ control.value ?? 'не выбрано' }}</p>`;

    return {
      props: { ...args, control: new FormControl<Date | null>(null) },
      template,
    };
  },
  args: { placeholder: 'Выберите дату доставки' },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

export const Range: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl<Date[] | null>(null) },
    template: commonTemplate,
  }),
  args: { selectionMode: 'range', placeholder: 'Период доставки' },
  parameters: {
    docs: {
      description: { story: 'Выбор диапазона дат для указания периода доставки.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-date-picker-range',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template: \\\`
    <extra-date-picker
      [formControl]="datesControl"
      selectionMode="range"
      placeholder="Период доставки"
    ></extra-date-picker>
  \\\`,
})
export class DatePickerRangeComponent {
  datesControl = new FormControl<Date[] | null>(null);
}
        `,
      },
    },
  },
};

export const Time: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl<Date | null>(null) },
    template: commonTemplate,
  }),
  args: { showTime: true, placeholder: 'Дата и время отправки' },
  parameters: {
    docs: {
      description: { story: 'Выбор даты и времени для указания точного момента отправки.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-date-picker-time',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template: \\\`
    <extra-date-picker
      [formControl]="dateControl"
      [showTime]="true"
      placeholder="Дата и время отправки"
    ></extra-date-picker>
  \\\`,
})
export class DatePickerTimeComponent {
  dateControl = new FormControl<Date | null>(null);
}
        `,
      },
    },
  },
};

export const ButtonBar: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl<Date | null>(null) },
    template: commonTemplate,
  }),
  args: { showButtonBar: true, placeholder: 'Дата отгрузки' },
  parameters: {
    docs: {
      description: { story: 'Панель кнопок «Сегодня» и «Очистить» для быстрого выбора.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-date-picker-button-bar',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template: \\\`
    <extra-date-picker
      [formControl]="dateControl"
      [showButtonBar]="true"
      placeholder="Дата отгрузки"
    ></extra-date-picker>
  \\\`,
})
export class DatePickerButtonBarComponent {
  dateControl = new FormControl<Date | null>(null);
}
        `,
      },
    },
  },
};

export const Inline: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl<Date | null>(null) },
    template: commonTemplate,
  }),
  args: { inline: true, placeholder: undefined },
  parameters: {
    docs: {
      description: { story: 'Инлайн-календарь без поля ввода.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-date-picker-inline',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template: \\\`
    <extra-date-picker
      [formControl]="dateControl"
      [inline]="true"
    ></extra-date-picker>
  \\\`,
})
export class DatePickerInlineComponent {
  dateControl = new FormControl<Date | null>(null);
}
        `,
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl<Date | null>({ value: null, disabled: true }) },
    template: commonTemplate,
  }),
  args: { placeholder: 'Дата заблокирована' },
  parameters: {
    docs: {
      description: { story: 'Заблокированное поле выбора даты (через FormControl).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-date-picker-disabled',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template: \\\`
    <extra-date-picker
      [formControl]="dateControl"
      placeholder="Дата заблокирована"
    ></extra-date-picker>
  \\\`,
})
export class DatePickerDisabledComponent {
  dateControl = new FormControl<Date | null>({ value: null, disabled: true });
}
        `,
      },
    },
  },
};

export const Invalid: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl<Date | null>(null) },
    template: commonTemplate,
  }),
  args: { invalid: true, placeholder: 'Некорректная дата' },
  parameters: {
    docs: {
      description: { story: 'Невалидное состояние поля выбора даты.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-date-picker-invalid',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template: \\\`
    <extra-date-picker
      [formControl]="dateControl"
      [invalid]="true"
      placeholder="Некорректная дата"
    ></extra-date-picker>
  \\\`,
})
export class DatePickerInvalidComponent {
  dateControl = new FormControl<Date | null>(null);
}
        `,
      },
    },
  },
};

export const ClearIcon: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl<Date | null>(null) },
    template: commonTemplate,
  }),
  args: { showClear: true, placeholder: 'Дата с очисткой' },
  parameters: {
    docs: {
      description: { story: 'Иконка очистки для быстрого сброса выбранной даты.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-date-picker-clear-icon',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template: \\\`
    <extra-date-picker
      [formControl]="dateControl"
      [showClear]="true"
      placeholder="Дата с очисткой"
    ></extra-date-picker>
  \\\`,
})
export class DatePickerClearIconComponent {
  dateControl = new FormControl<Date | null>(null);
}
        `,
      },
    },
  },
};
