import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-4">
  @for (size of sizes; track size) {
    <extra-input-text [formControl]="control" [size]="size" [label]="'Size ' + size" placeholder="Введите текст..."></extra-input-text>
  }
</div>
`;

@Component({
  selector: 'app-inputtext-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template
})
export class InputTextSizesComponent {
  sizes = ['small', 'base', 'large', 'xlarge'];
  control = new FormControl('');
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-inputtext-sizes></app-inputtext-sizes>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Размеры поля: small, base, large, xlarge.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputtext-sizes',
  standalone: true,
  imports: [ExtraInputTextComponent],
  template: \`
    <extra-input-text size="small" label="Size small" placeholder="Введите текст..."></extra-input-text>
    <extra-input-text size="base" label="Size base" placeholder="Введите текст..."></extra-input-text>
    <extra-input-text size="large" label="Size large" placeholder="Введите текст..."></extra-input-text>
    <extra-input-text size="xlarge" label="Size xlarge" placeholder="Введите текст..."></extra-input-text>
  \`,
})
export class InputTextSizesComponent {}
        `
      }
    }
  }
};
