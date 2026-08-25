import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Divider } from 'primeng/divider';

export type ExtraDividerLayout = 'horizontal' | 'vertical';
export type ExtraDividerType = 'solid' | 'dash';
export type ExtraDividerAlign = 'left' | 'center' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'extra-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Divider],
  template: `
    <p-divider [layout]="layout" [type]="primeType" [align]="align">
      <ng-content></ng-content>
    </p-divider>
  `
})
export class ExtraDividerComponent {
  @Input() layout: ExtraDividerLayout = 'horizontal';
  @Input() type: ExtraDividerType = 'solid';
  @Input() align: ExtraDividerAlign = 'center';

  /** Маппинг Figma-значения `dash` на тип линии PrimeNG (`dashed`). */
  get primeType(): 'solid' | 'dashed' {
    return this.type === 'dash' ? 'dashed' : 'solid';
  }
}
