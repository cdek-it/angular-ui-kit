import { Component, OnInit } from '@angular/core';
import { StoryObj, moduleMetadata } from '@storybook/angular';
import { TableModule } from 'primeng/table';

const ALL_SHIPMENTS = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  trackNumber: `ЦД-${String(i + 100000).padStart(8, '0')}`,
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
  template: `
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
  `,
})
export class PDataTableLazyComponent implements OnInit {
  readonly PAGE_SIZE = PAGE_SIZE;

  shipments: any[] = Array.from({ length: ALL_SHIPMENTS.length });
  totalRecords = ALL_SHIPMENTS.length;
  loading = false;

  ngOnInit(): void {}

  onLazyLoad(event: any): void {
    this.loading = true;
    const start = event.first ?? 0;
    const end = start + (event.rows ?? PAGE_SIZE);

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
}

export const LazyLoading: StoryObj = {
  name: 'Lazy Loading',
  decorators: [moduleMetadata({ imports: [PDataTableLazyComponent] })],
  render: () => ({ template: `<app-primeng-table-lazy></app-primeng-table-lazy>` }),
  parameters: {
    controls: { disable: true },
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
  selector: 'app-example',
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
export class ExampleComponent implements OnInit {
  readonly PAGE_SIZE = PAGE_SIZE;

  shipments: any[] = Array.from({ length: ALL_SHIPMENTS.length });
  totalRecords = ALL_SHIPMENTS.length;
  loading = false;

  ngOnInit(): void {}

  onLazyLoad(event: any): void {
    this.loading = true;
    const start = event.first ?? 0;
    const end = start + (event.rows ?? PAGE_SIZE);

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
