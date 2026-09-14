import {
  booleanAttribute,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { PrimeTemplate } from 'primeng/api';
import type { SelectChangeEvent, SelectFilterEvent } from 'primeng/types/select';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';

export type ExtraSelectSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraSelectLabelPosition = 'left' | 'top' | 'float';

export interface ExtraSelectOption {
  name: string;
  code: string | number;
}

export interface ExtraSelectGroup {
  options: ExtraSelectOption[] | any[];
  name: string;
}

export interface ExtraSelectChangeEvent {
  value: any;
  originalEvent: Event;
}

export interface ExtraSelectFilterEvent {
  filter: string;
  originalEvent: Event;
}

let nextInputId = 0;

@Directive({ selector: '[extraSelectOption]', standalone: true })
export class ExtraSelectOptionDirective {}

@Directive({ selector: '[extraSelectSelectedItem]', standalone: true })
export class ExtraSelectSelectedItemDirective {}

@Directive({ selector: '[extraSelectOptionGroup]', standalone: true })
export class ExtraSelectOptionGroupDirective {}

@Component({
  selector: 'extra-select',
  standalone: true,
  imports: [Select, NgClass, NgTemplateOutlet, PrimeTemplate, FormsModule, FloatLabel, ExtraTooltipDirective],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraSelectComponent),
      multi: true
    }
  ],
  template: `
    @if (label || caption) {
      <div class="extra-select" [class.extra-select--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left') {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-select-body">
          @if (label && labelPosition === 'top') {
            <ng-container [ngTemplateOutlet]="labelTpl" />
          }
          @if (labelPosition === 'float') {
            <p-floatlabel variant="in">
              <ng-container [ngTemplateOutlet]="selectTpl" />
              @if (label) {
                <ng-container [ngTemplateOutlet]="labelTpl" />
              }
            </p-floatlabel>
          } @else {
            <ng-container [ngTemplateOutlet]="selectTpl" />
          }
          @if (caption) {
            <div class="extra-select-caption">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="selectTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-select-label" [for]="inputId">
        {{ label }}
        @if (info) {
          <i class="extra-select-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #selectTpl>
      <p-select
        [ngClass]="selectClasses"
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
        [showClear]="clearable"
        [editable]="editable"
        [readonly]="readonly"
        [loading]="loading"
        [inputId]="inputId"
        [appendTo]="appendTo"
        [size]="primeSize"
        [checkmark]="showCheckbox"
        [panelStyle]="panelStyle"
        [emptyMessage]="emptyMessage"
        [emptyFilterMessage]="emptyFilterMessage"
        (onChange)="onSelectChange($event)"
        (onClear)="onClear.emit()"
        (onFilter)="onFilterHandler($event)"
        (onShow)="onShow.emit()"
        (onHide)="onHide.emit()"
        (onFocus)="onFocus.emit($event)"
        (onBlur)="handleBlur($event)"
      >
        @if (optionTemplate) {
          <ng-template pTemplate="item" let-option>
            <ng-container
              [ngTemplateOutlet]="optionTemplate"
              [ngTemplateOutletContext]="{ $implicit: option }"
            ></ng-container>
          </ng-template>
        }
        @if (selectedItemTemplate) {
          <ng-template pTemplate="selectedItem" let-option>
            <ng-container
              [ngTemplateOutlet]="selectedItemTemplate"
              [ngTemplateOutletContext]="{ $implicit: option }"
            ></ng-container>
          </ng-template>
        }
        @if (optionGroupTemplate) {
          <ng-template pTemplate="group" let-group>
            <ng-container
              [ngTemplateOutlet]="optionGroupTemplate"
              [ngTemplateOutletContext]="{ $implicit: group }"
            ></ng-container>
          </ng-template>
        }
      </p-select>
    </ng-template>
  `
})
export class ExtraSelectComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() options: ExtraSelectGroup[] | ExtraSelectOption[] | any[] | null | undefined;
  @Input() optionLabel: string | undefined;
  @Input() optionValue: string | undefined;
  @Input() optionDisabled: string | undefined;
  @Input() optionGroupLabel: string | undefined;
  @Input() optionGroupChildren = 'items';
  @Input() group = false;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() labelPosition: ExtraSelectLabelPosition = 'top';
  @Input() caption = '';
  @Input() info = '';
  @Input() size: ExtraSelectSize = 'base';
  @Input() showFilter = false;
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input() showCheckbox = true;
  @Input() editable = false;
  @Input() readonly = false;
  @Input() loading = false;
  @Input() inputId: string | undefined = `extra-select-${nextInputId++}`;
  @Input() appendTo: any = 'body';
  @Input() checkmarkIcon = 'ea5e';
  @Input() emptyMessage = 'Нет данных';
  @Input() emptyFilterMessage = 'Результаты не найдены';
  @ContentChild(ExtraSelectOptionDirective, { read: TemplateRef }) optionTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraSelectSelectedItemDirective, { read: TemplateRef }) selectedItemTemplate: TemplateRef<any> | null =
    null;
  @ContentChild(ExtraSelectOptionGroupDirective, { read: TemplateRef }) optionGroupTemplate: TemplateRef<any> | null =
    null;

  disabled = false;
  modelValue: any = null;

  @Output() onChange = new EventEmitter<ExtraSelectChangeEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onFilter = new EventEmitter<ExtraSelectFilterEvent>();
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();
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

  get panelStyle(): Record<string, string> {
    const char = String.fromCodePoint(parseInt(this.checkmarkIcon, 16));
    return { '--p-select-checkmark-content': `"${char}"` };
  }

  get selectClasses(): Record<string, boolean> {
    return {
      'p-select-xlg': this.size === 'xlarge',
      'p-invalid': this.invalid
    };
  }

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  onSelectChange(event: SelectChangeEvent): void {
    this.modelValue = event.value;
    this._onChange(event.value);
    this.onChange.emit({ value: event.value, originalEvent: event.originalEvent as Event });
  }

  onFilterHandler(event: SelectFilterEvent): void {
    this.onFilter.emit({ filter: event.filter, originalEvent: event.originalEvent });
  }

  handleBlur(event: Event): void {
    this._onTouched();
    this.onBlur.emit(event);
  }

  writeValue(value: any): void {
    this.modelValue = value ?? null;
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
