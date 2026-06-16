import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Button, ButtonSeverity as PrimeButtonSeverity } from 'primeng/button';

export type ExtraButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'link';
export type ExtraButtonSeverity = 'success' | 'warning' | 'danger' | 'info' | null;
export type ExtraButtonSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraButtonIconPosition = 'prefix' | 'postfix' | null;
export type ExtraBadgeSeverity = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null;
type PrimeBadgeSeverity = Extract<Button['badgeSeverity'], string | null>;
type ExtraButtonSeverityValue = PrimeButtonSeverity;
type ExtraBadgeSeverityValue = PrimeBadgeSeverity;

@Component({
  selector: 'extra-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `
    <p-button
      [label]="iconOnly ? '' : label"
      [disabled]="disabled"
      [loading]="loading"
      [size]="primeSize"
      [styleClass]="size === 'xlarge' ? 'p-button-xlg' : ''"
      [rounded]="rounded"
      [outlined]="variant === 'tertiary'"
      [text]="variant === 'text' || text"
      [link]="variant === 'link'"
      [icon]="icon"
      [iconPos]="primeIconPosition"
      [severity]="primeSeverity"
      [badge]="showBadge ? badge || ' ' : undefined"
      [badgeSeverity]="primeBadgeSeverity"
      [fluid]="fluid"
      [ariaLabel]="ariaLabel"
      [autofocus]="autofocus"
      [tabindex]="tabindex"
    ></p-button>
  `
})
export class ExtraButtonComponent {
  @Input() label = 'Button';
  @Input() variant: ExtraButtonVariant = 'primary';
  @Input() severity: ExtraButtonSeverity = null;
  @Input() size: ExtraButtonSize = 'base';
  @Input() rounded = false;
  @Input() iconPosition: ExtraButtonIconPosition = null;
  @Input() iconOnly = false;
  @Input() icon = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() badge = '';
  @Input() badgeSeverity: ExtraBadgeSeverity = null;
  @Input() showBadge = false;
  @Input() fluid = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() autofocus = false;
  @Input() tabindex: number | undefined = undefined;
  @Input() text = false;

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get primeIconPosition(): 'left' | 'right' {
    return this.iconPosition === 'postfix' ? 'right' : 'left';
  }

  get primeSeverity(): ExtraButtonSeverityValue | null {
    if (this.variant === 'secondary') return 'secondary';
    if (this.severity === 'warning') return 'warn';
    return this.severity;
  }

  get primeBadgeSeverity(): ExtraBadgeSeverityValue {
    if (this.badgeSeverity === 'warning') return 'warn';
    return this.badgeSeverity;
  }
}
