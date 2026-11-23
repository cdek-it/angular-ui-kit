import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraPaginatorComponent } from '../../../lib/components/paginator/paginator.component';
import {
  CurrentPageReport as CurrentPageReportStory,
  PaginatorCurrentPageReportComponent
} from './examples/paginator-current-page-report.component';
import {
  PaginatorRowsPerPageComponent,
  RowsPerPage as RowsPerPageStory
} from './examples/paginator-rows-per-page.component';

type PaginatorArgs = Pick<
  ExtraPaginatorComponent,
  | 'totalRecords'
  | 'first'
  | 'rows'
  | 'rowsPerPageOptions'
  | 'currentPageReportTemplate'
  | 'pageLinkSize'
  | 'showFirstLastIcon'
  | 'showPageLinks'
  | 'showCurrentPageReport'
  | 'showJumpToPage'
  | 'jumpToPagePlaceholder'
  | 'showDropdown'
  | 'alwaysShow'
>;

const meta: Meta<PaginatorArgs> = {
  title: 'Components/Data/Paginator',
  component: ExtraPaginatorComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraPaginatorComponent, PaginatorCurrentPageReportComponent, PaginatorRowsPerPageComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-paginator' },
    docs: {
      description: {
        component: `Отображает навигацию по страницам для больших наборов данных.

\`\`\`typescript
import { ExtraPaginatorComponent } from '@cdek-it/angular-ui-kit/components/paginator';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'code',
        transform: () =>
          `<extra-paginator
  [totalRecords]="totalRecords"
  [rows]="rows"
  [pageLinkSize]="pageLinkSize"
  [showFirstLastIcon]="showFirstLastIcon"
  [showPageLinks]="showPageLinks"
  [showCurrentPageReport]="showCurrentPageReport"
  [showJumpToPage]="showJumpToPage"
  [jumpToPagePlaceholder]="jumpToPagePlaceholder"
  [showDropdown]="showDropdown"
  [alwaysShow]="alwaysShow"
></extra-paginator>`
      }
    }
  },
  argTypes: {
    totalRecords: {
      control: { type: 'number', min: 0 },
      description: 'Общее количество записей',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
      }
    },
    rows: {
      control: { type: 'number', min: 1 },
      description: 'Количество строк на странице',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '10' },
        type: { summary: 'number' }
      }
    },
    pageLinkSize: {
      control: { type: 'number', min: 1 },
      description: 'Количество отображаемых ссылок на страницы',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '5' },
        type: { summary: 'number' }
      }
    },
    showFirstLastIcon: {
      control: 'boolean',
      description: 'Показывать кнопки перехода на первую и последнюю страницу',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    first: { control: 'number', description: 'Индекс первой записи текущей страницы' },
    rowsPerPageOptions: {
      control: 'object',
      description: 'Варианты количества строк на странице для выпадающего списка'
    },
    currentPageReportTemplate: {
      control: 'text',
      description: 'Шаблон отчёта о текущей странице ({currentPage}, {totalPages}, {first}, {last}, {totalRecords})'
    },
    showPageLinks: {
      control: 'boolean',
      description: 'Показывать номера страниц',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showCurrentPageReport: {
      control: 'boolean',
      description: 'Показывать текст с текущей страницей и общим количеством',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showJumpToPage: {
      control: 'boolean',
      if: { arg: 'showDropdown', truthy: false },
      description: 'Показывать поле ввода для перехода на конкретную страницу',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    jumpToPagePlaceholder: {
      control: 'text',
      if: { arg: 'showJumpToPage', truthy: true },
      description: 'Плейсхолдер поля ввода номера страницы (видим только при showJumpToPage=true)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    showDropdown: {
      control: 'boolean',
      if: { arg: 'showJumpToPage', truthy: false },
      description: 'Показывать селект для перехода на конкретную страницу',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    alwaysShow: {
      control: 'boolean',
      description: 'Показывать пагинатор даже при единственной странице',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    totalRecords: 120,
    first: 0,
    rowsPerPageOptions: [10, 20, 30],
    currentPageReportTemplate: '{currentPage} из {totalPages}',
    rows: 10,
    pageLinkSize: 5,
    showFirstLastIcon: true,
    showPageLinks: true,
    showCurrentPageReport: false,
    showJumpToPage: true,
    jumpToPagePlaceholder: 'Страница',
    showDropdown: false,
    alwaysShow: true
  }
};

export default meta;
type Story = StoryObj<PaginatorArgs>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `
      <extra-paginator
        [totalRecords]="totalRecords"
        [rows]="rows"
        [pageLinkSize]="pageLinkSize"
        [showFirstLastIcon]="showFirstLastIcon"
        [showPageLinks]="showPageLinks"
        [showCurrentPageReport]="showCurrentPageReport"
        [showJumpToPage]="showJumpToPage"
        [jumpToPagePlaceholder]="jumpToPagePlaceholder"
        [showDropdown]="showDropdown"
        [alwaysShow]="alwaysShow"
      ></extra-paginator>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── CurrentPageReport ─────────────────────────────────────────────────────────

export const CurrentPageReport: Story = {
  ...CurrentPageReportStory,
  parameters: {
    ...CurrentPageReportStory.parameters,
    docs: {
      ...(CurrentPageReportStory.parameters?.['docs'] ?? {}),
      description: { story: 'Пагинатор с отображением текущей страницы и общего числа страниц.' },
      source: {
        language: 'html',
        code: '<extra-paginator [totalRecords]="120" [showCurrentPageReport]="true"></extra-paginator>'
      }
    }
  }
};

// ── RowsPerPage ───────────────────────────────────────────────────────────────

export const RowsPerPage: Story = {
  ...RowsPerPageStory,
  args: { rowsPerPageOptions: [10, 20, 30] },
  parameters: {
    ...RowsPerPageStory.parameters,
    story: { height: '200px' },
    docs: {
      ...(RowsPerPageStory.parameters?.['docs'] ?? {}),
      description: { story: 'Пагинатор с выбором количества строк на странице и переходом на конкретную страницу.' },
      source: {
        language: 'html',
        code: '<extra-paginator [totalRecords]="120" [rowsPerPageOptions]="rowsPerPageOptions" [showJumpToPage]="true"></extra-paginator>'
      }
    }
  }
};
