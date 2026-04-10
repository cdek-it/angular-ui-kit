import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<date-picker
  [value]="date"
  (valueChange)="date = $event"
  [invalid]="true"
  placeholder="Некорректная дата"
></date-picker>
`;

@Component({
  selector: 'app-date-picker-invalid',
  standalone: true,
  imports: [DatePickerComponent],
  template,
})
export class DatePickerInvalidComponent {
  date: Date | null = null;
}
