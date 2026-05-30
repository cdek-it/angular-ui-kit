import { Component } from '@angular/core';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [value]="date"
  (valueChange)="date = $event"
  [showButtonBar]="true"
  placeholder="Дата отгрузки"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-button-bar',
  standalone: true,
  imports: [ExtraDatePickerComponent],
  template,
})
export class DatePickerButtonBarComponent {
  date: Date | null = null;
}
