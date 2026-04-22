import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { PrimeTemplate } from 'primeng/api';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';

const MONTHS = [
  { name: 'Январь', value: 0 },
  { name: 'Февраль', value: 1 },
  { name: 'Март', value: 2 },
  { name: 'Апрель', value: 3 },
  { name: 'Май', value: 4 },
  { name: 'Июнь', value: 5 },
  { name: 'Июль', value: 6 },
  { name: 'Август', value: 7 },
  { name: 'Сентябрь', value: 8 },
  { name: 'Октябрь', value: 9 },
  { name: 'Ноябрь', value: 10 },
  { name: 'Декабрь', value: 11 },
];

const YEARS = (() => {
  const result = [];
  for (let y = 1990; y <= 2035; y++) {
    result.push({ name: String(y), value: y });
  }
  return result;
})();

export type DatePickerSize = 'small' | 'medium' | 'large' | 'xlarge';
export type DatePickerSelectionMode = 'single' | 'multiple' | 'range';
export type DatePickerIconDisplay = 'input' | 'button';

@Component({
  selector: 'date-picker',
  host: { style: 'display: inline-flex' },
  standalone: true,
  imports: [DatePicker, InputNumber, PrimeTemplate, FormsModule, Select, Button],
  template: `
    <p-datepicker
      #dpRef
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
      [dateFormat]="dateFormat"
      [selectionMode]="selectionMode"
      [showIcon]="showIcon"
      [iconDisplay]="iconDisplay"
      [inline]="inline"
      [showButtonBar]="showButtonBar"
      [showTime]="false"
      [showClear]="showClear"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [readonlyInput]="readonly"
      [invalid]="invalid"
      [size]="primeSize"
      [inputStyleClass]="size === 'xlarge' ? 'p-inputtext-xlg' : ''"
      [panelStyle]="{ minWidth: 'fit-content' }"
      [appendTo]="inline ? undefined : 'body'"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [view]="view"
      [showOtherMonths]="showOtherMonths"
      [selectOtherMonths]="selectOtherMonths"
      (onShow)="syncCurrentDate()"
      (onMonthChange)="onMonthChangeHandler($event)"
      (onYearChange)="onYearChangeHandler($event)"
      (onSelect)="onSelect.emit($event)"
      (onClear)="onClear.emit($event)"
    >
      <ng-template pTemplate="header">
        <div class="p-datepicker-header p-datepicker-custom-header">
          <p-button
            severity="secondary"
            [rounded]="true"
            [text]="true"
            (onClick)="navPrev($event)"
          >
            <ng-template pTemplate="icon">
              <i class="ti ti-chevron-left" aria-hidden="true"></i>
            </ng-template>
          </p-button>
          <div class="p-datepicker-title">
            <p-select
              appendTo="body"
              [options]="months"
              optionLabel="name"
              optionValue="value"
              [ngModel]="dpCurrentMonth"
              (ngModelChange)="onMonthSelect($event)"
              class="p-datepicker-month-select"
            ></p-select>
            <p-select
              appendTo="body"
              [options]="years"
              optionLabel="name"
              optionValue="value"
              [ngModel]="dpCurrentYear"
              (ngModelChange)="onYearSelect($event)"
              class="p-datepicker-year-select"
            ></p-select>
          </div>
          <p-button
            severity="secondary"
            [rounded]="true"
            [text]="true"
            (onClick)="navNext($event)"
          >
            <ng-template pTemplate="icon">
              <i class="ti ti-chevron-right" aria-hidden="true"></i>
            </ng-template>
          </p-button>
        </div>
      </ng-template>

      <ng-template pTemplate="inputicon" let-clickCallBack="clickCallBack">
        <i class="ti ti-calendar-month p-datepicker-input-icon cursor-pointer" (click)="clickCallBack($event)"></i>
      </ng-template>
      <ng-template pTemplate="triggericon">
        <i class="ti ti-calendar-month"></i>
      </ng-template>
      @if (showClear) {
        <ng-template pTemplate="clearicon">
          <i class="ti ti-x"></i>
        </ng-template>
      }
      @if (showTime) {
        <ng-template pTemplate="footer">
          <div class="p-datepicker-time-picker p-datepicker-time-picker-custom">
            <p-inputNumber
              [ngModel]="timeHour"
              (ngModelChange)="onHourChange($event)"
              [min]="0"
              [max]="23"
              [format]="false"
              inputStyleClass="p-datepicker-time-input"
            ></p-inputNumber>
            <div class="p-datepicker-separator">
              <span>:</span>
            </div>
            <p-inputNumber
              [ngModel]="timeMinute"
              (ngModelChange)="onMinuteChange($event)"
              [min]="0"
              [max]="59"
              [format]="false"
              inputStyleClass="p-datepicker-time-input"
            ></p-inputNumber>
          </div>
        </ng-template>
      }
    </p-datepicker>
  `,
})
export class DatePickerComponent implements AfterViewInit {
  @ViewChild('dpRef') dpRef!: DatePicker;

  readonly months = MONTHS;
  readonly years = YEARS;

  dpCurrentMonth = new Date().getMonth();
  dpCurrentYear = new Date().getFullYear();

  @Input() value: Date | Date[] | null = null;
  @Output() valueChange = new EventEmitter<Date | Date[] | null>();

  @Input() dateFormat = 'dd.mm.yy';
  @Input() selectionMode: DatePickerSelectionMode = 'single';
  @Input() size: DatePickerSize = 'medium';
  @Input() showIcon = true;
  @Input() iconDisplay: DatePickerIconDisplay = 'input';
  @Input() inline = false;
  @Input() showButtonBar = false;
  @Input() showTime = false;
  @Input() hourFormat = '24';
  @Input() showClear = false;
  @Input() placeholder: string | undefined = undefined;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input() minDate: Date | undefined = undefined;
  @Input() maxDate: Date | undefined = undefined;
  @Input() view: 'date' | 'month' | 'year' = 'date';
  @Input() showOtherMonths = true;
  @Input() selectOtherMonths = false;

  @Output() onSelect = new EventEmitter<Date>();
  @Output() onMonthChange = new EventEmitter<any>();
  @Output() onYearChange = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<any>();

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  ngAfterViewInit(): void {
    // Sync initial month/year for inline mode (panel renders immediately)
    if (this.inline) {
      this.syncCurrentDate();
    }
  }

  syncCurrentDate(): void {
    if (this.dpRef) {
      this.dpCurrentMonth = this.dpRef.currentMonth;
      this.dpCurrentYear = this.dpRef.currentYear;
    }
  }

  onMonthChangeHandler(event: { month: number; year: number }): void {
    // DatePicker emits 1-indexed month; store as 0-indexed
    this.dpCurrentMonth = event.month - 1;
    this.dpCurrentYear = event.year;
    this.onMonthChange.emit(event);
  }

  onYearChangeHandler(event: { month: number; year: number }): void {
    this.dpCurrentMonth = event.month - 1;
    this.dpCurrentYear = event.year;
    this.onYearChange.emit(event);
  }

  onMonthSelect(month: number): void {
    this.dpCurrentMonth = month;
    this.dpRef?.createMonths(month, this.dpCurrentYear);
  }

  onYearSelect(year: number): void {
    this.dpCurrentYear = year;
    this.dpRef?.createMonths(this.dpCurrentMonth, year);
  }

  navPrev(event: MouseEvent): void {
    this.dpRef?.navBackward(event);
  }

  navNext(event: MouseEvent): void {
    this.dpRef?.navForward(event);
  }

  onValueChange(val: Date | Date[] | null): void {
    this.value = val;
    this.syncTimeFromValue();
    this.valueChange.emit(val);
  }

  timeHour = 0;
  timeMinute = 0;

  private syncTimeFromValue(): void {
    const date = this.getActiveDate();
    if (date) {
      this.timeHour = date.getHours();
      this.timeMinute = date.getMinutes();
    }
  }

  private getActiveDate(): Date | null {
    if (!this.value) return null;
    if (Array.isArray(this.value)) {
      return this.value[this.value.length - 1] ?? this.value[0] ?? null;
    }
    return this.value;
  }

  onHourChange(hour: number): void {
    this.timeHour = hour ?? 0;
    this.applyTimeToValue();
  }

  onMinuteChange(minute: number): void {
    this.timeMinute = minute ?? 0;
    this.applyTimeToValue();
  }

  private applyTimeToValue(): void {
    const date = this.getActiveDate();
    if (!date) return;
    const updated = new Date(date.getTime());
    updated.setHours(this.timeHour);
    updated.setMinutes(this.timeMinute);

    if (Array.isArray(this.value)) {
      if (this.selectionMode === 'range') {
        this.value = this.value[1]
          ? [this.value[0], updated]
          : [updated, null] as any;
      } else {
        this.value = [...this.value.slice(0, -1), updated];
      }
    } else {
      this.value = updated;
    }
    this.valueChange.emit(this.value);
  }
}
