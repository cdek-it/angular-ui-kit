import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

const template = `
<div class="flex flex-col gap-6">
  <extra-input-mask
    [formControl]="topControl"
    mask="(999) 999-9999"
    label="Лейбл сверху"
    placeholder="(___) ___-____"
    info="Дополнительная информация в тултипе"
    caption="Пояснение под полем"
  ></extra-input-mask>
  <extra-input-mask
    [formControl]="floatControl"
    mask="99/99/9999"
    [floatLabel]="true"
    label="Плавающий лейбл"
    caption="Пояснение под полем"
  ></extra-input-mask>
  <extra-input-mask
    [formControl]="leftControl"
    mask="999-999-999 99"
    labelPosition="left"
    label="Лейбл слева"
    placeholder="___-___-___ __"
    info="Дополнительная информация в тултипе"
  ></extra-input-mask>
  <extra-input-mask
    [formControl]="plainControl"
    mask="99-99-99"
    placeholder="Без label и caption"
  ></extra-input-mask>
</div>
`;

@Component({
  selector: 'app-inputmask-labels',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template
})
export class InputMaskLabelsComponent {
  topControl = new FormControl('');
  floatControl = new FormControl('');
  leftControl = new FormControl('');
  plainControl = new FormControl('');
}

export const Labels: StoryObj = {
  render: () => ({
    template: `<app-inputmask-labels></app-inputmask-labels>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Положения лейбла (labelPosition): top — сверху (по умолчанию), left — слева от поля; floatLabel — плавающий лейбл внутри поля. Info показывается иконкой ti-info-circle с тултипом, caption — пояснение под полем. С floatLabel не задавайте placeholder: лейбл тогда всегда остаётся поднятым.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputmask-labels',
  standalone: true,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template: \`
    <extra-input-mask
      [formControl]="topControl"
      mask="(999) 999-9999"
      label="Лейбл сверху"
      placeholder="(___) ___-____"
      info="Дополнительная информация в тултипе"
      caption="Пояснение под полем"
    ></extra-input-mask>

    <!-- floatLabel: без placeholder, иначе лейбл всегда поднят -->
    <extra-input-mask
      [formControl]="floatControl"
      mask="99/99/9999"
      [floatLabel]="true"
      label="Плавающий лейбл"
      caption="Пояснение под полем"
    ></extra-input-mask>

    <extra-input-mask
      [formControl]="leftControl"
      mask="999-999-999 99"
      labelPosition="left"
      label="Лейбл слева"
      placeholder="___-___-___ __"
      info="Дополнительная информация в тултипе"
    ></extra-input-mask>

    <!-- без label и caption поле не оборачивается -->
    <extra-input-mask [formControl]="plainControl" mask="99-99-99" placeholder="Без label и caption"></extra-input-mask>
  \`,
})
export class InputMaskLabelsComponent {
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
