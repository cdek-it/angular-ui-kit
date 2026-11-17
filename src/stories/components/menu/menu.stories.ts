import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraMenuComponent } from '../../../lib/components/menu/menu.component';
import { MenuPopupComponent } from './examples/menu-popup.component';
import { MenuBasicComponent } from './examples/menu-basic.component';
import { MenuWithIconsComponent } from './examples/menu-with-icons.component';
import { MenuGroupedComponent } from './examples/menu-grouped.component';
import { MenuItemEndComponent, menuItemEndTemplate } from './examples/menu-item-end.component';

const meta: Meta<ExtraMenuComponent> = {
  title: 'Components/Menu/Menu',
  component: ExtraMenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Панель со списком пунктов: действия или навигация. Поддерживает inline-отображение и всплывающий режим (\`popup\`) у триггера, группы пунктов (\`ExtraMenuGroup\`) и пункты с подписью (\`caption\`).

Слоты (передаются через директиву \`extraMenuTemplate\`):
- \`itemEnd\` — содержимое в конце пункта, например хоткей (контекст \`let-item\`)

\`\`\`typescript
import { ExtraMenuComponent, ExtraMenuTemplateDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-menu' }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Пункты меню, группы и разделители.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '[]' },
        type: { summary: 'ExtraMenuItem[]' }
      }
    },
    popup: {
      control: 'boolean',
      description: 'Режим popup — меню отображается при вызове метода toggle()/show().',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    open: {
      control: 'boolean',
      description: 'Управляемая видимость popup-меню.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    appendTo: {
      control: 'text',
      description: 'Контейнер рендера overlay.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'body'" },
        type: { summary: "'body' | 'self' | ExtraMenuElementLike" }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Доступное имя меню.',
      table: {
        category: 'Свойства',
        type: { summary: 'string' }
      }
    },
    onItemSelect: {
      control: false,
      description: 'Выбран пункт меню.',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraMenuItemSelectEvent>' }
      }
    },
    onShow: {
      control: false,
      description: 'Срабатывает при открытии всплывающего меню.',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    onHide: {
      control: false,
      description: 'Срабатывает при закрытии всплывающего меню.',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    }
  },
  args: {
    items: [
      { label: 'Кабинет', icon: 'ti ti-user' },
      { label: 'Скачать реестр', caption: 'Ctrl+E', icon: 'ti ti-download' },
      { separator: true },
      { label: 'Выйти', icon: 'ti ti-logout' }
    ],
    popup: false
  }
};

const basicItems = [
  { label: 'Новый заказ' },
  { label: 'Поиск отправления' },
  { separator: true },
  { label: 'Экспорт' }
];

const iconItems = [
  { label: 'Создать отправление', icon: 'ti ti-file-plus' },
  { label: 'Открыть список заказов', icon: 'ti ti-folder-open' },
  { label: 'Сохранить черновик', icon: 'ti ti-device-floppy' }
];

const groupedItems = [
  { label: 'Файл', items: [{ label: 'Создать' }, { label: 'Открыть' }] },
  { label: 'Правка', items: [{ label: 'Копировать' }, { label: 'Вставить' }] }
];

const itemEndItems = [
  { label: 'Открыть реестр', caption: 'Ctrl+O' },
  { label: 'Скачать', caption: 'Ctrl+S' }
];

export default meta;
type Story = StoryObj<ExtraMenuComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => ({ props: args, template: `<extra-menu [items]="items"></extra-menu>` }),
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный пример inline-меню: пункты и `ariaLabel` меняются через Controls. Всплывающий режим — в истории Popup: ему нужен триггер.'
      },
      source: { language: 'html', type: 'code', code: '<extra-menu [items]="items"></extra-menu>' }
    }
  }
};

// ── Popup ─────────────────────────────────────────────────────────────────────

export const Popup: Story = {
  name: 'Popup',
  decorators: [moduleMetadata({ imports: [MenuPopupComponent] })],
  render: () => ({ template: `<app-menu-popup></app-menu-popup>` }),
  parameters: {
    docs: {
      description: {
        story: 'Меню вызывается по нажатию на кнопку. Используйте метод toggle() для показа/скрытия.'
      },
      source: {
        language: 'ts',
        code: `
import { Component, ViewChild } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuItem, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-popup',
  standalone: true,
  imports: [ExtraMenuComponent, ButtonComponent],
  template: \`
    <button label="Действия с заказом" variant="secondary" (click)="toggle($event)"></button>
    <extra-menu #menuRef [items]="items" [popup]="true"></extra-menu>
  \`,
})
export class MenuPopupComponent {
  @ViewChild('menuRef') menuRef!: ExtraMenuComponent;

  items: ExtraMenuItem[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Найти по трек-номеру', icon: 'ti ti-search' },
    { separator: true },
    { label: 'Экспорт данных', icon: 'ti ti-download' },
  ];

  toggle(event: Event): void {
    this.menuRef.toggle(event);
  }
}
        `
      }
    }
  }
};

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: (args) => ({ props: { ...args, items: basicItems }, template: `<extra-menu [items]="items"></extra-menu>` }),
  args: { items: basicItems },
  parameters: {
    docs: {
      description: { story: 'Базовый вариант inline-меню без иконок.' },
      source: { language: 'html', type: 'code', code: `<extra-menu [items]="items"></extra-menu>` }
    }
  }
};

// ── WithIcons ─────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: (args) => ({ props: { ...args, items: iconItems }, template: `<extra-menu [items]="items"></extra-menu>` }),
  args: { items: iconItems },
  parameters: {
    docs: {
      description: { story: 'Пункты меню с иконками.' },
      source: { language: 'html', type: 'code', code: `<extra-menu [items]="items"></extra-menu>` }
    }
  }
};

// ── Grouped ───────────────────────────────────────────────────────────────────

export const Grouped: Story = {
  render: (args) => ({
    props: { ...args, items: groupedItems },
    template: `<extra-menu [items]="items"></extra-menu>`
  }),
  args: { items: groupedItems },
  parameters: {
    docs: {
      description: { story: 'Группировка пунктов меню через label у родительского элемента.' },
      source: { language: 'html', type: 'code', code: `<extra-menu [items]="items"></extra-menu>` }
    }
  }
};

// ── ItemEnd ───────────────────────────────────────────────────────────────────

export const ItemEnd: Story = {
  render: (args) => ({
    props: { ...args, items: itemEndItems },
    template: `<extra-menu [items]="items">
  <ng-template extraMenuTemplate="itemEnd" let-item>{{ item.caption }}</ng-template>
</extra-menu>`
  }),
  args: { items: itemEndItems },
  parameters: {
    docs: {
      description: {
        story:
          'Слот `itemEnd` (директива `extraMenuTemplate`) добавляет содержимое в конец пункта — после текста и `caption`, перед `iconEnd`: хоткей, `Badge`, `Tag`. Текст, иконки, выбор и навигацию по-прежнему обеспечивает компонент.'
      },
      source: {
        language: 'html',
        type: 'code',
        code: `<extra-menu [items]="items">
  <ng-template extraMenuTemplate="itemEnd" let-item>{{ item.caption }}</ng-template>
</extra-menu>`
      }
    }
  }
};
