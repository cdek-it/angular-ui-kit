import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Password } from 'primeng/password';
import { PrimeTemplate } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';

export type ExtraPasswordSize = 'small' | 'base' | 'large' | 'xlarge';

@Directive({ selector: '[extraPasswordHeader]', standalone: true })
export class ExtraPasswordHeaderDirective {}

@Directive({ selector: '[extraPasswordFooter]', standalone: true })
export class ExtraPasswordFooterDirective {}

@Component({
  selector: 'extra-password',
  host: { style: 'display: block' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Password, FormsModule, FloatLabel, NgTemplateOutlet, PrimeTemplate],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExtraPasswordComponent),
      multi: true
    }
  ],
  template: `
    @if (floatLabel) {
      <p-floatlabel variant="in">
        <ng-container *ngTemplateOutlet="passwordTpl"></ng-container>
        <label [attr.for]="inputId">{{ label }}</label>
      </p-floatlabel>
    } @else {
      <ng-container *ngTemplateOutlet="passwordTpl"></ng-container>
    }

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
export class ExtraPasswordComponent implements ControlValueAccessor {
  @ContentChild(ExtraPasswordHeaderDirective, { read: TemplateRef }) headerTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraPasswordFooterDirective, { read: TemplateRef }) footerTemplate: TemplateRef<any> | null = null;

  @Input() feedback = true;
  @Input() toggleMask = false;
  @Input() disabled = false;
  @Input() placeholder: string | undefined = undefined;
  @Input() size: ExtraPasswordSize = 'base';
  @Input() variant: 'filled' | 'outlined' = 'outlined';
  @Input() fluid = false;
  @Input() invalid = false;
  @Input() floatLabel = false;
  @Input() label = '';
  @Input() promptLabel = 'Введите пароль';
  @Input() weakLabel = 'Слабый';
  @Input() mediumLabel = 'Средний';
  @Input() strongLabel = 'Надёжный';
  @Input() inputId: string | undefined = undefined;
  @Input() inputStyleClass: string | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() appendTo: any = 'body';
  @Input() autofocus = false;

  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

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
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
