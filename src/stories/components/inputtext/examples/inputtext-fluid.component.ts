import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="border border-dashed border-surface-200 p-4" style="width: 600px">
  <extra-input-text
    [fluid]="true"
    [formControl]="control"
    label="Поле на всю ширину контейнера"
    placeholder="Введите текст..."
  ></extra-input-text>
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
          'Растягивание на всю ширину контейнера (fluid). При `[fluid]="true"` поле занимает 100% ширины родителя вместо собственной ширины по умолчанию. Контейнер в примере — 600px и обведён пунктиром, чтобы было видно, что поле тянется ровно по его границам.'
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
    <!-- поле растягивается по ширине этого контейнера -->
    <div style="width: 600px">
      <extra-input-text
        [fluid]="true"
        [formControl]="control"
        label="Поле на всю ширину контейнера"
        placeholder="Введите текст..."
      ></extra-input-text>
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
