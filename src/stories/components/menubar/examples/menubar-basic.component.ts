import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMenuItem } from '@cdek-it/angular-ui-kit/shared';
import { ExtraMenubarComponent } from '../../../../lib/components/menubar/menubar.component';
import { basicItems } from '../menubar.data';

const template = `
<div class="min-h-[300px]">
  <extra-menubar [model]="items"></extra-menubar>
</div>
`;
const styles = '';

@Component({
  selector: 'app-menubar-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMenubarComponent],
  template,
  styles
})
export class MenubarBasicComponent {
  items: ExtraMenuItem[] = basicItems;
}

export const Basic: StoryObj = {
  render: () => ({
    template: `<app-menubar-basic></app-menubar-basic>`
  }),
  parameters: {
    docs: {
      description: { story: 'Горизонтальное меню с выпадающими подменю.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMenubarComponent, ExtraMenuItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menubar-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMenubarComponent],
  template: \`
    <extra-menubar [model]="items"></extra-menubar>
  \`,
})
export class MenubarBasicComponent {
  items: ExtraMenuItem[] = [
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
        `
      }
    }
  }
};
