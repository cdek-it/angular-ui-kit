import {
  booleanAttribute,
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
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraTooltipDirective } from '../tooltip/tooltip.directive';

export type ExtraInputTextSize = 'sm' | 'base' | 'lg' | 'xlg';
export type ExtraInputTextLabelPosition = 'default' | 'float' | 'left';
export type ExtraInputTextType = 'text' | 'password';

let nextInputId = 0;

@Component({
  selector: 'extra-input-text',
  standalone: true,
  imports: [InputText, IconField, InputIcon, FloatLabel, NgClass, NgTemplateOutlet, ExtraTooltipDirective],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraInputTextComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где input обязан быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-inputtext" [class.extra-inputtext--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left') {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-inputtext-body">
          @if (label && labelPosition === 'default') {
            <ng-container [ngTemplateOutlet]="labelTpl" />
          }
          @if (labelPosition === 'float') {
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
            <div class="extra-inputtext-caption">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-inputtext-label" [for]="inputId">
        {{ label }}
        @if (info) {
          <i class="extra-inputtext-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #fieldTpl>
      @if (clearable) {
        <p-iconfield>
          <input
            pInputText
            [id]="inputId"
            [ngClass]="sizeClass"
            [pSize]="primeSize!"
            [type]="type"
            [disabled]="disabled"
            [invalid]="invalid"
            [attr.placeholder]="placeholder || null"
            [value]="modelValue"
            (input)="onInput($event)"
            (blur)="onTouched()"
          />
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
        <input
          pInputText
          [id]="inputId"
          [ngClass]="sizeClass"
          [pSize]="primeSize!"
          [type]="type"
          [disabled]="disabled"
          [invalid]="invalid"
          [attr.placeholder]="placeholder || null"
          [value]="modelValue"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
      }
    </ng-template>
  `
})
export class ExtraInputTextComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() placeholder = '';
  @Input() label = '';
  @Input() labelPosition: ExtraInputTextLabelPosition = 'default';
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input() caption = '';
  @Input() info = '';
  @Input() size: ExtraInputTextSize = 'base';
  @Input() type: ExtraInputTextType = 'text';

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-input-text-${nextInputId++}`;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  @Output() onClear = new EventEmitter<void>();

  modelValue = '';

  private _onChange: (value: string) => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'sm') return 'small';
    if (this.size === 'lg' || this.size === 'xlg') return 'large';
    return undefined;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-inputtext-xlg': this.size === 'xlg' };
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
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
