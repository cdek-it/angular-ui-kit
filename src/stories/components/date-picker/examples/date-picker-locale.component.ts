import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PrimeNG } from 'primeng/config';
import type { Translation } from 'primeng/api';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDatePickerComponent } from '../../../../lib/components/date-picker/date-picker.component';
import { RU_TRANSLATION } from '../../../../lib/providers/prime-preset/locale/ru';

const EN_TRANSLATION: Partial<Translation> = {
  today: 'Today',
  clear: 'Clear',
  chooseDate: 'Choose Date',
  prevMonth: 'Previous Month',
  nextMonth: 'Next Month',
  firstDayOfWeek: 0,
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

const template = `
<div class="flex flex-col items-start gap-4">
  <div class="flex gap-2">
    <extra-button label="English" [variant]="lang === 'en' ? 'primary' : 'secondary'" (click)="setLang('en')"></extra-button>
    <extra-button label="Русский" [variant]="lang === 'ru' ? 'primary' : 'secondary'" (click)="setLang('ru')"></extra-button>
  </div>
  <extra-date-picker
    [formControl]="dateControl"
    [inline]="true"
    [showTime]="true"
    [showButtonBar]="true"
    [hourLabel]="lang === 'en' ? 'Hours' : 'Часы'"
    [minuteLabel]="lang === 'en' ? 'Minutes' : 'Минуты'"
  ></extra-date-picker>
</div>
`;

@Component({
  selector: 'app-date-picker-locale',
  standalone: true,
  imports: [ExtraDatePickerComponent, ExtraButtonComponent, ReactiveFormsModule],
  template
})
export class DatePickerLocaleComponent {
  private readonly primeng = inject(PrimeNG);

  dateControl = new FormControl<Date | null>(null);
  lang: 'en' | 'ru' = 'en';

  constructor() {
    this.primeng.setTranslation(EN_TRANSLATION);
  }

  setLang(lang: 'en' | 'ru'): void {
    this.lang = lang;
    this.primeng.setTranslation(lang === 'en' ? EN_TRANSLATION : RU_TRANSLATION);
  }
}
