import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Step, StepItem, StepList, StepPanel, StepPanels, Stepper, StepperSeparator } from 'primeng/stepper';
import { ExtraStepperItemComponent } from './stepper-item.component';

export type ExtraStepperOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'extra-stepper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'extraStepper',
  imports: [Stepper, StepList, Step, StepItem, StepPanels, StepPanel, StepperSeparator, NgClass, NgTemplateOutlet],
  template: `
    <p-stepper [value]="value" [linear]="linear" (valueChange)="onValueChange($event)">
      @if (orientation === 'horizontal') {
        <p-step-list>
          @for (item of items; track item; let i = $index; let last = $last) {
            <p-step [value]="i + 1" [disabled]="item.disabled" [ngClass]="stateClass(item)">
              <ng-template #content let-activateCallback="activateCallback">
                <ng-container [ngTemplateOutlet]="stepHeaderTpl" [ngTemplateOutletContext]="{ item, index: i, activateCallback }" />
                @if (!last && line) {
                  <p-stepper-separator />
                }
              </ng-template>
            </p-step>
          }
        </p-step-list>
        <p-step-panels>
          @for (item of items; track item; let i = $index) {
            <p-step-panel [value]="i + 1">
              <ng-template #content>
                <ng-container [ngTemplateOutlet]="item.bodyTpl" />
              </ng-template>
            </p-step-panel>
          }
        </p-step-panels>
      } @else {
        @for (item of items; track item; let i = $index; let last = $last) {
          <p-step-item [value]="i + 1">
            <p-step [value]="i + 1" [disabled]="item.disabled" [ngClass]="stateClass(item)">
              <ng-template #content let-activateCallback="activateCallback">
                <ng-container [ngTemplateOutlet]="stepHeaderTpl" [ngTemplateOutletContext]="{ item, index: i, activateCallback }" />
                @if (!last && line) {
                  <p-stepper-separator />
                }
              </ng-template>
            </p-step>
            <p-step-panel [value]="i + 1">
              <ng-template #content>
                <ng-container [ngTemplateOutlet]="item.bodyTpl" />
              </ng-template>
            </p-step-panel>
          </p-step-item>
        }
      }
    </p-stepper>

    <ng-template #stepHeaderTpl let-item="item" let-index="index" let-activateCallback="activateCallback">
      <button type="button" class="p-step-header" [disabled]="item.disabled" (click)="activateCallback()">
        <span class="p-step-number">
          @if (item.icon) {
            <i class="ti ti-arrow-right"></i>
          } @else {
            {{ index + 1 }}
          }
        </span>
        <span class="p-step-title">
          {{ item.name }}
          @if (item.caption) {
            <div class="caption-secondary">{{ item.caption }}</div>
          }
        </span>
      </button>
    </ng-template>
  `
})
export class ExtraStepperComponent implements AfterContentInit {
  private readonly _cdr = inject(ChangeDetectorRef);

  @ContentChildren(ExtraStepperItemComponent) items!: QueryList<ExtraStepperItemComponent>;

  @Input() orientation: ExtraStepperOrientation = 'horizontal';
  /** Отображение соединительной линии между шагами. */
  @Input({ transform: booleanAttribute }) line = true;
  /** Запрещает переход к следующему шагу без завершения текущего. */
  @Input({ transform: booleanAttribute }) linear = false;
  @Input() value: number | undefined = 1;

  @Output() valueChange = new EventEmitter<number | undefined>();

  ngAfterContentInit(): void {
    this.items.changes.subscribe(() => this._cdr.markForCheck());
  }

  onValueChange(newValue: number | undefined): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
    this._cdr.markForCheck();
  }

  stateClass(item: ExtraStepperItemComponent): Record<string, boolean> {
    return { 'step-invalid': item.state === 'danger', 'step-success': item.state === 'success' };
  }

  /** Переход к следующему шагу — для навигационных кнопок внутри содержимого extra-stepper-item (см. .figma.md). */
  next(): void {
    const idx = this.activeIndex();
    if (idx !== -1 && idx < this.items.length - 1) this.onValueChange(idx + 2);
  }

  /** Переход к предыдущему шагу. */
  prev(): void {
    const idx = this.activeIndex();
    if (idx > 0) this.onValueChange(idx);
  }

  private activeIndex(): number {
    return (this.value ?? 1) - 1;
  }
}
