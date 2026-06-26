import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraProgressSpinnerComponent } from '../../../../lib/components/progressspinner/progressspinner.component';

const template = `
<extra-progressspinner [size]="size" [multicolor]="multicolor"></extra-progressspinner>
`;

@Component({
  selector: 'progressspinner-monochrome',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template
})
export class ProgressSpinnerMonochromeComponent {
  @Input() size: any = 'base';
  @Input() multicolor = false;
}

export const Monochrome: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<progressspinner-monochrome [size]="size" [multicolor]="multicolor"></progressspinner-monochrome>`
  }),
  args: {
    size: 'base',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template: \`<extra-progressspinner [multicolor]="false"></extra-progressspinner>\`
})
export class ProgressSpinnerMonochromeComponent {}
        `
      }
    }
  }
};
