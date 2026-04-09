import { Component } from '@angular/core';
import { DataTableComponent, DataTableColumn } from '../../../../lib/components/data-table/data-table.component';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800 },
];

const COLUMNS: DataTableColumn[] = [
  { field: 'trackNumber', header: 'Трек-номер', sortable: true },
  { field: 'destination', header: 'Назначение', sortable: true },
  { field: 'status', header: 'Статус', sortable: true },
  { field: 'weight', header: 'Вес, кг', sortable: true },
  { field: 'cost', header: 'Стоимость, ₽', sortable: true },
];

const template = `
<div class="bg-surface-ground">
  <data-table [value]="shipments" [columns]="columns" [showGridlines]="true"></data-table>
</div>
`;

@Component({
  selector: 'app-data-table-grid-lines',
  standalone: true,
  imports: [DataTableComponent],
  template,
})
export class DataTableGridLinesComponent {
  shipments = SHIPMENTS;
  columns = COLUMNS;
}
