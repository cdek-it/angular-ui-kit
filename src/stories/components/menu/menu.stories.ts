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
      control: false,
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

export default meta;
type Story = StoryObj<ExtraMenuComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts = ['[items]="items"'];
    if (args.ariaLabel) parts.push('[ariaLabel]="ariaLabel"');
    return {
      props: args,
      template: `<extra-menu ${parts.join(' ')}></extra-menu>`
    };
  },
  argTypes: {
    popup: { control: false },
    open: { control: false },
    appendTo: { control: false }
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный пример inline-меню: пункты и `ariaLabel` меняются через Controls. Всплывающий режим — в истории Popup: ему нужен триггер.'
      }
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
  name: 'Basic',
  decorators: [moduleMetadata({ imports: [MenuBasicComponent] })],
  render: () => ({ template: `<app-menu-basic></app-menu-basic>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый вариант inline-меню без иконок.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraMenuAction,
  ExtraMenuComponent,
  ExtraMenuItemSelectEvent,
  ExtraMenuSeparator,
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-basic',
  standalone: true,
  imports: [ExtraMenuComponent],
  template: \`
    <extra-menu [items]="items" (onItemSelect)="select($event)"></extra-menu>
  \`,
})
export class MenuBasicComponent {
  items: (ExtraMenuAction | ExtraMenuSeparator)[] = [
    { label: 'Новый заказ' },
    { label: 'Поиск отправления' },
    { separator: true },
    { label: 'Экспорт' },
  ];

  select({ item }: ExtraMenuItemSelectEvent): void {
    this.items = this.items.map((entry) =>
      'separator' in entry ? entry : { ...entry, selected: entry === item },
    );
  }
}
        `
      }
    }
  }
};

// ── WithIcons ─────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'WithIcons',
  decorators: [moduleMetadata({ imports: [MenuWithIconsComponent] })],
  render: () => ({ template: `<app-menu-with-icons></app-menu-with-icons>` }),
  parameters: {
    docs: {
      description: {
        story: 'Пункты меню с иконками.'
      },
      source: {
        language: 'ts',
        code: `

@Component({
  selector: 'app-menu-with-icons',
  standalone: true,
  imports: [ExtraMenuComponent],
  template: \`
    <extra-menu [items]="items" (onItemSelect)="select($event)"></extra-menu>
  \`,
})
export class MenuWithIconsComponent {
  items: (ExtraMenuAction | ExtraMenuSeparator)[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Открыть список заказов', icon: 'ti ti-folder-open' },
    { label: 'Сохранить черновик', icon: 'ti ti-device-floppy' },
    { separator: true },
    { label: 'Распечатать накладную', icon: 'ti ti-printer' },
    { label: 'Экспорт данных', icon: 'ti ti-download' },
  ];

  select({ item }: ExtraMenuItemSelectEvent): void {
    this.items = this.items.map((entry) =>
      'separator' in entry ? entry : { ...entry, selected: entry === item },
    );
  }
}
        `
      }
    }
  }
};

// ── Grouped ───────────────────────────────────────────────────────────────────

export const Grouped: Story = {
  name: 'Grouped',
  decorators: [moduleMetadata({ imports: [MenuGroupedComponent] })],
  render: () => ({ template: `<app-menu-grouped></app-menu-grouped>` }),
  parameters: {
    docs: {
      description: {
        story: 'Группировка пунктов меню через label у родительского элемента.'
      },
      source: {
        language: 'ts',
        code: `

@Component({
  selector: 'app-menu-grouped',
  standalone: true,
  imports: [ExtraMenuComponent],
  template: \`
    <extra-menu [items]="items" (onItemSelect)="select($event)"></extra-menu>
  \`,
})
export class MenuGroupedComponent {
  items: ExtraMenuGroup[] = [
    {
      label: 'Заказы',
      items: [
        { label: 'Новый заказ', icon: 'ti ti-plus' },
        { label: 'Список заказов', icon: 'ti ti-list' },
        { label: 'Архив', icon: 'ti ti-archive' },
      ],
    },
    {
      label: 'Отправления',
      items: [
        { label: 'Создать накладную', icon: 'ti ti-file-invoice' },
        { label: 'Отследить посылку', icon: 'ti ti-map-pin' },
        { label: 'Отменить отправление', icon: 'ti ti-ban' },
      ],
    },
  ];

  select({ item }: ExtraMenuItemSelectEvent): void {
    this.items = this.items.map((group) => ({
      ...group,
      items: group.items.map((action) => ({ ...action, selected: action === item })),
    }));
  }
}
        `
      }
    }
  }
};

// ── ItemEnd ───────────────────────────────────────────────────────────────────

export const ItemEnd: Story = {
  name: 'Item end slot',
  decorators: [moduleMetadata({ imports: [MenuItemEndComponent] })],
  render: () => ({ template: `<app-menu-item-end></app-menu-item-end>` }),
  parameters: {
    docs: {
      description: {
        story:
          'Слот `itemEnd` (директива `extraMenuTemplate`) добавляет содержимое в конец пункта — после текста и `caption`, перед `iconEnd`: хоткей, `Badge`, `Tag`. Текст, иконки, выбор и навигацию по-прежнему обеспечивает компонент.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraBadgeComponent,
  ExtraMenuAction,
  ExtraMenuComponent,
  ExtraMenuSeparator,
  ExtraMenuTemplateDirective,
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-item-end',
  standalone: true,
  imports: [ExtraMenuComponent, ExtraMenuTemplateDirective, ExtraBadgeComponent],
  template: \`${menuItemEndTemplate}\`,
})
export class MenuItemEndComponent {
  hotkeys: Record<string, string> = { create: 'Ctrl+N', search: 'Ctrl+F' };

  items: (ExtraMenuAction | ExtraMenuSeparator)[] = [
    { id: 'create', label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { id: 'search', label: 'Найти по трек-номеру', icon: 'ti ti-search' },
    { separator: true },
    { id: 'registry', label: 'Скачать реестр', caption: 'За текущий месяц', icon: 'ti ti-download' },
  ];
}
        `
      }
    }
  }
};
