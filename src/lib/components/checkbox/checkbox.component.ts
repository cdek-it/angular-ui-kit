import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  viewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Checkbox, CheckboxChangeEvent } from 'primeng/checkbox';
import { ExtraCaptionComponent } from '../caption/caption.component';

export type ExtraCheckboxLabelPosition = 'right' | 'left';

export interface ExtraCheckboxChangeEvent {
  checked: boolean;
  originalEvent: Event;
}

let nextInputId = 0;

@Component({
  selector: 'extra-checkbox',
  standalone: true,
  imports: [Checkbox, FormsModule, NgTemplateOutlet, ExtraCaptionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraCheckboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExtraCheckboxComponent),
      multi: true
    }
  ],
  template: `
    @if (label || caption) {
      <div class="extra-checkbox" [class.extra-checkbox--left]="labelPosition === 'left'">
        <ng-container [ngTemplateOutlet]="fieldTpl" />
        <div class="extra-checkbox-body">
          @if (label) {
            <label class="checkbox-label" [class.checkbox-label--disabled]="disabled" [for]="inputId">{{
              label
            }}</label>
          }
          @if (caption) {
            <extra-caption class="checkbox-caption" [id]="inputId + '-caption'">{{ caption }}</extra-caption>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #fieldTpl>
      <p-checkbox
        [binary]="true"
        [(ngModel)]="modelValue"
        [disabled]="disabled"
        [readonly]="readonly"
        [indeterminate]="indeterminate"
        [invalid]="invalid"
        [inputId]="inputId"
        [ariaLabel]="ariaLabel || (!label ? 'Выбор' : undefined)"
        [pt]="{ input: { 'aria-describedby': caption ? inputId + '-caption' : undefined } }"
        [ariaLabelledBy]="ariaLabelledBy"
        [tabindex]="disabled ? -1 : tabindex"
        (onChange)="onChangeHandler($event)"
        (onBlur)="markTouched()"
      ></p-checkbox>
    </ng-template>
  `
})
export class ExtraCheckboxComponent implements ControlValueAccessor, OnInit, OnChanges, Validator {
  private readonly _injector = inject(Injector);
  private readonly cdr = inject(ChangeDetectorRef);
  private _ngControl: NgControl | null = null;
  private readonly _checkbox = viewChild(Checkbox);

  constructor() {
    afterNextRender(() => {
      if (this.autofocus && !this.disabled) this._checkbox()?.focus();
    });
  }

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() label = '';
  @Input() labelPosition: ExtraCheckboxLabelPosition = 'right';
  @Input() caption = '';
  @Input({ transform: booleanAttribute }) indeterminate = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  /** Поле обязательно для заполнения (должно быть отмечено); в Angular работает как NG_VALIDATORS-валидатор. */
  @Input({ transform: booleanAttribute }) required = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @Input() tabindex: number | undefined = undefined;

  private _onValidatorChange: () => void = () => {};

  /** NG_VALIDATORS: `[required]="true"` делает контрол невалидным, пока чекбокс не отмечен. */
  validate(control: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.requiredTrue(control) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) this._onValidatorChange();
  }

  @Output() onChange = new EventEmitter<ExtraCheckboxChangeEvent>();

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-checkbox-${nextInputId++}`;

  disabled = false;
  modelValue = false;

  get invalid(): boolean {
    return !!(this._ngControl?.invalid && (this._ngControl.touched || this._ngControl.dirty));
  }

  private _onChange: (value: boolean) => void = () => {};
  private _onTouched: () => void = () => {};

  onChangeHandler(event: CheckboxChangeEvent): void {
    const checked = !!event.checked;
    this.modelValue = checked;
    this._onChange(checked);
    this._onTouched();
    this.onChange.emit({ checked, originalEvent: event.originalEvent as Event });
  }

  markTouched(): void {
    this._onTouched();
  }

  writeValue(value: boolean): void {
    this.modelValue = !!value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
