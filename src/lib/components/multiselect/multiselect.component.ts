import { Component, EventEmitter, forwardRef, inject, Injector, Input, OnInit, Output } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AnimationEvent as NativeAnimationEvent } from '@angular/animations';
import { MultiSelect } from 'primeng/multiselect';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';
import type {
  MultiSelectBlurEvent,
  MultiSelectChangeEvent,
  MultiSelectFilterEvent,
  MultiSelectFocusEvent,
  MultiSelectRemoveEvent
} from 'primeng/types/multiselect';

export type ExtraMultiSelectSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraMultiSelectLabelPosition = 'top' | 'left';
export type ExtraMultiSelectChangeEvent = MultiSelectChangeEvent;
export type ExtraMultiSelectFilterEvent = MultiSelectFilterEvent;

export interface ExtraMultiSelectOption {
  name: string;
  code: string | number;
}

export interface ExtraMultiSelectGroup {
  name: string;
  options: ExtraMultiSelectOption[] | any[];
}

export interface ExtraMultiSelectRemoveEvent {
  value: unknown;
  removed: unknown;
}

export interface ExtraMultiSelectAnimationEvent extends NativeAnimationEvent {}

let nextInputId = 0;

@Component({
  selector: 'extra-multi-select',
  standalone: true,
  imports: [MultiSelect, NgClass, NgTemplateOutlet, FormsModule, FloatLabel, ExtraTooltipDirective],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraMultiSelectComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где input обязан быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-multiselect" [class.extra-multiselect--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-multiselect-body">
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
            <div class="extra-multiselect-caption">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-multiselect-label" [for]="inputId">
        {{ label }}
        @if (info) {
          <i class="extra-multiselect-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #fieldTpl>
      <p-multiSelect
        [ngClass]="multiselectClasses"
        [ngModel]="modelValue"
        [disabled]="disabled"
        [options]="options"
        [optionLabel]="optionLabel"
        [optionValue]="optionValue"
        [optionDisabled]="optionDisabled"
        [optionGroupLabel]="optionGroupLabel"
        [optionGroupChildren]="optionGroupChildren"
        [group]="group"
        [placeholder]="placeholder"
        [filter]="showFilter"
        [filterPlaceHolder]="filterPlaceholder"
        [showClear]="clearable"
        [display]="showChips ? 'chip' : 'comma'"
        [chipIcon]="chipIcon"
        [readonly]="readonly"
        [loading]="loading"
        [fluid]="fluid"
        [inputId]="inputId"
        [appendTo]="appendTo"
        [size]="primeSize"
        [emptyMessage]="emptyMessage"
        [emptyFilterMessage]="emptyFilterMessage"
        (onChange)="handleChange($event)"
        (onClear)="handleClear()"
        (onFilter)="onFilter.emit($event)"
        (onPanelShow)="onShow.emit($event)"
        (onPanelHide)="onHide.emit($event)"
        (onRemove)="handleRemove($event)"
        (onFocus)="handleFocus($event)"
        (onBlur)="handleBlur($event)"
      ></p-multiSelect>
    </ng-template>
  `
})
export class ExtraMultiSelectComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder = '';
  @Input() label = '';
  @Input() labelPosition: ExtraMultiSelectLabelPosition = 'top';
  @Input() floatLabel = false;
  @Input() showChips = false;
  @Input() chipIcon: string | undefined;
  @Input() chipClearable = true;
  @Input() clearable = false;
  @Input() showCheckbox = true;
  @Input() showFilter = false;
  @Input() filterPlaceholder: string | undefined;
  @Input() options: ExtraMultiSelectGroup[] | ExtraMultiSelectOption[] | any[] | undefined;
  @Input() optionLabel: string | undefined;
  @Input() optionValue: string | undefined;
  @Input() optionDisabled: string | undefined;
  @Input() optionGroupLabel: string | undefined;
  @Input() optionGroupChildren = 'items';
  @Input() group = false;
  @Input() caption = '';
  @Input() info = '';
  @Input() size: ExtraMultiSelectSize = 'base';
  @Input() readonly = false;
  @Input() loading = false;
  @Input() fluid = false;
  @Input() appendTo: any = 'body';
  @Input() emptyMessage = 'Нет данных';
  @Input() emptyFilterMessage = 'Результаты не найдены';

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-multi-select-${nextInputId++}`;

  disabled = false;
  modelValue: any[] | null = null;

  @Output() onChange = new EventEmitter<ExtraMultiSelectChangeEvent>();
  @Output() onFilter = new EventEmitter<ExtraMultiSelectFilterEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onShow = new EventEmitter<ExtraMultiSelectAnimationEvent>();
  @Output() onHide = new EventEmitter<ExtraMultiSelectAnimationEvent>();
  @Output() onRemove = new EventEmitter<ExtraMultiSelectRemoveEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  get invalid(): boolean {
    return !!(this._ngControl?.invalid && this._ngControl?.touched);
  }

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  get multiselectClasses(): Record<string, boolean> {
    return {
      'p-multiselect-xlg': this.size === 'xlarge',
      'p-invalid': this.invalid,
      'extra-multiselect-no-checkbox': !this.showCheckbox,
      'extra-multiselect-chips-locked': !this.chipClearable
    };
  }

  private _onChange: (value: any[] | null) => void = () => {};
  private _onTouched: () => void = () => {};

  handleChange(event: ExtraMultiSelectChangeEvent): void {
    this.modelValue = event.value;
    this._onChange(event.value);
    this.onChange.emit(event);
  }

  handleClear(): void {
    this.modelValue = null;
    this._onChange(null);
    this.onClear.emit();
  }

  handleRemove(event: MultiSelectRemoveEvent): void {
    this.onRemove.emit({ value: event.newValue, removed: event.removed });
  }

  handleFocus(event: MultiSelectFocusEvent): void {
    this.onFocus.emit(event.originalEvent);
  }

  handleBlur(event: MultiSelectBlurEvent): void {
    this._onTouched();
    this.onBlur.emit(event.originalEvent);
  }

  writeValue(value: any[] | null): void {
    this.modelValue = value ?? null;
  }

  registerOnChange(fn: (value: any[] | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
