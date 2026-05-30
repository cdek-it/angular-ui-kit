import { Component } from '@angular/core';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [value]="date"
  (valueChange)="date = $event"
  [showClear]="true"
  placeholder="Дата с очисткой"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-clear-icon',
  standalone: true,
  imports: [ExtraDatePickerComponent],
  template,
})
export class DatePickerClearIconComponent {
  date: Date | null = null;
}
