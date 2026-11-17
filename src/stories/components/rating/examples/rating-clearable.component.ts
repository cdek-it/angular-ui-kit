import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRatingComponent } from '../../../../lib/components/rating/rating.component';

const template = `
  <extra-rating [(ngModel)]="value" [clearable]="true"></extra-rating>
`;

@Component({
  selector: 'app-rating-clearable',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  imports: [ExtraRatingComponent, FormsModule]
})
export class RatingClearableComponent {
  value = 3;
}

export const Clearable: StoryObj = {
  render: () => ({
    template: `<app-rating-clearable></app-rating-clearable>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопка сброса оценки (`clearable`) слева от звёзд — сбрасывает значение в `null`.'
      },
      source: { language: 'html', code: '<extra-rating [(ngModel)]="value" [clearable]="true"></extra-rating>' }
    }
  }
};
