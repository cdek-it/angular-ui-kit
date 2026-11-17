import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { Listbox } from 'primeng/listbox';
import { InputText } from 'primeng/inputtext';
import { ExtraButtonComponent } from '../button/button.component';
import { SharedModule } from 'primeng/api';
import { NgClass, NgTemplateOutlet } from '@angular/common';

export interface ExtraListboxChangeEvent {
  value: any;
  originalEvent: Event;
}

export interface ExtraListboxFilterEvent {
  filter: string;
  originalEvent: Event;
}

export interface ExtraListboxSelectAllChangeEvent {
  checked: boolean;
  originalEvent: Event;
}

export interface ExtraListboxOption {
  name: string;
  code: string | number;
}

export interface ExtraListboxGroup {
  options: ExtraListboxOption[] | any[];
  name: string;
}

@Directive({ selector: '[extraListboxItem]', standalone: true })
export class ExtraListboxItemDirective {}

@Directive({ selector: '[extraListboxGroup]', standalone: true })
export class ExtraListboxGroupDirective {}

@Component({
  selector: 'extra-listbox',
  standalone: true,
  imports: [Listbox, FormsModule, SharedModule, NgTemplateOutlet, NgClass, InputText, ExtraButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ExtraListboxComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ExtraListboxComponent), multi: true }
  ],
  template: `
    <p-listbox
      #primeListbox
      [ngClass]="{
        'p-listbox-striped': striped,
        'p-listbox-overlay': overlay,
        'p-listbox-checkmark': checkmark && !(showCheckbox && multiple),
        'p-invalid': invalid
      }"
      [options]="options"
      [(ngModel)]="modelValue"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [multiple]="multiple"
      [filter]="showHeader && (showFilter || showClose)"
      [filterPlaceHolder]="filterPlaceholder"
      [checkbox]="showCheckbox"
      [showToggleAll]="showHeader && showCheckbox"
      [checkmark]="checkmark && !(showCheckbox && multiple)"
      [group]="group"
      [optionGroupLabel]="optionGroupLabel"
      [optionGroupChildren]="optionGroupChildren"
      [scrollHeight]="scrollHeight"
      [emptyMessage]="emptyMessage"
      [disabled]="isDisabled"
      [readonly]="readonly"
      [ariaLabel]="ariaLabel"
      [tabindex]="isDisabled ? -1 : (tabindex ?? 0)"
      [pt]="listboxPt"
      (onChange)="onChangeHandler($event)"
      (onFilter)="onFilter.emit($event)"
      (onSelectAllChange)="onSelectAll.emit($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlurHandler($event)"
    >
      <ng-template pTemplate="filter">
        @if (showFilter) {
          <div class="extra-listbox-filter">
            <input
              pInputText
              type="text"
              role="searchbox"
              class="p-listbox-filter"
              [value]="filterValue"
              [placeholder]="filterPlaceholder || ''"
              [disabled]="isDisabled"
              [readonly]="readonly"
              aria-label="Фильтр списка"
              (input)="filterValue = $any($event.target).value; primeListbox.onFilterChange($event)"
              (keydown)="primeListbox.onFilterKeyDown($event)"
              (blur)="primeListbox.onFilterBlur($event)"
            />
            <i class="ti ti-search extra-listbox-filter-icon" aria-hidden="true"></i>
          </div>
        }
        @if (showClose) {
          <extra-button
            class="extra-listbox-close"
            variant="text"
            size="small"
            [iconOnly]="true"
            icon="ti ti-x"
            ariaLabel="Закрыть список"
            [disabled]="isDisabled"
            (click)="!isDisabled && onClose.emit($event)"
          ></extra-button>
        }
      </ng-template>
      <ng-template pTemplate="checkmark" let-selected="implicit">
        <i
          class="ti ti-check p-listbox-option-check-icon"
          aria-hidden="true"
          [style.visibility]="selected ? 'visible' : 'hidden'"
        ></i>
      </ng-template>
      <ng-template pTemplate="checkicon"><i class="ti ti-check" aria-hidden="true"></i></ng-template>
      @if (groupTemplate) {
        <ng-template pTemplate="group" let-group>
          <ng-container
            [ngTemplateOutlet]="groupTemplate"
            [ngTemplateOutletContext]="{ $implicit: group }"
          ></ng-container>
        </ng-template>
      }
      @if (itemTemplate) {
        <ng-template pTemplate="item" let-item>
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        </ng-template>
      }
    </p-listbox>
  `
})
export class ExtraListboxComponent implements ControlValueAccessor, OnChanges, Validator {
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  @ViewChild(Listbox, { read: ElementRef }) private listboxElement?: ElementRef<HTMLElement>;
  protected filterValue = '';

  constructor() {
    afterNextRender(() => {
      if (this.autofocus && !this.isDisabled)
        this.listboxElement?.nativeElement.querySelector<HTMLElement>('[role="listbox"]')?.focus();
    });
  }

  @Input() options: ExtraListboxGroup[] | ExtraListboxOption[] | any[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) showHeader = true;
  @Input({ transform: booleanAttribute }) showClose = false;
  @Input({ transform: booleanAttribute }) overlay = false;
  @Input({ transform: booleanAttribute }) striped = false;
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input({ transform: booleanAttribute }) showFilter = false;
  @Input() filterPlaceholder: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) showCheckbox = false;
  /** Галочка у выбранного пункта (одиночный выбор) — полезный проп сверх спеки. */
  @Input({ transform: booleanAttribute }) checkmark = false;
  @Input({ transform: booleanAttribute }) group = false;
  @Input() optionGroupLabel: string | undefined = undefined;
  @Input() optionGroupChildren: string | undefined = undefined;
  @Input() scrollHeight = '200px';
  @Input() emptyMessage: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) readonly = false;
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

  /** Доступность списка и вложенных checkbox через Pass Through PrimeNG. */
  get listboxPt() {
    return {
      listContainer: { tabindex: 0, role: 'region', 'aria-label': this.ariaLabel || 'Опции списка' },
      pcCheckbox: { root: { 'aria-label': null }, input: { 'aria-label': 'Выбрать все опции' } },
      list: {
        'aria-labelledby': this.ariaLabelledBy || undefined,
        'aria-invalid': this.invalid || undefined,
        'aria-multiselectable': this.multiple,
        tabindex: this.isDisabled ? -1 : (this.tabindex ?? 0)
      }
    };
  }
  @ContentChild(ExtraListboxGroupDirective, { read: TemplateRef }) groupTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraListboxItemDirective, { read: TemplateRef }) itemTemplate: TemplateRef<any> | null = null;

  @Output() onClose = new EventEmitter<Event>();
  @Output() onChange = new EventEmitter<ExtraListboxChangeEvent>();
  @Output() onFilter = new EventEmitter<ExtraListboxFilterEvent>();
  @Output() onSelectAll = new EventEmitter<ExtraListboxSelectAllChangeEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  protected modelValue: any = null;

  private _disabled = false;
  private lastChangeEvent?: Event;
  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  get invalid(): boolean {
    const control = this.injector.get(NgControl, null, { self: true });
    return !!(control?.invalid && (control.touched || control.dirty));
  }

  get isDisabled(): boolean {
    return this._disabled;
  }

  onChangeHandler(event: ExtraListboxChangeEvent): void {
    const originalEvent =
      (event.originalEvent as Event & { originalEvent?: Event })?.originalEvent ?? event.originalEvent;
    if (originalEvent && originalEvent === this.lastChangeEvent && event.value === this.modelValue) return;
    this.lastChangeEvent = originalEvent;
    this.modelValue = event.value;
    this._onChange(event.value);
    this.onChange.emit({ value: event.value, originalEvent });
    const target = originalEvent?.target;
    if (target instanceof Element && target.closest('.p-listbox-header .p-checkbox')) {
      this.onSelectAll.emit({ checked: Array.isArray(event.value) && event.value.length > 0, originalEvent });
    }
  }

  onBlurHandler(event: FocusEvent): void {
    this.onBlur.emit(event);
    this._onTouched();
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
    this._disabled = isDisabled;
    this._cdr.markForCheck();
  }
}
