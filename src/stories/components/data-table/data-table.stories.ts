import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraDataTableComponent } from '../../../lib/components/data-table/data-table.component';
import { DataTableDefaultComponent } from './examples/data-table-default.component';
import { DataTableStripedRowsComponent } from './examples/data-table-striped-rows.component';
import { DataTableSelectableComponent } from './examples/data-table-selectable.component';
import { DataTableGridLinesComponent } from './examples/data-table-grid-lines.component';
import { DataTablePaginationComponent } from './examples/data-table-pagination.component';
import { DataTableSelectionRadioComponent } from './examples/data-table-selection-radio.component';
import { DataTableSelectionCheckboxComponent } from './examples/data-table-selection-checkbox.component';
import { DataTableScrollVerticalComponent } from './examples/data-table-scroll-vertical.component';
import { DataTableScrollHorizontalComponent } from './examples/data-table-scroll-horizontal.component';

const meta: Meta<ExtraDataTableComponent> = {
  title: 'Components/Data/DataTable',
  component: ExtraDataTableComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Таблица данных с поддержкой сортировки, пагинации, выбора строк и прокрутки.

\`\`\`typescript
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-datatable' },
  },
  argTypes: {
    value: {
      control: false,
      description: 'Массив данных для отображения в таблице.',
      table: {
        category: 'Props',
        type: { summary: 'any[]' },
      },
    },
    columns: {
      control: false,
      description: 'Определения столбцов таблицы.',
      table: {
        category: 'Props',
        type: { summary: 'DataTableColumn[]' },
      },
    },
    stripedRows: {
      control: 'boolean',
      description: 'Чередование цвета строк.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showGridlines: {
      control: 'boolean',
      description: 'Отображение сетки между ячейками.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Отображает индикатор загрузки.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'large', undefined],
      description: 'Размер таблицы.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined (normal)' },
        type: { summary: "'small' | 'large' | undefined" },
      },
    },
    scrollable: {
      control: 'boolean',
      description: 'Включает прокрутку таблицы.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    scrollHeight: {
      control: 'text',
      description: 'Высота области прокрутки (например "400px"). Работает только при scrollable=true.',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    paginator: {
      control: 'boolean',
      description: 'Включает пагинацию.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    rows: {
      control: 'number',
      description: 'Количество строк на странице (при paginator=true).',
      table: {
        category: 'Props',
        defaultValue: { summary: '5' },
        type: { summary: 'number' },
      },
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple', undefined],
      description: 'Режим выбора строк.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: "'single' | 'multiple' | undefined" },
      },
    },
    dataKey: {
      control: 'text',
      description: 'Поле объекта, используемое как уникальный идентификатор строки.',
      table: {
        category: 'Props',
        defaultValue: { summary: "'id'" },
        type: { summary: 'string' },
      },
    },
    selectionChange: {
      control: false,
      description: 'Событие изменения выбранных строк.',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<any>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ExtraDataTableComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'DataTable',
  decorators: [moduleMetadata({ imports: [DataTableDefaultComponent] })],
  render: () => ({ template: `<app-data-table-default></app-data-table-default>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовая таблица отправлений с сортировкой по всем столбцам.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-default',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table [value]="shipments" [columns]="columns"></extra-data-table>
  \`,
})
export class DataTableDefaultComponent {
  shipments = [
    { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
    { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  ];

  columns: DataTableColumn[] = [
    { field: 'trackNumber', header: 'Трек-номер', sortable: true },
    { field: 'destination', header: 'Назначение', sortable: true },
    { field: 'status', header: 'Статус', sortable: true },
    { field: 'weight', header: 'Вес, кг', sortable: true },
    { field: 'cost', header: 'Стоимость, ₽', sortable: true },
  ];
}
        `,
      },
    },
  },
};

// ── StripedRows ───────────────────────────────────────────────────────────────

export const StripedRows: Story = {
  name: 'StripedRows',
  decorators: [moduleMetadata({ imports: [DataTableStripedRowsComponent] })],
  render: () => ({ template: `<app-data-table-striped-rows></app-data-table-striped-rows>` }),
  parameters: {
    docs: {
      description: {
        story: 'Чередование цвета строк для улучшения читаемости.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-striped-rows',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table [value]="shipments" [columns]="columns" [stripedRows]="true"></extra-data-table>
  \`,
})
export class DataTableStripedRowsComponent {
  shipments = [
    { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
    { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  ];

  columns: DataTableColumn[] = [
    { field: 'trackNumber', header: 'Трек-номер', sortable: true },
    { field: 'destination', header: 'Назначение', sortable: true },
    { field: 'status', header: 'Статус', sortable: true },
    { field: 'weight', header: 'Вес, кг', sortable: true },
    { field: 'cost', header: 'Стоимость, ₽', sortable: true },
  ];
}
        `,
      },
    },
  },
};

// ── Selectable ────────────────────────────────────────────────────────────────

export const Selectable: Story = {
  name: 'Selectable',
  decorators: [moduleMetadata({ imports: [DataTableSelectableComponent] })],
  render: () => ({ template: `<app-data-table-selectable></app-data-table-selectable>` }),
  parameters: {
    docs: {
      description: {
        story: 'Выбор строки кликом. Режим single — выбирается одна строка.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-selectable',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table
      [value]="shipments"
      [columns]="columns"
      selectionMode="single"
      [(selection)]="selected"
      dataKey="id"
    ></extra-data-table>
  \`,
})
export class DataTableSelectableComponent {
  shipments = [
    { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
    { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  ];

  columns: DataTableColumn[] = [
    { field: 'trackNumber', header: 'Трек-номер', sortable: true },
    { field: 'destination', header: 'Назначение', sortable: true },
    { field: 'status', header: 'Статус', sortable: true },
    { field: 'weight', header: 'Вес, кг', sortable: true },
    { field: 'cost', header: 'Стоимость, ₽', sortable: true },
  ];

  selected: any = null;
}
        `,
      },
    },
  },
};

// ── GridLines ─────────────────────────────────────────────────────────────────

export const GridLines: Story = {
  name: 'GridLines',
  decorators: [moduleMetadata({ imports: [DataTableGridLinesComponent] })],
  render: () => ({ template: `<app-data-table-grid-lines></app-data-table-grid-lines>` }),
  parameters: {
    docs: {
      description: {
        story: 'Сетка между ячейками для наглядного разграничения данных.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-grid-lines',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table [value]="shipments" [columns]="columns" [showGridlines]="true"></extra-data-table>
  \`,
})
export class DataTableGridLinesComponent {
  shipments = [
    { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
    { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  ];

  columns: DataTableColumn[] = [
    { field: 'trackNumber', header: 'Трек-номер', sortable: true },
    { field: 'destination', header: 'Назначение', sortable: true },
    { field: 'status', header: 'Статус', sortable: true },
    { field: 'weight', header: 'Вес, кг', sortable: true },
    { field: 'cost', header: 'Стоимость, ₽', sortable: true },
  ];
}
        `,
      },
    },
  },
};

// ── Pagination ────────────────────────────────────────────────────────────────

export const Pagination: Story = {
  name: 'Pagination',
  decorators: [moduleMetadata({ imports: [DataTablePaginationComponent] })],
  render: () => ({ template: `<app-data-table-pagination></app-data-table-pagination>` }),
  parameters: {
    docs: {
      description: {
        story: 'Пагинация для больших наборов данных. Управление количеством строк на странице.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-pagination',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table
      [value]="shipments"
      [columns]="columns"
      [paginator]="true"
      [rows]="5"
      [rowsPerPageOptions]="[5, 10, 25]"
    ></extra-data-table>
  \`,
})
export class DataTablePaginationComponent {
  shipments = [...]; // массив отправлений
  columns: DataTableColumn[] = [
    { field: 'trackNumber', header: 'Трек-номер', sortable: true },
    { field: 'destination', header: 'Назначение', sortable: true },
    { field: 'status', header: 'Статус', sortable: true },
    { field: 'weight', header: 'Вес, кг', sortable: true },
    { field: 'cost', header: 'Стоимость, ₽', sortable: true },
  ];
}
        `,
      },
    },
  },
};

// ── SelectionRadio ────────────────────────────────────────────────────────────

export const SelectionRadio: Story = {
  name: 'Row Selection: RadioButton',
  decorators: [moduleMetadata({ imports: [DataTableSelectionRadioComponent] })],
  render: () => ({ template: `<app-data-table-selection-radio></app-data-table-selection-radio>` }),
  parameters: {
    docs: {
      description: {
        story: 'Выбор одной строки через радио-кнопку. Укажите selectionMode: "single" в первом столбце.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-selection-radio',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table
      [value]="shipments"
      [columns]="columns"
      selectionMode="single"
      [(selection)]="selected"
      dataKey="id"
    ></extra-data-table>
  \`,
})
export class DataTableSelectionRadioComponent {
  shipments = [...]; // массив отправлений
  columns: DataTableColumn[] = [
    { selectionMode: 'single' },
    { field: 'trackNumber', header: 'Трек-номер', sortable: true },
    { field: 'destination', header: 'Назначение', sortable: true },
    { field: 'status', header: 'Статус', sortable: true },
    { field: 'weight', header: 'Вес, кг', sortable: true },
  ];
  selected: any = null;
}
        `,
      },
    },
  },
};

// ── SelectionCheckbox ─────────────────────────────────────────────────────────

export const SelectionCheckbox: Story = {
  name: 'Row Selection: Checkbox',
  decorators: [moduleMetadata({ imports: [DataTableSelectionCheckboxComponent] })],
  render: () => ({ template: `<app-data-table-selection-checkbox></app-data-table-selection-checkbox>` }),
  parameters: {
    docs: {
      description: {
        story: 'Множественный выбор строк через чекбоксы. Первый столбец с selectionMode: "multiple" добавляет чекбокс в заголовок.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-selection-checkbox',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table
      [value]="shipments"
      [columns]="columns"
      selectionMode="multiple"
      [(selection)]="selected"
      dataKey="id"
    ></extra-data-table>
  \`,
})
export class DataTableSelectionCheckboxComponent {
  shipments = [...]; // массив отправлений
  columns: DataTableColumn[] = [
    { selectionMode: 'multiple' },
    { field: 'trackNumber', header: 'Трек-номер', sortable: true },
    { field: 'destination', header: 'Назначение', sortable: true },
    { field: 'status', header: 'Статус', sortable: true },
    { field: 'weight', header: 'Вес, кг', sortable: true },
  ];
  selected: any[] = [];
}
        `,
      },
    },
  },
};

// ── ScrollVertical ────────────────────────────────────────────────────────────

export const ScrollVertical: Story = {
  name: 'Scroll: Vertical',
  decorators: [moduleMetadata({ imports: [DataTableScrollVerticalComponent] })],
  render: () => ({ template: `<app-data-table-scroll-vertical></app-data-table-scroll-vertical>` }),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальная прокрутка с фиксированной высотой контейнера. Заголовок остаётся видимым.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-scroll-vertical',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table
      [value]="shipments"
      [columns]="columns"
      [scrollable]="true"
      scrollHeight="400px"
    ></extra-data-table>
  \`,
})
export class DataTableScrollVerticalComponent {
  shipments = [...]; // большой массив отправлений
  columns: DataTableColumn[] = [
    { field: 'trackNumber', header: 'Трек-номер', sortable: true },
    { field: 'destination', header: 'Назначение', sortable: true },
    { field: 'status', header: 'Статус', sortable: true },
    { field: 'weight', header: 'Вес, кг', sortable: true },
  ];
}
        `,
      },
    },
  },
};

// ── ScrollHorizontal ──────────────────────────────────────────────────────────

export const ScrollHorizontal: Story = {
  name: 'Scroll: Horizontal',
  decorators: [moduleMetadata({ imports: [DataTableScrollHorizontalComponent] })],
  render: () => ({ template: `<app-data-table-scroll-horizontal></app-data-table-scroll-horizontal>` }),
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальная прокрутка при большом количестве столбцов. Используйте style с min-width на столбцах.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-data-table-scroll-horizontal',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template: \`
    <extra-data-table [value]="shipments" [columns]="columns" [scrollable]="true"></extra-data-table>
  \`,
})
export class DataTableScrollHorizontalComponent {
  shipments = [...]; // массив отправлений
  columns: DataTableColumn[] = [
    { field: 'trackNumber', header: 'Трек-номер', sortable: true, style: 'min-width: 160px' },
    { field: 'sender', header: 'Отправитель', sortable: true, style: 'min-width: 160px' },
    { field: 'destination', header: 'Назначение', sortable: true, style: 'min-width: 160px' },
    { field: 'status', header: 'Статус', sortable: true, style: 'min-width: 140px' },
    { field: 'weight', header: 'Вес, кг', sortable: true, style: 'min-width: 120px' },
    { field: 'cost', header: 'Стоимость, ₽', sortable: true, style: 'min-width: 140px' },
    { field: 'dimensions', header: 'Габариты', sortable: false, style: 'min-width: 160px' },
  ];
}
        `,
      },
    },
  },
};
