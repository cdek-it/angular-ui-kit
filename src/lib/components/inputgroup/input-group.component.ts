import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { InputGroup } from 'primeng/inputgroup';

export type ExtraInputGroupSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraInputGroupAddonPosition = 'left' | 'right' | 'both';

@Component({
  selector: 'extra-input-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputGroup, NgClass],
  template: `
    <p-inputgroup [ngClass]="groupClass">
      <ng-content></ng-content>
    </p-inputgroup>
  `
})
export class ExtraInputGroupComponent {
  @Input() size: ExtraInputGroupSize = 'base';
  @Input() addonPosition: ExtraInputGroupAddonPosition = 'left';

  get groupClass(): Record<string, boolean> {
    return {
      'p-inputgroup-xlg': this.size === 'xlarge',
      [`extra-input-group--addon-${this.addonPosition}`]: true
    };
  }
}
