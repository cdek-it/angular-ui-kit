import { Component, DestroyRef, inject, Injector, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { InputOtp, InputOtpChangeEvent } from 'primeng/inputotp';

export type InputOtpSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'input-otp',
  standalone: true,
  imports: [InputOtp, ReactiveFormsModule, NgClass],
  template: `
    <p-inputotp
      [length]="length"
      [mask]="mask"
      [integerOnly]="integerOnly"
      [readonly]="readonly"
      [invalid]="invalid"
      [size]="primeSize"
      [ngClass]="sizeClass"
      [tabindex]="tabindex"
      [autofocus]="autofocus"
      [formControl]="control"
      (onChange)="onChangeHandler($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    ></p-inputotp>
  `,
})
export class InputOtpComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private _ngControl: NgControl | null = null;

  readonly control = new FormControl<any>(null);

  @Input() length = 4;
  @Input() mask = false;
  @Input() integerOnly = false;
  @Input() readonly = false;
  @Input() size: InputOtpSize = 'base';
  @Input() tabindex: number | null = null;
  @Input() autofocus = false;

  @Output() onChange = new EventEmitter<InputOtpChangeEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });

    this.control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => {
        this._onChange(v);
        this._onTouched();
      });
  }

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-inputotp-xlg': this.size === 'xlarge' };
  }

  onChangeHandler(event: InputOtpChangeEvent): void {
    this.onChange.emit(event);
  }

  writeValue(value: any): void {
    this.control.setValue(value ?? null, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable({ emitEvent: false }) : this.control.enable({ emitEvent: false });
  }
}
