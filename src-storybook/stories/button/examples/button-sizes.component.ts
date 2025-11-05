import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Button } from 'primeng/button';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3 items-end">
    <p-button label="Small" icon="pi pi-check" size="small" />
    <p-button label="Normal" icon="pi pi-check" />
    <p-button label="Large" icon="pi pi-check" size="large" />
  <!--  <p-button label="xLarge" icon="pi pi-check" size="xlarge" /> для xlarge необходимо перейти на class, т.к. опции xlarge у компонента нет.-->
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-button-sizes',
  standalone: true,
  imports: [Button],
  template,
  styles,
})
export class ButtonSizesComponent {}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-button-sizes></app-button-sizes>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки разных размеров',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';
        
@Component({
  selector: 'app-button-sizes',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonSizesComponent {}
        `,
      },
    },
  },
};
