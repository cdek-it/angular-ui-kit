import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SharedModule } from 'primeng/api';
import { ExtraCardComponent } from '../../../../lib/components/card/card.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground">
  <extra-card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
    <ng-template pTemplate="content">
      <p class="text-sm">Карточка без изображения в шапке.</p>
    </ng-template>
    <ng-template pTemplate="footer">
      <extra-button label="Действие" size="small" [fluid]="true" class="w-full"></extra-button>
    </ng-template>
  </extra-card>
</div>
`;
const styles = '';

@Component({
  selector: 'app-card-without-header',
  standalone: true,
    imports: [ExtraCardComponent, ExtraButtonComponent, SharedModule],
  template,
  styles,
})
export class CardWithoutHeaderComponent {}

export const WithoutHeader: StoryObj = {
  render: () => ({
    template: `<app-card-without-header></app-card-without-header>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка без изображения в шапке.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ExtraCardComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-without-header',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SharedModule],
  template: \`
    <extra-card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка без изображения в шапке.</p>
      </ng-template>
      <ng-template pTemplate="footer">
        <extra-button label="Действие" size="small" [fluid]="true" class="w-full"></extra-button>
      </ng-template>
    </extra-card>
  \`,
})
export class CardWithoutHeaderComponent {}
        `,
      },
    },
  },
};
