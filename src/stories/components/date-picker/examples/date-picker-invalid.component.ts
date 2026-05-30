import { Component } from '@angular/core';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [value]="date"
  (valueChange)="date = $event"
  [invalid]="true"
  placeholder="Некорректная дата"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-invalid',
  standalone: true,
  imports: [ExtraDatePickerComponent],
  template,
})
export class DatePickerInvalidComponent {
  date: Date | null = null;
}
