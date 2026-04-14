import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { RatingComponent } from '../../../../lib/components/rating/rating.component';

const template = `
<div class="bg-surface-ground p-4">
  <rating [(ngModel)]="value" [readonly]="true"></rating>
</div>
`;

@Component({
  selector: 'app-rating-readonly',
  standalone: true,
  imports: [RatingComponent, FormsModule],
  template,
})
export class RatingReadonlyComponent {
  value = 4;
}

export const ReadOnly: StoryObj = {
  render: () => ({
    template: `<app-rating-readonly></app-rating-readonly>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Режим только для чтения — значение отображается, но не может быть изменено.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { RatingComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-readonly',
  standalone: true,
  imports: [RatingComponent, FormsModule],
  template: \`
    <rating [(ngModel)]="value" [readonly]="true"></rating>
  \`,
})
export class RatingReadonlyComponent {
  value = 4;
}
        `,
      },
    },
  },
};
