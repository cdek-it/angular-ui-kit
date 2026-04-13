import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../lib/components/breadcrumb/breadcrumb.component';
import { commonHome, iconOnlyItems } from '../breadcrumb.data';

const template = `
<div class="bg-surface-ground">
  <breadcrumb [model]="model" [home]="home"></breadcrumb>
</div>
`;

@Component({
  selector: 'app-breadcrumb-icons-only',
  standalone: true,
  imports: [BreadcrumbComponent],
  template,
})
export class BreadcrumbIconsOnlyComponent {
  home = commonHome;
  model = iconOnlyItems;
}
