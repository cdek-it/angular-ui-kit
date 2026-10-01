import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Badge } from 'primeng/badge';

export type ExtraBadgeSeverity = 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type ExtraBadgeSize = 'base' | 'large' | 'xlarge';

type PrimeBadgeSeverity = ReturnType<Badge['severity']>;
type PrimeBadgeSize = ReturnType<Badge['size']>;

@Component({
  selector: 'extra-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Badge],
  template: ` <p-badge [value]="badgeValue" [severity]="primeSeverity" [size]="primeSize"></p-badge> `
})
export class ExtraBadgeComponent {
  @Input() value: string | number = '';
  @Input() dot = false;
  @Input() severity: ExtraBadgeSeverity = 'primary';
  @Input() size: ExtraBadgeSize = 'base';

  get badgeValue(): string | number | undefined {
    return this.dot ? undefined : this.value || undefined;
  }

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
