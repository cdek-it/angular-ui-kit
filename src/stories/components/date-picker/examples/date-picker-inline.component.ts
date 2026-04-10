import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<date-picker
  [value]="date"
  (valueChange)="date = $event"
  [inline]="true"
></date-picker>
`;

@Component({
  selector: 'app-date-picker-inline',
  standalone: true,
  imports: [DatePickerComponent],
  template,
})
export class DatePickerInlineComponent {
  date: Date | null = null;
}
