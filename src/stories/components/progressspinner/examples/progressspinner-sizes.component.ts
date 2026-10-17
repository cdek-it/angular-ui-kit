import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import {
  ExtraProgressSpinnerComponent,
  ExtraProgressSpinnerFill,
  ExtraProgressSpinnerSize
} from '../../../../lib/components/progressspinner/progressspinner.component';

const template = `
<extra-progressspinner [size]="size" [fill]="fill"></extra-progressspinner>
`;

@Component({
  selector: 'app-progressspinner-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template
})
export class ProgressSpinnerSizesComponent {
  @Input() size: ExtraProgressSpinnerSize = 'xlarge';
  @Input() fill: ExtraProgressSpinnerFill = 'primary';
}

export const Sizes: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<app-progressspinner-sizes [size]="size" [fill]="fill"></app-progressspinner-sizes>`
  }),
  args: {
    size: 'xlarge',
    fill: 'primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Изменение размера спиннера. Используйте Controls для выбора других вариантов.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraProgressSpinnerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-progressspinner-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template: \`<extra-progressspinner size="xlarge"></extra-progressspinner>\`,
})
export class ProgressSpinnerSizesComponent {}
        `
      }
    }
  }
};
