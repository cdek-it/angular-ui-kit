import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputMask } from 'primeng/inputmask';

export type InputMaskSize = 'small' | 'base' | 'large' | 'xlarge';
export type InputMaskVariant = 'outlined' | 'filled';

@Component({
  selector: 'input-mask',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMask, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true,
    },
  ],
  host: {
    style: 'display: block',
    '[class.input-mask-xlg]': 'size === "xlarge"',
  },
  template: `
    <p-inputmask
      [size]="primeSize"
      [mask]="mask"
      [slotChar]="slotChar"
      [autoClear]="autoClear"
      [showClear]="showClear"
      [unmask]="unmask"
      [disabled]="disabled"
      [readonly]="readonly"
      [invalid]="invalid"
      [placeholder]="placeholder"
      [fluid]="fluid"
      [variant]="variant === 'filled' ? 'filled' : undefined"
      [characterPattern]="characterPattern"
      [keepBuffer]="keepBuffer"
      [autocomplete]="autocomplete"
      [(ngModel)]="modelValue"
      (ngModelChange)="onModelChange($event)"
      (onComplete)="onComplete.emit($event)"
      (onFocus)="onFocusEvent.emit($event)"
      (onBlur)="onBlurEvent.emit($event)"
      (onInput)="onInputEvent.emit($event)"
      (onKeydown)="onKeydownEvent.emit($event)"
      (onClear)="onClearEvent.emit($event)"
    ></p-inputmask>
  `,
})
export class InputMaskComponent implements ControlValueAccessor {
  @Input() mask = '';
  @Input() slotChar = '_';
  @Input() autoClear = true;
  @Input() showClear = false;
  @Input() unmask = false;
  @Input() placeholder = '';
  @Input() size: InputMaskSize = 'base';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input() fluid = false;
  @Input() variant: InputMaskVariant = 'outlined';
  @Input() characterPattern = '[A-Za-z]';
  @Input() keepBuffer = false;
  @Input() autocomplete = '';

  @Output() onComplete = new EventEmitter<void>();
  @Output() onFocusEvent = new EventEmitter<Event>();
  @Output() onBlurEvent = new EventEmitter<Event>();
  @Output() onInputEvent = new EventEmitter<Event>();
  @Output() onKeydownEvent = new EventEmitter<Event>();
  @Output() onClearEvent = new EventEmitter<void>();

  modelValue: string | null = null;

  private _onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  onModelChange(value: string | null): void {
    this.modelValue = value;
    this._onChange(value);
  }

  writeValue(value: string | null): void {
    this.modelValue = value ?? null;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
