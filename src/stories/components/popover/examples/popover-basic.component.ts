import { Component, ViewChild } from '@angular/core';
import { ExtraPopoverComponent } from '../../../../lib/components/popover/popover.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="min-h-[200px]">
  <div class="relative inline-block">
    <extra-button label="Показать" (click)="popover.toggle($event)"></extra-button>
    <extra-popover #popover>
      <p>Содержимое popover.</p>
    </extra-popover>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-popover-basic',
  standalone: true,
  imports: [ExtraPopoverComponent, ExtraButtonComponent],
  template,
  styles,
})
export class PopoverBasicComponent {
  @ViewChild('popover') popover!: ExtraPopoverComponent;
}
