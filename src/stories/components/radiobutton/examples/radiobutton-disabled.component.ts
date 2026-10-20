import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="flex flex-col gap-3">
  <extra-radiobutton [formControl]="control" name="delivery-disabled" value="pickup" label="Самовывоз"></extra-radiobutton>
  <extra-radiobutton [formControl]="control" name="delivery-disabled" value="courier" [label]="label"></extra-radiobutton>
</div>
`;

@Component({
  selector: 'app-radiobutton-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template
})
export class RadiobuttonDisabledComponent implements OnChanges {
  @Input() label = 'Курьером';
  @Input() disabled = true;

  /** Один FormControl на всю группу — взаимоисключающий выбор, как и должно быть у radio. */
  control = new FormControl({ value: 'pickup', disabled: this.disabled });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled) this.control.disable();
      else this.control.enable();
    }
  }
}

export const Disabled: StoryObj<{ label: string; disabled: boolean }> = {
  name: 'Disabled',
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст названия',
      table: { category: 'Свойства', type: { summary: 'string' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние — управляется через FormControl.disable()/enable()',
      table: { category: 'Состояния', type: { summary: 'boolean' } }
    }
  },
  args: { label: 'Курьером', disabled: true },
  render: (args) => ({
    props: args,
    template: `<app-radiobutton-disabled [label]="label" [disabled]="disabled"></app-radiobutton-disabled>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Отключённая группа — управляется через `FormControl.disable()` / `enable()`, переключите control «disabled» в панели Controls. Оба пункта на одном FormControl: выбор взаимоисключающий, как у настоящей radio-группы.'
      },
      source: {
        language: 'ts',
        code: `
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-radiobutton-disabled',
  standalone: true,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template: \`
    <extra-radiobutton [formControl]="control" name="delivery-disabled" value="pickup" label="Самовывоз"></extra-radiobutton>
    <extra-radiobutton [formControl]="control" name="delivery-disabled" value="courier" [label]="label"></extra-radiobutton>
  \`,
})
export class RadiobuttonDisabledComponent implements OnChanges {
  @Input() label = 'Курьером';
  @Input() disabled = true;

  control = new FormControl({ value: 'pickup', disabled: this.disabled });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled) this.control.disable();
      else this.control.enable();
    }
  }
}
        `
      }
    }
  }
};
