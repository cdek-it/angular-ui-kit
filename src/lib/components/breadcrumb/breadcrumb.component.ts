import { Component, Input } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'extra-breadcrumb',
  standalone: true,
  imports: [Breadcrumb],
  template: `
    <p-breadcrumb
      [model]="model"
      [home]="home"
    ></p-breadcrumb>
  `,
})
export class ExtraBreadcrumbComponent {
  @Input() model: MenuItem[] = [];
  @Input() home: MenuItem | undefined = undefined;
}
