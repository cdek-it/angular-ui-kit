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
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Checkbox, CheckboxChangeEvent } from 'primeng/checkbox';

export type ExtraCheckboxLabelPosition = 'right' | 'left';

export interface ExtraCheckboxChangeEvent {
  checked: boolean;
  originalEvent: Event;
}

let nextInputId = 0;

@Component({
  selector: 'extra-checkbox',
  standalone: true,
  imports: [Checkbox, FormsModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
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
            <div class="checkbox-caption" [class.checkbox-caption--disabled]="disabled">{{ caption }}</div>
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
        [indeterminate]="indeterminate"
        [class.p-checkbox-indeterminate]="indeterminate"
        [invalid]="invalid"
        [inputId]="inputId"
        (onChange)="onChangeHandler($event)"
      ></p-checkbox>
    </ng-template>
  `
})
export class ExtraCheckboxComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  @Input() label = '';
  @Input() labelPosition: ExtraCheckboxLabelPosition = 'right';
  @Input() caption = '';
  @Input() indeterminate = false;

  @Output() onChange = new EventEmitter<ExtraCheckboxChangeEvent>();

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-checkbox-${nextInputId++}`;

  disabled = false;
  modelValue = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
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

  writeValue(value: boolean): void {
    this.modelValue = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
