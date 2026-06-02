import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraBreadcrumbComponent } from '../../../../lib/components/breadcrumb/breadcrumb.component';
import { commonHome, iconOnlyItems } from '../breadcrumb.data';

const template = `
<div class="bg-surface-ground">
  <extra-breadcrumb [model]="model" [home]="home"></extra-breadcrumb>
</div>
`;

@Component({
  selector: 'app-breadcrumb-icons-only',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBreadcrumbComponent],
  template
})
export class BreadcrumbIconsOnlyComponent {
  home = commonHome;
  model = iconOnlyItems;
}

export const IconsOnly: StoryObj = {
  render: () => ({
    template: `<app-breadcrumb-icons-only></app-breadcrumb-icons-only>`
  }),
  parameters: {
    docs: {
      description: { story: 'Хлебные крошки только с иконками, без текста.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraBreadcrumbComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-breadcrumb-icons-only',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBreadcrumbComponent],
  template: \`
    <extra-breadcrumb [model]="model" [home]="home"></extra-breadcrumb>
  \`,
})
export class BreadcrumbIconsOnlyComponent {
  home = { icon: 'ti ti-home', url: '#' };
  model = [
    { icon: 'ti ti-device-laptop', url: '#' },
    { icon: 'ti ti-cpu', url: '#' },
    { icon: 'ti ti-book' },
  ];
}
        `
      }
    }
  }
};
