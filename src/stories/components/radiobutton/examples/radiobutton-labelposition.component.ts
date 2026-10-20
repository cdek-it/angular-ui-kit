import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="flex flex-col gap-3">
  <extra-radiobutton [formControl]="control" name="label-position" value="right" label="Лейбл справа"></extra-radiobutton>
  <extra-radiobutton [formControl]="control" name="label-position" value="left" labelPosition="left" label="Лейбл слева"></extra-radiobutton>
</div>
`;

@Component({
  selector: 'app-radiobutton-labelposition',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template
})
export class RadiobuttonLabelPositionComponent {
  control = new FormControl('right');
}

export const LabelPosition: StoryObj = {
  render: () => ({
    template: `<app-radiobutton-labelposition></app-radiobutton-labelposition>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Положения лейбла (`label-position`): `right` (по умолчанию) — справа от индикатора, `left` — слева.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-radiobutton-labelposition',
  standalone: true,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template: \`
    <extra-radiobutton [formControl]="control" name="label-position" value="right" label="Лейбл справа"></extra-radiobutton>
    <extra-radiobutton [formControl]="control" name="label-position" value="left" labelPosition="left" label="Лейбл слева"></extra-radiobutton>
  \`,
})
export class RadiobuttonLabelPositionComponent {
  control = new FormControl('right');
}
        `
      }
    }
  }
};
