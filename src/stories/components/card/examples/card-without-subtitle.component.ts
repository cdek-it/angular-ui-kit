import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SharedModule } from 'primeng/api';
import { ExtraCardComponent } from '../../../../lib/components/card/card.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground">
  <extra-card title="Заголовок" style="width: 20rem">
    <ng-template pTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
    </ng-template>
    <ng-template pTemplate="content">
      <p class="text-sm">Карточка без подзаголовка.</p>
    </ng-template>
    <ng-template pTemplate="footer">
      <button label="Действие" size="small" [fluid]="true" class="w-full"></button>
    </ng-template>
  </card>
</div>
`;
const styles = '';

@Component({
  selector: 'app-card-without-subtitle',
  standalone: true,
  imports: [ExtraCardComponent, ExtraButtonComponent, SharedModule],
  template,
  styles,
})
export class CardWithoutSubtitleComponent {}

export const WithoutSubtitle: StoryObj = {
  render: () => ({
    template: `<app-card-without-subtitle></app-card-without-subtitle>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка без подзаголовка.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ExtraCardComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-without-subtitle',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SharedModule],
  template: \`
    <extra-card title="Заголовок" style="width: 20rem">
      <ng-template pTemplate="header">
        <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
      </ng-template>
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка без подзаголовка.</p>
      </ng-template>
      <ng-template pTemplate="footer">
        <extra-button label="Действие" size="small" [fluid]="true" class="w-full"></extra-button>
      </ng-template>
    </extra-card>
  \`,
})
export class CardWithoutSubtitleComponent {}
        `,
      },
    },
  },
};
