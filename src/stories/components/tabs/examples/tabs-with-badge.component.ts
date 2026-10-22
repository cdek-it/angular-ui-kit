import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTabsComponent } from '../../../../lib/components/tabs/tabs.component';
import { ExtraTabItemComponent } from '../../../../lib/components/tabs/tab-item.component';

@Component({
  selector: 'app-tabs-with-badge',
  standalone: true,
  imports: [ExtraTabsComponent, ExtraTabItemComponent],
  template: `
    <extra-tabs>
      <extra-tab-item name="Входящие" icon="ti ti-user" badge="99+" badgeSeverity="danger">Список входящих</extra-tab-item>
      <extra-tab-item name="Отправленные" icon="ti ti-settings" badge="5">Отправленные сообщения</extra-tab-item>
      <extra-tab-item name="Архив" icon="ti ti-bell" badge="2">Архивные записи</extra-tab-item>
    </extra-tabs>
  `
})
export class TabsWithBadgeComponent {}

export const WithBadge: StoryObj = {
  render: () => ({
    template: `<app-tabs-with-badge></app-tabs-with-badge>`
  }),
  parameters: {
    docs: {
      description: { story: 'Вкладки с бейджами — `badge`/`badgeSeverity` на `extra-tab-item`.' },
      source: {
        language: 'ts',
        code: `
import { ExtraTabsComponent, ExtraTabItemComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tabs-with-badge',
  standalone: true,
  imports: [ExtraTabsComponent, ExtraTabItemComponent],
  template: \`
    <extra-tabs>
      <extra-tab-item name="Входящие" badge="99+" badgeSeverity="danger">Список входящих</extra-tab-item>
      <extra-tab-item name="Отправленные" badge="5">Отправленные сообщения</extra-tab-item>
      <extra-tab-item name="Архив" badge="2">Архивные записи</extra-tab-item>
    </extra-tabs>
  \`,
})
export class TabsWithBadgeComponent {}
        `
      }
    }
  }
};
