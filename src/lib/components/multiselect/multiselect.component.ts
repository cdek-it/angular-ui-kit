import { Component, EventEmitter, forwardRef, inject, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { PrimeTemplate } from 'primeng/api';

export type MultiSelectSize = 'small' | 'base' | 'large' | 'xlarge';
export type MultiSelectDisplay = 'comma' | 'chip';

@Component({
  selector: 'multiselect-field',
  standalone: true,
  imports: [MultiSelect, NgClass, NgTemplateOutlet, PrimeTemplate, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
  template: `
    <p-multiselect
      [ngClass]="multiSelectClasses"
      [ngModel]="modelValue"
      [disabled]="disabled"
      [options]="options"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [optionGroupLabel]="optionGroupLabel"
      [optionGroupChildren]="optionGroupChildren"
      [group]="group"
      [placeholder]="placeholder"
      [filter]="filter"
      [showClear]="showClear"
      [display]="display"
      [readonly]="readonly"
      [loading]="loading"
      [inputId]="inputId"
      [appendTo]="appendTo"
      [maxSelectedLabels]="maxSelectedLabels"
      [selectedItemsLabel]="selectedItemsLabel"
      [emptyMessage]="emptyMessage"
      [emptyFilterMessage]="emptyFilterMessage"
      [size]="primeSize"
      [pt]="filterPt"
      (onChange)="onMultiSelectChange($event)"
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
      @if (selectedItemsTemplate) {
        <ng-template pTemplate="selecteditems" let-options>
          <ng-container [ngTemplateOutlet]="selectedItemsTemplate" [ngTemplateOutletContext]="{ $implicit: options }"></ng-container>
        </ng-template>
      }
      @if (optionGroupTemplate) {
        <ng-template pTemplate="group" let-group>
          <ng-container [ngTemplateOutlet]="optionGroupTemplate" [ngTemplateOutletContext]="{ $implicit: group }"></ng-container>
        </ng-template>
      }
      @if (headerTemplate) {
        <ng-template pTemplate="header">
          <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
        </ng-template>
      }
      @if (footerTemplate) {
        <ng-template pTemplate="footer">
          <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
        </ng-template>
      }
    </p-multiselect>
  `,
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() options: any[] | null | undefined;
  @Input() optionLabel: string | undefined;
  @Input() optionValue: string | undefined;
  @Input() optionGroupLabel: string | undefined;
  @Input() optionGroupChildren = 'items';
  @Input() group = false;
  @Input() placeholder = '';
  @Input() size: MultiSelectSize = 'base';
  @Input() display: MultiSelectDisplay = 'comma';
  @Input() filter = false;
  @Input() showClear = false;
  @Input() readonly = false;
  @Input() loading = false;
  @Input() inputId: string | undefined;
  @Input() appendTo: any = 'body';
  @Input() maxSelectedLabels = 3;
  @Input() selectedItemsLabel = 'Выбрано {0}';
  @Input() emptyMessage = 'Нет данных';
  @Input() emptyFilterMessage = 'Результаты не найдены';
  @Input() optionTemplate: TemplateRef<any> | null = null;
  @Input() selectedItemsTemplate: TemplateRef<any> | null = null;
  @Input() optionGroupTemplate: TemplateRef<any> | null = null;
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() footerTemplate: TemplateRef<any> | null = null;

  disabled = false;
  modelValue: any[] = [];

  @Output() onClear = new EventEmitter<Event>();
  @Output() onFilter = new EventEmitter<any>();
  @Output() onShow = new EventEmitter<Event>();
  @Output() onHide = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  readonly filterPt = {
    pcFilterContainer: { root: { class: 'p-iconfield p-multiselect-filter-container' } },
    pcFilter: { root: { class: 'p-inputtext-sm' } },
    pcFilterIconContainer: { root: { class: 'p-inputicon' } },
  };

  get invalid(): boolean {
    return !!(this._ngControl?.invalid && this._ngControl?.touched);
  }

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get multiSelectClasses(): Record<string, boolean> {
    return {
      'p-multiselect-xlg': this.size === 'xlarge',
      'p-invalid': this.invalid,
    };
  }

  private _onChange: (value: any[]) => void = () => {};
  private _onTouched: () => void = () => {};

  onMultiSelectChange(event: { value: any[] }): void {
    this.modelValue = event.value;
    this._onChange(event.value);
  }

  handleBlur(event: Event): void {
    this._onTouched();
    this.onBlur.emit(event);
  }

  writeValue(value: any[]): void {
    this.modelValue = value ?? [];
  }

  registerOnChange(fn: (value: any[]) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
