import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground">
  <extra-tag value="Rounded" severity="success" [rounded]="true"></extra-tag>
</div>
`;

@Component({
  selector: 'app-tag-rounded',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraTagComponent],
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
import { ExtraTagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-rounded',
  standalone: true,
  imports: [ExtraTagComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-tag value="Rounded" severity="success" [rounded]="true"></extra-tag>
  \`,
})
export class TagRoundedComponent {}
        `,
      },
    },
  },
};
