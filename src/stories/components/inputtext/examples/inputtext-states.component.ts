import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-input-text
    [formControl]="control"
    label="Обычная"
    placeholder="Введите текст..."
    caption="Пояснение под полем"
  ></extra-input-text>
  <extra-input-text
    [formControl]="disabled"
    label="Disabled"
    placeholder="Недоступно"
    caption="Управляется через FormControl.disable()"
  ></extra-input-text>
  <extra-input-text
    [formControl]="invalid"
    label="Invalid"
    placeholder="Обязательное поле"
    caption="Invalid определяется автоматически из NgControl"
  ></extra-input-text>
</div>
`;

@Component({
  selector: 'app-inputtext-states',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template
})
export class InputTextStatesComponent {
  control = new FormControl('');
  disabled = new FormControl({ value: '', disabled: true });
  invalid = new FormControl('', Validators.required);
}

export const States: StoryObj = {
  render: () => ({
    template: `<app-inputtext-states></app-inputtext-states>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Состояния disabled и invalid управляются через FormControl: disable() / Validators (invalid вычисляется из NgControl автоматически).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputtext-states',
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: \`
    <extra-input-text [formControl]="control" label="Обычная" placeholder="Введите текст..."></extra-input-text>

    <!-- disabled через FormControl -->
    <extra-input-text [formControl]="disabled" label="Disabled" placeholder="Недоступно"></extra-input-text>

    <!-- invalid через Validators (красная рамка определяется из NgControl) -->
    <extra-input-text [formControl]="invalid" label="Invalid" placeholder="Обязательное поле"></extra-input-text>
  \`,
})
export class InputTextStatesComponent {
  control = new FormControl('');
  disabled = new FormControl({ value: '', disabled: true });
  invalid = new FormControl('', Validators.required);
}
        `
      }
    }
  }
};
