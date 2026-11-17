import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRatingComponent } from '../../../../lib/components/rating/rating.component';

const template = `
  <extra-rating [(ngModel)]="value" [readonly]="true"></extra-rating>
`;

@Component({
  selector: 'app-rating-readonly',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  imports: [ExtraRatingComponent, FormsModule]
})
export class RatingReadonlyComponent {
  value = 4;
}

export const ReadOnly: StoryObj = {
  render: () => ({
    template: `<app-rating-readonly></app-rating-readonly>`
  }),
  parameters: {
    docs: {
      description: { story: 'Режим только для чтения — значение отображается, но не может быть изменено.' },
      source: { language: 'html', code: '<extra-rating [(ngModel)]="value" [readonly]="true"></extra-rating>' }
    }
  }
};
