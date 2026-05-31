import { Component, ChangeDetectionStrategy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="bg-surface-ground flex flex-col gap-3">
  <div class="flex items-center gap-2">
    <extra-radiobutton inputId="ri1" name="inv" value="1" [invalid]="true" [(ngModel)]="selected"></extra-radiobutton>
    <label for="ri1">Вариант 1</label>
  </div>
  <div class="flex items-center gap-2">
    <extra-radiobutton inputId="ri2" name="inv" value="2" [invalid]="true" [(ngModel)]="selected"></extra-radiobutton>
    <label for="ri2">Вариант 2</label>
  </div>
</div>
`;

@Component({
  selector: 'app-radiobutton-invalid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  imports: [ExtraRadiobuttonComponent, FormsModule],
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
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-radiobutton-invalid',
  standalone: true,
  imports: [ExtraRadiobuttonComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-radiobutton name="inv" value="1" [invalid]="true" [(ngModel)]="selected"></extra-radiobutton>
    <extra-radiobutton name="inv" value="2" [invalid]="true" [(ngModel)]="selected"></extra-radiobutton>
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
