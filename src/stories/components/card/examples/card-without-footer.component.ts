import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraCardComponent } from '../../../../lib/components/card/card.component';
import { ExtraCardTemplateDirective } from '../../../../lib/components/card/card-template.directive';

const template = `
  <extra-card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
    <ng-template extraCardTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
    </ng-template>
    <p class="text-sm">Карточка без футера.</p>
  </extra-card>
`;
const styles = '';

@Component({
  selector: 'app-card-without-footer',
  standalone: true,
  imports: [ExtraCardComponent, ExtraCardTemplateDirective],
  template,
  styles
})
export class CardWithoutFooterComponent {}

export const WithoutFooter: StoryObj = {
  render: () => ({
    template: `<app-card-without-footer></app-card-without-footer>`
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка без футера с действиями.' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem"> <ng-template extraCardTemplate="header"> <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" /> </ng-template> <p class="text-sm">Карточка без футера.</p> </extra-card>'
      }
    }
  }
};
