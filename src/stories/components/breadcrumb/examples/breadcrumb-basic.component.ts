import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraBreadcrumbComponent } from '../../../../lib/components/breadcrumb/breadcrumb.component';
import { commonHome, commonItems } from '../breadcrumb.data';

const template = `
<div class="bg-surface-ground">
  <extra-breadcrumb [model]="model" [home]="home"></extra-breadcrumb>
</div>
`;

@Component({
  selector: 'app-breadcrumb-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBreadcrumbComponent],
  template,
})
export class BreadcrumbBasicComponent {
  home = commonHome;
  model = commonItems;
}

export const Basic: StoryObj = {
  render: () => ({
    template: `<app-breadcrumb-basic></app-breadcrumb-basic>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Хлебные крошки с текстом и иконками.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraBreadcrumbComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-breadcrumb-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBreadcrumbComponent],
  template: \`
    <extra-breadcrumb [model]="model" [home]="home"></extra-breadcrumb>
  \`,
})
export class BreadcrumbBasicComponent {
  home = { icon: 'ti ti-home', url: '#' };
  model = [
    { label: 'Электроника', icon: 'ti ti-device-laptop', url: '#' },
    { label: 'Компьютеры', icon: 'ti ti-cpu', url: '#' },
    { label: 'Ноутбуки' },
  ];
}
        `,
      },
    },
  },
};
