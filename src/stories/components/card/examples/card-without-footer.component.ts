import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SharedModule } from 'primeng/api';
import { CardComponent } from '../../../../lib/components/card/card.component';

const template = `
<div class="bg-surface-ground">
  <card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
    <ng-template pTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
    </ng-template>
    <ng-template pTemplate="content">
      <p class="text-sm">Карточка без футера.</p>
    </ng-template>
  </card>
</div>
`;
const styles = '';

@Component({
  selector: 'app-card-without-footer',
  standalone: true,
  imports: [CardComponent, SharedModule],
  template,
  styles,
})
export class CardWithoutFooterComponent {}

export const WithoutFooter: StoryObj = {
  render: () => ({
    template: `<app-card-without-footer></app-card-without-footer>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка без футера с действиями.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { CardComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-without-footer',
  standalone: true,
  imports: [CardComponent, SharedModule],
  template: \`
    <card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
      <ng-template pTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
      </ng-template>
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка без футера.</p>
      </ng-template>
    </card>
  \`,
})
export class CardWithoutFooterComponent {}
        `,
      },
    },
  },
};
