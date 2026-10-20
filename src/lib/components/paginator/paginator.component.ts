import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import type { PaginatorPassThrough, PaginatorState } from 'primeng/types/paginator';

export type ExtraPaginatorState = PaginatorState;

@Component({
  selector: 'extra-paginator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      [showJumpToPageDropdown]="showDropdown"
      [showJumpToPageInput]="showJumpToPage"
      [showPageLinks]="showPageLinks"
      [pageLinkSize]="pageLinkSize"
      [alwaysShow]="alwaysShow"
      [pt]="pt"
      (onPageChange)="onPageChange.emit($event)"
    ></p-paginator>
  `
})
export class ExtraPaginatorComponent {
  @Input() first = 0;
  @Input() rows = 10;
  @Input() totalRecords = 0;
  @Input() rowsPerPageOptions: number[] | undefined;
  @Input() currentPageReportTemplate = '{currentPage} из {totalPages}';
  @Input() showCurrentPageReport = false;
  @Input() showFirstLastIcon = true;
  /** Селект для перехода к конкретной странице (альтернатива полю ввода `showJumpToPage`). */
  @Input() showDropdown = false;
  /** Поле ввода номера для перехода к конкретной странице. */
  @Input() showJumpToPage = false;
  /** Плейсхолдер поля ввода номера страницы — пробрасывается через `pt`, т.к. у PrimeNG
   *  `p-paginator` нет собственного @Input для этого (см. `paginator.figma.md`). */
  @Input() jumpToPagePlaceholder: string | undefined = undefined;
  @Input() showPageLinks = true;
  @Input() pageLinkSize = 5;
  @Input() alwaysShow = true;
  @Output() onPageChange = new EventEmitter<ExtraPaginatorState>();

  private _ptPlaceholder?: string;
  private _pt: PaginatorPassThrough = {};

  /** Пересобираем объект только при смене плейсхолдера: новый объект на каждую
   *  проверку изменений заставлял PrimeNG переприменять pass-through каждый цикл. */
  get pt(): PaginatorPassThrough {
    if (this._ptPlaceholder !== this.jumpToPagePlaceholder) {
      this._ptPlaceholder = this.jumpToPagePlaceholder;
      this._pt = {
        pcJumpToPageInput: {
          pcInputText: {
            root: { placeholder: this.jumpToPagePlaceholder }
          }
        }
      };
    }
    return this._pt;
  }
}
