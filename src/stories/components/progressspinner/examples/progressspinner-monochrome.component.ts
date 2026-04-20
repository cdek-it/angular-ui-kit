import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ProgressSpinnerComponent } from '../../../../lib/components/progressspinner/progressspinner.component';

const template = `
<progressspinner [size]="size" [multicolor]="multicolor"></progressspinner>
`;

@Component({
  selector: 'progressspinner-monochrome',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressSpinnerComponent],
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
import { ProgressSpinnerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'progressspinner-monochrome',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressSpinnerComponent],
  template: \`<progressspinner [multicolor]="false"></progressspinner>\`
})
export class ProgressSpinnerMonochromeComponent {}
        `
      }
    }
  }
};
