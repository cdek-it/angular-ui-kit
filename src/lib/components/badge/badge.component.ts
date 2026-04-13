import { Component, Input } from '@angular/core';
import { Badge } from 'primeng/badge';

export type BadgeSeverity = 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type BadgeSize = 'base' | 'large' | 'xlarge';

type PrimeBadgeSeverity = ReturnType<Badge['severity']>;
type PrimeBadgeSize = ReturnType<Badge['size']>;

@Component({
  selector: 'badge',
  standalone: true,
  imports: [Badge],
  template: `
    <p-badge
      [value]="value"
      [severity]="primeSeverity"
      [size]="primeSize"
    ></p-badge>
  `
})
export class BadgeComponent {
  @Input() value: string | number = '';
  @Input() severity: BadgeSeverity = 'primary';
  @Input() size: BadgeSize = 'base';

  get primeSeverity(): PrimeBadgeSeverity {
    if (this.severity === 'primary') return null;
    if (this.severity === 'warning') return 'warn';
    return this.severity as Exclude<PrimeBadgeSeverity, null>;
  }

  get primeSize(): PrimeBadgeSize {
    if (this.size === 'base') return null;
    return this.size as PrimeBadgeSize;
  }
}
