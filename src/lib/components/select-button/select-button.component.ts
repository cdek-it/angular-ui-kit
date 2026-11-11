import {
  booleanAttribute,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { SelectButton, SelectButtonChangeEvent } from 'primeng/selectbutton';
import { SharedModule } from 'primeng/api';

export interface ExtraSelectButtonOption {
  name: string;
  code: string | number;
  icon?: string;
  disabled?: boolean;
}

export interface ExtraSelectButtonChangeEvent {
  value: any;
  originalEvent?: Event;
}

export type ExtraSelectButtonSize = 'small' | 'base' | 'large' | 'xlarge';

@Component({
  selector: 'extra-select-button',
  standalone: true,
  imports: [SelectButton, SharedModule, FormsModule],
  // В обычном режиме хост остаётся inline (группа встаёт в строку рядом с другими элементами).
  // В режиме fluid делаем его блоком: сам p-selectbutton — inline-flex, и без блочного хоста
  // его width: 100% считается не от контейнера-родителя.
  host: {
    '[style.display]': "fluid ? 'block' : null"
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraSelectButtonComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExtraSelectButtonComponent),
      multi: true
    }
  ],
  template: `
    <!-- Ступень xlg навешивается классом на корень: styleClass в PrimeNG 20 на корне
         p-selectbutton не остаётся, а раздаётся вниз каждому p-togglebutton, и стили
         ступени (.p-selectbutton-xlarge .p-togglebutton) не находят свой корень. -->
    <p-selectbutton
      [options]="options"
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
      (onChange)="onChangeHandler($event)"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [optionDisabled]="optionDisabled"
      [multiple]="multiple"
      [allowEmpty]="allowEmpty"
      [disabled]="isDisabled"
      [size]="primeSize"
      [fluid]="fluid"
      [ariaLabelledBy]="ariaLabelledBy"
      [autofocus]="autofocus"
      [tabindex]="tabindex ?? 0"
      [pt]="selectButtonPt"
      [class.p-selectbutton-xlarge]="size === 'xlarge'"
    >
      <ng-template pTemplate="item" let-item>
        @if ($any(item)['icon']) {
          <i [class]="$any(item)['icon']"></i>
        }
        <span>{{ $any(item)[optionLabel] }}</span>
      </ng-template>
    </p-selectbutton>
  `
})
export class ExtraSelectButtonComponent implements ControlValueAccessor, OnChanges, Validator {
  @Input() options: ExtraSelectButtonOption[] | any[] = [];
  @Input() optionLabel = 'name';
  @Input() optionValue = 'code';
  @Input() optionDisabled = 'disabled';
  @Input() size: ExtraSelectButtonSize = 'base';
  @Input() multiple = false;
  @Input() allowEmpty = true;
  /** Растягивает группу на всю доступную ширину контейнера, сегменты делят её поровну. */
  @Input() fluid = false;
  /** Поле обязательно для заполнения; в Angular работает как NG_VALIDATORS-валидатор. */
  @Input({ transform: booleanAttribute }) required = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @Input() tabindex: number | undefined = undefined;

  private _onValidatorChange: () => void = () => {};

  /** NG_VALIDATORS: `[required]="true"` делает контрол невалидным, пока значение не выбрано. */
  validate(control: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.required(control) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) this._onValidatorChange();
  }

  /** aria-label у p-selectbutton нет — атрибут на корень группы через pt-секцию root. */
  get selectButtonPt() {
    return { root: { 'aria-label': this.ariaLabel || undefined } };
  }

  @Output() onChange = new EventEmitter<ExtraSelectButtonChangeEvent>();

  value: any = null;

  private _disabled = false;
  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  get isDisabled(): boolean {
    return this._disabled;
  }

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  writeValue(value: any): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  onValueChange(newValue: any): void {
    this.value = newValue;
    this._onChange(newValue);
    this._onTouched();
  }

  onChangeHandler(event: SelectButtonChangeEvent): void {
    this.onChange.emit({ value: event.value, originalEvent: event.originalEvent });
  }
}
