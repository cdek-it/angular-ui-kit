import { Component, ChangeDetectionStrategy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="bg-surface-ground flex flex-col gap-3">
  <div class="flex items-center gap-2">
    <extra-radiobutton inputId="rb1" name="group" value="1" [(ngModel)]="selected"></extra-radiobutton>
    <label for="rb1">Опция 1</label>
  </div>
  <div class="flex items-center gap-2">
    <extra-radiobutton inputId="rb2" name="group" value="2" [(ngModel)]="selected"></extra-radiobutton>
    <label for="rb2">Опция 2</label>
  </div>
  <div class="flex items-center gap-2">
    <extra-radiobutton inputId="rb3" name="group" value="3" [(ngModel)]="selected"></extra-radiobutton>
    <label for="rb3">Опция 3</label>
  </div>
</div>
`;

@Component({
  selector: 'app-radiobutton-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRadiobuttonComponent, FormsModule],
  template,
})
export class RadiobuttonGroupComponent {
  selected = '1';
}

export const Group: StoryObj = {
  render: () => ({
    template: `<app-radiobutton-group></app-radiobutton-group>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Группа радиокнопок для выбора одного варианта из нескольких.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radiobutton-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRadiobuttonComponent, FormsModule],
  template: \`
    <extra-radiobutton inputId="rb1" name="group" value="1" [(ngModel)]="selected"></extra-radiobutton>
    <label for="rb1">Опция 1</label>
    <extra-radiobutton inputId="rb2" name="group" value="2" [(ngModel)]="selected"></extra-radiobutton>
    <label for="rb2">Опция 2</label>
    <extra-radiobutton inputId="rb3" name="group" value="3" [(ngModel)]="selected"></extra-radiobutton>
    <label for="rb3">Опция 3</label>
  \`,
})
export class RadiobuttonGroupComponent {
  selected = '1';
}
        `,
      },
    },
  },
};
