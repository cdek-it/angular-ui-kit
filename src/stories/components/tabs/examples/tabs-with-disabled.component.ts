import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { TabsComponent, TabItem } from '../../../../lib/components/tabs/tabs.component';

const template = `
<div class="bg-surface-ground">
  <tabs value="0" [tabs]="tabs"></tabs>
</div>
`;
const styles = '';

@Component({
  selector: 'app-tabs-with-disabled',
  standalone: true,
  imports: [TabsComponent],
  template,
  styles,
})
export class TabsWithDisabledComponent {
  tabs: TabItem[] = [
    { value: '0', label: 'Active Tab', icon: 'ti ti-user', content: 'Active Tab Content' },
    { value: '1', label: 'Default Tab', icon: 'ti ti-settings', content: 'Default Tab Content' },
    { value: '2', label: 'Disabled Tab', icon: 'ti ti-bell', disabled: true, content: 'Disabled Tab Content' },
  ];
}

export const WithDisabled: StoryObj = {
  render: () => ({
    template: `<app-tabs-with-disabled></app-tabs-with-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Табы с заблокированной вкладкой.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TabsComponent, TabItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tabs-with-disabled',
  standalone: true,
  imports: [TabsComponent],
  template: \`
    <tabs value="0" [tabs]="tabs"></tabs>
  \`,
})
export class TabsWithDisabledComponent {
  tabs: TabItem[] = [
    { value: '0', label: 'Active Tab', icon: 'ti ti-user', content: 'Active Tab Content' },
    { value: '1', label: 'Default Tab', icon: 'ti ti-settings', content: 'Default Tab Content' },
    { value: '2', label: 'Disabled Tab', icon: 'ti ti-bell', disabled: true, content: 'Disabled Tab Content' },
  ];
}
        `,
      },
    },
  },
};
