import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [formControl]="dateControl"
  [showTime]="true"
  placeholder="Дата и время отправки"
></extra-date-picker>
<p style="margin-top:8px;font-size:13px;color:#666">Значение: {{ dateControl.value ?? 'не выбрано' }}</p>
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
