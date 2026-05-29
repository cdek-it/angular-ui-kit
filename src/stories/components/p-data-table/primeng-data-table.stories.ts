import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PDataTableDefaultComponent } from './examples/primeng-table-default.component';
import { PDataTableStripedRowsComponent } from './examples/primeng-table-striped-rows.component';
import { PDataTableSelectableComponent } from './examples/primeng-table-selectable.component';
import { PDataTableGridLinesComponent } from './examples/primeng-table-grid-lines.component';
import { PDataTablePaginationComponent } from './examples/primeng-table-pagination.component';
import { PDataTableSelectionRadioComponent } from './examples/primeng-table-selection-radio.component';
import { PDataTableSelectionCheckboxComponent } from './examples/primeng-table-selection-checkbox.component';
import { PDataTableScrollVerticalComponent } from './examples/primeng-table-scroll-vertical.component';
import { PDataTableScrollHorizontalComponent } from './examples/primeng-table-scroll-horizontal.component';
import { PDataTableCustomBodyComponent } from './examples/primeng-table-custom-body.component';
import { PDataTableLazyComponent } from './examples/primeng-table-lazy.component';

const meta: Meta = {
  title: 'Components/Data/DataTable (PrimeNG)',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Таблица данных на базе PrimeNG pTable с поддержкой сортировки, пагинации, выбора строк и прокрутки.

\`\`\`typescript
import { TableModule } from 'primeng/table';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-datatable' },
  },
};

export default meta;
type Story = StoryObj;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'DataTable',
  decorators: [moduleMetadata({ imports: [PDataTableDefaultComponent] })],
  render: () => ({ template: `<app-primeng-table-default></app-primeng-table-default>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовая таблица отправлений с сортировкой по всем столбцам на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800 },
  { id: 6, trackNumber: 'ЦД-00123461', destination: 'Воронеж', status: 'Ожидание', weight: 0.5, cost: 350 },
  { id: 7, trackNumber: 'ЦД-00123462', destination: 'Самара', status: 'В пути', weight: 8.0, cost: 3200 },
  { id: 8, trackNumber: 'ЦД-00123463', destination: 'Ростов-на-Дону', status: 'Доставлен', weight: 2.1, cost: 980 },
];

@Component({
  selector: 'app-primeng-table-default',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
          <th pSortableColumn="cost">Стоимость, ₽ <p-sortIcon field="cost"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
          <td>{{ shipment.cost }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableDefaultComponent {
  shipments = SHIPMENTS;
}`,
      },
    },
  },
};

// ── StripedRows ───────────────────────────────────────────────────────────────

export const StripedRows: Story = {
  name: 'StripedRows',
  decorators: [moduleMetadata({ imports: [PDataTableStripedRowsComponent] })],
  render: () => ({ template: `<app-primeng-table-striped-rows></app-primeng-table-striped-rows>` }),
  parameters: {
    docs: {
      description: {
        story: 'Чередование цвета строк для улучшения читаемости на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800 },
  { id: 6, trackNumber: 'ЦД-00123461', destination: 'Воронеж', status: 'Ожидание', weight: 0.5, cost: 350 },
  { id: 7, trackNumber: 'ЦД-00123462', destination: 'Самара', status: 'В пути', weight: 8.0, cost: 3200 },
  { id: 8, trackNumber: 'ЦД-00123463', destination: 'Ростов-на-Дону', status: 'Доставлен', weight: 2.1, cost: 980 },
];

@Component({
  selector: 'app-primeng-table-striped-rows',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments" [stripedRows]="true">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
          <th pSortableColumn="cost">Стоимость, ₽ <p-sortIcon field="cost"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
          <td>{{ shipment.cost }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableStripedRowsComponent {
  shipments = SHIPMENTS;
}`,
      },
    },
  },
};

// ── Selectable ────────────────────────────────────────────────────────────────

export const Selectable: Story = {
  name: 'Selectable',
  decorators: [moduleMetadata({ imports: [PDataTableSelectableComponent] })],
  render: () => ({ template: `<app-primeng-table-selectable></app-primeng-table-selectable>` }),
  parameters: {
    docs: {
      description: {
        story: 'Выбор строки кликом. Режим single — выбирается одна строка на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800 },
];

@Component({
  selector: 'app-primeng-table-selectable',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments" selectionMode="single" [(selection)]="selected" dataKey="id">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
          <th pSortableColumn="cost">Стоимость, ₽ <p-sortIcon field="cost"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr [pSelectableRow]="shipment">
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
          <td>{{ shipment.cost }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableSelectableComponent {
  shipments = SHIPMENTS;
  selected: any = null;
}`,
      },
    },
  },
};

// ── GridLines ─────────────────────────────────────────────────────────────────

export const GridLines: Story = {
  name: 'GridLines',
  decorators: [moduleMetadata({ imports: [PDataTableGridLinesComponent] })],
  render: () => ({ template: `<app-primeng-table-grid-lines></app-primeng-table-grid-lines>` }),
  parameters: {
    docs: {
      description: {
        story: 'Сетка между ячейками для наглядного разграничения данных на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800 },
];

@Component({
  selector: 'app-primeng-table-grid-lines',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments" [showGridlines]="true">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
          <th pSortableColumn="cost">Стоимость, ₽ <p-sortIcon field="cost"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
          <td>{{ shipment.cost }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableGridLinesComponent {
  shipments = SHIPMENTS;
}`,
      },
    },
  },
};

// ── Pagination ────────────────────────────────────────────────────────────────

export const Pagination: Story = {
  name: 'Pagination',
  decorators: [moduleMetadata({ imports: [PDataTablePaginationComponent] })],
  render: () => ({ template: `<app-primeng-table-pagination></app-primeng-table-pagination>` }),
  parameters: {
    docs: {
      description: {
        story: 'Пагинация для больших наборов данных на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800 },
  { id: 6, trackNumber: 'ЦД-00123461', destination: 'Воронеж', status: 'Ожидание', weight: 0.5, cost: 350 },
  { id: 7, trackNumber: 'ЦД-00123462', destination: 'Самара', status: 'В пути', weight: 8.0, cost: 3200 },
  { id: 8, trackNumber: 'ЦД-00123463', destination: 'Ростов-на-Дону', status: 'Доставлен', weight: 2.1, cost: 980 },
];

@Component({
  selector: 'app-primeng-table-pagination',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments" [paginator]="true" [rows]="5" [rowsPerPageOptions]="[5, 10, 25]">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
          <th pSortableColumn="cost">Стоимость, ₽ <p-sortIcon field="cost"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
          <td>{{ shipment.cost }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTablePaginationComponent {
  shipments = SHIPMENTS;
}`,
      },
    },
  },
};

// ── SelectionRadio ────────────────────────────────────────────────────────────

export const SelectionRadio: Story = {
  name: 'Row Selection: RadioButton',
  decorators: [moduleMetadata({ imports: [PDataTableSelectionRadioComponent] })],
  render: () => ({ template: `<app-primeng-table-selection-radio></app-primeng-table-selection-radio>` }),
  parameters: {
    docs: {
      description: {
        story: 'Выбор одной строки через радио-кнопку на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7 },
];

@Component({
  selector: 'app-primeng-table-selection-radio',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments" selectionMode="single" [(selection)]="selected" dataKey="id">
      <ng-template pTemplate="header">
        <tr>
          <th style="width: 3rem"></th>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr [pSelectableRow]="shipment">
          <td>
            <p-tableRadioButton [value]="shipment"></p-tableRadioButton>
          </td>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableSelectionRadioComponent {
  shipments = SHIPMENTS;
  selected: any = null;
}`,
      },
    },
  },
};

// ── SelectionCheckbox ─────────────────────────────────────────────────────────

export const SelectionCheckbox: Story = {
  name: 'Row Selection: Checkbox',
  decorators: [moduleMetadata({ imports: [PDataTableSelectionCheckboxComponent] })],
  render: () => ({ template: `<app-primeng-table-selection-checkbox></app-primeng-table-selection-checkbox>` }),
  parameters: {
    docs: {
      description: {
        story: 'Множественный выбор строк через чекбоксы на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7 },
];

@Component({
  selector: 'app-primeng-table-selection-checkbox',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments" selectionMode="multiple" [(selection)]="selected" dataKey="id">
      <ng-template pTemplate="header">
        <tr>
          <th style="width: 3rem">
            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
          </th>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr [pSelectableRow]="shipment">
          <td>
            <p-tableCheckbox [value]="shipment"></p-tableCheckbox>
          </td>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableSelectionCheckboxComponent {
  shipments = SHIPMENTS;
  selected: any[] = [];
}`,
      },
    },
  },
};

// ── ScrollVertical ────────────────────────────────────────────────────────────

export const ScrollVertical: Story = {
  name: 'Scroll: Vertical',
  decorators: [moduleMetadata({ imports: [PDataTableScrollVerticalComponent] })],
  render: () => ({ template: `<app-primeng-table-scroll-vertical></app-primeng-table-scroll-vertical>` }),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальная прокрутка с фиксированной высотой контейнера на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const BASE_SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7 },
  { id: 6, trackNumber: 'ЦД-00123461', destination: 'Воронеж', status: 'Ожидание', weight: 0.5 },
  { id: 7, trackNumber: 'ЦД-00123462', destination: 'Самара', status: 'В пути', weight: 8.0 },
  { id: 8, trackNumber: 'ЦД-00123463', destination: 'Ростов-на-Дону', status: 'Доставлен', weight: 2.1 },
];

@Component({
  selector: 'app-primeng-table-scroll-vertical',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments" [scrollable]="true" scrollHeight="400px">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableScrollVerticalComponent {
  shipments = [...BASE_SHIPMENTS, ...BASE_SHIPMENTS, ...BASE_SHIPMENTS];
}`,
      },
    },
  },
};

// ── ScrollHorizontal ──────────────────────────────────────────────────────────

export const ScrollHorizontal: Story = {
  name: 'Scroll: Horizontal',
  decorators: [moduleMetadata({ imports: [PDataTableScrollHorizontalComponent] })],
  render: () => ({ template: `<app-primeng-table-scroll-horizontal></app-primeng-table-scroll-horizontal>` }),
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальная прокрутка при большом количестве столбцов на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', sender: 'Иванов И.И.', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200, dimensions: '30×20×15 см' },
  { id: 2, trackNumber: 'ЦД-00123457', sender: 'Петров П.П.', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450, dimensions: '10×10×10 см' },
  { id: 3, trackNumber: 'ЦД-00123458', sender: 'Сидоров С.С.', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100, dimensions: '50×40×30 см' },
  { id: 4, trackNumber: 'ЦД-00123459', sender: 'Козлов К.К.', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750, dimensions: '20×15×10 см' },
  { id: 5, trackNumber: 'ЦД-00123460', sender: 'Новиков Н.Н.', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800, dimensions: '40×30×20 см' },
];

@Component({
  selector: 'app-primeng-table-scroll-horizontal',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table [value]="shipments" [scrollable]="true" [tableStyle]="{'min-width': '50rem'}">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="trackNumber" pSortableColumnDisabled="false" style="min-width: 160px">
            Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon>
          </th>
          <th pSortableColumn="sender" style="min-width: 160px">
            Отправитель <p-sortIcon field="sender"></p-sortIcon>
          </th>
          <th pSortableColumn="destination" style="min-width: 160px">
            Назначение <p-sortIcon field="destination"></p-sortIcon>
          </th>
          <th pSortableColumn="status" style="min-width: 140px">
            Статус <p-sortIcon field="status"></p-sortIcon>
          </th>
          <th pSortableColumn="weight" style="min-width: 120px">
            Вес, кг <p-sortIcon field="weight"></p-sortIcon>
          </th>
          <th pSortableColumn="cost" style="min-width: 140px">
            Стоимость, ₽ <p-sortIcon field="cost"></p-sortIcon>
          </th>
          <th style="min-width: 160px">Габариты</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.sender }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ shipment.weight }}</td>
          <td>{{ shipment.cost }}</td>
          <td>{{ shipment.dimensions }}</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableScrollHorizontalComponent {
  shipments = SHIPMENTS;
}`,
      },
    },
  },
};

// ── CustomBody ────────────────────────────────────────────────────────────────

export const CustomBody: Story = {
  name: 'Custom Templates',
  decorators: [moduleMetadata({ imports: [PDataTableCustomBodyComponent] })],
  render: () => ({ template: `<app-primeng-table-custom-body></app-primeng-table-custom-body>` }),
  parameters: {
    docs: {
      description: {
        story: 'Кастомные шаблоны для заголовка и тела таблицы на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800 },
];

@Component({
  selector: 'app-primeng-table-custom-body',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  template: \`
    <p-table [value]="shipments">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="trackNumber">Трек-номер <p-sortIcon field="trackNumber"></p-sortIcon></th>
          <th pSortableColumn="destination">Назначение <p-sortIcon field="destination"></p-sortIcon></th>
          <th pSortableColumn="status">Статус <p-sortIcon field="status"></p-sortIcon></th>
          <th pSortableColumn="weight">Вес, кг <p-sortIcon field="weight"></p-sortIcon></th>
          <th pSortableColumn="cost">Стоимость, ₽ <p-sortIcon field="cost"></p-sortIcon></th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr>
          <td>{{ shipment.trackNumber }}</td>
          <td>{{ shipment.destination }}</td>
          <td>
            <p-tag [value]="shipment.status" [severity]="getSeverity(shipment.status)"></p-tag>
          </td>
          <td>{{ shipment.weight }} кг</td>
          <td><strong>{{ shipment.cost | currency:'RUB':'symbol':'1.0-0':'ru' }}</strong></td>
        </tr>
      </ng-template>
      <ng-template pTemplate="emptymessage">
        <tr><td colspan="5" class="text-center p-4">Нет данных для отображения</td></tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableCustomBodyComponent {
  shipments = SHIPMENTS;

  getSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' | 'secondary' | undefined {
    switch (status) {
      case 'Доставлен': return 'success';
      case 'В пути': return 'info';
      case 'Задержан': return 'danger';
      case 'Ожидание': return 'warn';
      default: return 'secondary';
    }
  }
}`,
      },
    },
  },
};

// ── Lazy loading ──────────────────────────────────────────────────────────────

export const LazyLoading: Story = {
  name: 'Lazy Loading',
  decorators: [moduleMetadata({ imports: [PDataTableLazyComponent] })],
  render: () => ({ template: `<app-primeng-table-lazy></app-primeng-table-lazy>` }),
  parameters: {
    docs: {
      description: {
        story: 'Lazy Loading + Virtual Scroll для работы с большими наборами данных. Данные подгружаются порциями при прокрутке таблицы. Используйте `[lazy]="true"`, `[virtualScroll]="true"`, `[virtualScrollItemSize]`, `[totalRecords]` и `(onLazyLoad)` для управления загрузкой данных с сервера.',
      },
      source: {
        language: 'ts',
        code: `import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

const ALL_SHIPMENTS = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  trackNumber: \`ЦД-\${String(i + 100000).padStart(8, '0')}\`,
  destination: ['Москва', 'Новосибирск', 'Екатеринбург', 'Казань', 'Краснодар', 'Санкт-Петербург', 'Воронеж', 'Самара', 'Ростов-на-Дону', 'Уфа'][i % 10],
  status: ['В пути', 'Доставлен', 'Задержан', 'Ожидание'][i % 4],
  weight: Number(((i * 0.37 + 0.5) % 10).toFixed(1)),
  cost: ((i * 137 + 200) % 5000) + 200,
}));

const PAGE_SIZE = 50;

@Component({
  selector: 'app-primeng-table-lazy',
  standalone: true,
  imports: [TableModule],
  template: \`
    <p-table
      [value]="shipments"
      [lazy]="true"
      [loading]="loading"
      [totalRecords]="totalRecords"
      [scrollable]="true"
      scrollHeight="400px"
      [virtualScroll]="true"
      [virtualScrollItemSize]="46"
      [rows]="PAGE_SIZE"
      (onLazyLoad)="onLazyLoad($event)"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>Трек-номер</th>
          <th>Назначение</th>
          <th>Статус</th>
          <th>Вес, кг</th>
          <th>Стоимость, ₽</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment let-rowIndex="rowIndex">
        <tr>
          <td>{{ shipment?.trackNumber }}</td>
          <td>{{ shipment?.destination }}</td>
          <td>{{ shipment?.status }}</td>
          <td>{{ shipment?.weight }}</td>
          <td>{{ shipment?.cost }}</td>
        </tr>
      </ng-template>
      <ng-template pTemplate="loadingbody">
        <tr>
          <td colspan="5" style="text-align:center; padding: 1rem;">Загрузка…</td>
        </tr>
      </ng-template>
    </p-table>
  \`,
})
export class PDataTableLazyComponent implements OnInit {
  readonly PAGE_SIZE = PAGE_SIZE;

  shipments: any[] = Array.from({ length: ALL_SHIPMENTS.length });
  totalRecords = ALL_SHIPMENTS.length;
  loading = false;

  ngOnInit(): void {
    // shipments pre-filled with placeholders so virtual scroll knows total size
  }

  onLazyLoad(event: any): void {
    this.loading = true;
    const start = event.first ?? 0;
    const end = start + (event.rows ?? PAGE_SIZE);

    // Simulate async server request
    setTimeout(() => {
      const page = ALL_SHIPMENTS.slice(start, end);
      const updated = [...this.shipments];
      for (let i = 0; i < page.length; i++) {
        updated[start + i] = page[i];
      }
      this.shipments = updated;
      this.loading = false;
    }, 300);
  }
}`,
      },
    },
  },
};
