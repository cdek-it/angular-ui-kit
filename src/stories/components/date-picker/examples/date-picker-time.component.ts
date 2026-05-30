import { Component } from '@angular/core';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [value]="date"
  (valueChange)="date = $event"
  [showTime]="true"
  placeholder="Дата и время отправки"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-time',
  standalone: true,
  imports: [ExtraDatePickerComponent],
  template,
})
export class DatePickerTimeComponent {
  date: Date | null = null;
}
