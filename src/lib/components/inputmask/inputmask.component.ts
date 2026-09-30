import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputMask } from 'primeng/inputmask';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';

export type ExtraInputMaskSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraInputMaskLabelPosition = 'default' | 'float' | 'left';

let nextInputId = 0;

@Component({
  selector: 'extra-input-mask',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMask, FloatLabel, NgTemplateOutlet, ReactiveFormsModule, ExtraTooltipDirective],
  host: { style: 'display: contents' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraInputMaskComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где поле обязано быть прямым flex-элементом). -->
    @if (label || caption) {
      <div class="extra-inputmask" [class.extra-inputmask--left]="labelPosition === 'left'">
        @if (label && labelPosition === 'left') {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-inputmask-body">
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
        [styleClass]="fieldClass"
        [size]="primeSize"
        [mask]="mask"
        [slotChar]="slotChar"
        [autoClear]="autoClear"
        [showClear]="clearable"
        [unmask]="unmask"
        [readonly]="readonly"
        [placeholder]="fieldPlaceholder"
        [fluid]="fluid"
        [characterPattern]="characterPattern"
        [keepBuffer]="keepBuffer"
        [invalid]="invalid"
        [autocomplete]="autocomplete"
        [formControl]="control"
        (onComplete)="onComplete.emit($event)"
        (onFocus)="onFocusEvent.emit($event)"
        (onBlur)="onBlur($event)"
        (onInput)="onInputEvent.emit($event)"
        (onKeydown)="onKeydownEvent.emit($event)"
        (onClear)="onClearEvent.emit($event)"
      ></p-inputmask>
    </ng-template>
  `
})
export class ExtraInputMaskComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private _ngControl: NgControl | null = null;

  readonly control = new FormControl<string | null>(null);

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-input-mask-${nextInputId++}`;

  @Input() mask = '';
  @Input() slotChar = '_';
  @Input({ transform: booleanAttribute }) autoClear = true;
  /** Отображение иконки очистки поля при наличии значения. */
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input({ transform: booleanAttribute }) unmask = false;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() labelPosition: ExtraInputMaskLabelPosition = 'default';
  @Input() caption = '';
  @Input() info = '';
  @Input() size: ExtraInputMaskSize = 'base';
  @Input({ transform: booleanAttribute }) readonly = false;
  /** Растягивает поле на всю ширину контейнера. */
  @Input({ transform: booleanAttribute }) fluid = false;
  @Input() characterPattern = '[A-Za-z]';
  @Input({ transform: booleanAttribute }) keepBuffer = false;
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

  /**
   * Классы на сам input (p-inputmask прокидывает styleClass именно туда):
   * xlg — размер вне шкалы PrimeNG, clearable — место под иконку очистки справа.
   * Класс вешаем по пропу, а не по наличию иконки: иконка появляется только у
   * заполненного поля, и padding прыгал бы на первом введённом символе.
   */
  get fieldClass(): string {
    return [this.size === 'xlarge' ? 'p-inputtext-xlg' : '', this.clearable ? 'extra-inputmask-clearable' : '']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * p-inputmask пишет placeholder в атрибут как есть, а FloatLabel поднимает лейбл
   * по селектору `:has(input[placeholder])` — с пустой строкой атрибут остаётся в DOM
   * и лейбл висит наверху всегда. Пустое значение отдаём как undefined.
   */
  get fieldPlaceholder(): string | undefined {
    return this.placeholder || undefined;
  }

  onBlur(event: Event): void {
    this._onTouched();
    this.onBlurEvent.emit(event);
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
