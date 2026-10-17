import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

const template = `
<div class="flex flex-col gap-6">
  <extra-input-number
    [formControl]="control"
    label="Лейбл сверху"
    placeholder="0"
    info="Дополнительная информация в тултипе"
    caption="Пояснение под полем"
  ></extra-input-number>
  <extra-input-number
    [formControl]="control"
    [floatLabel]="true"
    label="Плавающий лейбл"
    caption="Пояснение под полем"
  ></extra-input-number>
  <extra-input-number
    [formControl]="control"
    labelPosition="left"
    label="Лейбл слева"
    placeholder="0"
    info="Дополнительная информация в тултипе"
  ></extra-input-number>
  <extra-input-number [formControl]="control" placeholder="Без label и caption"></extra-input-number>
</div>
`;

@Component({
  selector: 'app-inputnumber-labels',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputNumberComponent, ReactiveFormsModule],
  template
})
export class InputNumberLabelsComponent {
  control = new FormControl<number | null>(null);
}

export const Labels: StoryObj = {
  render: () => ({
    template: `<app-inputnumber-labels></app-inputnumber-labels>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Положения лейбла (labelPosition): top — сверху (по умолчанию), left — слева от поля; floatLabel — плавающий лейбл внутри поля (несовместим с showButtons). Info показывается иконкой ti-info-circle с тултипом, caption — пояснение под полем.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputNumberComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputnumber-labels',
  standalone: true,
  imports: [ExtraInputNumberComponent, ReactiveFormsModule],
  template: \`
    <extra-input-number
      [formControl]="control"
      label="Лейбл сверху"
      placeholder="0"
      info="Дополнительная информация в тултипе"
      caption="Пояснение под полем"
    ></extra-input-number>

    <extra-input-number
      [formControl]="control"
      [floatLabel]="true"
      label="Плавающий лейбл"
    ></extra-input-number>

    <extra-input-number
      [formControl]="control"
      labelPosition="left"
      label="Лейбл слева"
      placeholder="0"
    ></extra-input-number>

    <!-- без label и caption поле не оборачивается -->
    <extra-input-number [formControl]="control" placeholder="Без label и caption"></extra-input-number>
  \`,
})
export class InputNumberLabelsComponent {
  control = new FormControl<number | null>(null);
}
        `
      }
    }
  }
};
