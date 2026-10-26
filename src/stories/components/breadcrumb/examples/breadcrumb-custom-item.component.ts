import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraBreadcrumbComponent } from '../../../../lib/components/breadcrumb/breadcrumb.component';
import { ExtraBreadcrumbTemplateDirective } from '../../../../lib/components/breadcrumb/breadcrumb-template.directive';
import { commonItems } from '../breadcrumb.data';

const template = `
<extra-breadcrumb [items]="items" homeAriaLabel="Главная">
  <ng-template extraBreadcrumbTemplate="item" let-item>
    @if (item.icon) {
      <span [class]="'p-breadcrumb-item-icon ' + item.icon"></span>
    }
    @if (item.label) {
      <span class="p-breadcrumb-item-label"><b>{{ item.label }}</b></span>
    }
  </ng-template>
</extra-breadcrumb>
`;

@Component({
  selector: 'app-breadcrumb-custom-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBreadcrumbComponent, ExtraBreadcrumbTemplateDirective],
  template
})
export class BreadcrumbCustomItemComponent {
  items = commonItems;
}

export const CustomItem: StoryObj = {
  name: 'Custom item',
  render: () => ({
    template: `<app-breadcrumb-custom-item></app-breadcrumb-custom-item>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Слот `item` подменяет содержимое элемента цепочки (иконку и подпись). Ссылка, клик, `disabled` и `aria-current` у текущей страницы остаются за компонентом.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraBreadcrumbComponent, ExtraBreadcrumbItem, ExtraBreadcrumbTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-breadcrumb-custom-item',
  standalone: true,
  imports: [ExtraBreadcrumbComponent, ExtraBreadcrumbTemplateDirective],
  template: \`${template}\`,
})
export class BreadcrumbCustomItemComponent {
  items: ExtraBreadcrumbItem[] = [
    { label: 'Заказы', icon: 'ti ti-package', href: '#' },
    { label: 'Документы', icon: 'ti ti-file-text', href: '#' },
    { label: 'Накладная', icon: 'ti ti-file-invoice' },
  ];
}
        `
      }
    }
  }
};
