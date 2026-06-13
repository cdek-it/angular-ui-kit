import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ExtraMenuItem } from '../../shared';

@Component({
  selector: 'extra-breadcrumb',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Breadcrumb],
  template: ` <p-breadcrumb [model]="model" [home]="home"></p-breadcrumb> `
})
export class ExtraBreadcrumbComponent {
  @Input() model: ExtraMenuItem[] = [];
  @Input() home: ExtraMenuItem | undefined = undefined;
}
