import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { StepperComponent, StepperItem } from '../../../../lib/components/stepper/stepper.component';

const template = `
<div class="bg-surface-ground">
  <stepper value="1" orientation="vertical" [steps]="steps"></stepper>
</div>
`;
const styles = '';

@Component({
  selector: 'app-stepper-vertical',
  standalone: true,
  imports: [StepperComponent],
  template,
  styles,
})
export class StepperVerticalComponent {
  steps: StepperItem[] = [
    { value: '1', label: 'Stepper', caption: 'caption', content: 'Step 1 Content' },
    { value: '2', label: 'Stepper', caption: 'caption', content: 'Step 2 Content' },
    { value: '3', label: 'Stepper', caption: 'caption', content: 'Step 3 Content' },
  ];
}

export const Vertical: StoryObj = {
  render: () => ({
    template: `<app-stepper-vertical></app-stepper-vertical>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Вертикальная ориентация степпера.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { StepperComponent, StepperItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-stepper-vertical',
  standalone: true,
  imports: [StepperComponent],
  template: \`
    <stepper value="1" orientation="vertical" [steps]="steps"></stepper>
  \`,
})
export class StepperVerticalComponent {
  steps: StepperItem[] = [
    { value: '1', label: 'Stepper', caption: 'caption', content: 'Step 1 Content' },
    { value: '2', label: 'Stepper', caption: 'caption', content: 'Step 2 Content' },
    { value: '3', label: 'Stepper', caption: 'caption', content: 'Step 3 Content' },
  ];
}
        `,
      },
    },
  },
};
