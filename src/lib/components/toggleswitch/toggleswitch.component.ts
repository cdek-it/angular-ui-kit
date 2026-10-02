import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { ToggleSwitch, ToggleSwitchChangeEvent } from 'primeng/toggleswitch';
import { Subscription } from 'rxjs';

export type ExtraToggleSwitchLabelPosition = 'right' | 'left';

export interface ExtraToggleSwitchChangeEvent {
  checked: boolean;
  originalEvent: Event;
}

let nextInputId = 0;

@Component({
  selector: 'extra-toggleswitch',
  standalone: true,
  imports: [ToggleSwitch, FormsModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraToggleSwitchComponent),
      multi: true
    }
  ],
  template: `
    @if (label || caption) {
      <div class="extra-toggleswitch" [class.extra-toggleswitch--left]="labelPosition === 'left'">
        <ng-container [ngTemplateOutlet]="fieldTpl" />
        <div class="extra-toggleswitch-body">
          @if (label) {
            <label class="toggleswitch-label" [class.toggleswitch-label--disabled]="disabled" [for]="inputId">{{
              label
            }}</label>
          }
          @if (caption) {
            <div class="toggleswitch-caption" [class.toggleswitch-caption--disabled]="disabled">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #fieldTpl>
      <p-toggleswitch
        [(ngModel)]="modelValue"
        [disabled]="disabled"
        [invalid]="invalid"
        [inputId]="inputId"
        (onChange)="onChangeHandler($event)"
        (onFocus)="onFocus.emit($event)"
        (onBlur)="onBlur.emit($event)"
      ></p-toggleswitch>
    </ng-template>
  `
})
export class ExtraToggleSwitchComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private readonly _injector = inject(Injector);
  private readonly _cdr = inject(ChangeDetectorRef);
  private _ngControl: NgControl | null = null;
  private _statusSub?: Subscription;

  @Input() label = '';
  @Input() labelPosition: ExtraToggleSwitchLabelPosition = 'right';
  @Input() caption = '';

  @Output() onChange = new EventEmitter<ExtraToggleSwitchChangeEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-toggleswitch-${nextInputId++}`;

  disabled = false;
  modelValue = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  private _onChange: (value: boolean) => void = () => {};
  private _onTouched: () => void = () => {};

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
    this._statusSub = this._ngControl?.statusChanges?.subscribe(() => this._cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this._statusSub?.unsubscribe();
  }

  onChangeHandler(event: ToggleSwitchChangeEvent): void {
    const checked = !!event.checked;
    this.modelValue = checked;
    this._onChange(checked);
    this._onTouched();
    this.onChange.emit({ checked, originalEvent: event.originalEvent as Event });
  }

  writeValue(value: boolean): void {
    this.modelValue = !!value;
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }
}
