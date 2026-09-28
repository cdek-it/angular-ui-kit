import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-4" style="max-width: 320px">
  <extra-input-text [fluid]="true" [formControl]="control" placeholder="Введите текст..."></extra-input-text>
  <extra-input-text [fluid]="true" [formControl]="control" size="lg" label="С лейблом" placeholder="Введите текст..."></extra-input-text>
  <extra-input-text [fluid]="true" [formControl]="control" clearable placeholder="С иконкой очистки"></extra-input-text>
  <extra-input-text [formControl]="control" placeholder="Без fluid"></extra-input-text>
</div>
`;

@Component({
  selector: 'app-inputtext-fluid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template
})
export class InputTextFluidComponent {
  control = new FormControl('');
}

export const Fluid: StoryObj = {
  render: () => ({
    template: `<app-inputtext-fluid></app-inputtext-fluid>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Растягивание на всю ширину контейнера (fluid). При `[fluid]="true"` поле занимает 100% ширины родителя — удобно для форм и мобильных раскладок. Работает и с лейблом, и с иконкой очистки. Последнее поле — без `fluid`, для сравнения. Контейнер в примере ограничен шириной 320px, чтобы эффект был нагляден.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputtext-fluid',
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: \`
    <div class="flex flex-col gap-4" style="max-width: 320px">
      <extra-input-text [fluid]="true" [formControl]="control" placeholder="Введите текст..."></extra-input-text>
    </div>
  \`,
})
export class InputTextFluidComponent {
  control = new FormControl('');
}
        `
      }
    }
  }
};
