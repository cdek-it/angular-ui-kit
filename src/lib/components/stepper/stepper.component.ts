import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Stepper } from 'primeng/stepper';
import { StepList } from 'primeng/stepper';
import { Step } from 'primeng/stepper';
import { StepPanels } from 'primeng/stepper';
import { StepPanel } from 'primeng/stepper';
import { StepItem } from 'primeng/stepper';
import { Button } from 'primeng/button';

export interface StepperItem {
  value: string;
  label: string;
  caption?: string;
  content?: string;
  disabled?: boolean;
  invalid?: boolean;
}

@Component({
  selector: 'stepper',
  standalone: true,
  imports: [Stepper, StepList, Step, StepPanels, StepPanel, StepItem, Button, NgFor, NgIf, NgClass],
  template: `
    <p-stepper
      [value]="value"
      [linear]="linear"
      (valueChange)="onValueChange($event)"
    >
      <p-step-list *ngIf="orientation === 'horizontal'">
        <p-step
          *ngFor="let step of steps"
          [value]="step.value"
          [disabled]="step.disabled || false"
          [ngClass]="{ 'step-invalid': step.invalid }"
        >
          {{ step.label }}
          <div *ngIf="step.caption" class="caption-secondary">{{ step.caption }}</div>
        </p-step>
      </p-step-list>
      <p-step-panels *ngIf="orientation === 'horizontal' && showPanels">
        <p-step-panel *ngFor="let step of steps; let i = index; let first = first; let last = last" [value]="step.value">
          <ng-template #content let-activateCallback="activateCallback">
            <p class="m-0">{{ step.content }}</p>
            <div class="flex pt-4">
              <p-button *ngIf="!first" label="Назад" severity="contrast" (onClick)="activateCallback(steps[i - 1].value)"/>
              <p-button *ngIf="!last" label="Вперёд" severity="secondary" class="ml-auto" (onClick)="activateCallback(steps[i + 1].value)"/>
            </div>
          </ng-template>
        </p-step-panel>
      </p-step-panels>

      <ng-container *ngIf="orientation === 'vertical'">
        <p-step-item *ngFor="let step of steps; let i = index; let first = first; let last = last" [value]="step.value">
          <p-step
            [value]="step.value"
            [disabled]="step.disabled || false"
            [ngClass]="{ 'step-invalid': step.invalid }"
          >
            {{ step.label }}
            <div *ngIf="step.caption" class="caption-secondary">{{ step.caption }}</div>
          </p-step>
          <p-step-panel *ngIf="showPanels" [value]="step.value">
            <ng-template #content let-activateCallback="activateCallback">
              <p class="m-0">{{ step.content }}</p>
              <div class="flex gap-2 pt-4">
                <p-button *ngIf="!first" label="Назад" severity="contrast" (onClick)="activateCallback(steps[i - 1].value)"/>
                <p-button *ngIf="!last" label="Вперёд" severity="secondary" (onClick)="activateCallback(steps[i + 1].value)"/>
              </div>
            </ng-template>
          </p-step-panel>
        </p-step-item>
      </ng-container>
    </p-stepper>
  `,
})
export class StepperComponent {
  @Input() value: string = '1';
  @Input() steps: StepperItem[] = [];
  @Input() linear = false;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() showPanels = true;

  @Output() valueChange = new EventEmitter<string>();

  onValueChange(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
