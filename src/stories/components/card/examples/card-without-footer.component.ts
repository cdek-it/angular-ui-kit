import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SharedModule } from 'primeng/api';
import { ExtraCardComponent } from '../../../../lib/components/card/card.component';

const template = `
<div class="bg-surface-ground">
  <extra-card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
    <ng-template pTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
    </ng-template>
    <ng-template pTemplate="content">
      <p class="text-sm">Карточка без футера.</p>
    </ng-template>
  </extra-card>
</div>
`;
const styles = '';

@Component({
  selector: 'app-card-without-footer',
  standalone: true,
  imports: [ExtraCardComponent, SharedModule],
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
        language: 'ts',
        code: `
import { ExtraCardComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-without-footer',
  standalone: true,
  imports: [CardComponent, SharedModule],
  template: \`
    <extra-card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
      <ng-template pTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
      </ng-template>
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка без футера.</p>
      </ng-template>
    </extra-card>
  \`,
})
export class CardWithoutFooterComponent {}
        `
      }
    }
  }
};
