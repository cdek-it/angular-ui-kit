import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SharedModule } from 'primeng/api';
import { CardComponent } from '../../../../lib/components/card/card.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground">
  <card title="Заголовок" style="width: 20rem">
    <ng-template pTemplate="header">
      <div class="flex items-center justify-center h-8" style="background: var(--p-surface-100); color: var(--p-surface-400)">
        <i class="ti ti-photo text-3xl"></i>
      </div>
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
  imports: [CardComponent, ButtonComponent, SharedModule],
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
import { CardComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-without-subtitle',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SharedModule],
  template: \`
    <card title="Заголовок" style="width: 20rem">
      <ng-template pTemplate="header">
        <div class="bg-surface-100 h-32 flex items-center justify-center text-surface-400">
          <i class="ti ti-photo text-3xl"></i>
        </div>
      </ng-template>
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка без подзаголовка.</p>
      </ng-template>
      <ng-template pTemplate="footer">
        <button label="Действие" size="small" [fluid]="true" class="w-full"></button>
      </ng-template>
    </card>
  \`,
})
export class CardWithoutSubtitleComponent {}
        `,
      },
    },
  },
};
