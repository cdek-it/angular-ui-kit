import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [formControl]="dateControl"
  placeholder="Выберите дату доставки"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-basic',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template,
})
export class DatePickerBasicComponent {
  dateControl = new FormControl<Date | null>(null);
}
