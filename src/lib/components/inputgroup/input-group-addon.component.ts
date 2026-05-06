import { Component } from '@angular/core';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
  selector: 'input-group-addon',
  standalone: true,
  imports: [InputGroupAddon],
  template: `
    <p-inputgroup-addon>
      <ng-content></ng-content>
    </p-inputgroup-addon>
  `,
})
export class InputGroupAddonComponent {}
