import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [formControl]="dateControl"
  [showClear]="true"
  placeholder="Дата с очисткой"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-clear-icon',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template,
})
export class DatePickerClearIconComponent {
  dateControl = new FormControl<Date | null>(null);
}
