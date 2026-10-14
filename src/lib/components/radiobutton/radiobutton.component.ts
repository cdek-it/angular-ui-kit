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
import { RadioButton, RadioButtonClickEvent } from 'primeng/radiobutton';
import { Subscription } from 'rxjs';

export type ExtraRadiobuttonLabelPosition = 'right' | 'left';

export interface ExtraRadioButtonClickEvent {
  value: any;
  originalEvent: Event;
}

let nextInputId = 0;

@Component({
  selector: 'extra-radiobutton',
  standalone: true,
  imports: [RadioButton, FormsModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraRadiobuttonComponent),
      multi: true
    }
  ],
  template: `
    @if (label || caption) {
      <div class="extra-radiobutton" [class.extra-radiobutton--left]="labelPosition === 'left'">
        <ng-container [ngTemplateOutlet]="fieldTpl" />
        <div class="extra-radiobutton-body">
          @if (label) {
            <label class="radio-label" [class.radio-label--disabled]="disabled" [for]="inputId">{{ label }}</label>
          }
          @if (caption) {
            <div class="radio-caption" [class.radio-caption--disabled]="disabled">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #fieldTpl>
      <p-radiobutton
        [value]="value"
        [name]="name ?? ''"
        [(ngModel)]="modelValue"
        [disabled]="disabled"
        [invalid]="invalid"
        [inputId]="inputId"
        (onClick)="onClickHandler($event)"
        (onFocus)="onFocus.emit($event)"
        (onBlur)="onBlur.emit($event)"
      ></p-radiobutton>
    </ng-template>
  `
})
export class ExtraRadiobuttonComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private readonly _injector = inject(Injector);
  private readonly _cdr = inject(ChangeDetectorRef);
  private _ngControl: NgControl | null = null;
  private _statusSub?: Subscription;
  private _valueSub?: Subscription;

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
    /**
     * invalid — геттер поверх NgControl.invalid; на OnPush не пересчитывается сам по себе,
     * когда валидность меняется извне (Validators/updateValueAndValidity без локального события).
     */
    this._statusSub = this._ngControl?.statusChanges?.subscribe(() => this._cdr.markForCheck());
    /**
     * Несколько radiobutton могут сидеть на ОДНОМ общем FormControl (радио-группа). Angular Forms
     * при смене значения "изнутри" (клик по одной из них) вызывает control.setValue(value,
     * { emitModelToViewChange: false }) — этот флаг намеренно НЕ вызывает writeValue() у соседних
     * директив, привязанных к тому же control (см. updateControl() в @angular/forms). Из-за этого
     * соседние radiobutton в группе никогда не узнавали, что должны снять выбор. valueChanges
     * эмитится всегда, независимо от этого флага — используем его для синхронизации между соседями.
     */
    this._valueSub = this._ngControl?.valueChanges?.subscribe((value) => {
      this.modelValue = value;
      this._cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._statusSub?.unsubscribe();
    this._valueSub?.unsubscribe();
  }

  @Input() label = '';
  @Input() labelPosition: ExtraRadiobuttonLabelPosition = 'right';
  @Input() caption = '';
  @Input() value: any = null;
  /** Имя группы; форм-обвязка, вне спеки — нужна для нативной семантики радио-группы. */
  @Input() name: string | undefined = undefined;

  @Output() onClick = new EventEmitter<ExtraRadioButtonClickEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-radiobutton-${nextInputId++}`;

  disabled = false;
  modelValue: any = null;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  onClickHandler(event: RadioButtonClickEvent): void {
    this._onChange(event.value);
    this._onTouched();
    this.onClick.emit({ value: event.value, originalEvent: event.originalEvent as Event });
  }

  writeValue(value: any): void {
    this.modelValue = value;
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: any) => void): void {
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
