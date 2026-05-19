import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // We use Module since PrimeNG 17/18 might export it this way. Wait, earlier we saw ProgressSpinner is standalone? Actually ProgressSpinner in v18 is standalone, but importing it as ProgressSpinner works.
// Let's import the component directly. Wait, index.d.ts exports { ProgressSpinner, ProgressSpinnerModule }. Either is fine. Let's use ProgressSpinner.
import { ProgressSpinner } from 'primeng/progressspinner';

export type ProgressSpinnerSize = 'small' | 'medium' | 'large' | 'xlarge';

@Component({
  selector: 'extra-progressspinner',
  standalone: true,
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
  @Input() size: ProgressSpinnerSize = 'medium';
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
