import {
  AfterViewInit,
  afterEveryRender,
  booleanAttribute,
  Injector,
  OnChanges,
  SimpleChanges,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NgControl,
  AbstractControl,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraCaptionComponent, ExtraCaptionSeverity } from '@cdek-it/angular-ui-kit/components/caption';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';
import { ExtraSelectComponent } from '@cdek-it/angular-ui-kit/components/select';
import { DatePicker, DatePickerMonthChangeEvent } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { PrimeTemplate, Translation, TranslationKeys } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { Button } from 'primeng/button';

export type ExtraDatePickerViewChangeEvent = DatePickerMonthChangeEvent;
export type ExtraDatePickerMonthChangeEvent = ExtraDatePickerViewChangeEvent;

const YEARS = (() => {
  const result = [];
  for (let y = 1990; y <= 2035; y++) {
    result.push({ name: String(y), value: y });
  }
  return result;
})();

let nextInstanceId = 0;

// Mirrors PrimeNG's built-in header (hidden by the kit): the buttons page by year in month view
// and by decade in year view, and are labelled accordingly
const NAV_LABEL_KEYS = {
  date: { prev: 'prevMonth', next: 'nextMonth' },
  month: { prev: 'prevYear', next: 'nextYear' },
  year: { prev: 'prevDecade', next: 'nextDecade' }
} satisfies Record<'date' | 'month' | 'year', Record<'prev' | 'next', keyof Translation>>;

export type ExtraDatePickerSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraDatePickerView = 'day' | 'date' | 'month' | 'year' | 'time';
export type ExtraDatePickerSelectionMode = 'single' | 'multiple' | 'range';
export type ExtraDatePickerIconDisplay = 'input' | 'button';

@Component({
  selector: 'extra-date-picker',
  host: { style: 'display: contents' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraDatePickerComponent),
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ExtraDatePickerComponent), multi: true }
  ],
  imports: [
    DatePicker,
    InputText,
    PrimeTemplate,
    FormsModule,
    ExtraSelectComponent,
    Button,
    NgTemplateOutlet,
    FloatLabel,
    ExtraCaptionComponent,
    ExtraTooltipDirective
  ],
  template: `
    @if (!inline && (label || caption)) {
      <div
        class="extra-date-picker"
        [class.extra-date-picker--left]="labelPosition === 'left' && !floatLabel"
        [class.extra-date-picker--fluid]="fluid"
      >
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-date-picker-body">
          @if (label && labelPosition === 'top' && !floatLabel) {
            <ng-container [ngTemplateOutlet]="labelTpl" />
          }
          @if (floatLabel) {
            <p-floatlabel variant="in"
              ><ng-container [ngTemplateOutlet]="pickerTpl" /><ng-container [ngTemplateOutlet]="labelTpl"
            /></p-floatlabel>
          } @else {
            <ng-container [ngTemplateOutlet]="pickerTpl" />
          }
          @if (caption) {
            <extra-caption [severity]="captionSeverity">{{ caption }}</extra-caption>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="pickerTpl" />
    }
    <ng-template #labelTpl>
      <label class="extra-date-picker-label" [for]="inputId">
        @if (required) {
          <span class="extra-date-picker-required">*</span>
        }
        {{ label }}
        @if (info && !floatLabel) {
          <i class="ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>
    <ng-template #pickerTpl>
      <p-datepicker
        #dpRef
        [ngModel]="modelValue"
        (ngModelChange)="onValueChange($event)"
        [dateFormat]="dateFormat"
        [selectionMode]="selectionMode"
        [showIcon]="showIcon && !disabled"
        [iconDisplay]="iconDisplay"
        [inline]="inline"
        [showButtonBar]="showButtonBar"
        [showTime]="showTime || view === 'time'"
        [timeOnly]="view === 'time'"
        [hourFormat]="hourFormat"
        [showClear]="clearable && !disabled"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [class.p-disabled]="disabled"
        [style.pointer-events]="disabled ? 'none' : null"
        [readonlyInput]="readonly || disabled"
        [showOnFocus]="!readonly && !disabled"
        [inputId]="inputId"
        [ariaLabel]="ariaLabel"
        [ariaLabelledBy]="ariaLabelledBy"
        [autofocus]="autofocus"
        [tabindex]="disabled ? -1 : (tabindex ?? 0)"
        [styleClass]="pickerClass"
        [invalid]="invalid"
        [size]="primeSize"
        [inputStyleClass]="size === 'xlarge' ? 'p-inputtext-xlg' : ''"
        [panelStyleClass]="'extra-date-picker-panel'"
        [appendTo]="inline ? undefined : 'body'"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [view]="primeView"
        [hideOnDateTimeSelect]="!showTime && view !== 'time' && selectionMode !== 'range'"
        [showOtherMonths]="showOtherMonths"
        [selectOtherMonths]="selectOtherMonths"
        (onShow)="onPanelShow()"
        (onClose)="onPanelClose()"
        (onMonthChange)="onMonthChangeHandler($event)"
        (onYearChange)="onYearChangeHandler($event)"
        (onSelect)="onDateSelected($event)"
        (onClear)="onClear.emit($event)"
        (onInput)="onInput.emit($event)"
        (onFocus)="onFocus.emit($event)"
        (onBlur)="onInputBlur($event)"
        (onTodayClick)="onTodayClick.emit($event)"
        (onClearClick)="onClearClick.emit($event)"
      >
        <ng-template pTemplate="header">
          <div class="p-datepicker-header p-datepicker-custom-header">
            <p-button
              severity="secondary"
              [rounded]="true"
              [text]="true"
              [ariaLabel]="navAriaLabel('prev')"
              [disabled]="disabled || readonly"
              (onClick)="navPrev($event)"
            >
              <ng-template pTemplate="icon">
                <i class="ti ti-chevron-left" aria-hidden="true"></i>
              </ng-template>
            </p-button>
            <div class="p-datepicker-title">
              <extra-select
                appendTo="body"
                size="small"
                [showCheckmark]="false"
                [options]="months"
                [disabled]="disabled || readonly"
                optionLabel="name"
                optionValue="value"
                [ngModel]="dpCurrentMonth"
                (ngModelChange)="onMonthSelect($event)"
                class="p-datepicker-month-select"
              ></extra-select>
              <extra-select
                appendTo="body"
                size="small"
                [showCheckmark]="false"
                [options]="years"
                [disabled]="disabled || readonly"
                optionLabel="name"
                optionValue="value"
                [ngModel]="dpCurrentYear"
                (ngModelChange)="onYearSelect($event)"
                class="p-datepicker-year-select"
              ></extra-select>
            </div>
            <p-button
              severity="secondary"
              [rounded]="true"
              [text]="true"
              [ariaLabel]="navAriaLabel('next')"
              [disabled]="disabled || readonly"
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
        @if (clearable) {
          <ng-template pTemplate="clearicon">
            <i class="ti ti-x"></i>
          </ng-template>
        }
        @if (showTime || view === 'time') {
          <ng-template pTemplate="footer">
            <div class="p-datepicker-time-picker p-datepicker-time-picker-custom" (keydown)="$event.stopPropagation()">
              <div class="p-datepicker-time-field">
                <label class="p-datepicker-time-label" [attr.for]="hourInputId">{{ hourLabel }}</label>
                <input
                  [id]="hourInputId"
                  type="text"
                  inputmode="numeric"
                  maxlength="2"
                  pattern="[0-9]{2}"
                  pInputText
                  class="p-datepicker-time-input"
                  [disabled]="disabled || readonly"
                  [value]="hourInput"
                  (input)="onHourFieldInput($event)"
                  (blur)="onHourFieldBlur()"
                />
              </div>
              <div class="p-datepicker-separator">
                <span>:</span>
              </div>
              <div class="p-datepicker-time-field">
                <label class="p-datepicker-time-label" [attr.for]="minuteInputId">{{ minuteLabel }}</label>
                <input
                  [id]="minuteInputId"
                  type="text"
                  inputmode="numeric"
                  maxlength="2"
                  pattern="[0-9]{2}"
                  pInputText
                  class="p-datepicker-time-input"
                  [disabled]="disabled || readonly"
                  [value]="minuteInput"
                  (input)="onMinuteFieldInput($event)"
                  (blur)="onMinuteFieldBlur()"
                />
              </div>
              @if (hourFormat === '12') {
                <button
                  type="button"
                  class="p-datepicker-ampm-toggle"
                  [disabled]="disabled || readonly"
                  (click)="toggleMeridiem($event)"
                  aria-label="AM/PM"
                >
                  {{ dpRef.pm ? 'PM' : 'AM' }}
                </button>
              }
            </div>
          </ng-template>
        }
      </p-datepicker>
    </ng-template>
  `
})
export class ExtraDatePickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges, Validator {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly primeng = inject(PrimeNG);
  private readonly injector = inject(Injector);
  private onValidatorChange: () => void = () => {};
  private explicitInvalid = false;

  @ViewChild('dpRef') dpRef!: DatePicker;

  months = this.buildMonths();
  readonly years = YEARS;

  dpCurrentMonth = new Date().getMonth();
  dpCurrentYear = new Date().getFullYear();

  hourInput = '00';
  minuteInput = '00';

  private readonly instanceId = nextInstanceId++;
  readonly hourInputId = `extra-date-picker-hour-${this.instanceId}`;
  readonly minuteInputId = `extra-date-picker-minute-${this.instanceId}`;

  modelValue: Date | Date[] | null = null;
  disabled = false;

  @Input() dateFormat = 'dd.mm.yy';
  @Input() selectionMode: ExtraDatePickerSelectionMode = 'single';
  @Input() size: ExtraDatePickerSize = 'base';
  @Input({ transform: booleanAttribute }) showIcon = true;
  @Input() iconDisplay: ExtraDatePickerIconDisplay = 'input';
  @Input({ transform: booleanAttribute }) inline = false;
  @Input({ transform: booleanAttribute }) showButtonBar = false;
  @Input({ transform: booleanAttribute }) showTime = false;
  @Input({ transform: (value: string | number) => String(value) }) hourFormat = '24';
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input() placeholder: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) set invalid(value: boolean) {
    this.explicitInvalid = value;
  }
  get invalid(): boolean {
    const control = this.injector.get(NgControl, null, { self: true, optional: true });
    return this.explicitInvalid || !!(control?.invalid && (control.touched || control.dirty));
  }
  @Input() label = '';
  @Input() labelPosition: 'top' | 'left' = 'top';
  @Input({ transform: booleanAttribute }) floatLabel = false;
  @Input() caption = '';
  @Input() captionSeverity: ExtraCaptionSeverity = 'base';
  @Input() info = '';
  @Input({ transform: booleanAttribute }) required = false;
  @Input({ transform: booleanAttribute }) fluid = false;
  @Input() inputId = `extra-date-picker-${this.instanceId}`;
  @Input() name: string | undefined = undefined;
  @Input() autocomplete = 'off';
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @Input() tabindex: number | undefined = undefined;
  @Input() minDate: Date | undefined = undefined;
  @Input() maxDate: Date | undefined = undefined;
  @Input() view: ExtraDatePickerView = 'day';
  @Input({ transform: booleanAttribute }) showOtherMonths = true;
  @Input({ transform: booleanAttribute }) selectOtherMonths = false;
  @Input() hourLabel = 'Часы';
  @Input() minuteLabel = 'Минуты';

  @Output() onSelect = new EventEmitter<Date>();
  @Output() onMonthChange = new EventEmitter<any>();
  @Output() onYearChange = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<any>();

  @Output() onInput = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();
  @Output() onTodayClick = new EventEmitter<Date>();
  @Output() onClearClick = new EventEmitter<void>();

  get primeView(): 'date' | 'month' | 'year' {
    return this.view === 'month' || this.view === 'year' ? this.view : 'date';
  }

  get pickerClass(): string {
    return [
      'extra-date-picker-field',
      `extra-date-picker-field--${this.size}`,
      this.inline ? 'extra-date-picker-field--inline' : '',
      this.fluid ? 'extra-date-picker-field--fluid' : '',
      this.readonly ? 'extra-date-picker-field--readonly' : '',
      this.floatLabel ? 'extra-date-picker-field--float' : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.required(control) : null;
  }
  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) this.onValidatorChange();
    this.syncInputAttributes();
    if (this.dpRef && this.inline) this.syncTimeInputs();
  }
  private syncInputAttributes(): void {
    const input = this.dpRef?.inputfieldViewChild?.nativeElement;
    if (!input) return;
    input.setAttribute('autocomplete', this.autocomplete);
    input.setAttribute('aria-required', String(this.required));
    input.disabled = this.disabled;
    input.setAttribute('aria-disabled', String(this.disabled));
    if (this.invalid) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    if (this.name) input.setAttribute('name', this.name);
    else input.removeAttribute('name');
  }

  onInputBlur(event: Event): void {
    this._onTouched();
    this.onBlur.emit(event);
  }

  constructor() {
    afterEveryRender(() => this.syncInputAttributes());
    // Month names come from the PrimeNG translation; rebuild them when it changes at runtime.
    // markForCheck also refreshes the nav button labels, which read the translation in the template
    this.primeng.translationObserver.pipe(takeUntilDestroyed()).subscribe(() => {
      this.months = this.buildMonths();
      this.cdr.markForCheck();
    });
  }

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  ngAfterViewInit(): void {
    this.syncInputAttributes();
    // Sync initial month/year for inline mode (panel renders immediately)
    if (this.inline) {
      queueMicrotask(() => {
        this.syncCurrentDate();
        this.syncTimeInputs();
      });
    }
  }

  private buildMonths(): { name: string; value: number }[] {
    const names: string[] = this.primeng.getTranslation(TranslationKeys.MONTH_NAMES) ?? [];
    return names.map((name, value) => ({ name, value }));
  }

  navAriaLabel(direction: 'prev' | 'next'): string {
    const view = (this.dpRef?.currentView ?? this.primeView) as keyof typeof NAV_LABEL_KEYS;
    return this.primeng.getTranslation((NAV_LABEL_KEYS[view] ?? NAV_LABEL_KEYS.date)[direction]);
  }

  syncCurrentDate(): void {
    if (this.dpRef) {
      this.dpCurrentMonth = this.dpRef.currentMonth;
      this.dpCurrentYear = this.dpRef.currentYear;
    }
  }

  onMonthChangeHandler(event: ExtraDatePickerMonthChangeEvent): void {
    this.dpCurrentMonth = event.month ? event.month - 1 : new Date().getMonth();
    this.dpCurrentYear = event.year || new Date().getFullYear();
    this.onMonthChange.emit(event);
  }

  onYearChangeHandler(event: ExtraDatePickerMonthChangeEvent): void {
    this.dpCurrentMonth = event.month ? event.month - 1 : new Date().getMonth();
    this.dpCurrentYear = event.year || new Date().getFullYear();
    this.onYearChange.emit(event);
  }

  onMonthSelect(month: number): void {
    this.dpCurrentMonth = month;
    this.dpRef?.createMonths(month, this.dpCurrentYear);
    if (this.dpRef) this.dpRef.currentMonth = month;
    this.onMonthChange.emit({ month: month + 1, year: this.dpCurrentYear });
  }

  onYearSelect(year: number): void {
    this.dpCurrentYear = year;
    this.dpRef?.createMonths(this.dpCurrentMonth, year);
    if (this.dpRef) this.dpRef.currentYear = year;
    this.onYearChange.emit({ month: this.dpCurrentMonth + 1, year });
  }

  navPrev(event: MouseEvent): void {
    this.dpRef?.navBackward(event);
    this.syncYearNavigation();
  }

  navNext(event: MouseEvent): void {
    this.dpRef?.navForward(event);
    this.syncYearNavigation();
  }

  private syncYearNavigation(): void {
    if (this.dpRef && this.dpRef.currentView !== 'date' && !this.disabled) {
      this.syncCurrentDate();
      this.onYearChange.emit({ month: this.dpCurrentMonth + 1, year: this.dpCurrentYear });
    }
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
        this.dpRef.currentHour = Math.min(
          this.hourFormat === '12' ? 12 : 23,
          Math.max(this.hourFormat === '12' ? 1 : 0, parsed)
        );
      }
    }
  }

  onHourFieldBlur(): void {
    const parsed = parseInt(this.hourInput, 10);
    const min = this.hourFormat === '12' ? 1 : 0;
    const clamped = isNaN(parsed) ? min : Math.min(this.hourFormat === '12' ? 12 : 23, Math.max(min, parsed));
    this.dpRef.currentHour = clamped;
    this.hourInput = String(clamped).padStart(2, '0');
    this.commitTime();
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
    this.commitTime();
    this.cdr.markForCheck();
  }

  private commitTime(): void {
    if (this.selectionMode !== 'single' && (!Array.isArray(this.dpRef.value) || !this.dpRef.value.length)) return;
    this.dpRef.updateTime();
  }

  toggleMeridiem(event: Event): void {
    if (this.selectionMode !== 'single' && (!Array.isArray(this.dpRef.value) || !this.dpRef.value.length)) {
      this.dpRef.pm = !this.dpRef.pm;
      event.preventDefault();
    } else this.dpRef.toggleAMPM(event);
    this.syncTimeInputs();
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
    if (this.disabled) {
      this.dpRef.hideOverlay();
      return;
    }
    this.syncCurrentDate();
    this.syncTimeInputs();
    this.attachSelectOverlayGuard();
    this.onShow.emit();
    if (this.selectionMode === 'range') {
      this.attachRangePreview();
    }
  }

  onPanelClose(): void {
    this.onHide.emit();
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
    if (this.inline) queueMicrotask(() => this.syncTimeInputs());
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
