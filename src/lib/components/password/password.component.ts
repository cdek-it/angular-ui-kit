import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Password } from 'primeng/password';
import { PrimeTemplate } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraTooltipDirective } from '@cdek-it/angular-ui-kit/components/tooltip';

export type ExtraPasswordSize = 'small' | 'base' | 'large' | 'xlarge';
export type ExtraPasswordLabelPosition = 'top' | 'left';

let nextInputId = 0;

@Directive({ selector: '[extraPasswordHeader]', standalone: true })
export class ExtraPasswordHeaderDirective {}

@Directive({ selector: '[extraPasswordFooter]', standalone: true })
export class ExtraPasswordFooterDirective {}

@Component({
  selector: 'extra-password',
  host: { style: 'display: contents' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Password, FormsModule, FloatLabel, NgTemplateOutlet, PrimeTemplate, ExtraTooltipDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraPasswordComponent),
      multi: true
    }
  ],
  template: `
    <!-- Без label/caption поле не оборачиваем — сохраняем прежнюю DOM-структуру
         (важно для p-inputgroup, где поле обязано быть прямым flex-элементом). -->
    @if (label || caption) {
      <!-- floatLabel перекрывает labelPosition: лейбл уезжает внутрь поля, строчной раскладки нет -->
      <div class="extra-password" [class.extra-password--left]="labelPosition === 'left' && !floatLabel">
        @if (label && labelPosition === 'left' && !floatLabel) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <div class="extra-password-body">
          @if (label && labelPosition === 'top' && !floatLabel) {
            <ng-container [ngTemplateOutlet]="labelTpl" />
          }
          @if (floatLabel) {
            <p-floatlabel variant="in">
              <ng-container [ngTemplateOutlet]="passwordTpl" />
              @if (label) {
                <ng-container [ngTemplateOutlet]="labelTpl" />
              }
            </p-floatlabel>
          } @else {
            <ng-container [ngTemplateOutlet]="passwordTpl" />
          }
          @if (caption) {
            <div class="extra-password-caption">{{ caption }}</div>
          }
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="passwordTpl" />
    }

    <ng-template #labelTpl>
      <label class="extra-password-label" [for]="inputId">
        {{ label }}
        @if (info) {
          <i class="extra-password-label-icon ti ti-info-circle" [extra-tooltip]="info"></i>
        }
      </label>
    </ng-template>

    <ng-template #passwordTpl>
      <p-password
        [ngModel]="modelValue"
        (ngModelChange)="handleChange($event)"
        [feedback]="feedback"
        [toggleMask]="toggleMask"
        [inputStyleClass]="computedInputStyleClass"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [promptLabel]="promptLabel"
        [weakLabel]="weakLabel"
        [mediumLabel]="mediumLabel"
        [strongLabel]="strongLabel"
        [variant]="variant"
        [fluid]="fluid"
        [invalid]="invalid"
        [inputId]="inputId"
        [ariaLabel]="ariaLabel"
        [ariaLabelledBy]="ariaLabelledBy"
        [appendTo]="appendTo"
        [autofocus]="autofocus"
        (onFocus)="onFocus.emit($event)"
        (onBlur)="onBlur.emit($event)"
      >
        @if (headerTemplate) {
          <ng-template pTemplate="header">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
          </ng-template>
        }
        @if (footerTemplate) {
          <ng-template pTemplate="footer">
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
          </ng-template>
        }
      </p-password>
    </ng-template>
  `
})
export class ExtraPasswordComponent implements ControlValueAccessor, OnInit {
  private readonly _injector = inject(Injector);
  private readonly _cdr = inject(ChangeDetectorRef);
  private _ngControl: NgControl | null = null;

  @ContentChild(ExtraPasswordHeaderDirective, { read: TemplateRef }) headerTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraPasswordFooterDirective, { read: TemplateRef }) footerTemplate: TemplateRef<any> | null = null;

  @Input() feedback = true;
  @Input() toggleMask = false;
  @Input() placeholder: string | undefined = undefined;
  @Input() size: ExtraPasswordSize = 'base';
  @Input() variant: 'filled' | 'outlined' = 'outlined';
  @Input({ transform: booleanAttribute }) fluid = false;
  @Input() label = '';
  @Input() labelPosition: ExtraPasswordLabelPosition = 'top';
  /** Плавающий лейбл внутри поля (PrimeNG `p-floatlabel`); перекрывает `labelPosition`. */
  @Input({ transform: booleanAttribute }) floatLabel = false;
  @Input() caption = '';
  @Input() info = '';
  @Input() promptLabel = 'Введите пароль';
  @Input() weakLabel = 'Слабый';
  @Input() mediumLabel = 'Средний';
  @Input() strongLabel = 'Надёжный';
  @Input() inputStyleClass: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() appendTo: any = 'body';
  @Input() autofocus = false;

  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  /** Уникальный id поля для связи label ↔ input. */
  readonly inputId = `extra-password-${nextInputId++}`;

  disabled = false;

  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  get sizeClass(): string {
    if (this.size === 'small') return 'p-inputtext-sm';
    if (this.size === 'large') return 'p-inputtext-lg';
    if (this.size === 'xlarge') return 'p-inputtext-lg p-inputtext-xlg';
    return '';
  }

  get computedInputStyleClass(): string {
    return [this.sizeClass, this.inputStyleClass].filter(Boolean).join(' ');
  }

  modelValue: string | null = null;

  private _onChange: (value: string | null) => void = () => {};
  private _onTouched: () => void = () => {};

  handleChange(value: string | null): void {
    this.modelValue = value;
    this._onChange(value);
    this._onTouched();
  }

  writeValue(value: string | null): void {
    this.modelValue = value;
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | null) => void): void {
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
