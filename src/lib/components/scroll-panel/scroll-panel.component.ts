import { Component, Input } from '@angular/core';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'extra-scroll-panel',
  host: { style: 'display: block' },
  standalone: true,
  imports: [ScrollPanel],
  template: `
    <p-scrollpanel
      [step]="step"
      [style]="{ width: width, height: height }"
    >
      <ng-content></ng-content>
    </p-scrollpanel>
  `,
})
export class ExtraScrollPanelComponent {
  @Input() step = 10;
  @Input() height = '100px';
  @Input() width = '100%';
}
