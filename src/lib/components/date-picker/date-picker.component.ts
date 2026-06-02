import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePicker, DatePickerMonthChangeEvent } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
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
  selector: 'extra-date-picker',
  host: { style: 'display: inline-flex' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraDatePickerComponent),
      multi: true
    }
  ],
  imports: [DatePicker, InputText, PrimeTemplate, FormsModule, Select, Button],
  template: `
    <p-datepicker
      #dpRef
      [ngModel]="modelValue"
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
      [hideOnDateTimeSelect]="false"
      [showOtherMonths]="showOtherMonths"
      [selectOtherMonths]="selectOtherMonths"
      (onShow)="onPanelShow()"
      (onClose)="onPanelClose()"
      (onMonthChange)="onMonthChangeHandler($event)"
      (onYearChange)="onYearChangeHandler($event)"
      (onSelect)="onDateSelected($event)"
      (onClear)="onClear.emit($event)"
    >
      <ng-template pTemplate="header">
        <div class="p-datepicker-header p-datepicker-custom-header">
          <p-button severity="secondary" [rounded]="true" [text]="true" (onClick)="navPrev($event)">
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
          <p-button severity="secondary" [rounded]="true" [text]="true" (onClick)="navNext($event)">
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
          <div class="p-datepicker-time-picker p-datepicker-time-picker-custom" (keydown)="$event.stopPropagation()">
            <div class="p-datepicker-time-field">
              <label class="p-datepicker-time-label">Часы</label>
              <input
                type="text"
                inputmode="numeric"
                maxlength="2"
                pattern="[0-9]{2}"
                pInputText
                class="p-datepicker-time-input"
                [value]="hourInput"
                (input)="onHourFieldInput($event)"
                (blur)="onHourFieldBlur()"
              />
            </div>
            <div class="p-datepicker-separator">
              <span>:</span>
            </div>
            <div class="p-datepicker-time-field">
              <label class="p-datepicker-time-label">Минуты</label>
              <input
                type="text"
                inputmode="numeric"
                maxlength="2"
                pattern="[0-9]{2}"
                pInputText
                class="p-datepicker-time-input"
                [value]="minuteInput"
                (input)="onMinuteFieldInput($event)"
                (blur)="onMinuteFieldBlur()"
              />
            </div>
          </div>
        </ng-template>
      }
    </p-datepicker>
  `
})
export class ExtraDatePickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('dpRef') dpRef!: DatePicker;

  readonly months = MONTHS;
  readonly years = YEARS;

  dpCurrentMonth = new Date().getMonth();
  dpCurrentYear = new Date().getFullYear();

  hourInput = '00';
  minuteInput = '00';

  modelValue: Date | Date[] | null = null;
  disabled = false;

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

  onMonthChangeHandler(event: DatePickerMonthChangeEvent): void {
    this.dpCurrentMonth = event.month ? event.month - 1 : new Date().getMonth();
    this.dpCurrentYear = event.year || new Date().getFullYear();
    this.onMonthChange.emit(event);
  }

  onYearChangeHandler(event: DatePickerMonthChangeEvent): void {
    this.dpCurrentMonth = event.month ? event.month - 1 : new Date().getMonth();
    this.dpCurrentYear = event.year || new Date().getFullYear();
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
    this.modelValue = val;
    this._onChange(val);
    if (this.inline) {
      this._onTouched();
    }
    if (this.selectionMode === 'range' && Array.isArray(val)) {
      if (val[1]) {
        this.rangeStart = null;
        if (!this.inline) {
          (this.dpRef as any).hideOverlay();
        }
      } else {
        this.rangeStart = val[0] ?? null;
      }
    }
  }

  onHourFieldInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/\D/g, '').slice(0, 2);
    if (input.value !== cleaned) {
      input.value = cleaned;
    }
    this.hourInput = cleaned;
    if (cleaned.length === 2) {
      const parsed = parseInt(cleaned, 10);
      if (!isNaN(parsed)) {
        this.dpRef.currentHour = Math.min(23, Math.max(0, parsed));
      }
    }
  }

  onHourFieldBlur(): void {
    const parsed = parseInt(this.hourInput, 10);
    const clamped = isNaN(parsed) ? 0 : Math.min(23, Math.max(0, parsed));
    this.dpRef.currentHour = clamped;
    this.hourInput = String(clamped).padStart(2, '0');
    (this.dpRef as any).updateTime();
    this.cdr.markForCheck();
  }

  onMinuteFieldInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/\D/g, '').slice(0, 2);
    if (input.value !== cleaned) {
      input.value = cleaned;
    }
    this.minuteInput = cleaned;
    if (cleaned.length === 2) {
      const parsed = parseInt(cleaned, 10);
      if (!isNaN(parsed)) {
        this.dpRef.currentMinute = Math.min(59, Math.max(0, parsed));
      }
    }
  }

  onMinuteFieldBlur(): void {
    const parsed = parseInt(this.minuteInput, 10);
    const clamped = isNaN(parsed) ? 0 : Math.min(59, Math.max(0, parsed));
    this.dpRef.currentMinute = clamped;
    this.minuteInput = String(clamped).padStart(2, '0');
    (this.dpRef as any).updateTime();
    this.cdr.markForCheck();
  }

  private syncTimeInputs(): void {
    if (!this.dpRef) return;
    const h = this.dpRef.currentHour ?? 0;
    const m = this.dpRef.currentMinute ?? 0;
    this.hourInput = String(h).padStart(2, '0');
    this.minuteInput = String(m).padStart(2, '0');
    this.cdr.markForCheck();
  }

  private selectOverlayGuard: ((e: MouseEvent) => void) | null = null;

  private attachSelectOverlayGuard(): void {
    if (this.selectOverlayGuard) return;
    this.selectOverlayGuard = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.p-select-overlay')) {
        e.stopPropagation();
      }
    };
    document.addEventListener('mousedown', this.selectOverlayGuard, true);
  }

  private detachSelectOverlayGuard(): void {
    if (!this.selectOverlayGuard) return;
    document.removeEventListener('mousedown', this.selectOverlayGuard, true);
    this.selectOverlayGuard = null;
  }

  // ── Range hover preview ──────────────────────────────────────────────────

  private panelMouseoverHandler: ((e: Event) => void) | null = null;
  private panelMouseleaveHandler: (() => void) | null = null;
  private rangeStart: Date | null = null;

  onPanelShow(): void {
    this.syncCurrentDate();
    this.syncTimeInputs();
    this.attachSelectOverlayGuard();
    if (this.selectionMode === 'range') {
      this.attachRangePreview();
    }
  }

  onPanelClose(): void {
    this.detachSelectOverlayGuard();
    this.detachRangePreview();
    this._onTouched();
  }

  onDateSelected(event: any): void {
    this.onSelect.emit(event);
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────

  private _onChange: (value: Date | Date[] | null) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(value: Date | Date[] | null): void {
    this.modelValue = value ?? null;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: Date | Date[] | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.detachRangePreview();
    this.detachSelectOverlayGuard();
  }

  private attachRangePreview(): void {
    this.removeRangeListeners();

    setTimeout(() => {
      const panel = this.getPanelElement();
      if (!panel) return;

      this.panelMouseoverHandler = (e: Event) => {
        if (!this.rangeStart) return;
        const dayEl = (e.target as HTMLElement).closest('.p-datepicker-day') as HTMLElement;
        if (!dayEl) return;
        const dateKey = dayEl.getAttribute('data-date');
        if (!dateKey) return;
        const hovered = this.parseDateKey(dateKey);
        if (!hovered) return;
        this.clearHoverPreview(panel);
        this.applyRangePreview(panel, this.rangeStart, hovered);
      };

      this.panelMouseleaveHandler = () => {
        this.clearHoverPreview(panel);
      };

      panel.addEventListener('mouseover', this.panelMouseoverHandler);
      panel.addEventListener('mouseleave', this.panelMouseleaveHandler);
    });
  }

  private removeRangeListeners(): void {
    const panel = this.getPanelElement();
    if (panel) {
      if (this.panelMouseoverHandler) {
        panel.removeEventListener('mouseover', this.panelMouseoverHandler);
      }
      if (this.panelMouseleaveHandler) {
        panel.removeEventListener('mouseleave', this.panelMouseleaveHandler);
      }
    }
    this.panelMouseoverHandler = null;
    this.panelMouseleaveHandler = null;
  }

  private detachRangePreview(): void {
    const panel = this.getPanelElement();
    if (panel) this.clearHoverPreview(panel);
    this.removeRangeListeners();
  }

  private getPanelElement(): HTMLElement | null {
    return (this.dpRef as any)?.content?.nativeElement ?? document.querySelector('.p-datepicker-panel');
  }

  private parseDateKey(key: string): Date | null {
    const parts = key.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return new Date(parts[0], parts[1], parts[2]);
  }

  private applyRangePreview(panel: HTMLElement, start: Date, end: Date): void {
    const [from, to] = start <= end ? [start, end] : [end, start];
    const days = panel.querySelectorAll('.p-datepicker-day[data-date]');
    days.forEach((el) => {
      const key = el.getAttribute('data-date');
      if (!key) return;
      const d = this.parseDateKey(key);
      if (!d) return;
      const inRange = d > from && d < to;
      const isEdge = d.getTime() === from.getTime() || d.getTime() === to.getTime();
      if (inRange) {
        el.classList.add('p-datepicker-day-selected-range');
        el.setAttribute('data-hover-preview', '');
      }
      if (isEdge && !el.classList.contains('p-datepicker-day-selected')) {
        el.classList.add('p-datepicker-day-selected');
        el.setAttribute('data-hover-preview', '');
      }
    });
  }

  private clearHoverPreview(panel: HTMLElement): void {
    panel.querySelectorAll('[data-hover-preview]').forEach((el) => {
      el.classList.remove('p-datepicker-day-selected-range', 'p-datepicker-day-selected');
      el.removeAttribute('data-hover-preview');
    });
  }
}
