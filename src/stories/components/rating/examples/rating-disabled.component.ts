import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { RatingComponent } from '../../../../lib/components/rating/rating.component';

const template = `
<div class="bg-surface-ground p-4">
  <rating [(ngModel)]="value" [disabled]="true"></rating>
</div>
`;

@Component({
  selector: 'app-rating-disabled',
  standalone: true,
  imports: [RatingComponent, FormsModule],
  template,
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
  imports: [RatingComponent, FormsModule],
  template: \`
    <rating [(ngModel)]="value" [disabled]="true"></rating>
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
