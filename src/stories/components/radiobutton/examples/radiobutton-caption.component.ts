import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="flex flex-col gap-3">
  <extra-radiobutton
    [formControl]="control"
    name="caption-demo"
    value="courier"
    label="Курьером"
    caption="Доставим за 1-2 дня"
  ></extra-radiobutton>
  <extra-radiobutton
    [formControl]="control"
    name="caption-demo"
    value="pickup"
    label="Самовывоз"
    caption="Заберёте из пункта выдачи самостоятельно"
  ></extra-radiobutton>
</div>
`;

@Component({
  selector: 'app-radiobutton-caption',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template
})
export class RadiobuttonCaptionComponent {
  control = new FormControl('courier');
}

export const Caption: StoryObj = {
  render: () => ({
    template: `<app-radiobutton-caption></app-radiobutton-caption>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Пояснение под лейблом (`caption`) — короткий поясняющий текст под названием опции.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-radiobutton-caption',
  standalone: true,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template: \`
    <extra-radiobutton
      [formControl]="control"
      name="caption-demo"
      value="courier"
      label="Курьером"
      caption="Доставим за 1-2 дня"
    ></extra-radiobutton>
    <extra-radiobutton
      [formControl]="control"
      name="caption-demo"
      value="pickup"
      label="Самовывоз"
      caption="Заберёте из пункта выдачи самостоятельно"
    ></extra-radiobutton>
  \`,
})
export class RadiobuttonCaptionComponent {
  control = new FormControl('courier');
}
        `
      }
    }
  }
};
