import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { Button, ButtonSeverity as PrimeButtonSeverity } from 'primeng/button';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'link';
export type ButtonSeverity = 'success' | 'warning' | 'danger' | 'info' | null;
export type ButtonSize = 'small' | 'base' | 'large' | 'xlarge';
export type ButtonIconPos = 'prefix' | 'postfix' | null;
export type BadgeSeverity = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null;
type PrimeBadgeSeverity = Extract<Button['badgeSeverity'], string | null>;

@Component({
  selector: 'button',
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
      [outlined]="variant === 'outlined'"
      [text]="variant === 'text' || text"
      [link]="variant === 'link'"
      [icon]="icon"
      [iconPos]="primeIconPos"
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
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() severity: ButtonSeverity = null;
  @Input() size: ButtonSize = 'base';
  @Input() rounded = false;
  @Input() iconPos: ButtonIconPos = null;
  @Input() iconOnly = false;
  @Input() icon = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() badge = '';
  @Input() badgeSeverity: BadgeSeverity = null;
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

  get primeIconPos(): 'left' | 'right' {
    return this.iconPos === 'postfix' ? 'right' : 'left';
  }

  get primeSeverity(): PrimeButtonSeverity | null {
    if (this.variant === 'secondary') return 'secondary';
    if (this.severity === 'warning') return 'warn';
    return this.severity;
  }

  get primeBadgeSeverity(): PrimeBadgeSeverity {
    if (this.badgeSeverity === 'warning') return 'warn';
    return this.badgeSeverity;
  }
}
