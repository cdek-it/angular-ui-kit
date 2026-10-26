import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraBreadcrumbComponent } from '../../../lib/components/breadcrumb/breadcrumb.component';
import { BreadcrumbCustomItemComponent, CustomItem } from './examples/breadcrumb-custom-item.component';
import { commonItems, disabledItems } from './breadcrumb.data';

const meta: Meta<ExtraBreadcrumbComponent> = {
  title: 'Components/Menu/Breadcrumb',
  component: ExtraBreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraBreadcrumbComponent, BreadcrumbCustomItemComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-breadcrumb' },
    docs: {
      description: {
        component: `Навигационная цепочка: путь от корня раздела до текущей страницы. Последний элемент — текущая страница (\`aria-current="page"\`), он приглушён и не интерактивен.

Слоты (передаются через директиву \`extraBreadcrumbTemplate\`):
- \`item\` — кастомное содержимое элемента цепочки (контекст \`let-item\`)

\`\`\`typescript
import { ExtraBreadcrumbComponent, ExtraBreadcrumbTemplateDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Элементы цепочки; последний элемент — текущая страница.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '[]' },
        type: { summary: 'ExtraBreadcrumbItem[]' }
      }
    },
    showHome: {
      control: 'boolean',
      description: 'Показывать домашний элемент в начале цепочки.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    home: {
      control: 'object',
      description: 'Домашний элемент: ссылка на корень раздела. Отображается только иконкой.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "{ icon: 'ti ti-home' }" },
        type: { summary: 'ExtraBreadcrumbItem' }
      }
    },
    homeAriaLabel: {
      control: 'text',
      description: 'Метка домашнего элемента для программ экранного доступа. Задаётся приложением: без неё у ссылки-иконки нет доступного имени.',
      table: {
        category: 'Свойства',
        type: { summary: 'string' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Метка для программ экранного доступа.',
      table: {
        category: 'Свойства',
        type: { summary: 'string' }
      }
    },
    onItemSelect: {
      control: false,
      description: 'Выбран элемент цепочки. Не срабатывает для текущей страницы и элементов с `disabled`.',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraBreadcrumbItemSelectEvent>' }
      }
    }
  },
  args: {
    items: commonItems,
    showHome: true,
    home: { icon: 'ti ti-home', href: '#' },
    homeAriaLabel: 'Главная',
    ariaLabel: 'Навигационная цепочка'
  }
};

export default meta;
type Story = StoryObj<ExtraBreadcrumbComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts = ['[items]="items"'];
    if (!args.showHome) parts.push('[showHome]="false"');
    if (args.home) parts.push('[home]="home"');
    if (args.homeAriaLabel) parts.push('[homeAriaLabel]="homeAriaLabel"');
    if (args.ariaLabel) parts.push('[ariaLabel]="ariaLabel"');

    return {
      props: args,
      template: `<extra-breadcrumb ${parts.join(' ')}></extra-breadcrumb>`
    };
  },
  parameters: {
    docs: {
      description: { story: 'Интерактивный пример: свойства меняются через Controls.' }
    }
  }
};

// ── Without home ─────────────────────────────────────────────────────────────

export const WithoutHome: Story = {
  name: 'Without home',
  args: { showHome: false },
  render: (args) => ({
    props: args,
    template: `<extra-breadcrumb [items]="items" [showHome]="showHome"></extra-breadcrumb>`
  }),
  parameters: {
    docs: {
      description: { story: 'Без домашнего элемента (`showHome=false`): цепочка начинается с первого элемента `items`.' }
    }
  }
};

// ── Disabled item ────────────────────────────────────────────────────────────

export const DisabledItem: Story = {
  name: 'Disabled item',
  args: { items: disabledItems },
  render: (args) => ({
    props: args,
    template: `<extra-breadcrumb [items]="items" [home]="home" [homeAriaLabel]="homeAriaLabel"></extra-breadcrumb>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Элемент с `disabled: true` не является ссылкой и не выбирается. В хлебных крошках применяется редко.'
      }
    }
  }
};

// ── Re-exports from example components ───────────────────────────────────────
export { CustomItem };
