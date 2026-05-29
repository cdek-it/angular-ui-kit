import { Component, OnInit } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '../../../../lib/components/data-table/data-table.component';
import { PrimeTemplate } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/types/table';

const ALL_SHIPMENTS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  trackNumber: `ЦД-${String(i + 100000).padStart(8, '0')}`,
  destination: ['Москва', 'Новосибирск', 'Екатеринбург', 'Казань', 'Краснодар'][i % 5],
  status: ['В пути', 'Доставлен', 'Задержан', 'Ожидание'][i % 4],
  weight: Number((Math.random() * 10).toFixed(1)),
  cost: Math.floor(Math.random() * 5000) + 200,
}));

const COLUMNS: DataTableColumn[] = [
  { field: 'trackNumber', header: 'Трек-номер', sortable: true },
  { field: 'destination', header: 'Назначение', sortable: true },
  { field: 'status', header: 'Статус', sortable: true },
  { field: 'weight', header: 'Вес, кг', sortable: true },
  { field: 'cost', header: 'Стоимость, ₽', sortable: true },
];

const template = `
<div class="bg-surface-ground">
  <extra-data-table
    [value]="shipments"
    [columns]="columns"
    [lazy]="true"
    [loading]="loading"
    [paginator]="true"
    [rows]="10"
    [rowsPerPageOptions]="[10, 20, 50]"
    [totalRecords]="totalRecords"
    (onLazyLoad)="onLazyLoad($event)"
  ></extra-data-table>
</div>
`;

@Component({
  selector: 'app-data-table-lazy',
  standalone: true,
  imports: [ExtraDataTableComponent, PrimeTemplate],
  template,
})
export class DataTableLazyComponent implements OnInit {
  shipments: any[] = [];
  columns = COLUMNS;
  totalRecords = ALL_SHIPMENTS.length;
  loading = true;

  ngOnInit(): void {
    // Initial load happens via onLazyLoad
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.loading = true;
    // Simulate async server request
    setTimeout(() => {
      const start = event.first ?? 0;
      const end = start + (event.rows ?? 10);
      this.shipments = ALL_SHIPMENTS.slice(start, end);
      this.loading = false;
    }, 500);
  }
}

