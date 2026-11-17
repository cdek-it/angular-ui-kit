import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputOtp, InputOtpChangeEvent } from 'primeng/inputotp';

export type ExtraInputOtpSize = 'small' | 'base' | 'large';

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
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExtraInputOtpComponent),
      multi: true
    }
  ],
  template: `
    <p-inputotp
      [length]="length"
      [mask]="mask"
      [integerOnly]="integerOnly"
      [autofocus]="autofocus && !disabled"
      [readonly]="readonly"
      [tabindex]="disabled ? -1 : (tabindex ?? null)"
      [pt]="inputOtpPt"
      [size]="primeSize"
      [invalid]="invalid"
      [formControl]="control"
      (onChange)="onChangeHandler($event)"
      (onBlur)="markTouched()"
    ></p-inputotp>
  `
})
export class ExtraInputOtpComponent implements ControlValueAccessor, OnInit, OnChanges, Validator {
  private readonly _injector = inject(Injector);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private _ngControl: NgControl | null = null;
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const host = this.element.nativeElement;
      const paste = (event: ClipboardEvent) => this.handlePaste(event);
      host.addEventListener('paste', paste, { capture: true });
      this.destroyRef.onDestroy(() => host.removeEventListener('paste', paste, { capture: true }));
    });
  }

  readonly control = new FormControl<string | null>(null);

  @Input() length = 4;
  @Input({ transform: booleanAttribute }) mask = false;
  @Input({ transform: booleanAttribute }) integerOnly = false;
  /** Автофокус на первой ячейке при инициализации. */
  @Input({ transform: booleanAttribute }) autofocus = false;
  /** Размер ячейки. */
  @Input() size: ExtraInputOtpSize = 'base';
  @Input({ transform: booleanAttribute }) readonly = false;
  /** Поле обязательно для заполнения; в Angular работает как NG_VALIDATORS-валидатор. */
  @Input({ transform: booleanAttribute }) required = false;
  @Input() name: string | undefined = undefined;
  @Input() autocomplete: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() tabindex: number | undefined = undefined;

  private _onValidatorChange: () => void = () => {};

  /**
   * name/autocomplete/aria-* у p-inputotp нет — атрибуты на каждую ячейку-input
   * через pt-секцию pcInputText.root.
   */
  get inputOtpPt() {
    return {
      pcInputText: {
        root: {
          name: this.name || undefined,
          // PrimeNG типизирует autocomplete как union AutoFill; наш API принимает произвольную строку.
          autocomplete: (this.autocomplete || undefined) as never,
          'aria-label': this.ariaLabel || 'Одноразовый код',
          'aria-required': this.required || undefined,
          'aria-labelledby': this.ariaLabelledBy || undefined
        }
      }
    };
  }

  /** NG_VALIDATORS: `[required]="true"` делает контрол невалидным, пока код не введён. */
  validate(control: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.required(control) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) this._onValidatorChange();
    if (changes['length']) {
      afterNextRender(
        () => {
          this.control.setValue(this.control.value, { emitEvent: false });
          this._cdr.markForCheck();
        },
        { injector: this._injector }
      );
    }
  }

  disabled = false;

  /** PrimeNG знает только small/large; base — размер по умолчанию, без класса. */
  protected get primeSize(): 'small' | 'large' | undefined {
    return this.size === 'base' ? undefined : this.size;
  }

  @Output() onChange = new EventEmitter<ExtraInputOtpChangeEvent>();

  private _onChange: (value: string | null) => void = () => {};
  private _onTouched: () => void = () => {};

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });

    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
      this._onChange(v);
      this._onTouched();
    });

    /**
     * invalid — геттер поверх NgControl.invalid; на OnPush не пересчитывается сам по себе,
     * когда валидность меняется извне (Validators/updateValueAndValidity без локального события).
     */
    this._ngControl?.statusChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this._cdr.markForCheck());
  }

  get invalid(): boolean {
    return !!(this._ngControl?.invalid && (this._ngControl.touched || this._ngControl.dirty));
  }

  markTouched(): void {
    this._onTouched();
    this._cdr.markForCheck();
  }

  handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled || this.readonly) return;
    const text = event.clipboardData?.getData('text') ?? '';
    if (!text || (this.integerOnly && !/^\d+$/.test(text))) return;
    const value = text.slice(0, this.length);
    this.control.setValue(value);
    this.onChange.emit({ value, originalEvent: event });
    this._cdr.markForCheck();
  }

  onChangeHandler(event: InputOtpChangeEvent): void {
    this.onChange.emit({ value: event.value, originalEvent: event.originalEvent as Event });
  }

  writeValue(value: string | null): void {
    this.control.setValue(value ?? null, { emitEvent: false });
    this._cdr.markForCheck();
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
    this._cdr.markForCheck();
  }
}
