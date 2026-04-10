import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<date-picker
  [value]="dates"
  (valueChange)="dates = $event"
  selectionMode="range"
  placeholder="Период доставки"
></date-picker>
`;

@Component({
  selector: 'app-date-picker-range',
  standalone: true,
  imports: [DatePickerComponent],
  template,
})
export class DatePickerRangeComponent {
  dates: Date[] | null = null;
}
