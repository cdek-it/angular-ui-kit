import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Listbox } from 'primeng/listbox';
import { SharedModule } from 'primeng/api';
import { NgTemplateOutlet } from '@angular/common';

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

@Component({
  selector: 'extra-listbox',
  standalone: true,
  imports: [Listbox, FormsModule, SharedModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ExtraListboxComponent), multi: true }],
  template: `
    <p-listbox
      [options]="options"
      [(ngModel)]="modelValue"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [multiple]="multiple"
      [filter]="showFilter"
      [filterPlaceHolder]="filterPlaceholder"
      [checkbox]="showCheckbox"
      [showToggleAll]="showCheckbox"
      [checkmark]="checkmark"
      [group]="group"
      [optionGroupLabel]="optionGroupLabel"
      [optionGroupChildren]="optionGroupChildren"
      [scrollHeight]="scrollHeight"
      [emptyMessage]="emptyMessage"
      [disabled]="isDisabled"
      (onChange)="onChangeHandler($event)"
      (onFilter)="onFilter.emit($event)"
      (onSelectAllChange)="onSelectAll.emit($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlurHandler($event)"
    >
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
export class ExtraListboxComponent implements ControlValueAccessor {
  private readonly _cdr = inject(ChangeDetectorRef);

  @Input() options: ExtraListboxGroup[] | ExtraListboxOption[] | any[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue: string | undefined = undefined;
  @Input() multiple = false;
  @Input() showFilter = false;
  @Input() filterPlaceholder: string | undefined = undefined;
  @Input() showCheckbox = false;
  /** Галочка у выбранного пункта (одиночный выбор) — полезный проп сверх спеки. */
  @Input() checkmark = false;
  @Input() group = false;
  @Input() optionGroupLabel: string | undefined = undefined;
  @Input() optionGroupChildren: string | undefined = undefined;
  @Input() scrollHeight = '200px';
  @Input() emptyMessage: string | undefined = undefined;
  @ContentChild(ExtraListboxItemDirective, { read: TemplateRef }) itemTemplate: TemplateRef<any> | null = null;

  @Output() onChange = new EventEmitter<ExtraListboxChangeEvent>();
  @Output() onFilter = new EventEmitter<ExtraListboxFilterEvent>();
  @Output() onSelectAll = new EventEmitter<ExtraListboxSelectAllChangeEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  protected modelValue: any = null;

  private _disabled = false;
  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  get isDisabled(): boolean {
    return this._disabled;
  }

  onChangeHandler(event: ExtraListboxChangeEvent): void {
    this.modelValue = event.value;
    this._onChange(event.value);
    this.onChange.emit(event);
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
