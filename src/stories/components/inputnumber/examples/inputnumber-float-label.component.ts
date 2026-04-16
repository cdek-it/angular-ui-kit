import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { SharedModule } from 'primeng/api';

const template = `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <p-inputNumber id="fn-amount" [(ngModel)]="value" [showButtons]="true" buttonLayout="horizontal">
      <ng-template pTemplate="incrementbuttonicon">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
      </ng-template>
      <ng-template pTemplate="decrementbuttonicon">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
      </ng-template>
    </p-inputNumber>
    <label for="fn-amount">Количество</label>
  </p-floatlabel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputnumber-float-label',
  standalone: true,
  imports: [InputNumber, FloatLabel, FormsModule, SharedModule],
  template,
  styles,
})
export class InputNumberFloatLabelComponent {
  value: number | null = null;
}

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: () => ({
    template: `<app-inputnumber-float-label></app-inputnumber-float-label>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Интеграция с `p-floatlabel` — плавающая метка внутри поля. Требует нативный `p-inputNumber` как прямой дочерний элемент `p-floatlabel`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputnumber-float-label',
  standalone: true,
  imports: [InputNumber, FloatLabel, FormsModule, SharedModule],
  template: \`
    <p-floatlabel variant="in">
      <p-inputNumber id="fn-amount" [(ngModel)]="value" [showButtons]="true" buttonLayout="horizontal">
        <ng-template pTemplate="incrementbuttonicon">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </ng-template>
        <ng-template pTemplate="decrementbuttonicon">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
        </ng-template>
      </p-inputNumber>
      <label for="fn-amount">Количество</label>
    </p-floatlabel>
  \`,
})
export class InputNumberFloatLabelComponent {
  value: number | null = null;
}
        `,
      },
    },
  },
};
