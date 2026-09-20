import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputMask } from 'primeng/inputmask';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';

export type ExtraInputMaskSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraInputMaskLabelPosition = 'top' | 'left';

let nextInputId = 0;

@Component({
  selector: 'extra-input-mask',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMask, ReactiveFormsModule, NgTemplateOutlet, FloatLabel, ExtraTooltipDirective],
  host: {
    style: 'display: contents',
    '[class.input-mask-xlg]': 'size === "xlarge"'
  },
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где input обязан быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-inputmask" [class.extra-inputmask--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-inputmask-body">
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
            <div class="extra-inputmask-caption">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="fieldTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-inputmask-label" [for]="inputId">
        {{ label }}
        @if (info) {
          <i class="extra-inputmask-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #fieldTpl>
      <p-inputmask
        [inputId]="inputId"
        [size]="primeSize"
        [mask]="mask"
        [slotChar]="slotChar"
        [autoClear]="autoClear"
        [showClear]="clearable"
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
        (onFocus)="onFocus.emit($event)"
        (onBlur)="handleBlur($event)"
        (onInput)="onInput.emit($event)"
        (onClear)="onClear.emit()"
      ></p-inputmask>
    </ng-template>
  `
})
export class ExtraInputMaskComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private _ngControl: NgControl | null = null;

  readonly control = new FormControl<string | null>(null);

  @Input() placeholder = '';
  @Input() label = '';
  @Input() labelPosition: ExtraInputMaskLabelPosition = 'top';
  @Input() floatLabel = false;
  @Input() mask = '';
  @Input() slotChar = '_';
  @Input() autoClear = true;
  @Input() unmask = false;
  @Input() clearable = false;
  @Input() caption = '';
  @Input() info = '';
  @Input() size: ExtraInputMaskSize = 'base';
  @Input() readonly = false;
  @Input() fluid = false;
  @Input() characterPattern = '[A-Za-z]';
  @Input() keepBuffer = false;
  @Input() autocomplete = '';

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-input-mask-${nextInputId++}`;

  @Output() onComplete = new EventEmitter<void>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onClear = new EventEmitter<void>();

  private _onChange: (value: string | null) => void = () => {};
  private _onTouched: () => void = () => {};

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });

    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => this._onChange(v));
  }

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  handleBlur(event: Event): void {
    this._onTouched();
    this.onBlur.emit(event);
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
