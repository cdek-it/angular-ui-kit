import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSelectButtonComponent, ExtraSelectButtonOption } from '../../../../lib/components/select-button/select-button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4" style="max-width: 420px">
    <extra-select-button [fluid]="true" [formControl]="control" [options]="options"></extra-select-button>
    <extra-select-button [fluid]="true" [formControl]="wideControl" [options]="wideOptions"></extra-select-button>
    <extra-select-button [formControl]="control" [options]="options"></extra-select-button>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-button-fluid',
  standalone: true,
  imports: [ExtraSelectButtonComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectButtonFluidComponent {
  control = new FormControl('1');
  wideControl = new FormControl('list');
  options: ExtraSelectButtonOption[] = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' },
  ];
  wideOptions: ExtraSelectButtonOption[] = [
    { name: 'Списком', code: 'list' },
    { name: 'Плиткой', code: 'grid' },
  ];
}

export const Fluid: StoryObj = {
  name: 'Fluid',
  render: () => ({
    template: `<app-select-button-fluid></app-select-button-fluid>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Растягивание на всю ширину контейнера (fluid). При `[fluid]="true"` группа занимает 100% ширины родителя, а сегменты делят её поровну — удобно для форм и мобильных раскладок. Третья группа — без `fluid`, для сравнения. Контейнер ограничен шириной 420px, чтобы эффект был нагляден.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ExtraSelectButtonComponent, ExtraSelectButtonOption } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-select-button-fluid',
  standalone: true,
  imports: [ExtraSelectButtonComponent, ReactiveFormsModule],
  template: \`
    <div class="flex flex-col gap-4" style="max-width: 420px">
      <extra-select-button [fluid]="true" [formControl]="control" [options]="options"></extra-select-button>
    </div>
  \`,
})
export class SelectButtonFluidComponent {
  control = new FormControl('1');
  options: ExtraSelectButtonOption[] = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' },
  ];
}
        `,
      },
    },
  },
};
