import { Component, Input } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ProgressSpinnerComponent, ProgressSpinnerSize } from '../../../../lib/components/progressspinner/progressspinner.component';

const template = `
<progressspinner [size]="size" [multicolor]="multicolor"></progressspinner>
`;

@Component({
  selector: 'progressspinner-sizes',
  standalone: true,
  imports: [ProgressSpinnerComponent],
  template
})
export class ProgressSpinnerSizesComponent {
  @Input() size: ProgressSpinnerSize = 'xlarge';
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
import { ProgressSpinnerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'progressspinner-sizes',
  standalone: true,
  imports: [ProgressSpinnerComponent],
  template: \`<progressspinner size="xlarge"></progressspinner>\`
})
export class ProgressSpinnerSizesComponent {}
        `
      }
    }
  }
};
