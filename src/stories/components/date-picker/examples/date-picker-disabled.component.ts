import { Component } from '@angular/core';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [value]="date"
  (valueChange)="date = $event"
  [disabled]="true"
  placeholder="Дата заблокирована"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-disabled',
  standalone: true,
  imports: [ExtraDatePickerComponent],
  template,
})
export class DatePickerDisabledComponent {
  date: Date | null = null;
}
