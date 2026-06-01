import { Component } from '@angular/core';
import { StoryObj, moduleMetadata } from '@storybook/angular';
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
  template: `
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
  `,
})
export class PDataTableGridLinesComponent {
  shipments = SHIPMENTS;
}

export const GridLines: StoryObj = {
  name: 'GridLines',
  decorators: [moduleMetadata({ imports: [PDataTableGridLinesComponent] })],
  render: () => ({ template: `<app-primeng-table-grid-lines></app-primeng-table-grid-lines>` }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Сетка между ячейками для наглядного разграничения данных на базе PrimeNG pTable.',
      },
      source: {
        language: 'ts',
        code: `import { Component } from '@angular/core';

const SHIPMENTS = [
  { id: 1, trackNumber: 'ЦД-00123456', destination: 'Москва', status: 'В пути', weight: 2.5, cost: 1200 },
  { id: 2, trackNumber: 'ЦД-00123457', destination: 'Новосибирск', status: 'Доставлен', weight: 0.8, cost: 450 },
  { id: 3, trackNumber: 'ЦД-00123458', destination: 'Екатеринбург', status: 'Задержан', weight: 5.2, cost: 2100 },
  { id: 4, trackNumber: 'ЦД-00123459', destination: 'Казань', status: 'В пути', weight: 1.3, cost: 750 },
  { id: 5, trackNumber: 'ЦД-00123460', destination: 'Краснодар', status: 'Доставлен', weight: 3.7, cost: 1800 },
];

@Component({
  selector: 'app-example',
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
export class ExampleComponent {
  shipments = SHIPMENTS;
}`,
      },
    },
  },
};
