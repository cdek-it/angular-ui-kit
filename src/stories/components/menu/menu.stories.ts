import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraMenuComponent } from '../../../lib/components/menu/menu.component';
import { MenuPopupComponent } from './examples/menu-popup.component';
import { MenuBasicComponent } from './examples/menu-basic.component';
import { MenuWithIconsComponent } from './examples/menu-with-icons.component';
import { MenuGroupedComponent } from './examples/menu-grouped.component';
import { MenuCustomComponent } from './examples/menu-custom.component';

const meta: Meta<ExtraMenuComponent> = {
  title: 'Components/Menu/Menu',
  component: ExtraMenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Компонент навигационного меню. Поддерживает режим popup (по нажатию на триггер) и inline-отображение, группировку пунктов и пункты с описанием (caption).

\`\`\`typescript
import { ExtraMenuComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-menu' },
  },
  argTypes: {
    model: {
      control: false,
      description: 'Массив пунктов меню.',
      table: {
        category: 'Props',
        type: { summary: 'ExtraMenuModel[]' },
      },
    },
    popup: {
      control: 'boolean',
      description: 'Режим popup — меню отображается при вызове метода toggle().',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
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
        story: 'Меню вызывается по нажатию на кнопку. Используйте метод toggle() для показа/скрытия.',
      },
      source: {
        language: 'ts',
        code: `
import { Component, ViewChild } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-popup',
  standalone: true,
  imports: [ExtraMenuComponent, ButtonComponent],
  template: \`
    <button label="Действия с заказом" variant="secondary" (click)="toggle($event)"></button>
    <extra-menu #menuRef [model]="items" [popup]="true"></extra-menu>
  \`,
})
export class MenuPopupComponent {
  @ViewChild('menuRef') menuRef!: ExtraMenuComponent;

  items: ExtraMenuModel[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Найти по трек-номеру', icon: 'ti ti-search' },
    { separator: true },
    { label: 'Экспорт данных', icon: 'ti ti-download' },
  ];

  toggle(event: Event): void {
    this.menuRef.toggle(event);
  }
}
        `,
      },
    },
  },
};

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  name: 'Basic',
  decorators: [moduleMetadata({ imports: [MenuBasicComponent] })],
  render: () => ({ template: `<app-menu-basic></app-menu-basic>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый вариант inline-меню без иконок.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-basic',
  standalone: true,
  imports: [ExtraMenuComponent],
  template: \`
    <extra-menu [model]="items"></extra-menu>
  \`,
})
export class MenuBasicComponent {
  items: ExtraMenuModel[] = [
    { label: 'Новый заказ' },
    { label: 'Поиск отправления' },
    { separator: true },
    { label: 'Экспорт' },
  ];
}
        `,
      },
    },
  },
};

// ── WithIcons ─────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'WithIcons',
  decorators: [moduleMetadata({ imports: [MenuWithIconsComponent] })],
  render: () => ({ template: `<app-menu-with-icons></app-menu-with-icons>` }),
  parameters: {
    docs: {
      description: {
        story: 'Пункты меню с иконками.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-with-icons',
  standalone: true,
  imports: [ExtraMenuComponent],
  template: \`
    <extra-menu [model]="items"></extra-menu>
  \`,
})
export class MenuWithIconsComponent {
  items: ExtraMenuModel[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Открыть список заказов', icon: 'ti ti-folder-open' },
    { label: 'Сохранить черновик', icon: 'ti ti-device-floppy' },
    { separator: true },
    { label: 'Распечатать накладную', icon: 'ti ti-printer' },
    { label: 'Экспорт данных', icon: 'ti ti-download' },
  ];
}
        `,
      },
    },
  },
};

// ── Grouped ───────────────────────────────────────────────────────────────────

export const Grouped: Story = {
  name: 'Grouped',
  decorators: [moduleMetadata({ imports: [MenuGroupedComponent] })],
  render: () => ({ template: `<app-menu-grouped></app-menu-grouped>` }),
  parameters: {
    docs: {
      description: {
        story: 'Группировка пунктов меню через label у родительского элемента.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-grouped',
  standalone: true,
  imports: [ExtraMenuComponent],
  template: \`
    <extra-menu [model]="items"></extra-menu>
  \`,
})
export class MenuGroupedComponent {
  items: ExtraMenuModel[] = [
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
        `,
      },
    },
  },
};

// ── Custom ────────────────────────────────────────────────────────────────────

export const Custom: Story = {
  name: 'Custom',
  decorators: [moduleMetadata({ imports: [MenuCustomComponent] })],
  render: () => ({ template: `<app-menu-custom></app-menu-custom>` }),
  parameters: {
    docs: {
      description: {
        story: 'Кастомизация отображения пунктов меню через входной параметр `itemTemplate`. Передайте `ng-template` с произвольной разметкой — он получит объект пункта меню через `let-item`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-custom',
  standalone: true,
  imports: [ExtraMenuComponent],
  template: \`
    <extra-menu [model]="items" [itemTemplate]="customItem"></extra-menu>

    <ng-template #customItem let-item>
      <a
        class="p-menu-item-link flex items-center gap-3 px-4 py-2"
        role="menuitem"
        tabindex="0"
        [class.opacity-50]="item.disabled"
        [attr.href]="item.url || null"
        (click)="!item.disabled && item.command && item.command({ originalEvent: $event, item: item })"
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
        @if (item.badge) {
          <span class="ml-auto text-xs font-bold bg-primary text-white rounded-full px-2 py-0.5">
            {{ item.badge }}
          </span>
        }
      </a>
    </ng-template>
  \`,
})
export class MenuCustomComponent {
  items: ExtraMenuModel[] = [
    {
      label: 'Создать отправление',
      caption: 'Оформление нового заказа',
      icon: 'ti ti-file-plus',
      badge: 'Новое',
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
        `,
      },
    },
  },
};
