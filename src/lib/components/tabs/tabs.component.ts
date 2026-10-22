import {
  AfterContentInit,
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
import { NgTemplateOutlet } from '@angular/common';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ExtraBadgeComponent } from '@cdek-it/angular-ui-kit/components/badge';
import { ExtraTabItemComponent } from './tab-item.component';

export type ExtraTabsValueChangeEvent = string | undefined;

@Component({
  selector: 'extra-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel, ExtraBadgeComponent, NgTemplateOutlet],
  template: `
    <p-tabs [value]="value" [scrollable]="scrollable" [lazy]="lazy" (valueChange)="onValueChange($event)">
      <p-tablist>
        @for (item of items; track item.name) {
          <p-tab [value]="item.name" [disabled]="item.disabled">
            @if (item.icon) {
              <i class="text-xl" [class]="item.icon"></i>
            }
            <span>{{ item.name }}</span>
            @if (item.badge) {
              <extra-badge [value]="item.badge" [severity]="item.badgeSeverity"></extra-badge>
            }
          </p-tab>
        }
      </p-tablist>
      <p-tabpanels>
        @for (item of items; track item.name) {
          <p-tabpanel [value]="item.name">
            <ng-container [ngTemplateOutlet]="item.bodyTpl"></ng-container>
          </p-tabpanel>
        }
      </p-tabpanels>
    </p-tabs>
  `
})
export class ExtraTabsComponent implements AfterContentInit {
  private readonly _cdr = inject(ChangeDetectorRef);

  @ContentChildren(ExtraTabItemComponent) items!: QueryList<ExtraTabItemComponent>;

  @Input() value: string | undefined;
  @Input() scrollable = false;
  @Input() lazy = false;

  @Output() valueChange = new EventEmitter<ExtraTabsValueChangeEvent>();

  ngAfterContentInit(): void {
    if (this.value === undefined) {
      this.value = this.items.first?.name;
      this._cdr.markForCheck();
    }
    this.items.changes.subscribe(() => this._cdr.markForCheck());
  }

  onValueChange(newValue: string | number | undefined): void {
    this.value = newValue as string | undefined;
    this.valueChange.emit(this.value);
  }
}
