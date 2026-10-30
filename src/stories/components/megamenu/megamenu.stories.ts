import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraMegaMenuComponent } from '../../../lib/components/megamenu/megamenu.component';
import { ItemEnd, MegaMenuItemEndComponent } from './examples/megamenu-item-end.component';
import { captionItems, commonItems } from './megamenu.data';

const meta: Meta<ExtraMegaMenuComponent> = {
  title: 'Components/Menu/MegaMenu',
  component: ExtraMegaMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraMegaMenuComponent, MegaMenuItemEndComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Многоуровневая навигация: пункты верхнего уровня раскрывают панель с колонками, в колонках — группы пунктов со своими заголовками. Ниже \`breakpoint\` меню сворачивается в мобильную кнопку.

Слоты (передаются через директиву \`extraMegaMenuTemplate\`):
- \`itemEnd\` — содержимое в конце пункта панели (контекст \`let-item\`)

\`\`\`typescript
import { ExtraMegaMenuComponent, ExtraMegaMenuTemplateDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      story: { height: '320px' }
    },
    designTokens: { prefix: '--p-megamenu' }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Пункты верхнего уровня.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '[]' },
        type: { summary: 'ExtraMegaMenuItem[]' }
      }
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Раскладка пунктов: `horizontal` — строка в шапке, `vertical` — список в боковой панели.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" }
      }
    },
    breakpoint: {
      control: 'text',
      description: 'Ширина экрана, ниже которой меню сворачивается в мобильную кнопку.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'960px'" },
        type: { summary: 'string' }
      }
    },
    scrollHeight: {
      control: 'text',
      description: 'Максимальная высота списка пунктов (корневого и списков в панели). Не задано — без ограничения.',
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
    ariaLabelledBy: {
      control: 'text',
      description: '`id` внешнего элемента-метки для доступности.',
      table: {
        category: 'Свойства',
        type: { summary: 'string' }
      }
    },
    tabindex: {
      control: 'number',
      description: 'Порядок перехода по Tab.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
      }
    },
    onItemSelect: {
      control: false,
      description: 'Выбор пункта. Не срабатывает у пункта верхнего уровня, раскрывающего панель.',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraMegaMenuItemSelectEvent>' }
      }
    }
  },
  args: {
    items: commonItems,
    orientation: 'horizontal',
    breakpoint: '960px',
    tabindex: 0
  }
};

export default meta;
type Story = StoryObj<ExtraMegaMenuComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts = ['[items]="items"'];
    if (args.orientation && args.orientation !== 'horizontal') parts.push('[orientation]="orientation"');
    if (args.breakpoint && args.breakpoint !== '960px') parts.push('[breakpoint]="breakpoint"');
    if (args.scrollHeight) parts.push('[scrollHeight]="scrollHeight"');
    if (args.ariaLabel) parts.push('[ariaLabel]="ariaLabel"');
    if (args.ariaLabelledBy) parts.push('[ariaLabelledBy]="ariaLabelledBy"');
    if (args.tabindex) parts.push('[tabindex]="tabindex"');

    return {
      props: args,
      template: `<extra-megamenu ${parts.join(' ')}></extra-megamenu>`
    };
  },
  parameters: {
    docs: {
      description: { story: 'Интерактивный пример: свойства меняются через Controls.' }
    }
  }
};

// ── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Vertical',
  args: { orientation: 'vertical' },
  render: (args) => ({
    props: args,
    template: `<extra-megamenu [items]="items" [orientation]="orientation"></extra-megamenu>`
  }),
  parameters: {
    docs: {
      description: { story: 'Вертикальная раскладка для боковой панели: панель выезжает вбок от пункта.' }
    }
  }
};

// ── Caption, icons and separators ────────────────────────────────────────────

export const CaptionAndIcons: Story = {
  name: 'Caption and icons',
  args: { items: captionItems },
  render: (args) => ({
    props: args,
    template: `<extra-megamenu [items]="items"></extra-megamenu>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Пункт панели с подписью `caption`, иконкой `iconEnd` и отметкой `selected`; разделители `{ separator: true }` между пунктами.'
      }
    }
  }
};

// ── Mobile ───────────────────────────────────────────────────────────────────

export const Mobile: Story = {
  name: 'Mobile',
  args: { breakpoint: '10000px' },
  render: (args) => ({
    props: args,
    template: `<extra-megamenu [items]="items" [breakpoint]="breakpoint"></extra-megamenu>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Ниже `breakpoint` остаётся только мобильная кнопка, колонки панели складываются в один столбец. Для примера `breakpoint` завышен, чтобы показать мобильный вид на любом экране.'
      }
    }
  }
};

// ── Re-exports from example components ───────────────────────────────────────
export { ItemEnd };
