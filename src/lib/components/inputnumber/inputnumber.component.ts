import { Component, EventEmitter, forwardRef, inject, Injector, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';
import { SharedModule } from 'primeng/api';

export type InputNumberSize = 'small' | 'base' | 'large' | 'xlarge';
export type InputNumberButtonLayout = 'stacked' | 'horizontal' | 'vertical';

@Component({
  selector: 'extra-input-number',
  standalone: true,
  imports: [InputNumber, SharedModule, FormsModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraInputNumberComponent),
      multi: true
    }
  ],
  template: `
    <p-inputNumber
      [ngClass]="sizeClass"
      [inputStyleClass]="inputSizeClass"
      [showButtons]="showButtons"
      [buttonLayout]="buttonLayout"
      [mode]="mode"
      [currency]="currency"
      [locale]="locale"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [invalid]="invalid"
      [readonly]="readonly"
      [fluid]="fluid"
      [min]="min"
      [max]="max"
      [step]="step"
      [prefix]="prefix"
      [suffix]="suffix"
      [minFractionDigits]="minFractionDigits"
      [maxFractionDigits]="maxFractionDigits"
      [useGrouping]="useGrouping"
      [incrementButtonIcon]="incrementButtonIcon"
      [decrementButtonIcon]="decrementButtonIcon"
      [ngModel]="modelValue"
      (ngModelChange)="onModelChange($event)"
      (onBlur)="onTouched()"
    >
      @if (!incrementButtonIcon) {
        <ng-template pTemplate="incrementbuttonicon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </ng-template>
      }
      @if (!decrementButtonIcon) {
        <ng-template pTemplate="decrementbuttonicon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14" />
          </svg>
        </ng-template>
      }
    </p-inputNumber>
  `
})
export class ExtraInputNumberComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() size: InputNumberSize = 'base';
  @Input() showButtons = false;
  @Input() buttonLayout: InputNumberButtonLayout = 'stacked';
  @Input() mode = 'decimal';
  @Input() currency: string | undefined;
  @Input() locale: string | undefined;
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() fluid = false;
  @Input() min: number | undefined;
  @Input() max: number | undefined;
  @Input() step = 1;
  @Input() prefix: string | undefined;
  @Input() suffix: string | undefined;
  @Input() minFractionDigits: number | undefined;
  @Input() maxFractionDigits: number | undefined;
  @Input() useGrouping = true;
  @Input() incrementButtonIcon: string | undefined;
  @Input() decrementButtonIcon: string | undefined;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  @Output() onInput = new EventEmitter<{ value: number | null }>();

  modelValue: number | null = null;

  private _onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  get inputSizeClass(): string {
    if (this.size === 'small') return 'p-inputtext-sm';
    if (this.size === 'large' || this.size === 'xlarge') return 'p-inputtext-lg';
    return '';
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-inputnumber-xlg': this.size === 'xlarge' };
  }

  onModelChange(value: number | null): void {
    this.modelValue = value;
    this._onChange(value);
    this.onInput.emit({ value });
  }

  writeValue(value: number | null): void {
    this.modelValue = value ?? null;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
