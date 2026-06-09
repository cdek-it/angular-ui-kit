import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';

const template = `
<extra-date-picker
  [formControl]="datesControl"
  selectionMode="range"
  placeholder="Период доставки"
></extra-date-picker>
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
