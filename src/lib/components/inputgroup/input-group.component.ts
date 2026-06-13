import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { InputGroup } from 'primeng/inputgroup';

export type ExtraInputGroupSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'extra-input-group',
  standalone: true,
  imports: [InputGroup, NgClass],
  template: `
    <p-inputgroup [ngClass]="sizeClass">
      <ng-content></ng-content>
    </p-inputgroup>
  `
})
export class ExtraInputGroupComponent {
  @Input() size: ExtraInputGroupSize = 'base';

  get sizeClass(): string {
    if (this.size === 'xlarge') return 'p-inputgroup-xlg';
    return '';
  }
}
