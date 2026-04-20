import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
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
  imports: [Stepper, StepList, Step, StepPanels, StepPanel, StepItem, Button, NgClass],
  template: `
    <p-stepper
      [value]="value"
      [linear]="linear"
      (valueChange)="onValueChange($event)"
    >
      @if (orientation === 'horizontal') {
        <p-step-list>
          @for (step of steps; track step.value) {
            <p-step
              [value]="step.value"
              [disabled]="step.disabled || false"
              [ngClass]="{ 'step-invalid': step.invalid }"
            >
              {{ step.label }}
              @if (step.caption) {
                <div class="caption-secondary">{{ step.caption }}</div>
              }
            </p-step>
          }
        </p-step-list>
      }
      @if (orientation === 'horizontal' && showPanels) {
        <p-step-panels>
          @for (step of steps; track step.value; let i = $index; let first = $first; let last = $last) {
            <p-step-panel [value]="step.value">
              <ng-template #content let-activateCallback="activateCallback">
                <p class="m-0">{{ step.content }}</p>
                <div class="flex pt-4">
                  @if (!first) {
                    <p-button label="Назад" severity="contrast" (onClick)="activateCallback(steps[i - 1].value)"/>
                  }
                  @if (!last) {
                    <p-button label="Вперёд" severity="secondary" class="ml-auto" [disabled]="!!step.invalid" (onClick)="activateCallback(steps[i + 1].value)"/>
                  }
                </div>
              </ng-template>
            </p-step-panel>
          }
        </p-step-panels>
      }

      @if (orientation === 'vertical') {
        @for (step of steps; track step.value; let i = $index; let first = $first; let last = $last) {
          <p-step-item [value]="step.value">
            <p-step
              [value]="step.value"
              [disabled]="step.disabled || false"
              [ngClass]="{ 'step-invalid': step.invalid }"
            >
              {{ step.label }}
              @if (step.caption) {
                <div class="caption-secondary">{{ step.caption }}</div>
              }
            </p-step>
            @if (showPanels) {
              <p-step-panel [value]="step.value">
                <ng-template #content let-activateCallback="activateCallback">
                  <p class="m-0">{{ step.content }}</p>
                  <div class="flex gap-2 pt-4">
                    @if (!first) {
                      <p-button label="Назад" severity="contrast" (onClick)="activateCallback(steps[i - 1].value)"/>
                    }
                    @if (!last) {
                      <p-button label="Вперёд" severity="secondary" [disabled]="!!step.invalid" (onClick)="activateCallback(steps[i + 1].value)"/>
                    }
                  </div>
                </ng-template>
              </p-step-panel>
            }
          </p-step-item>
        }
      }
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
