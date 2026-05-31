import { Component, ChangeDetectionStrategy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRatingComponent } from '../../../../lib/components/rating/rating.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-rating [(ngModel)]="value" [disabled]="true"></extra-rating>
</div>
`;

@Component({
  selector: 'app-rating-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  imports: [ExtraRatingComponent, FormsModule],
  template
})
export class RatingDisabledComponent {
  value = 2;
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-rating-disabled></app-rating-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Заблокированное состояние — компонент недоступен для взаимодействия.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { RatingComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRatingComponent, FormsModule],
  template: \`
    <extra-rating [(ngModel)]="value" [disabled]="true"></extra-rating>
  \`,
})
export class RatingDisabledComponent {
  value = 2;
}
        `,
      },
    },
  },
};
