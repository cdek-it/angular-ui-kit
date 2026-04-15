import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { SharedModule } from 'primeng/api';

export interface SelectButtonItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'select-button',
  standalone: true,
  imports: [SelectButton, SharedModule, FormsModule, NgIf, NgClass],
  template: `
    <p-selectbutton
      [options]="options"
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
      optionLabel="label"
      optionValue="value"
      optionDisabled="disabled"
      [multiple]="multiple"
      [allowEmpty]="allowEmpty"
      [disabled]="disabled"
      [ngClass]="sizeClass"
    >
      <ng-template pTemplate="item" let-item>
        <i *ngIf="item.icon" [class]="item.icon"></i>
        <span>{{ item.label }}</span>
      </ng-template>
    </p-selectbutton>
  `,
})
export class SelectButtonComponent {
  @Input() value: string | string[] = '';
  @Input() options: SelectButtonItem[] = [];
  @Input() size: 'default' | 'sm' | 'lg' | 'xlg' = 'default';
  @Input() multiple = false;
  @Input() allowEmpty = true;
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string | string[]>();

  get sizeClass(): string {
    return this.size === 'default' ? '' : `p-selectbutton-${this.size}`;
  }

  onValueChange(newValue: string | string[]): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
