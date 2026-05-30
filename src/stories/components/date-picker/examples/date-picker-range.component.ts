import { Component } from '@angular/core';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [value]="dates"
  (valueChange)="dates = $event"
  selectionMode="range"
  placeholder="Период доставки"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-range',
  standalone: true,
  imports: [ExtraDatePickerComponent],
  template,
})
export class DatePickerRangeComponent {
  dates: Date[] | null = null;
}
