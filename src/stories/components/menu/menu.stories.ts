import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MenuComponent } from '../../../lib/components/menu/menu.component';
import { MenuPopupComponent } from './examples/menu-popup.component';
import { MenuBasicComponent } from './examples/menu-basic.component';
import { MenuWithIconsComponent } from './examples/menu-with-icons.component';
import { MenuGroupedComponent } from './examples/menu-grouped.component';
import { MenuCustomComponent } from './examples/menu-custom.component';

const meta: Meta<MenuComponent> = {
  title: 'Components/Menu/Menu',
  component: MenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Компонент навигационного меню. Поддерживает режим popup (по нажатию на триггер) и inline-отображение, группировку пунктов и пункты с описанием (caption).

\`\`\`typescript
import { MenuComponent } from '@cdek-it/angular-ui-kit';
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
        type: { summary: 'MenuModel[]' },
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
type Story = StoryObj<MenuComponent>;

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
import { MenuComponent, MenuModel, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-popup',
  standalone: true,
  imports: [MenuComponent, ButtonComponent],
  template: \`
    <button label="Действия с заказом" variant="secondary" (click)="toggle($event)"></button>
    <menu #menuRef [model]="items" [popup]="true"></menu>
  \`,
})
export class MenuPopupComponent {
  @ViewChild('menuRef') menuRef!: MenuComponent;

  items: MenuModel[] = [
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
import { MenuComponent, MenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-basic',
  standalone: true,
  imports: [MenuComponent],
  template: \`
    <menu [model]="items"></menu>
  \`,
})
export class MenuBasicComponent {
  items: MenuModel[] = [
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
import { MenuComponent, MenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-with-icons',
  standalone: true,
  imports: [MenuComponent],
  template: \`
    <menu [model]="items"></menu>
  \`,
})
export class MenuWithIconsComponent {
  items: MenuModel[] = [
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
import { MenuComponent, MenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-grouped',
  standalone: true,
  imports: [MenuComponent],
  template: \`
    <menu [model]="items"></menu>
  \`,
})
export class MenuGroupedComponent {
  items: MenuModel[] = [
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
        story: 'Пункты меню с иконкой и описанием (caption). Поле caption передаётся через MenuModel.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MenuComponent, MenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menu-custom',
  standalone: true,
  imports: [MenuComponent],
  template: \`
    <menu [model]="items"></menu>
  \`,
})
export class MenuCustomComponent {
  items: MenuModel[] = [
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
  ];
}
        `,
      },
    },
  },
};
