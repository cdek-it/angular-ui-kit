import { Component } from '@angular/core';
import { ExtraDataTableComponent, DataTableColumn } from '../../../../lib/components/data-table/data-table.component';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', sender: 'Иванов И.И.', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200, dimensions: '30×20×15 см' },
  { id: 2, trackNumber: 'ЦД-00123457', sender: 'Петров П.П.', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450, dimensions: '10×10×10 см' },
  { id: 3, trackNumber: 'ЦД-00123458', sender: 'Сидоров С.С.', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100, dimensions: '50×40×30 см' },
  { id: 4, trackNumber: 'ЦД-00123459', sender: 'Козлов К.К.', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750, dimensions: '20×15×10 см' },
  { id: 5, trackNumber: 'ЦД-00123460', sender: 'Новиков Н.Н.', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800, dimensions: '40×30×20 см' },
];

const COLUMNS: DataTableColumn[] = [
  { field: 'trackNumber', header: 'Трек-номер', sortable: true, style: 'min-width: 160px' },
  { field: 'sender', header: 'Отправитель', sortable: true, style: 'min-width: 160px' },
  { field: 'destination', header: 'Назначение', sortable: true, style: 'min-width: 160px' },
  { field: 'status', header: 'Статус', sortable: true, style: 'min-width: 140px' },
  { field: 'weight', header: 'Вес, кг', sortable: true, style: 'min-width: 120px' },
  { field: 'cost', header: 'Стоимость, ₽', sortable: true, style: 'min-width: 140px' },
  { field: 'dimensions', header: 'Габариты', sortable: false, style: 'min-width: 160px' },
];

const template = `
<div class="bg-surface-ground">
  <extra-data-table [value]="shipments" [columns]="columns" [scrollable]="true"></extra-data-table>
</div>
`;

@Component({
  selector: 'app-data-table-scroll-horizontal',
  standalone: true,
  imports: [ExtraDataTableComponent],
  template,
})
export class DataTableScrollHorizontalComponent {
  shipments = SHIPMENTS;
  columns = COLUMNS;
}
