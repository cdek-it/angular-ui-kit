import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<date-picker
  [value]="date"
  (valueChange)="date = $event"
  [showButtonBar]="true"
  placeholder="Дата отгрузки"
></date-picker>
`;

@Component({
  selector: 'app-date-picker-button-bar',
  standalone: true,
  imports: [DatePickerComponent],
  template,
})
export class DatePickerButtonBarComponent {
  date: Date | null = null;
}
