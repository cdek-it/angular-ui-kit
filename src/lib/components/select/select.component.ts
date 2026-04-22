import { Component, EventEmitter, forwardRef, inject, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { PrimeTemplate } from 'primeng/api';
import type { SelectChangeEvent, SelectFilterEvent } from 'primeng/types/select';

export type SelectSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'select-field',
  standalone: true,
  imports: [Select, NgClass, NgTemplateOutlet, PrimeTemplate, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
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
      [filter]="filter"
      [showClear]="showClear"
      [editable]="editable"
      [readonly]="readonly"
      [loading]="loading"
      [inputId]="inputId"
      [appendTo]="appendTo"
      [size]="primeSize"
      [emptyMessage]="emptyMessage"
      [emptyFilterMessage]="emptyFilterMessage"
      (onChange)="onSelectChange($event)"
      (onClear)="onClear.emit($event)"
      (onFilter)="onFilter.emit($event)"
      (onShow)="onShow.emit($event)"
      (onHide)="onHide.emit($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="handleBlur($event)"
    >
      @if (optionTemplate) {
        <ng-template pTemplate="item" let-option>
          <ng-container [ngTemplateOutlet]="optionTemplate" [ngTemplateOutletContext]="{ $implicit: option }"></ng-container>
        </ng-template>
      }
      @if (selectedItemTemplate) {
        <ng-template pTemplate="selectedItem" let-option>
          <ng-container [ngTemplateOutlet]="selectedItemTemplate" [ngTemplateOutletContext]="{ $implicit: option }"></ng-container>
        </ng-template>
      }
      @if (optionGroupTemplate) {
        <ng-template pTemplate="group" let-group>
          <ng-container [ngTemplateOutlet]="optionGroupTemplate" [ngTemplateOutletContext]="{ $implicit: group }"></ng-container>
        </ng-template>
      }
    </p-select>
  `,
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() options: any[] | null | undefined;
  @Input() optionLabel: string | undefined;
  @Input() optionValue: string | undefined;
  @Input() optionDisabled: string | undefined;
  @Input() optionGroupLabel: string | undefined;
  @Input() optionGroupChildren = 'items';
  @Input() group = false;
  @Input() placeholder = '';
  @Input() size: SelectSize = 'base';
  @Input() filter = false;
  @Input() showClear = false;
  @Input() editable = false;
  @Input() readonly = false;
  @Input() loading = false;
  @Input() inputId: string | undefined;
  @Input() appendTo: any = 'body';
  @Input() emptyMessage = 'Нет данных';
  @Input() emptyFilterMessage = 'Результаты не найдены';
  @Input() optionTemplate: TemplateRef<any> | null = null;
  @Input() selectedItemTemplate: TemplateRef<any> | null = null;
  @Input() optionGroupTemplate: TemplateRef<any> | null = null;

  disabled = false;
  modelValue: any = null;

  @Output() onClear = new EventEmitter<Event>();
  @Output() onFilter = new EventEmitter<SelectFilterEvent>();
  @Output() onShow = new EventEmitter<Event>();
  @Output() onHide = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  get invalid(): boolean {
    return !!(this._ngControl?.invalid && this._ngControl?.touched);
  }

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get selectClasses(): Record<string, boolean> {
    return {
      'p-select-xlg': this.size === 'xlarge',
      'p-invalid': this.invalid,
    };
  }

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  onSelectChange(event: SelectChangeEvent): void {
    this.modelValue = event.value;
    this._onChange(event.value);
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
