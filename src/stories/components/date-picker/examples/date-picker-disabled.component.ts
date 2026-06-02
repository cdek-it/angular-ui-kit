import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [formControl]="dateControl"
  placeholder="Дата заблокирована"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-disabled',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template,
})
export class DatePickerDisabledComponent {
  dateControl = new FormControl<Date | null>({ value: null, disabled: true });
}
