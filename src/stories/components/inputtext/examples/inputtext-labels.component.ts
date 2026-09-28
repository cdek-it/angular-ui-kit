import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-6">
  <extra-input-text
    [formControl]="topControl"
    label="Лейбл сверху"
    placeholder="Введите текст..."
    info="Дополнительная информация в тултипе"
    caption="Пояснение под полем"
  ></extra-input-text>
  <extra-input-text
    [formControl]="floatControl"
    labelPosition="float"
    label="Плавающий лейбл"
    caption="Пояснение под полем"
  ></extra-input-text>
  <extra-input-text
    [formControl]="leftControl"
    labelPosition="left"
    label="Лейбл слева"
    placeholder="Введите текст..."
    info="Дополнительная информация в тултипе"
  ></extra-input-text>
  <extra-input-text [formControl]="plainControl" placeholder="Без label и caption"></extra-input-text>
</div>
`;

@Component({
  selector: 'app-inputtext-labels',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template
})
export class InputTextLabelsComponent {
  topControl = new FormControl('');
  floatControl = new FormControl('');
  leftControl = new FormControl('');
  plainControl = new FormControl('');
}

export const Labels: StoryObj = {
  render: () => ({
    template: `<app-inputtext-labels></app-inputtext-labels>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Положения лейбла (label-position): default — сверху, float — плавающий внутри поля, left — слева от поля. Info показывается иконкой ti-info-circle с тултипом, caption — пояснение под полем.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputtext-labels',
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: \`
    <extra-input-text
      [formControl]="topControl"
      label="Лейбл сверху"
      placeholder="Введите текст..."
      info="Дополнительная информация в тултипе"
      caption="Пояснение под полем"
    ></extra-input-text>

    <extra-input-text
      [formControl]="floatControl"
      labelPosition="float"
      label="Плавающий лейбл"
      caption="Пояснение под полем"
    ></extra-input-text>

    <extra-input-text
      [formControl]="leftControl"
      labelPosition="left"
      label="Лейбл слева"
      placeholder="Введите текст..."
      info="Дополнительная информация в тултипе"
    ></extra-input-text>

    <!-- без label и caption поле не оборачивается -->
    <extra-input-text [formControl]="plainControl" placeholder="Без label и caption"></extra-input-text>
  \`,
})
export class InputTextLabelsComponent {
  topControl = new FormControl('');
  floatControl = new FormControl('');
  leftControl = new FormControl('');
  plainControl = new FormControl('');
}
        `
      }
    }
  }
};
