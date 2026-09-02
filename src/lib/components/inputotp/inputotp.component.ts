import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputOtp, InputOtpChangeEvent } from 'primeng/inputotp';

export interface ExtraInputOtpChangeEvent {
  value: string;
  originalEvent: Event;
}

@Component({
  selector: 'extra-input-otp',
  standalone: true,
  imports: [InputOtp, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraInputOtpComponent),
      multi: true
    }
  ],
  template: `
    <p-inputotp
      [length]="length"
      [mask]="mask"
      [integerOnly]="integerOnly"
      [disabled]="disabled"
      [invalid]="invalid"
      [formControl]="control"
      (onChange)="onChangeHandler($event)"
    ></p-inputotp>
  `
})
export class ExtraInputOtpComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private _ngControl: NgControl | null = null;

  readonly control = new FormControl<string | null>(null);

  @Input() length = 4;
  @Input() mask = false;
  @Input() integerOnly = false;

  disabled = false;

  @Output() onChange = new EventEmitter<ExtraInputOtpChangeEvent>();

  private _onChange: (value: string | null) => void = () => {};
  private _onTouched: () => void = () => {};

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });

    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
      this._onChange(v);
      this._onTouched();
    });
  }

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  onChangeHandler(event: InputOtpChangeEvent): void {
    this.onChange.emit({ value: event.value, originalEvent: event.originalEvent as Event });
  }

  writeValue(value: string | null): void {
    this.control.setValue(value ?? null, { emitEvent: false });
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    isDisabled ? this.control.disable({ emitEvent: false }) : this.control.enable({ emitEvent: false });
  }
}
