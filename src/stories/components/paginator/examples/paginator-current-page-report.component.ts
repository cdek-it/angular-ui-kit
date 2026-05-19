import { Component } from '@angular/core';
import { ExtraPaginatorComponent } from '../../../../lib/components/paginator/paginator.component';
import type { PaginatorState } from 'primeng/types/paginator';

const template = `
<extra-paginator
  [first]="first"
  [rows]="rows"
  [totalRecords]="120"
  [showCurrentPageReport]="true"
  currentPageReportTemplate="{currentPage} из {totalPages}"
  (onPageChange)="onPageChange($event)"
></extra-paginator>
`;
const styles = '';

@Component({
  selector: 'app-paginator-current-page-report',
  standalone: true,
  imports: [ExtraPaginatorComponent],
  template,
  styles,
})
export class PaginatorCurrentPageReportComponent {
  first = 0;
  rows = 10;

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}

export const CurrentPageReport = {
  render: () => ({
    template: `<app-paginator-current-page-report></app-paginator-current-page-report>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Пагинатор с отображением текущей страницы и общего числа страниц.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraPaginatorComponent } from '@cdek-it/angular-ui-kit';
import type { PaginatorState } from 'primeng/types/paginator';

@Component({
  selector: 'app-paginator-current-page-report',
  standalone: true,
  imports: [ExtraPaginatorComponent],
  template: \`
    <extra-paginator
      [first]="first"
      [rows]="rows"
      [totalRecords]="120"
      [showCurrentPageReport]="true"
      currentPageReportTemplate="{currentPage} из {totalPages}"
      (onPageChange)="onPageChange($event)"
    ></extra-paginator>
  \`,
})
export class PaginatorCurrentPageReportComponent {
  first = 0;
  rows = 10;

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
        `,
      },
    },
  },
};
