import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTabsComponent, ExtraTabItem } from '../../../../lib/components/tabs/tabs.component';

const template = `
<div class="bg-surface-ground">
  <extra-tabs value="0" [tabs]="tabs"></extra-tabs>
</div>
`;
const styles = '';

@Component({
  selector: 'app-tabs-with-badge',
  standalone: true,
  imports: [ExtraTabsComponent],
  template,
  styles
})
export class TabsWithBadgeComponent {
  tabs: ExtraTabItem[] = [
    { value: '0', label: 'Tab 1', icon: 'ti ti-user', badge: '99+', content: 'Tab 1 Content' },
    { value: '1', label: 'Tab 2', icon: 'ti ti-settings', badge: '5', content: 'Tab 2 Content' },
    { value: '2', label: 'Tab 3', icon: 'ti ti-bell', badge: '2', content: 'Tab 3 Content' }
  ];
}

export const WithBadge: StoryObj = {
  render: () => ({
    template: `<app-tabs-with-badge></app-tabs-with-badge>`
  }),
  parameters: {
    docs: {
      description: { story: 'Табы с бейджами.' },
      source: {
        language: 'ts',
        code: `
import { ExtraTabsComponent, ExtraTabItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tabs-with-badge',
  standalone: true,
  imports: [ExtraTabsComponent],
  template: \`
    <extra-tabs value="0" [tabs]="tabs"></extra-tabs>
  \`,
})
export class TabsWithBadgeComponent {
  tabs: ExtraTabItem[] = [
    { value: '0', label: 'Tab 1', icon: 'ti ti-user', badge: '99+', content: 'Tab 1 Content' },
    { value: '1', label: 'Tab 2', icon: 'ti ti-settings', badge: '5', content: 'Tab 2 Content' },
    { value: '2', label: 'Tab 3', icon: 'ti ti-bell', badge: '2', content: 'Tab 3 Content' },
  ];
}
        `
      }
    }
  }
};
