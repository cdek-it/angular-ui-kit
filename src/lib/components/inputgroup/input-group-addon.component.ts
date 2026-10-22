import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

export type ExtraInputGroupPosition = 'left' | 'right';
export type ExtraInputGroupAddonType = 'text' | 'icon';

@Component({
  selector: 'extra-input-group-addon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputGroupAddon],
  template: `
    <p-inputgroup-addon [class]="'extra-input-group-addon--' + position">
      @if (type === 'icon') {
        <i [class]="icon"></i>
      } @else {
        <ng-content></ng-content>
      }
    </p-inputgroup-addon>
  `
})
export class ExtraInputGroupAddonComponent {
  @Input() position: ExtraInputGroupPosition = 'left';
  @Input() type: ExtraInputGroupAddonType = 'text';
  @Input() icon: string | undefined = undefined;
}
