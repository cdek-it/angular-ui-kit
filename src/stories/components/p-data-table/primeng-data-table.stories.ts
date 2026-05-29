import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PDataTableDefaultComponent, Default } from './examples/primeng-table-default.component';
import { PDataTableStripedRowsComponent, StripedRows } from './examples/primeng-table-striped-rows.component';
import { PDataTableSelectableComponent, Selectable } from './examples/primeng-table-selectable.component';
import { PDataTableGridLinesComponent, GridLines } from './examples/primeng-table-grid-lines.component';
import { PDataTablePaginationComponent, Pagination } from './examples/primeng-table-pagination.component';
import { PDataTableSelectionRadioComponent, SelectionRadio } from './examples/primeng-table-selection-radio.component';
import { PDataTableSelectionCheckboxComponent, SelectionCheckbox } from './examples/primeng-table-selection-checkbox.component';
import { PDataTableScrollVerticalComponent, ScrollVertical } from './examples/primeng-table-scroll-vertical.component';
import { PDataTableScrollHorizontalComponent, ScrollHorizontal } from './examples/primeng-table-scroll-horizontal.component';
import { PDataTableCustomBodyComponent, CustomBody } from './examples/primeng-table-custom-body.component';
import { PDataTableLazyComponent, LazyLoading } from './examples/primeng-table-lazy.component';

const meta: Meta = {
  title: 'Components/Data/DataTable (PrimeNG)',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        PDataTableDefaultComponent,
        PDataTableStripedRowsComponent,
        PDataTableSelectableComponent,
        PDataTableGridLinesComponent,
        PDataTablePaginationComponent,
        PDataTableSelectionRadioComponent,
        PDataTableSelectionCheckboxComponent,
        PDataTableScrollVerticalComponent,
        PDataTableScrollHorizontalComponent,
        PDataTableCustomBodyComponent,
        PDataTableLazyComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Таблица данных на базе PrimeNG pTable с поддержкой сортировки, пагинации, выбора строк и прокрутки.

\`\`\`typescript
import { TableModule } from 'primeng/table';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-datatable' },
  },
};

export default meta;
type Story = StoryObj;

export {
  Default,
  StripedRows,
  Selectable,
  GridLines,
  Pagination,
  SelectionRadio,
  SelectionCheckbox,
  ScrollVertical,
  ScrollHorizontal,
  CustomBody,
  LazyLoading,
};
