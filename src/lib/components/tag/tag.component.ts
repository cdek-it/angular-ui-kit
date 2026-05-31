import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { Tag } from 'primeng/tag';

export type TagSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger';

@Component({
  selector: 'extra-tag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tag],
  template: `
    <p-tag
      [value]="value"
      [severity]="primeSeverity"
      [rounded]="rounded"
      [icon]="icon || undefined"
    ></p-tag>
  `,
})
export class ExtraTagComponent {
  @Input() value = '';
  @Input() severity: TagSeverity = 'primary';
  @Input() rounded = false;
  @Input() icon = '';

  get primeSeverity(): 'secondary' | 'success' | 'info' | 'warn' | 'danger' | undefined {
    if (this.severity === 'primary') return undefined;
    return this.severity;
  }
}
