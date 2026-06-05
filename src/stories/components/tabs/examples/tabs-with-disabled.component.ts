import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTabsComponent, TabItem } from '../../../../lib/components/tabs/tabs.component';

const template = `
<div class="bg-surface-ground">
  <extra-tabs value="0" [tabs]="tabs"></extra-tabs>
</div>
`;
const styles = '';

@Component({
  selector: 'app-tabs-with-disabled',
  standalone: true,
  imports: [ExtraTabsComponent],
  template,
  styles
})
export class TabsWithDisabledComponent {
  tabs: TabItem[] = [
    { value: '0', label: 'Active Tab', icon: 'ti ti-user', content: 'Active Tab Content' },
    { value: '1', label: 'Default Tab', icon: 'ti ti-settings', content: 'Default Tab Content' },
    { value: '2', label: 'Disabled Tab', icon: 'ti ti-bell', disabled: true, content: 'Disabled Tab Content' }
  ];
}

export const WithDisabled: StoryObj = {
  render: () => ({
    template: `<app-tabs-with-disabled></app-tabs-with-disabled>`
  }),
  parameters: {
    docs: {
      description: { story: 'Табы с заблокированной вкладкой.' },
      source: {
        language: 'ts',
        code: `
import { ExtraTabsComponent, TabItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tabs-with-disabled',
  standalone: true,
  imports: [ExtraTabsComponent],
  template: \`
    <extra-tabs value="0" [tabs]="tabs"></extra-tabs>
  \`,
})
export class TabsWithDisabledComponent {
  tabs: TabItem[] = [
    { value: '0', label: 'Active Tab', icon: 'ti ti-user', content: 'Active Tab Content' },
    { value: '1', label: 'Default Tab', icon: 'ti ti-settings', content: 'Default Tab Content' },
    { value: '2', label: 'Disabled Tab', icon: 'ti ti-bell', disabled: true, content: 'Disabled Tab Content' },
  ];
}
        `
      }
    }
  }
};
