import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Divider } from 'primeng/divider';

export type DividerLayout = 'horizontal' | 'vertical';
export type DividerType = 'solid' | 'dashed' | 'dotted';
export type DividerAlign = 'left' | 'center' | 'right' | 'top' | 'bottom';

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
  @Input() layout: DividerLayout = 'horizontal';
  @Input() type: DividerType = 'solid';
  @Input() align: DividerAlign = 'center';
}
