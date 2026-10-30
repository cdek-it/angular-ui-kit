import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import {
  ExtraMegaMenuComponent,
  ExtraMegaMenuItem
} from '../../../../lib/components/megamenu/megamenu.component';
import { ExtraMegaMenuTemplateDirective } from '../../../../lib/components/megamenu/megamenu-template.directive';
import { ExtraBadgeComponent } from '../../../../lib/components/badge/badge.component';

const template = `
<extra-megamenu [items]="items">
  <ng-template extraMegaMenuTemplate="itemEnd" let-item>
    @if (item.id === 'tracking') {
      <extra-badge value="Новое" severity="info"></extra-badge>
    }
  </ng-template>
</extra-megamenu>
`;

@Component({
  selector: 'app-megamenu-item-end',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMegaMenuComponent, ExtraMegaMenuTemplateDirective, ExtraBadgeComponent],
  template
})
export class MegaMenuItemEndComponent {
  items: ExtraMegaMenuItem[] = [
    {
      label: 'Отправления',
      icon: 'ti ti-package',
      items: [
        [
          {
            label: 'Отправления',
            items: [
              { label: 'Создать', icon: 'ti ti-file-plus' },
              { id: 'tracking', label: 'Отследить', icon: 'ti ti-search' }
            ]
          }
        ]
      ]
    }
  ];
}

export const ItemEnd: StoryObj = {
  name: 'Item end slot',
  render: () => ({
    template: `<app-megamenu-item-end></app-megamenu-item-end>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Слот `itemEnd` добавляет содержимое в конец пункта панели — после текста и `caption`, перед `iconEnd`: например, `Badge` или `Tag`. Текст, иконки, выбор и навигацию по-прежнему обеспечивает компонент.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraBadgeComponent,
  ExtraMegaMenuComponent,
  ExtraMegaMenuItem,
  ExtraMegaMenuTemplateDirective
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-megamenu-item-end',
  standalone: true,
  imports: [ExtraMegaMenuComponent, ExtraMegaMenuTemplateDirective, ExtraBadgeComponent],
  template: \`${template}\`,
})
export class MegaMenuItemEndComponent {
  items: ExtraMegaMenuItem[] = [
    {
      label: 'Отправления',
      icon: 'ti ti-package',
      items: [[{
        label: 'Отправления',
        items: [
          { label: 'Создать', icon: 'ti ti-file-plus' },
          { id: 'tracking', label: 'Отследить', icon: 'ti ti-search' },
        ],
      }]],
    },
  ];
}
        `
      }
    }
  }
};
