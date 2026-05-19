import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Listbox, ListboxChangeEvent } from 'primeng/listbox';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { NgTemplateOutlet } from '@angular/common';

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
      [filter]="filter"
      [filterPlaceHolder]="filterPlaceHolder"
      [checkmark]="checkmark"
      [group]="group"
      [optionGroupLabel]="optionGroupLabel"
      [optionGroupChildren]="optionGroupChildren"
      [scrollHeight]="scrollHeight"
      [emptyMessage]="emptyMessage"
      [disabled]="isDisabled"
      (onChange)="onChangeHandler($event)"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlurHandler($event)"
    >
      <!-- project only templates with pTemplate so PrimeNG listbox will detect them -->
      <ng-content select="ng-template[pTemplate]"></ng-content>

      <!-- forward captured item template into p-listbox preserving context -->
      <ng-template pTemplate="item" let-item>
        @if (itemTpl) {
          <ng-container
            [ngTemplateOutlet]="itemTpl?.template"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        }
      </ng-template>
    </p-listbox>
  `
})
export class ExtraListboxComponent implements ControlValueAccessor, AfterContentInit {
  @Input() options: any[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue: string | undefined = undefined;
  @Input() multiple = false;
  @Input() filter = false;
  @Input() filterPlaceHolder: string | undefined = undefined;
  @Input() checkmark = false;
  @Input() group = false;
  @Input() optionGroupLabel: string | undefined = undefined;
  @Input() optionGroupChildren: string | undefined = undefined;
  @Input() scrollHeight = '200px';
  @Input() emptyMessage: string | undefined = undefined;

  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  protected modelValue: any = null;

  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;
  itemTpl?: PrimeTemplate;

  private _disabled = false;
  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  get isDisabled(): boolean {
    return this._disabled;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.templates.forEach((tpl) => {
      switch (tpl.getType()) {
        case 'item':
          this.itemTpl = tpl;
          break;
      }
    });
    this.cdr.detectChanges();
  }

  onChangeHandler(event: ListboxChangeEvent): void {
    // Обновляем внутреннее значение и уведомляем форму об изменении.
    this.modelValue = event.value;
    this._onChange(event.value);
  }

  onBlurHandler(event: FocusEvent): void {
    // emit external onBlur and mark control as touched for forms
    this.onBlur.emit(event);
    this._onTouched();
  }

  writeValue(value: any): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
