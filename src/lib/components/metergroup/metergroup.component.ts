import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { MeterGroup, MeterItem } from 'primeng/metergroup';

export type MeterGroupOrientation = 'horizontal' | 'vertical';
export type MeterGroupLabelPosition = 'start' | 'end';
export type MeterGroupLabelOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'extra-metergroup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MeterGroup],
  template: `
    <p-metergroup
      [value]="value"
      [orientation]="orientation"
      [labelPosition]="labelPosition"
      [labelOrientation]="labelOrientation"
    ></p-metergroup>
  `
})
export class ExtraMeterGroupComponent {
  @Input() value: MeterItem[] = [];
  @Input() orientation: MeterGroupOrientation = 'horizontal';
  @Input() labelPosition: MeterGroupLabelPosition = 'end';
  @Input() labelOrientation: MeterGroupLabelOrientation = 'horizontal';

  @HostBinding('style.display') get hostDisplay() {
    return this.orientation === 'vertical' ? 'flex' : null;
  }

  @HostBinding('style.height') get hostHeight() {
    return this.orientation === 'vertical' ? '100%' : null;
  }

  @HostBinding('style.flex') get hostFlex() {
    return this.orientation === 'vertical' ? '1 1 0%' : null;
  }
}
