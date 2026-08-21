import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { SelectButton, SelectButtonChangeEvent } from 'primeng/selectbutton';
import { SharedModule } from 'primeng/api';

export interface ExtraSelectButtonOption {
  name: string;
  code: string | number;
  icon?: string;
  disabled?: boolean;
}

export interface ExtraSelectButtonChangeEvent {
  value: any;
  originalEvent?: Event;
}

export type ExtraSelectButtonSize = 'small' | 'base' | 'large' | 'xLarge';

@Component({
  selector: 'extra-select-button',
  standalone: true,
  imports: [SelectButton, SharedModule, FormsModule, NgClass],
  template: `
    <p-selectbutton
      [options]="options"
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
      (onChange)="onChangeHandler($event)"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [optionDisabled]="optionDisabled"
      [multiple]="multiple"
      [allowEmpty]="allowEmpty"
      [disabled]="isDisabled"
      [ngClass]="sizeClass"
    >
      <ng-template pTemplate="item" let-item>
        @if ($any(item)['icon']) {
          <i [class]="$any(item)['icon']"></i>
        }
        <span>{{ $any(item)[optionLabel] }}</span>
      </ng-template>
    </p-selectbutton>
  `,
})
export class ExtraSelectButtonComponent implements ControlValueAccessor {
  @Input() options: ExtraSelectButtonOption[] | any[] = [];
  @Input() optionLabel = 'name';
  @Input() optionValue = 'code';
  @Input() optionDisabled = 'disabled';
  @Input() size: ExtraSelectButtonSize = 'base';
  @Input() multiple = false;
  @Input() allowEmpty = true;

  @Output() onChange = new EventEmitter<ExtraSelectButtonChangeEvent>();

  value: any = null;

  private _disabled = false;
  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (ngControl) ngControl.valueAccessor = this;
  }

  get isDisabled(): boolean {
    return this._disabled;
  }

  get sizeClass(): string {
    const sizeMap: Record<ExtraSelectButtonSize, string> = {
      small: 'p-selectbutton-small',
      base: '',
      large: 'p-selectbutton-large',
      xLarge: 'p-selectbutton-xlarge',
    };
    return sizeMap[this.size] ?? '';
  }

  writeValue(value: any): void {
    this.value = value ?? null;
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

  onValueChange(newValue: any): void {
    this.value = newValue;
    this._onChange(newValue);
    this._onTouched();
  }

  onChangeHandler(event: SelectButtonChangeEvent): void {
    this.onChange.emit({ value: event.value, originalEvent: event.originalEvent });
  }
}
