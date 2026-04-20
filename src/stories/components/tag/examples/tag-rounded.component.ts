import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { TagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground">
  <tag value="Rounded" severity="success" [rounded]="true"></tag>
</div>
`;

@Component({
  selector: 'app-tag-rounded',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagComponent],
  template,
})
export class TagRoundedComponent { }

export const Rounded: StoryObj = {
  render: () => ({
    template: `<app-tag-rounded></app-tag-rounded>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Скруглённый вариант тега.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-rounded',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagComponent],
  template: \`
    <tag value="Rounded" severity="success" [rounded]="true"></tag>
  \`,
})
export class TagRoundedComponent {}
        `,
      },
    },
  },
};
