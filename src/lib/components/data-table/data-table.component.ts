import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';

export interface DataTableColumn {
  field?: string;
  header?: string;
  sortable?: boolean;
  style?: string;
  headerStyle?: string;
  selectionMode?: 'single' | 'multiple';
}

@Component({
  selector: 'data-table',
  host: { style: 'display: block' },
  standalone: true,
  imports: [TableModule, PrimeTemplate],
  template: `
    <p-table
      [value]="value"
      [columns]="columns"
      [stripedRows]="stripedRows"
      [showGridlines]="showGridlines"
      [loading]="loading"
      [size]="size"
      [scrollable]="scrollable"
      [scrollHeight]="scrollHeight || undefined"
      [paginator]="paginator"
      [rows]="rows"
      [rowsPerPageOptions]="rowsPerPageOptions.length ? rowsPerPageOptions : undefined"
      [selectionMode]="selectionMode"
      [selection]="selection"
      (selectionChange)="selectionChange.emit($event)"
      [dataKey]="dataKey"
    >
      <ng-template pTemplate="header" let-columns>
        <tr>
          @for (col of columns; track $index) {
            @if (col.selectionMode === 'single') {
              <th [style]="col.headerStyle || 'width: 3rem'"></th>
            } @else if (col.selectionMode === 'multiple') {
              <th [style]="col.headerStyle || 'width: 3rem'">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
              </th>
            } @else if (col.sortable) {
              <th [pSortableColumn]="col.field" [style]="col.headerStyle || ''">
                {{ col.header }}
                <p-sortIcon [field]="col.field"></p-sortIcon>
              </th>
            } @else {
              <th [style]="col.headerStyle || ''">{{ col.header }}</th>
            }
          }
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-rowData let-columns="columns">
        <tr [pSelectableRow]="rowData">
          @for (col of columns; track $index) {
            @if (col.selectionMode === 'single') {
              <td>
                <p-tableRadioButton [value]="rowData"></p-tableRadioButton>
              </td>
            } @else if (col.selectionMode === 'multiple') {
              <td>
                <p-tableCheckbox [value]="rowData"></p-tableCheckbox>
              </td>
            } @else {
              <td [style]="col.style || ''">{{ rowData[col.field] }}</td>
            }
          }
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class DataTableComponent {
  @Input() value: any[] = [];
  @Input() columns: DataTableColumn[] = [];
  @Input() stripedRows = false;
  @Input() showGridlines = false;
  @Input() loading = false;
  @Input() size: 'small' | 'large' | undefined = undefined;
  @Input() scrollable = false;
  @Input() scrollHeight = '';
  @Input() paginator = false;
  @Input() rows = 5;
  @Input() rowsPerPageOptions: number[] = [5, 10, 25];
  @Input() selectionMode: 'single' | 'multiple' | undefined = undefined;
  @Input() selection: any = null;
  @Output() selectionChange = new EventEmitter<any>();
  @Input() dataKey = 'id';
}
