import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraCardComponent } from '../../../../lib/components/card/card.component';
import { ExtraCardTemplateDirective } from '../../../../lib/components/card/card-template.directive';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground">
  <extra-card title="Заголовок" subtitle="Подзаголовок" [overlay]="true" style="width: 20rem">
    <ng-template extraCardTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
    </ng-template>
    <p class="text-sm">Карточка с тенью.</p>
    <ng-template extraCardTemplate="footer">
      <extra-button label="Действие" size="small" class="w-full"></extra-button>
    </ng-template>
  </extra-card>
</div>
`;
const styles = '';

@Component({
  selector: 'app-card-overlay',
  standalone: true,
  imports: [ExtraCardComponent, ExtraCardTemplateDirective, ExtraButtonComponent],
  template,
  styles
})
export class CardOverlayComponent {}

export const Overlay: StoryObj = {
  render: () => ({
    template: `<app-card-overlay></app-card-overlay>`
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка с тенью (overlay).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraCardComponent, ExtraCardTemplateDirective, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-overlay',
  standalone: true,
  imports: [ExtraCardComponent, ExtraCardTemplateDirective, ExtraButtonComponent],
  template: \`
    <extra-card title="Заголовок" subtitle="Подзаголовок" [overlay]="true" style="width: 20rem">
      <ng-template extraCardTemplate="header">
        <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
      </ng-template>
      <p class="text-sm">Карточка с тенью.</p>
      <ng-template extraCardTemplate="footer">
        <extra-button label="Действие" size="small" class="w-full"></extra-button>
      </ng-template>
    </extra-card>
  \`,
})
export class CardOverlayComponent {}
        `
      }
    }
  }
};
