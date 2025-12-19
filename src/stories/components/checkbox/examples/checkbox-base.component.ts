import { Component } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <p-checkbox [(ngModel)]="checked1" [binary]="true" inputId="binary" />
      <label for="binary">Согласен с условиями</label>
    </div>
    <div class="flex items-center gap-2">
      <p-checkbox [(ngModel)]="checked2" [binary]="true" inputId="binary2" />
      <label for="binary2">Подписаться на рассылку</label>
    </div>
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-checkbox-base',
  standalone: true,
  imports: [Checkbox, FormsModule],
  template,
  styles
})
export class CheckboxBaseComponent {
  checked1: boolean = false;
  checked2: boolean = true;
}

export const Base: StoryObj = {
  render: () => ({
    template: `<app-checkbox-base></app-checkbox-base>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовые чекбоксы'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-base',
  standalone: true,
  imports: [Checkbox, FormsModule],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class CheckboxBaseComponent {
  checked1: boolean = false;
  checked2: boolean = true;
}
        `
      }
    }
  }
};
