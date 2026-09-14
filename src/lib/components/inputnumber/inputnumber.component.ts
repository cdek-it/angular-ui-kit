import { Component, EventEmitter, forwardRef, inject, Injector, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { SharedModule } from 'primeng/api';
import type { InputNumberInputEvent } from 'primeng/types/inputnumber';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';

export type ExtraInputNumberSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraInputNumberButtonLayout = 'stacked' | 'horizontal' | 'vertical';
export type ExtraInputNumberLabelPosition = 'top' | 'left';
export type ExtraInputNumberInputEvent = InputNumberInputEvent;

let nextInputId = 0;

@Component({
  selector: 'extra-input-number',
  standalone: true,
  imports: [InputNumber, SharedModule, FormsModule, NgClass, NgTemplateOutlet, FloatLabel, ExtraTooltipDirective],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraInputNumberComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где input обязан быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-inputnumber" [class.extra-inputnumber--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-inputnumber-body">
          @if (label && labelPosition === 'top' && !floatLabel) {
            <ng-container [ngTemplateOutlet]="labelTpl" />
          }
          @if (floatLabel) {
            <p-floatlabel variant="in">
              <ng-container [ngTemplateOutlet]="fieldTpl" />
              @if (label) {
                <ng-container [ngTemplateOutlet]="labelTpl" />
              }
            </p-floatlabel>
          } @else {
            <ng-container [ngTemplateOutlet]="fieldTpl" />
          }
          @if (caption) {
            <div class="extra-inputnumber-caption">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-inputnumber-label" [for]="inputId">
        {{ label }}
        @if (info) {
          <i class="extra-inputnumber-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #fieldTpl>
      <p-inputNumber
        [ngClass]="sizeClass"
        [inputStyleClass]="inputSizeClass"
        [inputId]="inputId"
        [showButtons]="showButtons && !floatLabel"
        [buttonLayout]="buttonLayout"
        [mode]="mode"
        [currency]="currency"
        [locale]="locale"
        [attr.placeholder]="placeholder || null"
        [disabled]="disabled"
        [invalid]="invalid"
        [readonly]="readonly"
        [fluid]="fluid"
        [min]="min"
        [max]="max"
        [step]="step"
        [prefix]="prefix"
        [suffix]="suffix"
        [showClear]="clearable"
        [minFractionDigits]="minFractionDigits"
        [maxFractionDigits]="maxFractionDigits"
        [useGrouping]="useGrouping"
        [incrementButtonIcon]="incrementButtonIcon"
        [decrementButtonIcon]="decrementButtonIcon"
        [ngModel]="modelValue"
        (onInput)="handleInput($event)"
        (onClear)="handleClear()"
        (onBlur)="onTouched()"
      >
        @if (!incrementButtonIcon) {
          <ng-template pTemplate="incrementbuttonicon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </ng-template>
        }
        @if (!decrementButtonIcon) {
          <ng-template pTemplate="decrementbuttonicon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
          </ng-template>
        }
      </p-inputNumber>
    </ng-template>
  `
})
export class ExtraInputNumberComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder = '';
  @Input() label = '';
  @Input() labelPosition: ExtraInputNumberLabelPosition = 'top';
  @Input() floatLabel = false;
  @Input() clearable = false;
  @Input() caption = '';
  @Input() info = '';
  @Input() size: ExtraInputNumberSize = 'base';
  @Input() showButtons = false;
  @Input() buttonLayout: ExtraInputNumberButtonLayout = 'stacked';
  @Input() mode = 'decimal';
  @Input() currency: string | undefined;
  @Input() locale: string | undefined;
  @Input() readonly = false;
  @Input() fluid = false;
  @Input() min: number | undefined;
  @Input() max: number | undefined;
  @Input() step = 1;
  @Input() prefix: string | undefined;
  @Input() suffix: string | undefined;
  @Input() minFractionDigits: number | undefined;
  @Input() maxFractionDigits: number | undefined;
  @Input() useGrouping = true;
  @Input() incrementButtonIcon: string | undefined;
  @Input() decrementButtonIcon: string | undefined;

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-input-number-${nextInputId++}`;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  get inputSizeClass(): string {
    if (this.size === 'small') return 'p-inputtext-sm';
    if (this.size === 'large' || this.size === 'xlarge') return 'p-inputtext-lg';
    return '';
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-inputnumber-xlg': this.size === 'xlarge' };
  }

  @Output() onInput = new EventEmitter<ExtraInputNumberInputEvent>();
  @Output() onClear = new EventEmitter<void>();

  modelValue: number | null = null;

  private _onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  handleInput(event: ExtraInputNumberInputEvent): void {
    this.modelValue = event.value;
    this._onChange(event.value);
    this.onInput.emit(event);
  }

  handleClear(): void {
    this.modelValue = null;
    this._onChange(null);
    this.onClear.emit();
  }

  writeValue(value: number | null): void {
    this.modelValue = value ?? null;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
