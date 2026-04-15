import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { TagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground">
  <tag value="Verified" severity="info" icon="ti ti-check"></tag>
</div>
`;

@Component({
  selector: 'app-tag-icon',
  standalone: true,
  imports: [TagComponent],
  template,
})
export class TagIconComponent { }

export const WithIcon: StoryObj = {
  render: () => ({
    template: `<app-tag-icon></app-tag-icon>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Тег с иконкой из библиотеки Tabler Icons.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-icon',
  standalone: true,
  imports: [TagComponent],
  template: \`
    <tag value="Verified" severity="info" icon="ti ti-check"></tag>
  \`,
})
export class TagIconComponent {}
        `,
      },
    },
  },
};
