import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { StepperComponent, StepperItem } from '../../../../lib/components/stepper/stepper.component';

const template = `
<div class="bg-surface-ground">
  <stepper value="2" [steps]="steps"></stepper>
</div>
`;
const styles = '';

@Component({
  selector: 'app-stepper-error',
  standalone: true,
  imports: [StepperComponent],
  template,
  styles,
})
export class StepperErrorComponent {
  steps: StepperItem[] = [
    { value: '1', label: 'Stepper', caption: 'caption', content: 'Step 1 Content' },
    { value: '2', label: 'Stepper', caption: 'caption', content: 'Step 2 Content (Invalid)', invalid: true },
    { value: '3', label: 'Stepper', caption: 'caption', content: 'Step 3 Content', disabled: true },
  ];
}

export const Error: StoryObj = {
  name: 'Error (Invalid step)',
  render: () => ({
    template: `<app-stepper-error></app-stepper-error>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Шаг с ошибкой — визуально выделяется красным при активном состоянии.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { StepperComponent, StepperItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-stepper-error',
  standalone: true,
  imports: [StepperComponent],
  template: \`
    <stepper value="2" [steps]="steps"></stepper>
  \`,
})
export class StepperErrorComponent {
  steps: StepperItem[] = [
    { value: '1', label: 'Stepper', caption: 'caption', content: 'Step 1 Content' },
    { value: '2', label: 'Stepper', caption: 'caption', content: 'Step 2 Content (Invalid)', invalid: true },
    { value: '3', label: 'Stepper', caption: 'caption', content: 'Step 3 Content', disabled: true },
  ];
}
        `,
      },
    },
  },
};
