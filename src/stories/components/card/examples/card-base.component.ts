import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-card header="Заголовок карточки" subheader="Подзаголовок" [style]="{ width: '360px' }">
    <ng-template #header>
      <img alt="Card" src="https://primefaces.org/cdn/primeng/images/usercard.png" />
    </ng-template>
    <p class="m-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae.
    </p>
    <ng-template #footer>
      <div class="flex gap-2 justify-end">
        <p-button label="Отмена" severity="secondary" [outlined]="true" />
        <p-button label="Сохранить" />
      </div>
    </ng-template>
  </p-card>
</div>
`;

const styles = '';

@Component({
  selector: 'app-card-base',
  standalone: true,
  imports: [Card, Button],
  template,
  styles
})
export class CardBaseComponent {}

export const Base: StoryObj = {
  render: () => ({
    template: `<app-card-base></app-card-base>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовая карточка с заголовком, контентом и футером'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-card-base',
  standalone: true,
  imports: [Card, Button],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class CardBaseComponent {}
        `
      }
    }
  }
};
