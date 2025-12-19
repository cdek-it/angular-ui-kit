import { Component } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-confirmDialog />
  <p-button label="Удалить" severity="danger" (onClick)="confirm()" />
</div>
`;

const styles = '';

@Component({
  selector: 'app-confirmdialog-base',
  standalone: true,
  imports: [ConfirmDialog, Button],
  providers: [ConfirmationService],
  template,
  styles
})
export class ConfirmDialogBaseComponent {
  constructor(private confirmationService: ConfirmationService) {}

  confirm() {
    this.confirmationService.confirm({
      header: 'Подтверждение удаления',
      message: 'Вы уверены, что хотите удалить этот элемент?',
      icon: 'ti ti-alert-triangle',
      acceptLabel: 'Да, удалить',
      rejectLabel: 'Отмена',
      accept: () => {
        console.log('Удалено');
      }
    });
  }
}

export const Base: StoryObj = {
  render: () => ({
    template: `<app-confirmdialog-base></app-confirmdialog-base>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый диалог подтверждения'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-confirmdialog-base',
  standalone: true,
  imports: [ConfirmDialog, Button],
  providers: [ConfirmationService],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class ConfirmDialogBaseComponent {
  constructor(private confirmationService: ConfirmationService) {}

  confirm() {
    this.confirmationService.confirm({
      header: 'Подтверждение удаления',
      message: 'Вы уверены, что хотите удалить этот элемент?',
      icon: 'ti ti-alert-triangle',
      acceptLabel: 'Да, удалить',
      rejectLabel: 'Отмена',
      accept: () => {
        console.log('Удалено');
      }
    });
  }
}
        `
      }
    }
  }
};
