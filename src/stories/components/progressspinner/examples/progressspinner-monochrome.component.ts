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
  selector: 'app-progressspinner-monochrome',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template
})
export class ProgressSpinnerMonochromeComponent {
  @Input() size: ExtraProgressSpinnerSize = 'base';
  @Input() fill: ExtraProgressSpinnerFill = 'white';
}

export const Monochrome: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<app-progressspinner-monochrome [size]="size" [fill]="fill"></app-progressspinner-monochrome>`
  }),
  args: {
    size: 'base',
    fill: 'white'
  },
  parameters: {
    docs: {
      description: {
        story: 'Одноцветный вариант спиннера (`fill="white"`) — для цветной/тёмной подложки.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraProgressSpinnerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-progressspinner-monochrome',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressSpinnerComponent],
  template: \`<extra-progressspinner fill="white"></extra-progressspinner>\`,
})
export class ProgressSpinnerMonochromeComponent {}
        `
      }
    }
  }
};
