import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<date-picker
  [value]="date"
  (valueChange)="date = $event"
  placeholder="Выберите дату доставки"
></date-picker>
`;

@Component({
  selector: 'app-date-picker-basic',
  standalone: true,
  imports: [DatePickerComponent],
  template,
})
export class DatePickerBasicComponent {
  date: Date | null = null;
}
