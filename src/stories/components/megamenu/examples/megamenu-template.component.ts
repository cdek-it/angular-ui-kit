import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import {
  ExtraMegaMenuComponent,
  ExtraMegaMenuItem,
  ExtraMegaMenuItemDirective
} from '../../../../lib/components/megamenu/megamenu.component';

const template = `
<extra-megamenu [model]="items">
  <ng-template extraMegaMenuItem let-item let-hasSubmenu="hasSubmenu">
    <a
      class="p-megamenu-item-link flex items-center gap-2 px-4 py-2"
      [attr.href]="item.url || null"
    >
      @if (item.icon) {
        <i [class]="item.icon"></i>
      }
      <span class="font-semibold">{{ item.label }}</span>
      @if (hasSubmenu) {
        <i class="ti ti-chevron-down ml-auto text-surface-400"></i>
      }
    </a>
  </ng-template>
</extra-megamenu>
`;

@Component({
  selector: 'app-megamenu-template',
  standalone: true,
  imports: [ExtraMegaMenuComponent, ExtraMegaMenuItemDirective],
  template
})
export class MegaMenuTemplateComponent {
  items: ExtraMegaMenuItem[] = [
    {
      label: 'Продукты',
      icon: 'ti ti-box',
      items: [
        [
          {
            label: 'Формы',
            items: [
              { label: 'Поля ввода', icon: 'ti ti-forms' },
              { label: 'Кнопки', icon: 'ti ti-hand-click' }
            ]
          }
        ],
        [
          {
            label: 'Графики',
            items: [
              { label: 'Столбчатые', icon: 'ti ti-chart-bar' },
              { label: 'Линейные', icon: 'ti ti-chart-line' }
            ]
          }
        ]
      ]
    },
    {
      label: 'Решения',
      icon: 'ti ti-bulb',
      items: [[{ label: 'Аналитика', items: [{ label: 'Отчёты', icon: 'ti ti-chart-dots' }] }]]
    }
  ];
}

export const Template: StoryObj = {
  name: 'Item Template',
  render: () => ({ template: `<app-megamenu-template></app-megamenu-template>` }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Полностью кастомный рендер пункта меню через `extraMegaMenuItem`. Контекст: `let-item`, `let-hasSubmenu="hasSubmenu"`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraMegaMenuComponent,
  ExtraMegaMenuItemDirective,
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-megamenu-template',
  standalone: true,
  imports: [ExtraMegaMenuComponent, ExtraMegaMenuItemDirective],
  template: \`
    <extra-megamenu [model]="items">
      <ng-template extraMegaMenuItem let-item let-hasSubmenu="hasSubmenu">
        <a class="p-megamenu-item-link flex items-center gap-2 px-4 py-2" [attr.href]="item.url || null">
          @if (item.icon) {
            <i [class]="item.icon"></i>
          }
          <span class="font-semibold">{{ item.label }}</span>
          @if (hasSubmenu) {
            <i class="ti ti-chevron-down ml-auto text-surface-400"></i>
          }
        </a>
      </ng-template>
    </extra-megamenu>
  \`,
})
export class MegaMenuTemplateComponent {
  items = [ /* ... */ ];
}
        `
      }
    }
  }
};
