import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', sender: 'Иванов И.И.', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200, dimensions: '30×20×15 см' },
  { id: 2, trackNumber: 'ЦД-00123457', sender: 'Петров П.П.', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450, dimensions: '10×10×10 см' },
  { id: 3, trackNumber: 'ЦД-00123458', sender: 'Сидоров С.С.', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100, dimensions: '50×40×30 см' },
  { id: 4, trackNumber: 'ЦД-00123459', sender: 'Козлов К.К.', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750, dimensions: '20×15×10 см' },
  { id: 5, trackNumber: 'ЦД-00123460', sender: 'Новиков Н.Н.', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800, dimensions: '40×30×20 см' },
];

@Component({
  selector: 'app-p-data-table-scroll-horizontal',
  standalone: true,
  imports: [TableModule],
  template: `
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
  `,
})
export class PDataTableScrollHorizontalComponent {
  shipments = SHIPMENTS;
}