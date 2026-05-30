import { Component } from '@angular/core';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [value]="date"
  (valueChange)="date = $event"
  [inline]="true"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-inline',
  standalone: true,
  imports: [ExtraDatePickerComponent],
  template,
})
export class DatePickerInlineComponent {
  date: Date | null = null;
}
