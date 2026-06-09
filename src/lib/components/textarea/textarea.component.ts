import {
  ChangeDetectionStrategy,
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
import { Textarea } from 'primeng/textarea';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

export type TextareaSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'extra-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, IconField, InputIcon, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraTextareaComponent),
      multi: true
    }
  ],
  template: `
    @if (showClear) {
      <p-iconfield [ngClass]="{ '!w-full': fluid }">
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
    }
  `
})
export class ExtraTextareaComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder = '';
  @Input() size: TextareaSize = 'base';
  @Input() readonly = false;
  @Input() showClear = false;
  @Input() fluid = false;
  @Input() autoResize = false;
  @Input() rows = 3;
  @Input() cols?: number;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  @Output() onResize = new EventEmitter<{ height: string } | {}>();
  @Output() onClear = new EventEmitter<void>();

  modelValue = '';

  private _onChange: (value: string) => void = () => {};

  get primeSize(): 'small' | 'large' | never {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined as never;
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
