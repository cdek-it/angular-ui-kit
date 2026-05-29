import { Component, Input } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraProgressSpinnerComponent } from '../../../../lib/components/progressspinner/progressspinner.component';

const template = `
<extra-progressspinner [size]="size" [multicolor]="multicolor"></extra-progressspinner>
`;

@Component({
  selector: 'progressspinner-monochrome',
  standalone: true,
  imports: [ExtraProgressSpinnerComponent],
  template
})
export class ProgressSpinnerMonochromeComponent {
  @Input() size: any = 'medium';
  @Input() multicolor = false;
}

export const Monochrome: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<progressspinner-monochrome [size]="size" [multicolor]="multicolor"></progressspinner-monochrome>`
  }),
  args: {
    size: 'medium',
    multicolor: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Одноцветный вариант спиннера (monochrome).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraProgressSpinnerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'progressspinner-monochrome',
  standalone: true,
  imports: [ExtraProgressSpinnerComponent],
  template: \`<extra-progressspinner [multicolor]="false"></extra-progressspinner>\`
})
export class ProgressSpinnerMonochromeComponent {}
        `
      }
    }
  }
};
