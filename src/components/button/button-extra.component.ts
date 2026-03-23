import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';

export type ExtraButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'link';
export type ExtraButtonSeverity = 'success' | 'warning' | 'danger' | 'info' | null;
export type ExtraButtonSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraButtonIconPos = 'prefix' | 'postfix' | null;

@Component({
  selector: 'extra-button',
  standalone: true,
  imports: [Button],
  styleUrl: './button.component.scss',
  template: `
    <p-button
      [label]="iconOnly ? '' : label"
      [disabled]="disabled"
      [loading]="loading"
      [size]="primeSize"
      [styleClass]="size === 'xlarge' ? 'p-button-xlg' : ''"
      [rounded]="rounded"
      [outlined]="variant === 'outlined'"
      [text]="variant === 'text'"
      [link]="variant === 'link'"
      [icon]="icon"
      [iconPos]="primeIconPos"
      [severity]="primeSeverity"
    ></p-button>
  `
})
export class ExtraButtonComponent {
  @Input() label = 'Button';
  @Input() variant: ExtraButtonVariant = 'primary';
  @Input() severity: ExtraButtonSeverity = null;
  @Input() size: ExtraButtonSize = 'base';
  @Input() rounded = false;
  @Input() iconPos: ExtraButtonIconPos = null;
  @Input() iconOnly = false;
  @Input() icon = '';
  @Input() disabled = false;
  @Input() loading = false;

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get primeIconPos(): 'left' | 'right' {
    return this.iconPos === 'postfix' ? 'right' : 'left';
  }

  get primeSeverity(): string | null {
    if (this.variant === 'secondary') return 'secondary';
    if (this.severity === 'warning') return 'warn';
    return this.severity;
  }
}
