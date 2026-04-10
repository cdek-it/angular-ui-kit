import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<date-picker
  [value]="date"
  (valueChange)="date = $event"
  [showClear]="true"
  placeholder="Дата с очисткой"
></date-picker>
`;

@Component({
  selector: 'app-date-picker-clear-icon',
  standalone: true,
  imports: [DatePickerComponent],
  template,
})
export class DatePickerClearIconComponent {
  date: Date | null = null;
}
