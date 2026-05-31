import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground">
  <extra-tag value="Success" severity="success"></extra-tag>
</div>
`;

@Component({
  selector: 'app-tag-severity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraTagComponent],
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
import { ExtraTagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-severity',
  standalone: true,
  imports: [ExtraTagComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-tag value="Success" severity="success"></extra-tag>
  \`,
})
export class TagSeverityComponent {}
        `,
      },
    },
  },
};
