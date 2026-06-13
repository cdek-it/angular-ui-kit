import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Divider } from 'primeng/divider';

export type ExtraDividerLayout = 'horizontal' | 'vertical';
export type ExtraDividerType = 'solid' | 'dashed' | 'dotted';
export type ExtraDividerAlign = 'left' | 'center' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'extra-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Divider],
  template: `
    <p-divider [layout]="layout" [type]="type" [align]="align">
      <ng-content></ng-content>
    </p-divider>
  `
})
export class ExtraDividerComponent {
  @Input() layout: ExtraDividerLayout = 'horizontal';
  @Input() type: ExtraDividerType = 'solid';
  @Input() align: ExtraDividerAlign = 'center';
}
