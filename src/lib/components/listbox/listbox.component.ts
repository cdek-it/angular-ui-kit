import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { Listbox, ListboxChangeEvent } from 'primeng/listbox';

@Component({
  selector: 'listbox',
  standalone: true,
  imports: [Listbox, FormsModule],
  template: `
    <p-listbox
      [options]="options"
      [(ngModel)]="modelValue"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [multiple]="multiple"
      [filter]="filter"
      [filterPlaceHolder]="filterPlaceHolder"
      [checkmark]="checkmark"
      [group]="group"
      [optionGroupLabel]="optionGroupLabel"
      [optionGroupChildren]="optionGroupChildren"
      [scrollHeight]="scrollHeight"
      [emptyMessage]="emptyMessage"
      [disabled]="isDisabled"
      (onChange)="onChangeHandler($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-listbox>
  `,
})
export class ListboxComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue: string | undefined = undefined;
  @Input() multiple = false;
  @Input() filter = false;
  @Input() filterPlaceHolder: string | undefined = undefined;
  @Input() checkmark = false;
  @Input() group = false;
  @Input() optionGroupLabel: string | undefined = undefined;
  @Input() optionGroupChildren: string | undefined = undefined;
  @Input() scrollHeight = '200px';
  @Input() emptyMessage: string | undefined = undefined;

  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  modelValue: any = null;

  private _disabled = false;
  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (ngControl) ngControl.valueAccessor = this;
  }

  get isDisabled(): boolean {
    return this._disabled;
  }

  onChangeHandler(event: ListboxChangeEvent): void {
    this._onChange(event.value);
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
    this._disabled = isDisabled;
  }
}
