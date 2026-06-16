import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMenuItem } from '@cdek-it/angular-ui-kit/shared';
import { ExtraMenubarComponent } from '../../../../lib/components/menubar/menubar.component';

const template = `
<div class="min-h-[300px]">
  <extra-menubar [model]="items"></extra-menubar>
</div>
`;
const styles = '';

@Component({
  selector: 'app-menubar-with-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMenubarComponent],
  template,
  styles
})
export class MenubarWithIconComponent {
  items: ExtraMenuItem[] = [
    {
      label: 'Home',
      icon: 'ti ti-home'
    },
    {
      label: 'Features',
      icon: 'ti ti-star',
      items: [
        { label: 'Core', icon: 'ti ti-cpu' },
        { label: 'Blocks', icon: 'ti ti-layout-grid' },
        { label: 'UI Kit', icon: 'ti ti-palette' },
        {
          label: 'Templates',
          icon: 'ti ti-template',
          items: [
            { label: 'Apollo', icon: 'ti ti-rocket' },
            { label: 'Ultima', icon: 'ti ti-diamond' }
          ]
        }
      ]
    },
    {
      label: 'Projects',
      icon: 'ti ti-folder',
      items: [
        { label: 'Active', icon: 'ti ti-circle-check' },
        { label: 'Archived', icon: 'ti ti-archive' }
      ]
    },
    {
      label: 'Settings',
      icon: 'ti ti-settings'
    }
  ];
}

export const WithIcon: StoryObj = {
  render: () => ({
    template: `<app-menubar-with-icon></app-menubar-with-icon>`
  }),
  parameters: {
    docs: {
      description: { story: 'Menubar с иконками в пунктах меню и вложенных подменю.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMenubarComponent, ExtraMenuItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menubar-with-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMenubarComponent],
  template: \`
    <extra-menubar [model]="items"></extra-menubar>
  \`,
})
export class MenubarWithIconComponent {
  items: ExtraMenuItem[] = [
    { label: 'Home', icon: 'ti ti-home' },
    {
      label: 'Features',
      icon: 'ti ti-star',
      items: [
        { label: 'Core', icon: 'ti ti-cpu' },
        { label: 'Blocks', icon: 'ti ti-layout-grid' },
        { label: 'UI Kit', icon: 'ti ti-palette' },
        {
          label: 'Templates',
          icon: 'ti ti-template',
          items: [
            { label: 'Apollo', icon: 'ti ti-rocket' },
            { label: 'Ultima', icon: 'ti ti-diamond' },
          ],
        },
      ],
    },
    {
      label: 'Projects',
      icon: 'ti ti-folder',
      items: [
        { label: 'Active', icon: 'ti ti-circle-check' },
        { label: 'Archived', icon: 'ti ti-archive' },
      ],
    },
    { label: 'Settings', icon: 'ti ti-settings' },
  ];
}
        `
      }
    }
  }
};
