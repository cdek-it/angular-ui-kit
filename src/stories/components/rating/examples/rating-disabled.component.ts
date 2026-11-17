import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRatingComponent } from '../../../../lib/components/rating/rating.component';

const template = `
  <extra-rating [formControl]="ratingControl"></extra-rating>
`;

@Component({
  selector: 'app-rating-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  imports: [ExtraRatingComponent, ReactiveFormsModule]
})
export class RatingDisabledComponent {
  ratingControl = new FormControl({ value: 2, disabled: true });
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-rating-disabled></app-rating-disabled>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Заблокированное состояние — компонент недоступен для взаимодействия. `disabled` не публичный `@Input()`, отключается через форму (`disabled: true` в `FormControl`), см. `ControlValueAccessor.setDisabledState`.'
      },
      source: { language: 'html', code: '<extra-rating [formControl]="ratingControl"></extra-rating>' }
    }
  }
};
