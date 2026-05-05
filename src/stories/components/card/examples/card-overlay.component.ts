import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SharedModule } from 'primeng/api';
import { CardComponent } from '../../../../lib/components/card/card.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground">
  <card title="Заголовок" subtitle="Подзаголовок" [overlay]="true" style="width: 20rem">
    <ng-template pTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
    </ng-template>
    <ng-template pTemplate="content">
      <p class="text-sm">Карточка с тенью.</p>
    </ng-template>
    <ng-template pTemplate="footer">
      <button label="Действие" size="small" [fluid]="true" class="w-full"></button>
    </ng-template>
  </card>
</div>
`;
const styles = '';

@Component({
  selector: 'app-card-overlay',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SharedModule],
  template,
  styles,
})
export class CardOverlayComponent {}

export const Overlay: StoryObj = {
  render: () => ({
    template: `<app-card-overlay></app-card-overlay>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка с тенью (overlay).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { CardComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-overlay',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SharedModule],
  template: \`
    <card title="Заголовок" subtitle="Подзаголовок" [overlay]="true" style="width: 20rem">
      <ng-template pTemplate="header">
        <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
      </ng-template>
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка с тенью.</p>
      </ng-template>
      <ng-template pTemplate="footer">
        <button label="Действие" size="small" [fluid]="true" class="w-full"></button>
      </ng-template>
    </card>
  \`,
})
export class CardOverlayComponent {}
        `,
      },
    },
  },
};
