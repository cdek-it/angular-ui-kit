import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TableModule } from 'primeng/table';
import {
  PrimeTemplate,
  SortMeta,
  FilterMetadata,
  ScrollerOptions,
} from 'primeng/api';
import {
  TableLazyLoadEvent,
  TableRowSelectEvent,
  TableRowUnSelectEvent,
  TablePageEvent,
  TableFilterEvent,
  TableRowExpandEvent,
  TableRowCollapseEvent,
  TableContextMenuSelectEvent,
  TableColResizeEvent,
  TableColumnReorderEvent,
  TableRowReorderEvent,
  TableEditInitEvent,
  TableEditCompleteEvent,
  TableEditCancelEvent,
  TableHeaderCheckboxToggleEvent,
  TableSelectAllChangeEvent,
} from 'primeng/types/table';

export interface DataTableColumn {
  field?: string;
  header?: string;
  sortable?: boolean;
  style?: string;
  headerStyle?: string;
  selectionMode?: 'single' | 'multiple';
}

@Component({
  selector: 'extra-data-table',
  host: { style: 'display: block' },
  standalone: true,
  imports: [TableModule, PrimeTemplate, NgTemplateOutlet],
  template: `
    <!-- Default header template (used when user does not provide one) -->
    <ng-template #defaultHeaderTpl let-columns>
      <tr>
        @for (col of columns; track $index) {
          @if (col.selectionMode === 'single') {
            <th [style]="col.headerStyle || 'width: 3rem'"></th>
          } @else if (col.selectionMode === 'multiple') {
            <th [style]="col.headerStyle || 'width: 3rem'">
              <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
          } @else {
            <th [pSortableColumn]="col.sortable ? col.field : null" [style]="col.headerStyle || ''">
              {{ col.header }}
              @if (col.sortable) {
                <p-sortIcon [field]="col.field"></p-sortIcon>
              }
            </th>
          }
        }
      </tr>
    </ng-template>

    <!-- Default body template (used when user does not provide one) -->
    <ng-template #defaultBodyTpl let-rowData let-columns="columns">
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
      [rowsPerPageOptions]="rowsPerPageOptions?.length ? rowsPerPageOptions : undefined"
      [selectionMode]="selectionMode"
      [selection]="selection"
      (selectionChange)="selectionChange.emit($event)"
      [dataKey]="dataKey"
      [lazy]="lazy"
      [lazyLoadOnInit]="lazyLoadOnInit"
      [totalRecords]="totalRecords"
      [first]="first"
      (firstChange)="firstChange.emit($event)"
      [sortField]="sortField"
      [sortOrder]="sortOrder"
      [defaultSortOrder]="defaultSortOrder"
      [sortMode]="sortMode"
      [multiSortMeta]="multiSortMeta"
      [customSort]="customSort"
      [virtualScroll]="virtualScroll"
      [virtualScrollItemSize]="virtualScrollItemSize"
      [virtualScrollOptions]="virtualScrollOptions"
      [virtualScrollDelay]="virtualScrollDelay"
      [rowHover]="rowHover"
      [resizableColumns]="resizableColumns"
      [columnResizeMode]="columnResizeMode"
      [reorderableColumns]="reorderableColumns"
      [rowGroupMode]="rowGroupMode"
      [groupRowsBy]="groupRowsBy"
      [groupRowsByOrder]="groupRowsByOrder"
      [expandedRowKeys]="expandedRowKeys"
      [rowExpandMode]="rowExpandMode"
      [stateKey]="stateKey"
      [stateStorage]="stateStorage"
      [editMode]="editMode"
      [metaKeySelection]="metaKeySelection"
      [rowSelectable]="rowSelectable!"
      [selectAll]="selectAll"
      [contextMenu]="contextMenu"
      [contextMenuSelection]="contextMenuSelection"
      (contextMenuSelectionChange)="contextMenuSelectionChange.emit($event)"
      [filters]="filters"
      [globalFilterFields]="globalFilterFields"
      [filterDelay]="filterDelay"
      [styleClass]="styleClass"
      [tableStyle]="tableStyle"
      [tableStyleClass]="tableStyleClass"
      (onLazyLoad)="onLazyLoad.emit($event)"
      (onPage)="onPage.emit($event)"
      (onSort)="onSort.emit($event)"
      (onFilter)="onFilter.emit($event)"
      (onRowSelect)="onRowSelect.emit($event)"
      (onRowUnselect)="onRowUnselect.emit($event)"
      (onRowExpand)="onRowExpand.emit($event)"
      (onRowCollapse)="onRowCollapse.emit($event)"
      (onContextMenuSelect)="onContextMenuSelect.emit($event)"
      (onColResize)="onColResize.emit($event)"
      (onColReorder)="onColReorder.emit($event)"
      (onRowReorder)="onRowReorder.emit($event)"
      (onEditInit)="onEditInit.emit($event)"
      (onEditComplete)="onEditComplete.emit($event)"
      (onEditCancel)="onEditCancel.emit($event)"
      (onHeaderCheckboxToggle)="onHeaderCheckboxToggle.emit($event)"
      (selectAllChange)="selectAllChange.emit($event)"
      (sortFunction)="sortFunction.emit($event)"
    >
      <!-- Header -->
      <ng-template pTemplate="header" let-columns>
        <ng-container
          *ngTemplateOutlet="headerTemplate || defaultHeaderTpl; context: { $implicit: columns }"
        ></ng-container>
      </ng-template>

      <!-- Body -->
      <ng-template pTemplate="body" let-rowData let-columns="columns" let-rowIndex="rowIndex" let-expanded="expanded">
        <ng-container
          *ngTemplateOutlet="bodyTemplate || defaultBodyTpl; context: { $implicit: rowData, columns: columns, rowIndex: rowIndex, expanded: expanded }"
        ></ng-container>
      </ng-template>

      <!-- Pass-through optional templates -->
      @if (captionTemplate) {
        <ng-template pTemplate="caption">
          <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
        </ng-template>
      }
      @if (footerTemplate) {
        <ng-template pTemplate="footer" let-columns>
          <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: columns }"></ng-container>
        </ng-template>
      }
      @if (summaryTemplate) {
        <ng-template pTemplate="summary">
          <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
        </ng-template>
      }
      @if (emptyMessageTemplate) {
        <ng-template pTemplate="emptymessage" let-columns>
          <ng-container *ngTemplateOutlet="emptyMessageTemplate; context: { $implicit: columns }"></ng-container>
        </ng-template>
      }
      @if (rowExpansionTemplate) {
        <ng-template pTemplate="rowexpansion" let-rowData let-columns="columns">
          <ng-container *ngTemplateOutlet="rowExpansionTemplate; context: { $implicit: rowData, columns: columns }"></ng-container>
        </ng-template>
      }
      @if (groupHeaderTemplate) {
        <ng-template pTemplate="groupheader" let-rowData let-rowIndex="rowIndex" let-expanded="expanded">
          <ng-container *ngTemplateOutlet="groupHeaderTemplate; context: { $implicit: rowData, rowIndex: rowIndex, expanded: expanded }"></ng-container>
        </ng-template>
      }
      @if (groupFooterTemplate) {
        <ng-template pTemplate="groupfooter" let-rowData>
          <ng-container *ngTemplateOutlet="groupFooterTemplate; context: { $implicit: rowData }"></ng-container>
        </ng-template>
      }
      @if (paginatorLeftTemplate) {
        <ng-template pTemplate="paginatorleft">
          <ng-container *ngTemplateOutlet="paginatorLeftTemplate"></ng-container>
        </ng-template>
      }
      @if (paginatorRightTemplate) {
        <ng-template pTemplate="paginatorright">
          <ng-container *ngTemplateOutlet="paginatorRightTemplate"></ng-container>
        </ng-template>
      }
      @if (loadingIconTemplate) {
        <ng-template pTemplate="loadingicon">
          <ng-container *ngTemplateOutlet="loadingIconTemplate"></ng-container>
        </ng-template>
      }
    </p-table>
  `,
})
export class ExtraDataTableComponent implements AfterContentInit {
  // ── Data ──────────────────────────────────────────────────────────────────
  @Input() value: any[] = [];
  @Input() columns: DataTableColumn[] = [];

  // ── Appearance ────────────────────────────────────────────────────────────
  @Input() stripedRows = false;
  @Input() showGridlines = false;
  @Input() size: 'small' | 'large' | undefined = undefined;
  @Input() styleClass: string | undefined = undefined;
  @Input() tableStyle: { [key: string]: any } | undefined = undefined;
  @Input() tableStyleClass: string | undefined = undefined;

  // ── Loading ───────────────────────────────────────────────────────────────
  @Input() loading = false;

  // ── Pagination ────────────────────────────────────────────────────────────
  @Input() paginator = false;
  @Input() rows = 10;
  @Input() rowsPerPageOptions: number[] = [];
  @Input() first: number | null | undefined = 0;
  @Input() totalRecords = 0;
  @Output() firstChange = new EventEmitter<number>();

  // ── Scroll ────────────────────────────────────────────────────────────────
  @Input() scrollable = false;
  @Input() scrollHeight: string | undefined = undefined;

  // ── Virtual Scroll ────────────────────────────────────────────────────────
  @Input() virtualScroll: boolean | undefined = undefined;
  @Input() virtualScrollItemSize: number | undefined = undefined;
  @Input() virtualScrollOptions: ScrollerOptions | undefined = undefined;
  @Input() virtualScrollDelay = 250;

  // ── Lazy loading ──────────────────────────────────────────────────────────
  @Input() lazy = false;
  @Input() lazyLoadOnInit = true;
  @Output() onLazyLoad = new EventEmitter<TableLazyLoadEvent>();

  // ── Sorting ───────────────────────────────────────────────────────────────
  @Input() sortField: string | undefined | null = undefined;
  @Input() sortOrder = 1;
  @Input() defaultSortOrder = 1;
  @Input() sortMode: 'single' | 'multiple' = 'single';
  @Input() multiSortMeta: SortMeta[] | undefined | null = undefined;
  @Input() customSort = false;
  @Output() onSort = new EventEmitter<any>();
  @Output() sortFunction = new EventEmitter<any>();

  // ── Selection ─────────────────────────────────────────────────────────────
  @Input() selectionMode: 'single' | 'multiple' | undefined = undefined;
  @Input() selection: any = null;
  @Input() dataKey = 'id';
  @Input() metaKeySelection = false;
  @Input() rowSelectable: ((row: { data: any; index: number }) => boolean | undefined) | undefined = undefined;
  @Input() selectAll: boolean | null = null;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() selectAllChange = new EventEmitter<TableSelectAllChangeEvent>();
  @Output() onRowSelect = new EventEmitter<TableRowSelectEvent>();
  @Output() onRowUnselect = new EventEmitter<TableRowUnSelectEvent<any>>();
  @Output() onHeaderCheckboxToggle = new EventEmitter<TableHeaderCheckboxToggleEvent>();

  // ── Context Menu ──────────────────────────────────────────────────────────
  @Input() contextMenu: any = undefined;
  @Input() contextMenuSelection: any = undefined;
  @Output() contextMenuSelectionChange = new EventEmitter<any>();
  @Output() onContextMenuSelect = new EventEmitter<TableContextMenuSelectEvent>();

  // ── Row Expand ────────────────────────────────────────────────────────────
  @Input() expandedRowKeys: { [s: string]: boolean } = {};
  @Input() rowExpandMode: 'multiple' | 'single' = 'multiple';
  @Output() onRowExpand = new EventEmitter<TableRowExpandEvent>();
  @Output() onRowCollapse = new EventEmitter<TableRowCollapseEvent>();

  // ── Row Group ─────────────────────────────────────────────────────────────
  @Input() rowGroupMode: 'subheader' | 'rowspan' | undefined = undefined;
  @Input() groupRowsBy: string | undefined = undefined;
  @Input() groupRowsByOrder = 1;

  // ── Edit ──────────────────────────────────────────────────────────────────
  @Input() editMode: 'cell' | 'row' = 'cell';
  @Output() onEditInit = new EventEmitter<TableEditInitEvent>();
  @Output() onEditComplete = new EventEmitter<TableEditCompleteEvent>();
  @Output() onEditCancel = new EventEmitter<TableEditCancelEvent>();

  // ── Column Resize ─────────────────────────────────────────────────────────
  @Input() resizableColumns = false;
  @Input() columnResizeMode: 'fit' | 'expand' = 'fit';
  @Output() onColResize = new EventEmitter<TableColResizeEvent>();

  // ── Column Reorder ────────────────────────────────────────────────────────
  @Input() reorderableColumns = false;
  @Output() onColReorder = new EventEmitter<TableColumnReorderEvent>();

  // ── Row Reorder ───────────────────────────────────────────────────────────
  @Output() onRowReorder = new EventEmitter<TableRowReorderEvent>();

  // ── Row Hover ─────────────────────────────────────────────────────────────
  @Input() rowHover = false;

  // ── Filter ────────────────────────────────────────────────────────────────
  @Input() filters: { [s: string]: FilterMetadata | FilterMetadata[] } = {};
  @Input() globalFilterFields: string[] | undefined = undefined;
  @Input() filterDelay = 300;
  @Output() onFilter = new EventEmitter<TableFilterEvent>();

  // ── Pagination events ─────────────────────────────────────────────────────
  @Output() onPage = new EventEmitter<TablePageEvent>();

  // ── State ─────────────────────────────────────────────────────────────────
  @Input() stateKey: string | undefined = undefined;
  @Input() stateStorage: 'session' | 'local' = 'session';

  // ── Default templates ─────────────────────────────────────────────────────
  @ViewChild('defaultHeaderTpl') defaultHeaderTpl!: TemplateRef<any>;
  @ViewChild('defaultBodyTpl') defaultBodyTpl!: TemplateRef<any>;

  // ── User-provided content templates ──────────────────────────────────────
  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

  headerTemplate: TemplateRef<any> | null = null;
  bodyTemplate: TemplateRef<any> | null = null;
  captionTemplate: TemplateRef<any> | null = null;
  footerTemplate: TemplateRef<any> | null = null;
  summaryTemplate: TemplateRef<any> | null = null;
  emptyMessageTemplate: TemplateRef<any> | null = null;
  rowExpansionTemplate: TemplateRef<any> | null = null;
  groupHeaderTemplate: TemplateRef<any> | null = null;
  groupFooterTemplate: TemplateRef<any> | null = null;
  paginatorLeftTemplate: TemplateRef<any> | null = null;
  paginatorRightTemplate: TemplateRef<any> | null = null;
  loadingIconTemplate: TemplateRef<any> | null = null;

  ngAfterContentInit(): void {
    this.templates.forEach((t) => {
      switch (t.getType()) {
        case 'header':
          this.headerTemplate = t.template;
          break;
        case 'body':
          this.bodyTemplate = t.template;
          break;
        case 'caption':
          this.captionTemplate = t.template;
          break;
        case 'footer':
          this.footerTemplate = t.template;
          break;
        case 'summary':
          this.summaryTemplate = t.template;
          break;
        case 'emptymessage':
          this.emptyMessageTemplate = t.template;
          break;
        case 'rowexpansion':
          this.rowExpansionTemplate = t.template;
          break;
        case 'groupheader':
          this.groupHeaderTemplate = t.template;
          break;
        case 'groupfooter':
          this.groupFooterTemplate = t.template;
          break;
        case 'paginatorleft':
          this.paginatorLeftTemplate = t.template;
          break;
        case 'paginatorright':
          this.paginatorRightTemplate = t.template;
          break;
        case 'loadingicon':
          this.loadingIconTemplate = t.template;
          break;
      }
    });
  }
}
