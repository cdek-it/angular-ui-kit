import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// Let's import the component directly. Wait, index.d.ts exports { ProgressSpinner, ProgressSpinnerModule }. Either is fine. Let's use ProgressSpinner.
import { ProgressSpinner } from 'primeng/progressspinner';

export type ExtraProgressSpinnerSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'extra-progressspinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressSpinner],
  template: `
    <p-progressSpinner
      [styleClass]="primeStyleClass"
      [strokeWidth]="strokeWidth"
      [fill]="fill"
      [animationDuration]="animationDuration"
      [ariaLabel]="ariaLabel"
    ></p-progressSpinner>
  `
})
export class ExtraProgressSpinnerComponent {
  @Input() size: ExtraProgressSpinnerSize = 'base';
  @Input() multicolor = true;
  @Input() strokeWidth = '2';
  @Input() fill = 'none';
  @Input() animationDuration = '2s';
  @Input() ariaLabel: string | undefined = undefined;

  get primeStyleClass(): string {
    const sizeClass = `p-progressspinner-${this.size}`;
    const colorClass = this.multicolor ? '' : 'p-progressspinner-monochrome';
    return `${sizeClass} ${colorClass}`.trim();
  }
}
