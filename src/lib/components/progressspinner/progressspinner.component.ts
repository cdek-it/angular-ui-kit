import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

export type ExtraProgressSpinnerSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraProgressSpinnerFill = 'primary' | 'white';

@Component({
  selector: 'extra-progressspinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressSpinner],
  template: `
    <p-progressSpinner
      [styleClass]="primeStyleClass"
      [strokeWidth]="strokeWidth"
      [fill]="circleFill"
      [animationDuration]="animationDuration"
      [ariaLabel]="ariaLabel"
    ></p-progressSpinner>
  `
})
export class ExtraProgressSpinnerComponent {
  @Input() size: ExtraProgressSpinnerSize = 'base';
  @Input() fill: ExtraProgressSpinnerFill = 'primary';
  @Input() strokeWidth = '2';
  @Input() circleFill = 'none';
  @Input() animationDuration = '2s';
  @Input() ariaLabel: string | undefined = undefined;

  get primeStyleClass(): string {
    const sizeClass = `p-progressspinner-${this.size}`;
    const colorClass = this.fill === 'white' ? 'p-progressspinner-monochrome' : '';
    return `${sizeClass} ${colorClass}`.trim();
  }
}
