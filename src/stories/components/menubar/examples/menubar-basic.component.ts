import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MenuItem } from 'primeng/api';
import { MenubarComponent } from '../../../../lib/components/menubar/menubar.component';
import { basicItems } from '../menubar.data';

const template = `
<div class="min-h-[300px]">
  <menubar [model]="items"></menubar>
</div>
`;
const styles = '';

@Component({
  selector: 'app-menubar-basic',
  standalone: true,
  imports: [MenubarComponent],
  template,
  styles,
})
export class MenubarBasicComponent {
  items: MenuItem[] = basicItems;
}

export const Basic: StoryObj = {
  render: () => ({
    template: `<app-menubar-basic></app-menubar-basic>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Горизонтальное меню с выпадающими подменю.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menubar-basic',
  standalone: true,
  imports: [MenubarComponent],
  template: \`
    <menubar [model]="items"></menubar>
  \`,
})
export class MenubarBasicComponent {
  items: MenuItem[] = [
    { label: 'Features' },
    {
      label: 'Projects',
      items: [
        { label: 'Components' },
        { label: 'Blocks' },
        { label: 'UI Kit' },
        {
          label: 'Templates',
          items: [{ label: 'Apollo' }, { label: 'Ultima' }],
        },
      ],
    },
    {
      icon: 'ti ti-user',
      label: 'Contact',
      disabled: true,
      items: [
        { label: 'Components' },
        { label: 'Blocks' },
        { label: 'UI Kit' },
        {
          label: 'Templates',
          items: [{ label: 'Apollo' }, { label: 'Ultima' }],
        },
      ],
    },
  ];
}
        `,
      },
    },
  },
};
