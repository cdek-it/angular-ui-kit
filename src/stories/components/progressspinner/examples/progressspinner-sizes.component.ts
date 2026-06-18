import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraProgressSpinnerComponent, ExtraProgressSpinnerSize } from '../../../../lib/components/progressspinner/progressspinner.component';

const template = `
<extra-progressspinner [size]="size" [multicolor]="multicolor"></extra-progressspinner>
`;

@Component({
  selector: 'progressspinner-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template
})
export class ProgressSpinnerSizesComponent {
  @Input() size: ExtraProgressSpinnerSize = 'xlarge';
  @Input() multicolor = true;
}

export const Sizes: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<progressspinner-sizes [size]="size" [multicolor]="multicolor"></progressspinner-sizes>`
  }),
  args: {
    size: 'xlarge',
    multicolor: true
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
  selector: 'progressspinner-sizes',
  standalone: true,
  imports: [ExtraProgressSpinnerComponent],
  template: \`<extra-progressspinner size="xlarge"></extra-progressspinner>\`
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerSizesComponent {}
        `
      }
    }
  }
};
