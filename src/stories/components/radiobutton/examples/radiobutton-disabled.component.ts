import { Component, ChangeDetectionStrategy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { RadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="bg-surface-ground flex flex-col gap-3">
  <div class="flex items-center gap-2">
    <radiobutton inputId="rd1" name="dis" value="1" [disabled]="true" [(ngModel)]="selected"></radiobutton>
    <label for="rd1">Опция 1</label>
  </div>
  <div class="flex items-center gap-2">
    <radiobutton inputId="rd2" name="dis" value="2" [disabled]="true" [(ngModel)]="selected"></radiobutton>
    <label for="rd2">Опция 2</label>
  </div>
</div>
`;

@Component({
  selector: 'app-radiobutton-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RadiobuttonComponent, FormsModule],
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
import { RadiobuttonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radiobutton-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RadiobuttonComponent, FormsModule],
  template: \`
    <radiobutton name="dis" value="1" [disabled]="true" [(ngModel)]="selected"></radiobutton>
    <radiobutton name="dis" value="2" [disabled]="true" [(ngModel)]="selected"></radiobutton>
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
