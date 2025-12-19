import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-button label="Открыть диалог" (onClick)="visible = true" />
  
  <p-dialog 
    header="Заголовок диалога" 
    [(visible)]="visible" 
    [modal]="true"
    [style]="{ width: '25rem' }"
  >
    <p class="m-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <ng-template #footer>
      <p-button label="Отмена" severity="secondary" (onClick)="visible = false" />
      <p-button label="Сохранить" (onClick)="visible = false" />
    </ng-template>
  </p-dialog>
</div>
`;

const styles = '';

@Component({
  selector: 'app-dialog-base',
  standalone: true,
  imports: [Dialog, Button],
  template,
  styles
})
export class DialogBaseComponent {
  visible: boolean = false;
}

export const Base: StoryObj = {
  render: () => ({
    template: `<app-dialog-base></app-dialog-base>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый модальный диалог'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dialog-base',
  standalone: true,
  imports: [Dialog, Button],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class DialogBaseComponent {
  visible: boolean = false;
}
        `
      }
    }
  }
};
