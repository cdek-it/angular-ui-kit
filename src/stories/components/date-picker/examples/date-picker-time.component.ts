import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<date-picker
  [value]="date"
  (valueChange)="date = $event"
  [showTime]="true"
  placeholder="Дата и время отправки"
></date-picker>
`;

@Component({
  selector: 'app-date-picker-time',
  standalone: true,
  imports: [DatePickerComponent],
  template,
})
export class DatePickerTimeComponent {
  date: Date | null = null;
}
