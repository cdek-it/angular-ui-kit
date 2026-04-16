import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ToggleButton, ToggleButtonChangeEvent } from 'primeng/togglebutton';

export type ToggleButtonSize = 'sm' | 'base' | 'lg' | 'xlg';

@Component({
  selector: 'toggle-button',
  standalone: true,
  imports: [ToggleButton, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    },
  ],
  template: `
    <p-togglebutton
      [ngClass]="extraClasses"
      [onLabel]="onLabel"
      [offLabel]="offLabel"
      [onIcon]="onIcon"
      [offIcon]="offIcon"
      [iconPos]="iconPos"
      [size]="primeSize"
      [disabled]="disabled"
      [allowEmpty]="allowEmpty"
      [fluid]="fluid"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [inputId]="inputId"
      [tabindex]="tabindex"
      [autofocus]="autofocus"
      [(ngModel)]="modelValue"
      (onChange)="onChangeHandler($event)"
    ></p-togglebutton>
  `,
})
export class ToggleButtonComponent implements ControlValueAccessor {
  @Input() onLabel = 'Вкл';
  @Input() offLabel = 'Выкл';
  @Input() onIcon: string | undefined = undefined;
  @Input() offIcon: string | undefined = undefined;
  @Input() iconPos: 'left' | 'right' = 'left';
  @Input() size: ToggleButtonSize = 'base';
  @Input() disabled = false;
  @Input() iconOnly = false;
  @Input() allowEmpty: boolean | undefined = undefined;
  @Input() fluid = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() inputId: string | undefined = undefined;
  @Input() tabindex: number | undefined = undefined;
  @Input() autofocus: boolean | undefined = undefined;

  @Output() onChange = new EventEmitter<ToggleButtonChangeEvent>();

  modelValue = false;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'sm') return 'small';
    if (this.size === 'lg' || this.size === 'xlg') return 'large';
    return undefined;
  }

  get extraClasses(): Record<string, boolean> {
    return {
      'p-togglebutton-xlg': this.size === 'xlg',
      'p-togglebutton-icon-only': this.iconOnly,
    };
  }

  onChangeHandler(event: ToggleButtonChangeEvent): void {
    this._onChange(event.checked);
    this._onTouched();
    this.onChange.emit(event);
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
