import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRatingComponent } from '../../../../lib/components/rating/rating.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-rating [formControl]="ratingControl"></extra-rating>
</div>
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
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraRatingComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-rating-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRatingComponent, ReactiveFormsModule],
  template: \`
    <extra-rating [formControl]="ratingControl"></extra-rating>
  \`,
})
export class RatingDisabledComponent {
  ratingControl = new FormControl({ value: 2, disabled: true });
}
        `
      }
    }
  }
};
