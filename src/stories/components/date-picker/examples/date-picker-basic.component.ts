import { Component } from '@angular/core';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [value]="date"
  (valueChange)="date = $event"
  placeholder="Выберите дату доставки"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-basic',
  standalone: true,
  imports: [ExtraDatePickerComponent],
  template,
})
export class DatePickerBasicComponent {
  date: Date | null = null;
}
