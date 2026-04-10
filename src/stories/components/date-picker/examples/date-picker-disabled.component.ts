import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<date-picker
  [value]="date"
  (valueChange)="date = $event"
  [disabled]="true"
  placeholder="Дата заблокирована"
></date-picker>
`;

@Component({
  selector: 'app-date-picker-disabled',
  standalone: true,
  imports: [DatePickerComponent],
  template,
})
export class DatePickerDisabledComponent {
  date: Date | null = null;
}
