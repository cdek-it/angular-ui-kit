import { Component } from '@angular/core';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
  selector: 'extra-input-group-addon',
  standalone: true,
  imports: [InputGroupAddon],
  template: `
    <p-inputgroup-addon>
      <ng-content></ng-content>
    </p-inputgroup-addon>
  `
})
export class ExtraInputGroupAddonComponent {}
