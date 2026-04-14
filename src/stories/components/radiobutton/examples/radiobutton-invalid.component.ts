import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { RadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="bg-surface-ground flex flex-col gap-3">
  <div class="flex items-center gap-2">
    <radiobutton inputId="ri1" name="inv" value="1" [invalid]="true" [(ngModel)]="selected"></radiobutton>
    <label for="ri1">Вариант 1</label>
  </div>
  <div class="flex items-center gap-2">
    <radiobutton inputId="ri2" name="inv" value="2" [invalid]="true" [(ngModel)]="selected"></radiobutton>
    <label for="ri2">Вариант 2</label>
  </div>
</div>
`;

@Component({
  selector: 'app-radiobutton-invalid',
  standalone: true,
  imports: [RadiobuttonComponent, FormsModule],
  template,
})
export class RadiobuttonInvalidComponent {
  selected = '2';
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-radiobutton-invalid></app-radiobutton-invalid>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Невалидное состояние радиокнопки.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { RadiobuttonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radiobutton-invalid',
  standalone: true,
  imports: [RadiobuttonComponent, FormsModule],
  template: \`
    <radiobutton name="inv" value="1" [invalid]="true" [(ngModel)]="selected"></radiobutton>
    <radiobutton name="inv" value="2" [invalid]="true" [(ngModel)]="selected"></radiobutton>
  \`,
})
export class RadiobuttonInvalidComponent {
  selected = '2';
}
        `,
      },
    },
  },
};
