import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PanelMenu } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'panelmenu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelMenu],
  template: `
    <p-panelmenu
      [model]="model"
      [multiple]="multiple"
      [tabindex]="tabindex"
    ></p-panelmenu>
  `,
})
export class PanelMenuComponent {
  @Input() model: MenuItem[] = [];
  @Input() multiple = false;
  @Input() tabindex: number | undefined = undefined;
}
