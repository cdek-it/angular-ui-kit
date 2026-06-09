import { Component } from '@angular/core';
import { ExtraPaginatorComponent } from '../../../../lib/components/paginator/paginator.component';
import type { PaginatorState } from 'primeng/types/paginator';

const template = `
<extra-paginator
  [first]="first"
  [rows]="rows"
  [totalRecords]="120"
  [rowsPerPageOptions]="[10, 20, 30]"
  [showJumpToPageInput]="true"
  (onPageChange)="onPageChange($event)"
></extra-paginator>
`;
const styles = '';

@Component({
  selector: 'app-paginator-rows-per-page',
  standalone: true,
  imports: [ExtraPaginatorComponent],
  template,
  styles
})
export class PaginatorRowsPerPageComponent {
  first = 0;
  rows = 10;

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}

export const RowsPerPage = {
  render: () => ({
    template: `<app-paginator-rows-per-page></app-paginator-rows-per-page>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Пагинатор с выбором количества строк на странице и переходом на конкретную страницу.'
      },
      source: {
        language: 'ts',
        code: `
import { ExtraPaginatorComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-paginator-rows-per-page',
  standalone: true,
  imports: [ExtraPaginatorComponent],
  template: \`
    <extra-paginator
      [first]="first"
      [rows]="rows"
      [totalRecords]="120"
      [rowsPerPageOptions]="[10, 20, 30]"
      [showJumpToPageInput]="true"
      (onPageChange)="onPageChange($event)"
    ></extra-paginator>
  \`,
})
export class PaginatorRowsPerPageComponent {
  first = 0;
  rows = 10;

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
        `
      }
    }
  }
};
