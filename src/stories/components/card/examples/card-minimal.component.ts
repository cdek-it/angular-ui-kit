import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraCardComponent } from '../../../../lib/components/card/card.component';

const template = `
<div class="bg-surface-ground">
  <extra-card style="width: 20rem">
    <p class="text-sm">Карточка без заголовка, подзаголовка, шапки и футера — просто белый блок с текстом.</p>
  </extra-card>
</div>
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
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraCardComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-minimal',
  standalone: true,
  imports: [ExtraCardComponent],
  template: \`
    <extra-card style="width: 20rem">
      <p class="text-sm">Просто текст без заголовка и шапки.</p>
    </extra-card>
  \`,
})
export class CardMinimalComponent {}
        `
      }
    }
  }
};
