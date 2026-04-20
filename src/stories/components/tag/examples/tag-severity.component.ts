import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { TagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground">
  <tag value="Success" severity="success"></tag>
</div>
`;

@Component({
  selector: 'app-tag-severity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagComponent],
  template,
})
export class TagSeverityComponent { }

export const Severity: StoryObj = {
  render: () => ({
    template: `<app-tag-severity></app-tag-severity>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Вариант цветового оформления. Доступные значения: primary, secondary, success, info, warn, danger.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-severity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagComponent],
  template: \`
    <tag value="Success" severity="success"></tag>
  \`,
})
export class TagSeverityComponent {}
        `,
      },
    },
  },
};
