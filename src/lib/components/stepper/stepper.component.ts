import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Step, StepItem, StepList, StepPanel, StepPanels, Stepper } from 'primeng/stepper';
import { ExtraButtonComponent } from '../button/button.component';

export interface ExtraStepperItem {
  value: number | undefined;
  label: string;
  caption?: string;
  content?: string;
  disabled?: boolean;
  invalid?: boolean;
}

@Component({
  selector: 'extra-stepper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Stepper, StepList, Step, StepPanels, StepPanel, StepItem, ExtraButtonComponent, NgClass],
  template: `
    <p-stepper [value]="value" [linear]="linear" (valueChange)="onValueChange($event)">
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
                    <extra-button
                      label="Назад"
                      variant="outlined"
                      (click)="activateCallback(steps[i - 1].value)"
                    ></extra-button>
                  }
                  @if (!last) {
                    <extra-button
                      label="Вперёд"
                      variant="secondary"
                      class="ml-auto"
                      [disabled]="!!step.invalid"
                      (click)="activateCallback(steps[i + 1].value)"
                    ></extra-button>
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
                      <extra-button
                        label="Назад"
                        variant="outlined"
                        (click)="activateCallback(steps[i - 1].value)"
                      ></extra-button>
                    }
                    @if (!last) {
                      <extra-button
                        label="Вперёд"
                        variant="secondary"
                        [disabled]="!!step.invalid"
                        (click)="activateCallback(steps[i + 1].value)"
                      ></extra-button>
                    }
                  </div>
                </ng-template>
              </p-step-panel>
            }
          </p-step-item>
        }
      }
    </p-stepper>
  `
})
export class ExtraStepperComponent {
  @Input() value: number | undefined = 1;
  @Input() steps: ExtraStepperItem[] = [];
  @Input() linear = false;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() showPanels = true;

  @Output() valueChange = new EventEmitter<number | undefined>();

  onValueChange(newValue: number | undefined): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
