import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraMenuComponent } from '../../../lib/components/menu/menu.component';
import { MenuPopupComponent } from './examples/menu-popup.component';
import { MenuBasicComponent } from './examples/menu-basic.component';
import { MenuWithIconsComponent } from './examples/menu-with-icons.component';
import { MenuGroupedComponent } from './examples/menu-grouped.component';
import { MenuCustomComponent } from './examples/menu-custom.component';
import { MenuStartEndComponent } from './examples/menu-start-end.component';

const meta: Meta<ExtraMenuComponent> = {
  title: 'Components/Menu/Menu',
  component: ExtraMenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Реализован по спецификации \`docs/components-api/menu.md\`. Поддерживает режим popup (по нажатию на триггер) и inline-отображение, группировку пунктов (\`MenuGroup\`) и пункты с описанием (\`caption\`).

Слоты (передаются через директиву \`extraMenuTemplate\`):
- \`item\` — кастомный рендер пункта меню (контекст \`let-item\`)
- \`submenuHeader\` — кастомный рендер заголовка группы (контекст \`let-group\`)
- \`start\` / \`end\` — произвольный контент до/после списка

\`\`\`typescript
import { ExtraMenuComponent, ExtraMenuTemplateDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-menu' }
  },
  argTypes: {
    items: {
      control: false,
      description: 'Пункты меню.',
      table: {
        category: 'Свойства',
        type: { summary: 'MenuItem[]' }
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
        type: { summary: "'body' | 'self' | ElementLike" }
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
        type: { summary: 'EventEmitter<MenuItemSelectEvent>' }
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
  }
};

export default meta;
type Story = StoryObj<ExtraMenuComponent>;

// ── Popup ─────────────────────────────────────────────────────────────────────

export const Default: Story = {
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
import { ExtraMenuComponent, ExtraMenuItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-basic',
  standalone: true,
  imports: [ExtraMenuComponent],
  template: \`
    <extra-menu [items]="items"></extra-menu>
  \`,
})
export class MenuBasicComponent {
  items: ExtraMenuItem[] = [
    { label: 'Новый заказ' },
    { label: 'Поиск отправления' },
    { separator: true },
    { label: 'Экспорт' },
  ];
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
    <extra-menu [items]="items"></extra-menu>
  \`,
})
export class MenuWithIconsComponent {
  items: ExtraMenuItem[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Открыть список заказов', icon: 'ti ti-folder-open' },
    { label: 'Сохранить черновик', icon: 'ti ti-device-floppy' },
    { separator: true },
    { label: 'Распечатать накладную', icon: 'ti ti-printer' },
    { label: 'Экспорт данных', icon: 'ti ti-download' },
  ];
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
    <extra-menu [items]="items"></extra-menu>
  \`,
})
export class MenuGroupedComponent {
  items: ExtraMenuItem[] = [
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
}
        `
      }
    }
  }
};

// ── Custom ────────────────────────────────────────────────────────────────────

export const Custom: Story = {
  name: 'Custom',
  decorators: [moduleMetadata({ imports: [MenuCustomComponent] })],
  render: () => ({ template: `<app-menu-custom></app-menu-custom>` }),
  parameters: {
    docs: {
      description: {
        story:
          'Кастомизация отображения пунктов меню через слот `item` (директива `extraMenuTemplate`). Передайте `ng-template` с произвольной разметкой — он получит объект пункта меню через `let-item`. Клик по разметке внутри шаблона обрабатывается компонентом автоматически — вручную вешать `(click)` не нужно.'
      },
      source: {
        language: 'ts',
        code: `

@Component({
  selector: 'app-menu-custom',
  standalone: true,
  imports: [ExtraMenuComponent, ExtraMenuTemplateDirective],
  template: \`
    <extra-menu [items]="items">
      <ng-template extraMenuTemplate="item" let-item>
        <a
          class="p-menu-item-link flex items-center gap-3 px-4 py-2"
          [attr.tabindex]="-1"
          [class.opacity-50]="item.disabled"
        >
          @if (item.icon) {
            <span
              [class]="item.icon"
              class="text-xl w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white shrink-0"
            ></span>
          }
          <div class="flex flex-col min-w-0">
            <span class="p-menu-item-label font-semibold truncate">{{ item.label }}</span>
            @if (item.caption) {
              <small class="text-surface-400 text-xs truncate">{{ item.caption }}</small>
            }
          </div>
        </a>
      </ng-template>
    </extra-menu>
  \`,
})
export class MenuCustomComponent {
  items: ExtraMenuItem[] = [
    {
      label: 'Создать отправление',
      caption: 'Оформление нового заказа',
      icon: 'ti ti-file-plus',
    },
    {
      label: 'Найти посылку',
      caption: 'Поиск по трек-номеру',
      icon: 'ti ti-map-pin',
    },
    { separator: true },
    {
      label: 'Экспорт данных',
      caption: 'Выгрузка в CSV или Excel',
      icon: 'ti ti-download',
    },
    {
      label: 'Удалить',
      caption: 'Действие недоступно',
      icon: 'ti ti-trash',
      disabled: true,
    },
  ];
}
        `
      }
    }
  }
};

// ── StartEnd ──────────────────────────────────────────────────────────────────

export const StartEnd: Story = {
  name: 'StartEnd',
  decorators: [moduleMetadata({ imports: [MenuStartEndComponent] })],
  render: () => ({ template: `<app-menu-start-end></app-menu-start-end>` }),
  parameters: {
    docs: {
      description: {
        story:
          'Произвольный контент до и после списка пунктов через слоты `start` и `end` (директива `extraMenuTemplate`) — например, карточка аккаунта сверху и ссылка на настройки снизу.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuItem, ExtraMenuTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-start-end',
  standalone: true,
  imports: [ExtraMenuComponent, ExtraMenuTemplateDirective],
  template: \`
    <extra-menu [items]="items">
      <ng-template extraMenuTemplate="start">
        <div class="flex items-center gap-3 px-4 py-3 border-b border-surface-200">
          <span class="ti ti-user-circle text-2xl text-surface-500"></span>
          <div class="flex flex-col min-w-0">
            <span class="font-semibold truncate">Иван Иванов</span>
            <small class="text-surface-400 text-xs truncate">ivan@example.com</small>
          </div>
        </div>
      </ng-template>
      <ng-template extraMenuTemplate="end">
        <a class="flex items-center gap-2 px-4 py-3 border-t border-surface-200 text-primary" href="#">
          <span class="ti ti-settings text-lg"></span>
          <span class="text-sm font-medium">Все настройки</span>
        </a>
      </ng-template>
    </extra-menu>
  \`,
})
export class MenuStartEndComponent {
  items: ExtraMenuItem[] = [
    { label: 'Профиль', icon: 'ti ti-user' },
    { label: 'Уведомления', icon: 'ti ti-bell' },
    { separator: true },
    { label: 'Выйти', icon: 'ti ti-logout' },
  ];
}
        `
      }
    }
  }
};
