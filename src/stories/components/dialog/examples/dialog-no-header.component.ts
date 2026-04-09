import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

@Component({
  selector: 'app-dialog-no-header',
  standalone: true,
  imports: [DialogComponent, Button],
  template: `
    <p-button (onClick)="visible = true" label="Open Dialog"></p-button>

    <dialog
      [showHeader]="false"
      [dismissableMask]="true"
      [visible]="visible"
      (visibleChange)="visible = $event"
      [focusOnShow]="false"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <ng-template #dialogFooter>
        <div style="display: flex; justify-content: flex-end; width: 100%">
          <p-button label="Закрыть" (onClick)="visible = false"></p-button>
        </div>
      </ng-template>
    </dialog>
  `,
})
export class DialogNoHeaderComponent {
  visible = false;
}
