import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

const template = `
<div class="bg-surface-ground p-4 flex flex-col gap-6">
  <div class="flex flex-col gap-3">
    <extra-radiobutton [formControl]="delivery" name="delivery-group" value="pickup" label="Самовывоз"></extra-radiobutton>
    <extra-radiobutton [formControl]="delivery" name="delivery-group" value="courier" label="Курьером"></extra-radiobutton>
  </div>
  <div class="flex flex-col gap-3">
    <extra-radiobutton [formControl]="payment" name="payment-group" value="card" label="Картой"></extra-radiobutton>
    <extra-radiobutton [formControl]="payment" name="payment-group" value="cash" label="Наличными"></extra-radiobutton>
  </div>
</div>
`;

@Component({
  selector: 'app-radiobutton-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template
})
export class RadiobuttonGroupComponent {
  delivery = new FormControl('pickup');
  payment = new FormControl('card');
}

export const Group: StoryObj = {
  render: () => ({
    template: `<app-radiobutton-group></app-radiobutton-group>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Две независимые группы радиокнопок на одной странице: у каждой группы свой `name` и своя модель (`[formControl]` или `[(ngModel)]`) — выбор в одной группе не влияет на другую.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-radiobutton-group',
  standalone: true,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template: \`
    <extra-radiobutton [formControl]="delivery" name="delivery-group" value="pickup" label="Самовывоз"></extra-radiobutton>
    <extra-radiobutton [formControl]="delivery" name="delivery-group" value="courier" label="Курьером"></extra-radiobutton>

    <extra-radiobutton [formControl]="payment" name="payment-group" value="card" label="Картой"></extra-radiobutton>
    <extra-radiobutton [formControl]="payment" name="payment-group" value="cash" label="Наличными"></extra-radiobutton>
  \`,
})
export class RadiobuttonGroupComponent {
  delivery = new FormControl('pickup');
  payment = new FormControl('card');
}
        `
      }
    }
  }
};
