import { ChangeDetectionStrategy, Component, DestroyRef, inject, Injector, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputMask } from 'primeng/inputmask';

export type InputMaskSize = 'small' | 'base' | 'large' | 'xlarge';


@Component({
  selector: 'input-mask',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMask, ReactiveFormsModule],
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
      [readonly]="readonly"
      [placeholder]="placeholder"
      [fluid]="fluid"

      [characterPattern]="characterPattern"
      [keepBuffer]="keepBuffer"
      [invalid]="invalid"
      [autocomplete]="autocomplete"
      [formControl]="control"
      (onComplete)="onComplete.emit($event)"
      (onFocus)="onFocusEvent.emit($event)"
      (onBlur)="onBlurEvent.emit($event)"
      (onInput)="onInputEvent.emit($event)"
      (onKeydown)="onKeydownEvent.emit($event)"
      (onClear)="onClearEvent.emit($event)"
    ></p-inputmask>
  `,
})
export class InputMaskComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private _ngControl: NgControl | null = null;

  readonly control = new FormControl<string | null>(null);

  @Input() mask = '';
  @Input() slotChar = '_';
  @Input() autoClear = true;
  @Input() showClear = false;
  @Input() unmask = false;
  @Input() placeholder = '';
  @Input() size: InputMaskSize = 'base';
  @Input() readonly = false;
  @Input() fluid = false;
  @Input() characterPattern = '[A-Za-z]';
  @Input() keepBuffer = false;
  @Input() autocomplete = '';

  @Output() onComplete = new EventEmitter<void>();
  @Output() onFocusEvent = new EventEmitter<Event>();
  @Output() onBlurEvent = new EventEmitter<Event>();
  @Output() onInputEvent = new EventEmitter<Event>();
  @Output() onKeydownEvent = new EventEmitter<Event>();
  @Output() onClearEvent = new EventEmitter<void>();

  private _onChange: (value: string | null) => void = () => {};
  private _onTouched: () => void = () => {};

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });

    this.control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => this._onChange(v));
  }

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
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
    isDisabled ? this.control.disable({ emitEvent: false }) : this.control.enable({ emitEvent: false });
  }
}
