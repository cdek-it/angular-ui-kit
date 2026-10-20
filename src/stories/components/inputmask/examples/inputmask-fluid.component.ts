import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

const template = `
<div class="border border-dashed border-surface-200 p-4" style="width: 600px">
  <extra-input-mask
    [fluid]="true"
    [formControl]="control"
    mask="(999) 999-9999"
    label="Поле на всю ширину контейнера"
    placeholder="(___) ___-____"
  ></extra-input-mask>
</div>
`;

@Component({
  selector: 'app-inputmask-fluid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template
})
export class InputMaskFluidComponent {
  control = new FormControl('');
}

export const Fluid: StoryObj = {
  render: () => ({
    template: `<app-inputmask-fluid></app-inputmask-fluid>`
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
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputmask-fluid',
  standalone: true,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template: \`
    <!-- поле растягивается по ширине этого контейнера -->
    <div style="width: 600px">
      <extra-input-mask
        [fluid]="true"
        [formControl]="control"
        mask="(999) 999-9999"
        label="Поле на всю ширину контейнера"
        placeholder="(___) ___-____"
      ></extra-input-mask>
    </div>
  \`,
})
export class InputMaskFluidComponent {
  control = new FormControl('');
}
        `
      }
    }
  }
};
