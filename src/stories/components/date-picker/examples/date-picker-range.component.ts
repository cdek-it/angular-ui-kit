import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [formControl]="datesControl"
  selectionMode="range"
  placeholder="Период доставки"
></extra-date-picker>
<p style="margin-top:8px;font-size:13px;color:#666">Значение: {{ datesControl.value ?? 'не выбрано' }}</p>
`;

@Component({
  selector: 'app-date-picker-range',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template,
})
export class DatePickerRangeComponent {
  datesControl = new FormControl<Date[] | null>(null);
}
