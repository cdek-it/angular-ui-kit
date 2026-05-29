import { Component } from '@angular/core';
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
  template: `
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
  `,
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
}