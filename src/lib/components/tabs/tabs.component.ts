import { Component, Input } from '@angular/core';
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
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel, Badge],
  template: `
    <p-tabs
      [value]="value"
      [scrollable]="scrollable"
      [lazy]="lazy"
      (valueChange)="value = $event"
    >
      <p-tablist>
        @for (tab of tabs; track tab.value) {
          <p-tab
            [value]="tab.value"
            [disabled]="tab.disabled || false"
          >
            @if (tab.icon) {
              <i class="text-xl" [class]="tab.icon"></i>
            }
            <span>{{ tab.label }}</span>
            @if (tab.badge) {
              <p-badge
                [value]="tab.badge"
                [severity]="tab.badgeSeverity || 'success'"
              ></p-badge>
            }
          </p-tab>
        }
      </p-tablist>
      <p-tabpanels>
        @for (tab of tabs; track tab.value) {
          <p-tabpanel [value]="tab.value">
            <p class="m-0">{{ tab.content }}</p>
          </p-tabpanel>
        }
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
