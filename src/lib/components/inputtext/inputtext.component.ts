import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

export type ExtraInputTextSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'extra-input-text',
  standalone: true,
  imports: [InputText, IconField, InputIcon, NgClass],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraInputTextComponent),
      multi: true
    }
  ],
  template: `
    @if (showClear) {
      <p-iconfield [ngClass]="{ '!w-full': fluid }">
        <input
          pInputText
          [ngClass]="sizeClass"
          [pSize]="primeSize!"
          [disabled]="disabled"
          [readOnly]="readonly"
          [invalid]="invalid"
          [attr.placeholder]="placeholder || null"
          [fluid]="fluid"
          [value]="modelValue"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
        <p-inputicon
          class="ti ti-x"
          [attr.tabindex]="clearEnabled ? 0 : -1"
          [style.visibility]="clearEnabled ? 'visible' : 'hidden'"
          [style.pointerEvents]="clearEnabled ? 'auto' : 'none'"
          (click)="clearValue()"
          (keydown.enter)="clearValue()"
          (keydown.space)="clearValue()"
        ></p-inputicon>
      </p-iconfield>
    } @else {
      <input
        pInputText
        [ngClass]="sizeClass"
        [pSize]="primeSize!"
        [disabled]="disabled"
        [readOnly]="readonly"
        [invalid]="invalid"
        [attr.placeholder]="placeholder || null"
        [fluid]="fluid"
        [value]="modelValue"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
    }
  `
})
export class ExtraInputTextComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private readonly _cdr = inject(ChangeDetectorRef);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder = '';
  @Input() size: ExtraInputTextSize = 'base';
  @Input() readonly = false;
  @Input({ transform: booleanAttribute }) showClear = false;
  @Input() fluid = false;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  get clearEnabled(): boolean {
    return !!this.modelValue && !this.disabled && !this.readonly;
  }

  @Output() onClear = new EventEmitter<void>();

  modelValue = '';

  private _onChange: (value: string) => void = () => {};

  get primeSize(): 'small' | 'large' | never {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined as never;
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
    if (!this.clearEnabled) return;

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
    // FormControl.disable() приходит вне цикла проверки хоста: при OnPush у родителя
    // без markForCheck поле остаётся активным на экране.
    this._cdr.markForCheck();
  }
}
