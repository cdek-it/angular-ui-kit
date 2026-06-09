import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [formControl]="dateControl"
  [showTime]="true"
  placeholder="Дата и время отправки"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-time',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template,
})
export class DatePickerTimeComponent {
  dateControl = new FormControl<Date | null>(null);
}
