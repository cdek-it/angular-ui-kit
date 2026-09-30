import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-input-mask
    [formControl]="control"
    mask="(999) 999-9999"
    label="Обычное"
    placeholder="(___) ___-____"
    caption="Пояснение под полем"
  ></extra-input-mask>
  <extra-input-mask
    [formControl]="disabled"
    mask="(999) 999-9999"
    label="Disabled"
    placeholder="Недоступно"
    caption="Управляется через FormControl.disable()"
  ></extra-input-mask>
  <extra-input-mask
    [formControl]="readonlyControl"
    [readonly]="true"
    mask="(999) 999-9999"
    label="Readonly"
    caption="Значение видно, редактирование запрещено"
  ></extra-input-mask>
  <extra-input-mask
    [formControl]="invalid"
    mask="(999) 999-9999"
    label="Invalid"
    placeholder="Обязательное поле"
    caption="Invalid определяется автоматически из NgControl"
  ></extra-input-mask>
</div>
`;

@Component({
  selector: 'app-inputmask-states',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template
})
export class InputMaskStatesComponent {
  control = new FormControl('');
  disabled = new FormControl({ value: '', disabled: true });
  readonlyControl = new FormControl('(495) 123-4567');
  invalid = new FormControl('', Validators.required);
}

export const States: StoryObj = {
  render: () => ({
    template: `<app-inputmask-states></app-inputmask-states>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Состояния disabled и invalid управляются через FormControl: disable() / Validators (invalid вычисляется из NgControl автоматически). Readonly — отдельный проп `[readonly]`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputmask-states',
  standalone: true,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template: \`
    <extra-input-mask [formControl]="control" mask="(999) 999-9999" label="Обычное"></extra-input-mask>

    <!-- disabled через FormControl -->
    <extra-input-mask [formControl]="disabled" mask="(999) 999-9999" label="Disabled"></extra-input-mask>

    <!-- readonly — проп компонента -->
    <extra-input-mask
      [formControl]="readonlyControl"
      [readonly]="true"
      mask="(999) 999-9999"
      label="Readonly"
    ></extra-input-mask>

    <!-- invalid через Validators (красная рамка определяется из NgControl) -->
    <extra-input-mask [formControl]="invalid" mask="(999) 999-9999" label="Invalid"></extra-input-mask>
  \`,
})
export class InputMaskStatesComponent {
  control = new FormControl('');
  disabled = new FormControl({ value: '', disabled: true });
  readonlyControl = new FormControl('(495) 123-4567');
  invalid = new FormControl('', Validators.required);
}
        `
      }
    }
  }
};
