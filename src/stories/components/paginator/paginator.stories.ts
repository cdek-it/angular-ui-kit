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
  | 'rows'
  | 'pageLinkSize'
  | 'showFirstLastIcon'
  | 'showPageLinks'
  | 'showCurrentPageReport'
  | 'showJumpToPageInput'
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
    docs: {
      description: {
        component: `Отображает навигацию по страницам для больших наборов данных.

\`\`\`typescript
import { ExtraPaginatorComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-paginator' }
  },
  argTypes: {
    totalRecords: {
      control: { type: 'number', min: 0 },
      description: 'Общее количество записей',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
      }
    },
    rows: {
      control: { type: 'number', min: 1 },
      description: 'Количество строк на странице',
      table: {
        category: 'Props',
        defaultValue: { summary: '10' },
        type: { summary: 'number' }
      }
    },
    pageLinkSize: {
      control: { type: 'number', min: 1 },
      description: 'Количество отображаемых ссылок на страницы',
      table: {
        category: 'Props',
        defaultValue: { summary: '5' },
        type: { summary: 'number' }
      }
    },
    showFirstLastIcon: {
      control: 'boolean',
      description: 'Показывать кнопки перехода на первую и последнюю страницу',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showPageLinks: {
      control: 'boolean',
      description: 'Показывать номера страниц',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showCurrentPageReport: {
      control: 'boolean',
      description: 'Показывать текст с текущей страницей и общим количеством',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showJumpToPageInput: {
      control: 'boolean',
      description: 'Показывать поле ввода для перехода на конкретную страницу',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    alwaysShow: {
      control: 'boolean',
      description: 'Показывать пагинатор даже при единственной странице',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    totalRecords: 120,
    rows: 10,
    pageLinkSize: 5,
    showFirstLastIcon: true,
    showPageLinks: true,
    showCurrentPageReport: false,
    showJumpToPageInput: false,
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
        [showJumpToPageInput]="showJumpToPageInput"
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

export const CurrentPageReport: Story = CurrentPageReportStory;

// ── RowsPerPage ───────────────────────────────────────────────────────────────

export const RowsPerPage: Story = {
  ...RowsPerPageStory,
  parameters: {
    ...RowsPerPageStory.parameters,
    docs: {
      ...RowsPerPageStory.parameters?.docs,
      story: { height: '200px' }
    }
  }
};
