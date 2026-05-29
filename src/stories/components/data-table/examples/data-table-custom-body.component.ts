import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraDataTableComponent, DataTableColumn } from '../../../../lib/components/data-table/data-table.component';
import { PrimeTemplate } from 'primeng/api';
import { TagModule } from 'primeng/tag';

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
  <extra-data-table [value]="shipments" [columns]="columns">

    <ng-template pTemplate="header" let-columns>
      <tr>
        @for (col of columns; track col.field) {
          <th [pSortableColumn]="col.sortable ? col.field : null">
            {{ col.header }}
            @if (col.sortable) { <p-sortIcon [field]="col.field"></p-sortIcon> }
          </th>
        }
      </tr>
    </ng-template>

    <ng-template pTemplate="body" let-row let-columns="columns">
      <tr>
        <td>{{ row.trackNumber }}</td>
        <td>{{ row.destination }}</td>
        <td>
          <p-tag
            [value]="row.status"
            [severity]="getSeverity(row.status)"
          ></p-tag>
        </td>
        <td>{{ row.weight }} кг</td>
        <td><strong>{{ row.cost | currency:'RUB':'symbol':'1.0-0':'ru' }}</strong></td>
      </tr>
    </ng-template>

    <ng-template pTemplate="emptymessage">
      <tr><td colspan="5" class="text-center p-4">Нет данных для отображения</td></tr>
    </ng-template>

  </extra-data-table>
</div>
`;

@Component({
  selector: 'app-data-table-custom-body',
  standalone: true,
  imports: [ExtraDataTableComponent, PrimeTemplate, TagModule, CommonModule],
  template,
})
export class DataTableCustomBodyComponent {
  shipments = SHIPMENTS;
  columns = COLUMNS;

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

