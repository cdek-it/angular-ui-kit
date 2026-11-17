import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTabsComponent } from '../../../../lib/components/tabs/tabs.component';
import { ExtraTabItemComponent } from '../../../../lib/components/tabs/tab-item.component';

@Component({
  selector: 'app-tabs-with-disabled',
  standalone: true,
  imports: [ExtraTabsComponent, ExtraTabItemComponent],
  template: `
    <extra-tabs>
      <extra-tab-item name="Доступно" icon="ti ti-user">Активная вкладка</extra-tab-item>
      <extra-tab-item name="Тоже доступно" icon="ti ti-settings">Обычная вкладка</extra-tab-item>
      <extra-tab-item name="Недоступно" icon="ti ti-bell" [disabled]="true">Эта вкладка отключена</extra-tab-item>
    </extra-tabs>
  `
})
export class TabsWithDisabledComponent {}

export const WithDisabled: StoryObj = {
  render: () => ({
    template: `<app-tabs-with-disabled></app-tabs-with-disabled>`
  }),
  parameters: {
    docs: {
      description: { story: 'Вкладки с заблокированной вкладкой — `[disabled]="true"` на `extra-tab-item`.' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-tabs value="Доступно"></extra-tabs>'
      }
    }
  }
};
