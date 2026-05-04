import { Component, Input } from '@angular/core';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'scroll-panel',
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
export class ScrollPanelComponent {
  @Input() step = 10;
  @Input() height = '100px';
  @Input() width = '100%';
}
