import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Tabs } from 'primeng/tabs';
import { TabList } from 'primeng/tabs';
import { Tab } from 'primeng/tabs';
import { TabPanels } from 'primeng/tabs';
import { TabPanel } from 'primeng/tabs';
import { Badge } from 'primeng/badge';

export interface TabItem {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  badge?: string;
  badgeSeverity?: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';
  content?: string;
}

@Component({
  selector: 'tabs',
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel, Badge, NgFor, NgIf],
  template: `
    <p-tabs
      [value]="value"
      [scrollable]="scrollable"
      [lazy]="lazy"
      (valueChange)="value = $event"
    >
      <p-tablist>
        <p-tab
          *ngFor="let tab of tabs"
          [value]="tab.value"
          [disabled]="tab.disabled || false"
        >
          <i *ngIf="tab.icon" class="text-xl" [class]="tab.icon"></i>
          <span>{{ tab.label }}</span>
          <p-badge
            *ngIf="tab.badge"
            [value]="tab.badge"
            [severity]="tab.badgeSeverity || 'success'"
          ></p-badge>
        </p-tab>
      </p-tablist>
      <p-tabpanels>
        <p-tabpanel *ngFor="let tab of tabs" [value]="tab.value">
          <p class="m-0">{{ tab.content }}</p>
        </p-tabpanel>
      </p-tabpanels>
    </p-tabs>
  `,
})
export class TabsComponent {
  @Input() value: string | number = '0';
  @Input() tabs: TabItem[] = [];
  @Input() scrollable = false;
  @Input() lazy = false;
}
