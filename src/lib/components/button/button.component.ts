import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Button, ButtonSeverity as PrimeButtonSeverity } from 'primeng/button';

export type ExtraButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'text' | 'link';
export type ExtraButtonSeverity = 'base' | 'danger' | 'warning' | 'success' | 'info';
export type ExtraButtonSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraButtonIconPosition = 'left' | 'right';
export type ExtraButtonBadgeSeverity = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null;
type PrimeBadgeSeverity = Extract<Button['badgeSeverity'], string | null>;
type ExtraButtonSeverityValue = PrimeButtonSeverity;
type ExtraButtonBadgeSeverityValue = PrimeBadgeSeverity;

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
      [styleClass]="primeStyleClass"
      [rounded]="rounded"
      [outlined]="variant === 'outlined'"
      [text]="variant === 'text'"
      [link]="variant === 'link'"
      [icon]="icon"
      [iconPos]="iconPosition"
      [severity]="primeSeverity"
      [badge]="showBadge ? badge || ' ' : undefined"
      [badgeSeverity]="primeBadgeSeverity"
      [fluid]="fluid"
      [ariaLabel]="ariaLabel"
      [autofocus]="autofocus"
      [tabindex]="tabindex"
      (onFocus)="focus.emit($event)"
      (onBlur)="blur.emit($event)"
    ></p-button>
  `
})
export class ExtraButtonComponent {
  @Input() label = '';
  @Input() variant: ExtraButtonVariant = 'primary';
  @Input() severity: ExtraButtonSeverity = 'base';
  @Input() size: ExtraButtonSize = 'base';
  @Input() rounded = false;
  @Input() iconPosition: ExtraButtonIconPosition = 'left';
  @Input() iconOnly = false;
  @Input() icon = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() badge = '';
  @Input() badgeSeverity: ExtraButtonBadgeSeverity = null;
  @Input() showBadge = false;
  @Input() fluid = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() autofocus = false;
  @Input() tabindex: number | undefined = undefined;

  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get primeStyleClass(): string {
    return this.size === 'xlarge' ? 'p-button-xlg' : '';
  }

  get primeSeverity(): ExtraButtonSeverityValue | null {
    if (this.severity === 'base') {
      if (this.variant === 'secondary') return 'secondary';
      if (this.variant === 'tertiary' || this.variant === 'outlined') return 'contrast';
      return null;
    }
    return this.severity === 'warning' ? 'warn' : this.severity;
  }

  get primeBadgeSeverity(): ExtraButtonBadgeSeverityValue {
    if (this.badgeSeverity === 'warning') return 'warn';
    return this.badgeSeverity;
  }
}
