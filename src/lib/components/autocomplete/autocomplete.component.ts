import { Component, EventEmitter, Input, OnInit, Output, forwardRef, inject, Injector } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PrimeTemplate } from 'primeng/api';
import { Checkbox } from 'primeng/checkbox';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
  AutoCompleteUnselectEvent,
  AutoCompleteDropdownClickEvent
} from 'primeng/autocomplete';

export type ExtraAutoCompleteSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraAutoCompleteLabelPosition = 'top' | 'left';

export type ExtraAutoCompleteCompleteEvent = AutoCompleteCompleteEvent;
export type ExtraAutoCompleteSelectEvent = AutoCompleteSelectEvent;
export type ExtraAutoCompleteUnselectEvent = AutoCompleteUnselectEvent;
export type ExtraAutoCompleteDropdownClickEvent = AutoCompleteDropdownClickEvent;

export interface ExtraAutoCompleteOption {
  name: string;
  code: string | number;
}

export interface ExtraAutoCompleteGroup {
  name: string;
  options: ExtraAutoCompleteOption[] | any[];
}

let nextInputId = 0;

@Component({
  selector: 'extra-auto-complete',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [AutoComplete, FormsModule, FloatLabel, PrimeTemplate, NgTemplateOutlet, ExtraTooltipDirective, Checkbox],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraAutoCompleteComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где input обязан быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-autocomplete" [class.extra-autocomplete--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-autocomplete-body">
          @if (label && labelPosition === 'top' && !floatLabel) {
            <ng-container [ngTemplateOutlet]="labelTpl" />
          }
          @if (floatLabel) {
            <p-floatlabel variant="in">
              <ng-container [ngTemplateOutlet]="fieldTpl" />
              @if (label) {
                <ng-container [ngTemplateOutlet]="labelTpl" />
              }
            </p-floatlabel>
          } @else {
            <ng-container [ngTemplateOutlet]="fieldTpl" />
          }
          @if (caption) {
            <div class="extra-autocomplete-caption">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-autocomplete-label" [for]="inputId">
        {{ label }}
        @if (info) {
          <i class="extra-autocomplete-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #fieldTpl>
      <p-autocomplete
        [class.extra-autocomplete-chips-locked]="!chipClearable"
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
        [showClear]="clearable"
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
        (onShow)="onShow.emit($event)"
        (onHide)="onHide.emit($event)"
        (onFocus)="onFocus.emit($event)"
        (onBlur)="handleBlur($event)"
        (onClear)="handleClear()"
      >
        @if (showCheckbox) {
          <ng-template pTemplate="item" let-item>
            <div class="flex items-center gap-2">
              <p-checkbox [ngModel]="isOptionSelected(item)" [binary]="true" [readonly]="true" [tabindex]="-1" />
              <span>{{ getOptionLabel(item) }}</span>
            </div>
          </ng-template>
        }
        @if (chipIcon) {
          <ng-template pTemplate="removeicon">
            <i [class]="chipIcon"></i>
          </ng-template>
        }
      </p-autocomplete>
    </ng-template>
  `
})
export class ExtraAutoCompleteComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder: string | undefined = undefined;
  @Input() label = '';
  @Input() labelPosition: ExtraAutoCompleteLabelPosition = 'top';
  @Input() floatLabel = false;
  @Input() multiple = false;
  @Input() suggestions: ExtraAutoCompleteGroup[] | ExtraAutoCompleteOption[] | any[] = [];
  @Input() optionLabel: string | undefined = undefined;
  @Input() chipIcon: string | undefined = undefined;
  @Input() chipClearable = true;
  @Input() showCheckbox = false;
  @Input() clearable = false;
  @Input() caption = '';
  @Input() info = '';
  @Input() size: ExtraAutoCompleteSize = 'base';

  @Input() optionValue: string | undefined = undefined;
  @Input() optionDisabled: string | undefined = undefined;
  @Input() optionGroupLabel: string | undefined = undefined;
  @Input() optionGroupChildren: string | undefined = undefined;
  @Input() group = false;
  @Input() dropdown = false;
  @Input() dropdownMode: 'blank' | 'current' = 'blank';
  @Input() forceSelection = false;
  @Input() completeOnFocus = false;
  @Input() minLength = 1;
  @Input() delay = 300;
  @Input() scrollHeight = '200px';
  @Input() emptyMessage: string | undefined = undefined;
  @Input() readonly = false;
  @Input() fluid = false;
  @Input() unique = false;
  @Input() dataKey: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() autofocus = false;

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-auto-complete-${nextInputId++}`;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  @Output() completeMethod = new EventEmitter<ExtraAutoCompleteCompleteEvent>();
  @Output() onSelect = new EventEmitter<ExtraAutoCompleteSelectEvent>();
  @Output() onUnselect = new EventEmitter<ExtraAutoCompleteUnselectEvent>();
  @Output() onDropdownClick = new EventEmitter<ExtraAutoCompleteDropdownClickEvent>();
  @Output() onShow = new EventEmitter<Event>();
  @Output() onHide = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClear = new EventEmitter<void>();

  computedInputStyleClass(): string | undefined {
    if (this.size === 'small') return 'p-inputtext-sm';
    if (this.size === 'large') return 'p-inputtext-lg';
    if (this.size === 'xlarge') return 'p-inputtext-lg p-inputtext-xlg';
    return undefined;
  }

  modelValue: any = null;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  getOptionLabel(item: any): string {
    return this.optionLabel ? item?.[this.optionLabel] : item;
  }

  private getOptionValue(item: any): any {
    return this.optionValue ? item?.[this.optionValue] : item;
  }

  private equalsValue(a: any, b: any): boolean {
    if (this.dataKey) return a?.[this.dataKey] === b?.[this.dataKey];
    return a === b;
  }

  isOptionSelected(item: any): boolean {
    const value = this.getOptionValue(item);
    if (this.multiple) {
      return Array.isArray(this.modelValue) && this.modelValue.some((v) => this.equalsValue(v, value));
    }
    return this.equalsValue(this.modelValue, value);
  }

  handleChange(value: any): void {
    this.modelValue = value;
    this._onChange(value);
  }

  handleBlur(event: Event): void {
    this._onTouched();
    this.onBlur.emit(event);
  }

  handleClear(): void {
    this.modelValue = this.multiple ? [] : null;
    this._onChange(this.modelValue);
    this.onClear.emit();
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
