import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ExtraBadgeSeverity } from '@cdek-it/angular-ui-kit/components/badge';

/**
 * Данные и проекция контента одной вкладки. Не рендерит p-tab/p-tabpanel сам — PrimeNG-теги
 * внедряют родителя через DI (pcTabs), поэтому их обязан объявлять ExtraTabsComponent в своём
 * собственном шаблоне (см. CLAUDE.md, «Ловушка: PrimeNG-компонент с DI-зависимостью от родителя
 * внутри слота»). ExtraTabItemComponent — только держатель @Input()'ов и TemplateRef на контент.
 */
@Component({
  selector: 'extra-tab-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `<ng-template #bodyTpl><ng-content /></ng-template>`
})
export class ExtraTabItemComponent {
  @Input({ required: true }) name!: string;
  @Input() icon = '';
  @Input() badge = '';
  @Input() badgeSeverity: ExtraBadgeSeverity = 'primary';
  @Input() disabled = false;

  @ViewChild('bodyTpl', { static: true }) bodyTpl!: TemplateRef<unknown>;
}
