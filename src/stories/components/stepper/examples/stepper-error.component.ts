import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraStepperComponent, ExtraStepperItem } from '../../../../lib/components/stepper/stepper.component';

const template = `
<div class="bg-surface-ground">
  <extra-stepper [value]="2" [steps]="steps"></extra-stepper>
</div>
`;
const styles = '';

@Component({
  selector: 'app-stepper-error',
  standalone: true,
  imports: [ExtraStepperComponent],
  template,
  styles
})
export class StepperErrorComponent {
  steps: ExtraStepperItem[] = [
    { value: 1, label: 'Stepper', caption: 'caption', content: 'Step 1 Content' },
    { value: 2, label: 'Stepper', caption: 'caption', content: 'Step 2 Content (Invalid)', invalid: true },
    { value: 3, label: 'Stepper', caption: 'caption', content: 'Step 3 Content', disabled: true }
  ];
}

export const Error: StoryObj = {
  name: 'Error (Invalid step)',
  render: () => ({
    template: `<app-stepper-error></app-stepper-error>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Шаг с ошибкой — визуально выделяется красным при активном состоянии.' },
      source: {
        language: 'ts',
        code: `
import { ExtraStepperComponent, StepperItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-stepper-error',
  standalone: true,
  imports: [ExtraStepperComponent],
  template: \`
    <extra-stepper [value]="2" [steps]="steps"></extra-stepper>
  \`,
})
export class StepperErrorComponent {
  steps: StepperItem[] = [
    { value: 1, label: 'Stepper', caption: 'caption', content: 'Step 1 Content' },
    { value: 2, label: 'Stepper', caption: 'caption', content: 'Step 2 Content (Invalid)', invalid: true },
    { value: 3, label: 'Stepper', caption: 'caption', content: 'Step 3 Content', disabled: true },
  ];
}
        `
      }
    }
  }
};
