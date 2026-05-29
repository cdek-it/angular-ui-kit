import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraStepperComponent, ExtraStepperItem } from '../../../../lib/components/stepper/stepper.component';

const template = `
<div class="bg-surface-ground">
  <extra-stepper [value]="1" [showPanels]="false" [steps]="steps"></extra-stepper>
</div>
`;
const styles = '';

@Component({
  selector: 'app-stepper-steps-only',
  standalone: true,
  imports: [ExtraStepperComponent],
  template,
  styles,
})
export class StepperStepsOnlyComponent {
  steps: ExtraStepperItem[] = [
    { value: 1, label: 'Stepper', caption: 'caption' },
    { value: 2, label: 'Stepper', caption: 'caption' },
    { value: 3, label: 'Stepper', caption: 'caption' },
  ];
}

export const StepsOnly: StoryObj = {
  render: () => ({
    template: `<app-stepper-steps-only></app-stepper-steps-only>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Только шаги без панелей контента.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraStepperComponent, StepperItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-stepper-steps-only',
  standalone: true,
  imports: [ExtraStepperComponent],
  template: \`
    <extra-stepper [value]="1" [showPanels]="false" [steps]="steps"></extra-stepper>
  \`,
})
export class StepperStepsOnlyComponent {
  steps: StepperItem[] = [
    { value: 1, label: 'Stepper', caption: 'caption' },
    { value: 2, label: 'Stepper', caption: 'caption' },
    { value: 3, label: 'Stepper', caption: 'caption' },
  ];
}
        `,
      },
    },
  },
};
