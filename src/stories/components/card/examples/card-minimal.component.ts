import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraCardComponent } from '../../../../lib/components/card/card.component';

const template = `
  <extra-card style="width: 20rem">
    <p class="text-sm">Карточка без заголовка, подзаголовка, шапки и футера — просто белый блок с текстом.</p>
  </extra-card>
`;
const styles = '';

@Component({
  selector: 'app-card-minimal',
  standalone: true,
  imports: [ExtraCardComponent],
  template,
  styles
})
export class CardMinimalComponent {}

export const Minimal: StoryObj = {
  render: () => ({
    template: `<app-card-minimal></app-card-minimal>`
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка без title/subtitle/header/footer — только содержимое, как обычная поверхность.' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-card style="width: 20rem"> <p class="text-sm">Карточка без заголовка, подзаголовка, шапки и футера — просто белый блок с текстом.</p> </extra-card>'
      }
    }
  }
};
