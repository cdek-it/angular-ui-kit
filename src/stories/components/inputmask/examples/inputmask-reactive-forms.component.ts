import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex flex-col gap-4" style="max-width: 480px">
  <extra-input-mask
    [fluid]="true"
    [formControl]="phone"
    mask="(999) 999-9999"
    clearable
    label="Телефон"
    placeholder="(___) ___-____"
    caption="Обязательное поле, маска (999) 999-9999"
  ></extra-input-mask>

  <div class="flex flex-wrap gap-2">
    <extra-button
      label="setValue()"
      variant="secondary"
      size="small"
      (click)="phone.setValue('(495) 123-4567')"
    ></extra-button>
    <extra-button label="reset()" variant="secondary" size="small" (click)="phone.reset()"></extra-button>
    <extra-button
      [label]="phone.disabled ? 'enable()' : 'disable()'"
      variant="secondary"
      size="small"
      (click)="toggleDisabled()"
    ></extra-button>
  </div>

  <dl class="control-state">
    <dt>value</dt>
    <dd>{{ phone.value | json }}</dd>
    <dt>status</dt>
    <dd>{{ phone.status }}</dd>
    <dt>errors</dt>
    <dd>{{ phone.errors ? (phone.errors | json) : '—' }}</dd>
    <dt>touched</dt>
    <dd>{{ phone.touched }}</dd>
    <dt>dirty</dt>
    <dd>{{ phone.dirty }}</dd>
  </dl>
</div>
`;

const styles = `
.control-state {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.25rem 1rem;
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: var(--p-surface-100);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8125rem;
}

.control-state dt {
  opacity: 0.6;
}

.control-state dd {
  margin: 0;
}
`;

@Component({
  selector: 'app-inputmask-reactive-forms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputMaskComponent, ExtraButtonComponent, ReactiveFormsModule, JsonPipe],
  template,
  styles
})
export class InputMaskReactiveFormsComponent {
  phone = new FormControl('', [Validators.required]);

  toggleDisabled(): void {
    if (this.phone.disabled) this.phone.enable();
    else this.phone.disable();
  }
}

export const ReactiveForms: StoryObj = {
  render: () => ({
    template: `<app-inputmask-reactive-forms></app-inputmask-reactive-forms>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Компонент реализует ControlValueAccessor, поэтому `[formControl]` работает в обе стороны. Ввод по маске и очистка иконкой × пишут значение в контрол (value, dirty), blur помечает его touched, а `setValue()`, `reset()`, `disable()` / `enable()` со стороны формы обновляют само поле. Состояние invalid берётся из NgControl — красная рамка появляется по Validators, без отдельного пропа. С `[unmask]="true"` в контрол уйдёт значение без литералов маски.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputMaskComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputmask-reactive-forms',
  standalone: true,
  imports: [ExtraInputMaskComponent, ExtraButtonComponent, ReactiveFormsModule],
  template: \`
    <extra-input-mask
      [fluid]="true"
      [formControl]="phone"
      mask="(999) 999-9999"
      clearable
      label="Телефон"
      placeholder="(___) ___-____"
      caption="Обязательное поле, маска (999) 999-9999"
    ></extra-input-mask>

    <!-- управление контролом со стороны формы -->
    <extra-button label="setValue()" (click)="phone.setValue('(495) 123-4567')"></extra-button>
    <extra-button label="reset()" (click)="phone.reset()"></extra-button>
    <extra-button [label]="phone.disabled ? 'enable()' : 'disable()'" (click)="toggleDisabled()"></extra-button>

    <p>value: {{ phone.value }} / status: {{ phone.status }} / touched: {{ phone.touched }}</p>
  \`,
})
export class InputMaskReactiveFormsComponent {
  phone = new FormControl('', [Validators.required]);

  toggleDisabled(): void {
    if (this.phone.disabled) this.phone.enable();
    else this.phone.disable();
  }
}
        `
      }
    }
  }
};
