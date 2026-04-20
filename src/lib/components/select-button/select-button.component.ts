import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { SharedModule } from 'primeng/api';

export interface SelectButtonItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'select-button',
  standalone: true,
  imports: [SelectButton, SharedModule, FormsModule, NgClass],
  template: `
    <p-selectbutton
      [options]="options"
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [optionDisabled]="optionDisabled"
      [multiple]="multiple"
      [allowEmpty]="allowEmpty"
      [disabled]="isDisabled"
      [ngClass]="sizeClass"
    >
      <ng-template pTemplate="item" let-item>
        @if (item['icon']) {
          <i [class]="item['icon']"></i>
        }
        <span>{{ item[optionLabel] }}</span>
      </ng-template>
    </p-selectbutton>
  `,
})
export class SelectButtonComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  @Input() optionDisabled = 'disabled';
  @Input() size: 'default' | 'sm' | 'lg' | 'xlg' = 'default';
  @Input() multiple = false;
  @Input() allowEmpty = true;

  @Output() valueChange = new EventEmitter<string | string[]>();

  value: string | string[] = '';

  private _disabled = false;
  private onChange = (_: string | string[]) => {};
  private onTouched = () => {};

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (ngControl) ngControl.valueAccessor = this;
  }

  get isDisabled(): boolean {
    return this._disabled;
  }

  get sizeClass(): string {
    return this.size === 'default' ? '' : `p-selectbutton-${this.size}`;
  }

  writeValue(value: string | string[]): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  onValueChange(newValue: string | string[]): void {
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
    this.valueChange.emit(newValue);
  }
}
