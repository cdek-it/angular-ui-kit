import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground">
  <extra-tag value="Verified" severity="info" icon="ti ti-check"></extra-tag>
</div>
`;

@Component({
  selector: 'app-tag-icon',
  standalone: true,
  imports: [ExtraTagComponent],
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
import { ExtraTagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-icon',
  standalone: true,
  imports: [ExtraTagComponent],
  template: \`
    <extra-tag value="Verified" severity="info" icon="ti ti-check"></extra-tag>
  \`,
})
export class TagIconComponent {}
        `,
      },
    },
  },
};
