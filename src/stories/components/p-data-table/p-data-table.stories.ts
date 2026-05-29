import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TableModule } from 'primeng/table';
import { PDataTableDefaultComponent } from './examples/p-data-table-default.component';
import { PDataTableStripedRowsComponent } from './examples/p-data-table-striped-rows.component';
import { PDataTableSelectableComponent } from './examples/p-data-table-selectable.component';
import { PDataTableGridLinesComponent } from './examples/p-data-table-grid-lines.component';
import { PDataTablePaginationComponent } from './examples/p-data-table-pagination.component';
import { PDataTableSelectionRadioComponent } from './examples/p-data-table-selection-radio.component';
import { PDataTableSelectionCheckboxComponent } from './examples/p-data-table-selection-checkbox.component';
import { PDataTableScrollVerticalComponent } from './examples/p-data-table-scroll-vertical.component';
import { PDataTableScrollHorizontalComponent } from './examples/p-data-table-scroll-horizontal.component';
import { PDataTableCustomBodyComponent } from './examples/p-data-table-custom-body.component';
import { PDataTableLazyComponent } from './examples/p-data-table-lazy.component';

const meta: Meta = {
  title: 'Components/Data/DataTable (PrimeNG)',
  tags: ['autodocs'],
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

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'DataTable',
  decorators: [moduleMetadata({ imports: [PDataTableDefaultComponent] })],
  render: () => ({ template: `<app-p-data-table-default></app-p-data-table-default>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовая таблица отправлений с сортировкой по всем столбцам на базе PrimeNG pTable.',
      },
    },
  },
};

// ── StripedRows ───────────────────────────────────────────────────────────────

export const StripedRows: Story = {
  name: 'StripedRows',
  decorators: [moduleMetadata({ imports: [PDataTableStripedRowsComponent] })],
  render: () => ({ template: `<app-p-data-table-striped-rows></app-p-data-table-striped-rows>` }),
  parameters: {
    docs: {
      description: {
        story: 'Чередование цвета строк для улучшения читаемости на базе PrimeNG pTable.',
      },
    },
  },
};

// ── Selectable ────────────────────────────────────────────────────────────────

export const Selectable: Story = {
  name: 'Selectable',
  decorators: [moduleMetadata({ imports: [PDataTableSelectableComponent] })],
  render: () => ({ template: `<app-p-data-table-selectable></app-p-data-table-selectable>` }),
  parameters: {
    docs: {
      description: {
        story: 'Выбор строки кликом. Режим single — выбирается одна строка на базе PrimeNG pTable.',
      },
    },
  },
};

// ── GridLines ─────────────────────────────────────────────────────────────────

export const GridLines: Story = {
  name: 'GridLines',
  decorators: [moduleMetadata({ imports: [PDataTableGridLinesComponent] })],
  render: () => ({ template: `<app-p-data-table-grid-lines></app-p-data-table-grid-lines>` }),
  parameters: {
    docs: {
      description: {
        story: 'Сетка между ячейками для наглядного разграничения данных на базе PrimeNG pTable.',
      },
    },
  },
};

// ── Pagination ────────────────────────────────────────────────────────────────

export const Pagination: Story = {
  name: 'Pagination',
  decorators: [moduleMetadata({ imports: [PDataTablePaginationComponent] })],
  render: () => ({ template: `<app-p-data-table-pagination></app-p-data-table-pagination>` }),
  parameters: {
    docs: {
      description: {
        story: 'Пагинация для больших наборов данных на базе PrimeNG pTable.',
      },
    },
  },
};

// ── SelectionRadio ────────────────────────────────────────────────────────────

export const SelectionRadio: Story = {
  name: 'Row Selection: RadioButton',
  decorators: [moduleMetadata({ imports: [PDataTableSelectionRadioComponent] })],
  render: () => ({ template: `<app-p-data-table-selection-radio></app-p-data-table-selection-radio>` }),
  parameters: {
    docs: {
      description: {
        story: 'Выбор одной строки через радио-кнопку на базе PrimeNG pTable.',
      },
    },
  },
};

// ── SelectionCheckbox ─────────────────────────────────────────────────────────

export const SelectionCheckbox: Story = {
  name: 'Row Selection: Checkbox',
  decorators: [moduleMetadata({ imports: [PDataTableSelectionCheckboxComponent] })],
  render: () => ({ template: `<app-p-data-table-selection-checkbox></app-p-data-table-selection-checkbox>` }),
  parameters: {
    docs: {
      description: {
        story: 'Множественный выбор строк через чекбоксы на базе PrimeNG pTable.',
      },
    },
  },
};

// ── ScrollVertical ────────────────────────────────────────────────────────────

export const ScrollVertical: Story = {
  name: 'Scroll: Vertical',
  decorators: [moduleMetadata({ imports: [PDataTableScrollVerticalComponent] })],
  render: () => ({ template: `<app-p-data-table-scroll-vertical></app-p-data-table-scroll-vertical>` }),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальная прокрутка с фиксированной высотой контейнера на базе PrimeNG pTable.',
      },
    },
  },
};

// ── ScrollHorizontal ──────────────────────────────────────────────────────────

export const ScrollHorizontal: Story = {
  name: 'Scroll: Horizontal',
  decorators: [moduleMetadata({ imports: [PDataTableScrollHorizontalComponent] })],
  render: () => ({ template: `<app-p-data-table-scroll-horizontal></app-p-data-table-scroll-horizontal>` }),
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальная прокрутка при большом количестве столбцов на базе PrimeNG pTable.',
      },
    },
  },
};

// ── CustomBody ────────────────────────────────────────────────────────────────

export const CustomBody: Story = {
  name: 'Custom Templates',
  decorators: [moduleMetadata({ imports: [PDataTableCustomBodyComponent] })],
  render: () => ({ template: `<app-p-data-table-custom-body></app-p-data-table-custom-body>` }),
  parameters: {
    docs: {
      description: {
        story: 'Кастомные шаблоны для заголовка и тела таблицы на базе PrimeNG pTable.',
      },
    },
  },
};

// ── Lazy loading ──────────────────────────────────────────────────────────────

export const LazyLoading: Story = {
  name: 'Lazy Loading',
  decorators: [moduleMetadata({ imports: [PDataTableLazyComponent] })],
  render: () => ({ template: `<app-p-data-table-lazy></app-p-data-table-lazy>` }),
  parameters: {
    docs: {
      description: {
        story: 'Lazy Loading + Virtual Scroll для работы с большими наборами данных. Данные подгружаются порциями при прокрутке таблицы. Используйте `[lazy]="true"`, `[virtualScroll]="true"`, `[virtualScrollItemSize]`, `[totalRecords]` и `(onLazyLoad)` для управления загрузкой данных с сервера.',
      },
    },
  },
};
