import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import type { PaginatorState } from 'primeng/types/paginator';

@Component({
  selector: 'extra-paginator',
  standalone: true,
  imports: [Paginator],
  template: `
    <p-paginator
      [first]="first"
      [rows]="rows"
      [totalRecords]="totalRecords"
      [rowsPerPageOptions]="rowsPerPageOptions"
      [currentPageReportTemplate]="currentPageReportTemplate"
      [showCurrentPageReport]="showCurrentPageReport"
      [showFirstLastIcon]="showFirstLastIcon"
      [showJumpToPageDropdown]="showJumpToPageDropdown"
      [showJumpToPageInput]="showJumpToPageInput"
      [showPageLinks]="showPageLinks"
      [pageLinkSize]="pageLinkSize"
      [alwaysShow]="alwaysShow"
      (onPageChange)="onPageChange.emit($event)"
    ></p-paginator>
  `
})
export class ExtraPaginatorComponent {
  @Input() first = 0;
  @Input() rows = 10;
  @Input() totalRecords = 0;
  @Input() rowsPerPageOptions: any[] | undefined;
  @Input() currentPageReportTemplate = '{currentPage} из {totalPages}';
  @Input() showCurrentPageReport = false;
  @Input() showFirstLastIcon = true;
  @Input() showJumpToPageDropdown = false;
  @Input() showJumpToPageInput = false;
  @Input() showPageLinks = true;
  @Input() pageLinkSize = 5;
  @Input() alwaysShow = true;
  @Output() onPageChange = new EventEmitter<PaginatorState>();
}
