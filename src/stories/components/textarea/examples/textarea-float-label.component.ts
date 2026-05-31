import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { StoryObj } from '@storybook/angular';

@Component({
  selector: 'app-textarea-float-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, FloatLabel, ReactiveFormsModule, IconField, InputIcon],
  template: `
    <div class="w-80">
      <p-floatlabel variant="in">
        @if (showClear) {
          <p-iconfield>
            <textarea pTextarea id="fl-textarea" rows="3" [formControl]="control"></textarea>
            <p-inputicon
              class="ti ti-x"
              [style.visibility]="control.value ? 'visible' : 'hidden'"
              [style.pointerEvents]="control.value ? 'auto' : 'none'"
              (click)="control.setValue('')"
            ></p-inputicon>
          </p-iconfield>
        } @else {
          <textarea pTextarea id="fl-textarea" rows="3" [formControl]="control"></textarea>
        }
        <label for="fl-textarea"
          >{{ label }}
          @if (required) {
            <span class="text-red-500 ml-0.5">*</span>
          }
        </label>
      </p-floatlabel>
    </div>
  `
})
export class TextareaFloatLabelComponent {
  control = new FormControl('');
  @Input() label = 'Комментарий';
  @Input() required = false;
  @Input() showClear = false;
}

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: (args) => ({
    props: { label: args['label'], required: args['required'], showClear: args['showClear'] },
    template: `<app-textarea-float-label [label]="label" [required]="required" [showClear]="showClear"></app-textarea-float-label>`,
  }),
  args: {
    label: 'Комментарий',
    required: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст плавающей метки',
      table: {
        category: 'Props',
        defaultValue: { summary: "'Комментарий'" },
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Показывает маркер обязательного поля `*` рядом с меткой',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интеграция с `p-floatlabel variant="in"` — плавающая метка внутри поля. `required` добавляет красный маркер `*`. Требует нативный `<textarea pTextarea>` как прямой дочерний элемент `p-floatlabel`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Textarea, FloatLabel, ReactiveFormsModule],
  template: \`
    <p-floatlabel variant="in">
      <textarea
        pTextarea
        id="fl-textarea"
        rows="3"
        [formControl]="control"
      ></textarea>
      <label for="fl-textarea">Комментарий<span class="text-red-500 ml-0.5">*</span></label>
    </p-floatlabel>
  \`,
})
export class FloatLabelExample {
  control = new FormControl('');
}
        `,
      },
    },
  },
};
