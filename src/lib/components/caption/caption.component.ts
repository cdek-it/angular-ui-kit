import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type ExtraCaptionSeverity = 'base' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'extra-caption',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'extra-caption',
    '[attr.data-severity]': 'severity'
  },
  styleUrl: './caption.component.css',
  template: `
    <i class="extra-caption-icon ti" [class]="icon" aria-hidden="true"></i>
    <span class="extra-caption-text"><ng-content /></span>
  `
})
export class ExtraCaptionComponent {
  /** Вариант подписи — соответствует Figma-свойству `variant` у `_<Caption>`. */
  @Input() severity: ExtraCaptionSeverity = 'base';

  get icon(): string {
    return CAPTION_ICONS[this.severity] ?? CAPTION_ICONS.base;
  }
}

const CAPTION_ICONS: Record<ExtraCaptionSeverity, string> = {
  base: 'ti-alert-circle',
  info: 'ti-info-circle',
  success: 'ti-circle-check',
  warning: 'ti-alert-triangle',
  danger: 'ti-circle-x'
};
