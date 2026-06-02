import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [formControl]="dateControl"
  [showButtonBar]="true"
  placeholder="Дата отгрузки"
></extra-date-picker>
`;

@Component({
  selector: 'app-date-picker-button-bar',
  standalone: true,
  imports: [ExtraDatePickerComponent, ReactiveFormsModule],
  template,
})
export class DatePickerButtonBarComponent {
  dateControl = new FormControl<Date | null>(null);
}
