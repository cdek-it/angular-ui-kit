import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '../../../../lib/components/data-table/data-table.component';

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

const COLUMNS: DataTableColumn[] = [
  { field: 'trackNumber', header: 'Трек-номер', sortable: true },
  { field: 'destination', header: 'Назначение', sortable: true },
  { field: 'status', header: 'Статус', sortable: true },
  { field: 'weight', header: 'Вес, кг', sortable: true },
];

const template = `
<div class="bg-surface-ground">
  <extra-data-table
    [value]="shipments"
    [columns]="columns"
    [scrollable]="true"
    scrollHeight="400px"
  ></extra-data-table>
</div>
`;

@Component({
  selector: 'app-data-table-scroll-vertical',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template,
})
export class DataTableScrollVerticalComponent {
  shipments = [...BASE_SHIPMENTS, ...BASE_SHIPMENTS, ...BASE_SHIPMENTS];
  columns = COLUMNS;
}
