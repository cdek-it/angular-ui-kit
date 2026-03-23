import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';

/**
 * как использовать
 * ```
 * <app-button size="xlarge">
 *   <div>content</div> // это то, на что заменится <ng-content></ng-content> внутри компонента
 *   </app-button>
 *```
 */

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [Button],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() size!: 'small' | undefined | 'large' | 'xlarge';

  @Input() text: boolean = false;

  get innerSize(): 'small' | undefined | 'large' {
    return (this.size === 'xlarge' || !this.size) ? undefined : (this.size as 'small' | 'large');
  }
}
