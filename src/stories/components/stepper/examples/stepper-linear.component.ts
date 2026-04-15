import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { StepperComponent, StepperItem } from '../../../../lib/components/stepper/stepper.component';

const template = `
<div class="bg-surface-ground">
  <stepper value="1" [linear]="true" [steps]="steps"></stepper>
</div>
`;
const styles = '';

@Component({
  selector: 'app-stepper-linear',
  standalone: true,
  imports: [StepperComponent],
  template,
  styles,
})
export class StepperLinearComponent {
  steps: StepperItem[] = [
    { value: '1', label: 'Stepper', caption: 'caption', content: 'Step 1 Content' },
    { value: '2', label: 'Stepper', caption: 'caption', content: 'Step 2 Content' },
    { value: '3', label: 'Stepper', caption: 'caption', content: 'Step 3 Content' },
  ];
}

export const Linear: StoryObj = {
  render: () => ({
    template: `<app-stepper-linear></app-stepper-linear>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Линейный режим — переход к следующему шагу только после завершения текущего.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { StepperComponent, StepperItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-stepper-linear',
  standalone: true,
  imports: [StepperComponent],
  template: \`
    <stepper value="1" [linear]="true" [steps]="steps"></stepper>
  \`,
})
export class StepperLinearComponent {
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
