import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExtraTabsComponent } from '../../../../lib/components/tabs/tabs.component';
import { ExtraTabItemComponent } from '../../../../lib/components/tabs/tab-item.component';

@Component({
  selector: 'app-tabs-default',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraTabsComponent, ExtraTabItemComponent],
  template: `
    <extra-tabs [scrollable]="scrollable" [lazy]="lazy">
      <extra-tab-item name="Профиль" icon="ti ti-user">Данные профиля</extra-tab-item>
      <extra-tab-item name="Настройки" icon="ti ti-settings">Параметры аккаунта</extra-tab-item>
      <extra-tab-item name="Уведомления" icon="ti ti-bell">Настройки уведомлений</extra-tab-item>
    </extra-tabs>
  `
})
export class TabsDefaultComponent {
  @Input() scrollable = false;
  @Input() lazy = false;
}
