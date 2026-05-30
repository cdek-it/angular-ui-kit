import { Component } from '@angular/core';
import { StoryObj, moduleMetadata } from '@storybook/angular';
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
  template: `
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
  `,
})
export class PDataTableSelectionCheckboxComponent {
  shipments = SHIPMENTS;
  selected: any[] = [];
}

export const SelectionCheckbox: StoryObj = {
  name: 'Row Selection: Checkbox',
  decorators: [moduleMetadata({ imports: [PDataTableSelectionCheckboxComponent] })],
  render: () => ({ template: `<app-primeng-table-selection-checkbox></app-primeng-table-selection-checkbox>` }),
  parameters: {
    controls: { disable: true },
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
  selector: 'app-example',
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
export class ExampleComponent {
  shipments = SHIPMENTS;
  selected: any[] = [];
}`,
      },
    },
  },
};
