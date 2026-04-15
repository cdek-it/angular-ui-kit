import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'menubar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menubar],
  template: `
    <p-menubar [model]="model"></p-menubar>
  `,
})
export class MenubarComponent {
  @Input() model: MenuItem[] = [];
}
