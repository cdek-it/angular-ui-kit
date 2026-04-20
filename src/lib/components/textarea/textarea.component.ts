import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Textarea } from 'primeng/textarea';

export type TextareaSize = 'small' | 'base' | 'large' | 'xlarge';
export type TextareaVariant = 'outlined' | 'filled';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <textarea
      pTextarea
      [ngClass]="sizeClass"
      [pSize]="primeSize"
      [disabled]="disabled"
      [readOnly]="readonly"
      [invalid]="invalid"
      [fluid]="fluid"
      [autoResize]="autoResize"
      [rows]="rows"
      [cols]="cols"
      [placeholder]="placeholder"
      [value]="modelValue"
      (input)="onInput($event)"
      (blur)="onTouched()"
      (onResize)="onResize.emit($event)"
    ></textarea>
  `,
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() size: TextareaSize = 'base';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input() fluid = false;
  @Input() autoResize = false;
  @Input() rows = 3;
  @Input() cols?: number;
  @Input() variant: TextareaVariant = 'outlined';

  @Output() onResize = new EventEmitter<{ height: string }>();

  modelValue = '';

  private _onChange: (value: string) => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-textarea-xlg': this.size === 'xlarge' };
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.modelValue = value;
    this._onChange(value);
  }

  onTouched: () => void = () => {};

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
