import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { PrimeTemplate } from 'primeng/api';

export type DatePickerSize = 'small' | 'medium' | 'large' | 'xlarge';
export type DatePickerSelectionMode = 'single' | 'multiple' | 'range';
export type DatePickerIconDisplay = 'input' | 'button';

@Component({
  selector: 'date-picker',
  host: { style: 'display: inline-flex' },
  standalone: true,
  imports: [DatePicker, PrimeTemplate, FormsModule],
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
      [showTime]="showTime"
      [hourFormat]="hourFormat"
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
      (onSelect)="onSelect.emit($event)"
      (onMonthChange)="onMonthChange.emit($event)"
      (onYearChange)="onYearChange.emit($event)"
      (onClear)="onClear.emit($event)"
    >
      <ng-template pTemplate="previousicon">
        <i class="ti ti-chevron-left" aria-hidden="true"></i>
      </ng-template>
      <ng-template pTemplate="nexticon">
        <i class="ti ti-chevron-right" aria-hidden="true"></i>
      </ng-template>
      <ng-template pTemplate="inputicon" let-clickCallBack="clickCallBack">
        <i class="ti ti-calendar-month p-datepicker-input-icon cursor-pointer" (click)="clickCallBack($event)"></i>
      </ng-template>
      <ng-template pTemplate="triggericon">
        <i class="ti ti-calendar-month"></i>
      </ng-template>
      @if (showClear) {
        <ng-template pTemplate="clearicon">
          <i class="p-datepicker-clear-icon ti ti-x cursor-pointer"></i>
        </ng-template>
      }
    </p-datepicker>
  `,
})
export class DatePickerComponent {
  @ViewChild('dpRef') dpRef!: DatePicker;

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

  onValueChange(val: Date | Date[] | null): void {
    this.value = val;
    this.valueChange.emit(val);
  }
}
