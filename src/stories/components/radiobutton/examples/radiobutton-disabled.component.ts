import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="bg-surface-ground flex flex-col gap-3">
  <div class="flex items-center gap-2">
    <extra-radiobutton inputId="rd1" name="dis" value="1" [disabled]="true" [(ngModel)]="selected"></extra-radiobutton>
    <label for="rd1">Опция 1</label>
  </div>
  <div class="flex items-center gap-2">
    <extra-radiobutton inputId="rd2" name="dis" value="2" [disabled]="true" [(ngModel)]="selected"></extra-radiobutton>
    <label for="rd2">Опция 2</label>
  </div>
</div>
`;

@Component({
  selector: 'app-radiobutton-disabled',
  standalone: true,
  imports: [ExtraRadiobuttonComponent, FormsModule],
  template,
})
export class RadiobuttonDisabledComponent {
  selected = '2';
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-radiobutton-disabled></app-radiobutton-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Заблокированное состояние радиокнопки.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radiobutton-disabled',
  standalone: true,
  imports: [ExtraRadiobuttonComponent, FormsModule],
  template: \`
    <extra-radiobutton name="dis" value="1" [disabled]="true" [(ngModel)]="selected"></extra-radiobutton>
    <extra-radiobutton name="dis" value="2" [disabled]="true" [(ngModel)]="selected"></extra-radiobutton>
  \`,
})
export class RadiobuttonDisabledComponent {
  selected = '2';
}
        `,
      },
    },
  },
};
