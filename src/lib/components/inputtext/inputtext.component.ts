import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

export type InputTextSize = 'small' | 'base' | 'large' | 'xlarge';


@Component({
  selector: 'input-text',
  standalone: true,
  imports: [InputText, IconField, InputIcon, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  template: `
    @if (showClear) {
      <p-iconfield [ngClass]="{'!w-full': fluid}">
        <input
          pInputText
          [ngClass]="sizeClass"
          [pSize]="primeSize"
          [disabled]="disabled"
          [readOnly]="readonly"
          [invalid]="invalid"
          [placeholder]="placeholder"
          [fluid]="fluid"
          [value]="modelValue"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
        <p-inputicon
          class="ti ti-x"
          tabindex="0"
          [style.visibility]="modelValue ? 'visible' : 'hidden'"
          [style.pointerEvents]="modelValue ? 'auto' : 'none'"
          (click)="clearValue()"
          (keydown.enter)="clearValue()"
          (keydown.space)="clearValue()"
        ></p-inputicon>
      </p-iconfield>
    } @else {
      <input
        pInputText
        [ngClass]="sizeClass"
        [pSize]="primeSize"
        [disabled]="disabled"
        [readOnly]="readonly"
        [invalid]="invalid"
        [placeholder]="placeholder"
        [fluid]="fluid"
        [value]="modelValue"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
    }
  `,
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() size: InputTextSize = 'base';
  @Input() readonly = false;
  @Input() showClear = false;
  @Input() fluid = false;

  disabled = false;
  invalid = false;

  @Output() onClear = new EventEmitter<void>();

  modelValue = '';

  private _onChange: (value: string) => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-inputtext-xlg': this.size === 'xlarge' };
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.modelValue = value;
    this._onChange(value);
  }

  onTouched: () => void = () => {};

  clearValue(): void {
    this.modelValue = '';
    this._onChange('');
    this.onClear.emit();
  }

  writeValue(value: string): void {
    this.modelValue = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
