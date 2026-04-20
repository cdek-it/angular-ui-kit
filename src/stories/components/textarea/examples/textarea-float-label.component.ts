import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const sourceTemplate = `
<p-floatlabel variant="in">
  <textarea
    pTextarea
    id="fl-textarea"
    [rows]="rows"
    [disabled]="disabled"
    [readOnly]="readonly"
    [invalid]="invalid"
    [fluid]="fluid"
    [pSize]="primeSize"
    [ngClass]="sizeClass"
    [(ngModel)]="value"
  ></textarea>
  <label for="fl-textarea">Комментарий</label>
</p-floatlabel>
`;
const styles = '';

@Component({
  selector: 'app-textarea-float-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, FloatLabel, FormsModule, NgClass],
  template: `
<div class="pt-6 w-80">
  <p-floatlabel variant="in">
    <textarea
      pTextarea
      id="fl-textarea"
      [rows]="rows"
      [disabled]="disabled"
      [readOnly]="readonly"
      [invalid]="invalid"
      [fluid]="fluid"
      [pSize]="primeSize"
      [ngClass]="sizeClass"
      [(ngModel)]="value"
    ></textarea>
    <label for="fl-textarea">Комментарий</label>
  </p-floatlabel>
</div>
  `,
  styles,
})
export class TextareaFloatLabelComponent {
  @Input() size: TextareaComponent['size'] = 'base';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input() fluid = false;
  @Input() rows = 3;

  value = '';

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-textarea-xlg': this.size === 'xlarge' };
  }
}

export const FloatLabelStory: StoryObj<TextareaFloatLabelComponent> = {
  name: 'FloatLabel',
  render: (args) => ({
    props: { ...args },
    template: `
      <div class="pt-6 w-80">
        <p-floatlabel variant="in">
          <textarea
            pTextarea
            id="fl-textarea"
            [rows]="rows"
            [disabled]="disabled"
            [readOnly]="readonly"
            [invalid]="invalid"
            [fluid]="fluid"
            [pSize]="primeSize"
            [ngClass]="sizeClass"
            [(ngModel)]="value"
          ></textarea>
          <label for="fl-textarea">Комментарий</label>
        </p-floatlabel>
      </div>
    `,
  }),
  argTypes: {
    size: { table: { disable: true } },
  },
  args: {
    disabled: false,
    readonly: false,
    invalid: false,
    fluid: false,
    rows: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интеграция с `p-floatlabel variant="in"` — плавающая метка внутри поля. Кликните на поле чтобы увидеть анимацию. Требует нативный `<textarea pTextarea>` как прямой дочерний элемент `p-floatlabel`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Textarea } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [Textarea, FloatLabel, FormsModule],
  template: \`
    <p-floatlabel variant="in">
      <textarea
        pTextarea
        id="fl-textarea"
        rows="3"
        [(ngModel)]="value"
      ></textarea>
      <label for="fl-textarea">Комментарий</label>
    </p-floatlabel>
  \`,
})
export class MyComponent {
  value = '';
}
        `,
      },
    },
  },
};
