import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Button, ButtonSeverity as PrimeButtonSeverity } from 'primeng/button';

export type ExtraButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'link';
export type ExtraButtonSeverity = 'base' | 'danger' | 'warning' | 'success' | 'info';
export type ExtraButtonSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraButtonIconPosition = 'left' | 'right';

@Component({
  selector: 'extra-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `
    <p-button
      [label]="label"
      [icon]="icon"
      [iconPos]="iconPosition"
      [severity]="primeSeverity"
      [size]="primeSize"
      [styleClass]="primeStyleClass"
      [rounded]="rounded"
      [fluid]="fluid"
      [text]="variant === 'text'"
      [link]="variant === 'link'"
      [disabled]="disabled"
      [loading]="loading"
      (onFocus)="focus.emit($event)"
      (onBlur)="blur.emit($event)"
    ></p-button>
  `
})
export class ExtraButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() iconPosition: ExtraButtonIconPosition = 'left';
  @Input() variant: ExtraButtonVariant = 'primary';
  @Input() severity: ExtraButtonSeverity = 'base';
  @Input() size: ExtraButtonSize = 'base';
  @Input() rounded = false;
  @Input() fluid = false;
  @Input() disabled = false;
  @Input() loading = false;

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

  get primeSeverity(): PrimeButtonSeverity {
    if (this.severity === 'base') {
      if (this.variant === 'secondary') return 'secondary';
      if (this.variant === 'tertiary') return 'contrast';
      return null;
    }
    return this.severity === 'warning' ? 'warn' : this.severity;
  }
}
