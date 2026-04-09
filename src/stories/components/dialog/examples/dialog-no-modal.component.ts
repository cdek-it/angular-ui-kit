import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

@Component({
  selector: 'app-dialog-no-modal',
  standalone: true,
  imports: [DialogComponent, Button],
  template: `
    <p-button (onClick)="visible = true" label="Open Dialog"></p-button>

    <dialog
      header="No Modal Dialog"
      [modal]="false"
      [visible]="visible"
      (visibleChange)="visible = $event"
      [focusOnShow]="false"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <ng-template #dialogFooter>
        <p-button variant="text" label="Отмена" (onClick)="visible = false"></p-button>
        <p-button label="Сохранить" (onClick)="visible = false"></p-button>
      </ng-template>
    </dialog>
  `,
})
export class DialogNoModalComponent {
  visible = false;
}
