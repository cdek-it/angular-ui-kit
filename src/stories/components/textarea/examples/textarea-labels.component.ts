import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraTextareaComponent } from '../../../../lib/components/textarea/textarea.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-textarea [formControl]="control" label="Лейбл сверху" placeholder="Введите текст..."></extra-textarea>
  <extra-textarea [formControl]="control" labelPosition="left" label="Лейбл слева" placeholder="Введите текст..."></extra-textarea>
  <extra-textarea [formControl]="control" label="С пояснением" caption="Пояснение под полем" placeholder="Введите текст..."></extra-textarea>
  <extra-textarea [formControl]="control" label="С тултипом" info="Показывается только менеджеру" placeholder="Введите текст..."></extra-textarea>
  <extra-textarea [formControl]="control" placeholder="Без лейбла и пояснения"></extra-textarea>
</div>
`;

@Component({
  selector: 'app-textarea-labels',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraTextareaComponent, ReactiveFormsModule],
  template
})
export class TextareaLabelsComponent {
  control = new FormControl('');
}

export const Labels: StoryObj = {
  render: () => ({
    template: `<app-textarea-labels></app-textarea-labels>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Положения лейбла (labelPosition): top (по умолчанию) и left. caption — пояснение под полем, info — текст тултипа у иконки рядом с лейблом. Без label и caption поле не оборачивается.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraTextareaComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-textarea-labels',
  standalone: true,
  imports: [ExtraTextareaComponent, ReactiveFormsModule],
  template: \`
    <extra-textarea [formControl]="control" label="Лейбл сверху"></extra-textarea>

    <extra-textarea [formControl]="control" labelPosition="left" label="Лейбл слева"></extra-textarea>

    <extra-textarea [formControl]="control" label="С пояснением" caption="Пояснение под полем"></extra-textarea>

    <extra-textarea [formControl]="control" label="С тултипом" info="Показывается только менеджеру"></extra-textarea>

    <!-- без label и caption поле не оборачивается -->
    <extra-textarea [formControl]="control"></extra-textarea>
  \`,
})
export class TextareaLabelsComponent {
  control = new FormControl('');
}
        `
      }
    }
  }
};
