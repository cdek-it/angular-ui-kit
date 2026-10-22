import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex flex-col gap-4" style="max-width: 480px">
  <extra-input-text
    [fluid]="true"
    [formControl]="email"
    clearable
    label="Email"
    placeholder="name@cdek.ru"
    caption="Обязательное поле, формат email"
  ></extra-input-text>

  <div class="flex flex-wrap gap-2">
    <extra-button
      label="setValue()"
      variant="secondary"
      size="small"
      (click)="email.setValue('name@cdek.ru')"
    ></extra-button>
    <extra-button label="reset()" variant="secondary" size="small" (click)="email.reset()"></extra-button>
    <extra-button
      [label]="email.disabled ? 'enable()' : 'disable()'"
      variant="secondary"
      size="small"
      (click)="toggleDisabled()"
    ></extra-button>
  </div>

  <dl class="control-state">
    <dt>value</dt>
    <dd>{{ email.value | json }}</dd>
    <dt>status</dt>
    <dd>{{ email.status }}</dd>
    <dt>errors</dt>
    <dd>{{ email.errors ? (email.errors | json) : '—' }}</dd>
    <dt>touched</dt>
    <dd>{{ email.touched }}</dd>
    <dt>dirty</dt>
    <dd>{{ email.dirty }}</dd>
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
  selector: 'app-inputtext-reactive-forms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputTextComponent, ExtraButtonComponent, ReactiveFormsModule, JsonPipe],
  template,
  styles
})
export class InputTextReactiveFormsComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  toggleDisabled(): void {
    if (this.email.disabled) this.email.enable();
    else this.email.disable();
  }
}

export const ReactiveForms: StoryObj = {
  render: () => ({
    template: `<app-inputtext-reactive-forms></app-inputtext-reactive-forms>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Компонент реализует ControlValueAccessor, поэтому `[formControl]` работает в обе стороны. Ввод с клавиатуры и очистка иконкой × пишут значение в контрол (value, dirty), blur помечает его touched, а `setValue()`, `reset()`, `disable()` / `enable()` со стороны формы обновляют само поле. Состояние invalid берётся из NgControl — красная рамка появляется по Validators, без отдельного пропа.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputTextComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputtext-reactive-forms',
  standalone: true,
  imports: [ExtraInputTextComponent, ExtraButtonComponent, ReactiveFormsModule],
  template: \`
    <extra-input-text
      [fluid]="true"
      [formControl]="email"
      clearable
      label="Email"
      placeholder="name@cdek.ru"
      caption="Обязательное поле, формат email"
    ></extra-input-text>

    <!-- управление контролом со стороны формы -->
    <extra-button label="setValue()" (click)="email.setValue('name@cdek.ru')"></extra-button>
    <extra-button label="reset()" (click)="email.reset()"></extra-button>
    <extra-button [label]="email.disabled ? 'enable()' : 'disable()'" (click)="toggleDisabled()"></extra-button>

    <p>value: {{ email.value }} / status: {{ email.status }} / touched: {{ email.touched }}</p>
  \`,
})
export class InputTextReactiveFormsComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  toggleDisabled(): void {
    if (this.email.disabled) this.email.enable();
    else this.email.disable();
  }
}
        `
      }
    }
  }
};
