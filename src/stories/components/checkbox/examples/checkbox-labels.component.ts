import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraCheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <extra-checkbox [formControl]="control" label="Лейбл справа"></extra-checkbox>
    <extra-checkbox [formControl]="control" labelPosition="left" label="Лейбл слева"></extra-checkbox>
    <extra-checkbox [formControl]="control" label="С пояснением" caption="Пояснение под лейблом"></extra-checkbox>
    <extra-checkbox [formControl]="control"></extra-checkbox>
  </div>
</div>
`;

@Component({
  selector: 'app-checkbox-labels',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template
})
export class CheckboxLabelsComponent {
  control = new FormControl(false);
}

export const Labels: StoryObj = {
  render: () => ({
    template: `<app-checkbox-labels></app-checkbox-labels>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Положения лейбла (label-position): right (по умолчанию) — справа от чекбокса, left — слева. Caption — пояснение под лейблом. Без label и caption чекбокс не оборачивается.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-labels',
  standalone: true,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template: \`
    <extra-checkbox [formControl]="control" label="Лейбл справа"></extra-checkbox>

    <extra-checkbox [formControl]="control" labelPosition="left" label="Лейбл слева"></extra-checkbox>

    <extra-checkbox [formControl]="control" label="С пояснением" caption="Пояснение под лейблом"></extra-checkbox>

    <!-- без label и caption чекбокс не оборачивается -->
    <extra-checkbox [formControl]="control"></extra-checkbox>
  \`,
})
export class CheckboxLabelsComponent {
  control = new FormControl(false);
}
        `
      }
    }
  }
};
