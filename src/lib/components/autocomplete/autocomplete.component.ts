import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteSelectEvent, AutoCompleteUnselectEvent, AutoCompleteDropdownClickEvent } from 'primeng/autocomplete';

export type AutoCompleteSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'auto-complete',
  host: { style: 'display: block' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AutoComplete, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
  ],
  template: `
    <p-autocomplete
      [ngModel]="modelValue"
      (ngModelChange)="handleChange($event)"
      [suggestions]="suggestions"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [optionDisabled]="optionDisabled"
      [optionGroupLabel]="optionGroupLabel"
      [optionGroupChildren]="optionGroupChildren"
      [group]="group"
      [multiple]="multiple"
      [dropdown]="dropdown"
      [dropdownMode]="dropdownMode"
      [showClear]="showClear"
      [forceSelection]="forceSelection"
      [completeOnFocus]="completeOnFocus"
      [placeholder]="placeholder"
      [minLength]="minLength"
      [delay]="delay"
      [scrollHeight]="scrollHeight"
      [emptyMessage]="emptyMessage"
      [disabled]="disabled"
      [readonly]="readonly"
      [invalid]="invalid"
      [fluid]="fluid"
      [unique]="unique"
      [dataKey]="dataKey"
      [inputStyleClass]="computedInputStyleClass()"
      [inputId]="inputId"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [autofocus]="autofocus"
      (completeMethod)="completeMethod.emit($event)"
      (onSelect)="onSelect.emit($event)"
      (onUnselect)="onUnselect.emit($event)"
      (onDropdownClick)="onDropdownClick.emit($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
      (onClear)="onClear.emit()"
    ></p-autocomplete>
  `,
})
export class AutoCompleteComponent implements ControlValueAccessor {
  @Input() suggestions: any[] = [];
  @Input() optionLabel: string | undefined = undefined;
  @Input() optionValue: string | undefined = undefined;
  @Input() optionDisabled: string | undefined = undefined;
  @Input() optionGroupLabel: string | undefined = undefined;
  @Input() optionGroupChildren: string | undefined = undefined;
  @Input() group = false;
  @Input() multiple = false;
  @Input() dropdown = false;
  @Input() dropdownMode: 'blank' | 'current' = 'blank';
  @Input() showClear = false;
  @Input() forceSelection = false;
  @Input() completeOnFocus = false;
  @Input() placeholder: string | undefined = undefined;
  @Input() minLength = 1;
  @Input() delay = 300;
  @Input() scrollHeight = '200px';
  @Input() emptyMessage: string | undefined = undefined;
  private _size = signal<AutoCompleteSize>('base');
  @Input() set size(v: AutoCompleteSize) { this._size.set(v); }
  get size(): AutoCompleteSize { return this._size(); }
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input() fluid = false;
  @Input() unique = false;
  @Input() dataKey: string | undefined = undefined;
  @Input() inputStyleClass: string | undefined = undefined;
  @Input() inputId: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() autofocus = false;

  @Output() completeMethod = new EventEmitter<AutoCompleteCompleteEvent>();
  @Output() onSelect = new EventEmitter<AutoCompleteSelectEvent>();
  @Output() onUnselect = new EventEmitter<AutoCompleteUnselectEvent>();
  @Output() onDropdownClick = new EventEmitter<AutoCompleteDropdownClickEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClear = new EventEmitter<void>();

  readonly computedInputStyleClass = computed(() => {
    const classes: string[] = [];
    const s = this._size();
    if (s === 'small')  classes.push('p-inputtext-sm');
    if (s === 'large')  classes.push('p-inputtext-lg');
    if (s === 'xlarge') classes.push('p-inputtext-lg', 'p-inputtext-xlg');
    if (this.inputStyleClass) classes.push(this.inputStyleClass);
    return classes.join(' ') || undefined;
  });

  modelValue: any = null;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  handleChange(value: any): void {
    this.modelValue = value;
    this._onChange(value);
    this._onTouched();
  }

  writeValue(value: any): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
