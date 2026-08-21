import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';
import { ExtraDialogTemplateDirective } from '../../../../lib/components/dialog/dialog-template.directive';

const template = `
<div class="bg-surface-ground p-4">
  <extra-button (click)="visible = true" label="Кастомный заголовок"></extra-button>

  <extra-dialog [visible]="visible" (visibleChange)="visible = $event">
    <ng-template extraDialogTemplate="header">
      <div class="flex items-center gap-2">
        <i class="ti ti-truck-delivery text-primary text-xl"></i>
        <span class="font-semibold">Детали отправления</span>
        <extra-tag severity="info" value="в пути" size="small"></extra-tag>
      </div>
    </ng-template>

    <p>Слот header полностью заменяет строковый заголовок: можно разместить иконку, бейджи и любые элементы.</p>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective, ExtraButtonComponent],
  template
})
export class DialogHeaderComponent {
  visible = false;
}

export const Header: StoryObj = {
  render: () => ({
    template: `<app-dialog-header></app-dialog-header>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Слот header через директиву extraDialogTemplate="header" — заменяет строковый проп header. Кнопки закрытия/разворота остаются справа.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDialogComponent, ExtraDialogTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-header',
  standalone: true,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective],
  template: \`
    <extra-dialog [visible]="visible" (visibleChange)="visible = $event">
      <ng-template extraDialogTemplate="header">
        <div class="flex items-center gap-2">
          <i class="ti ti-truck-delivery text-primary text-xl"></i>
          <span class="font-semibold">Детали отправления</span>
        </div>
      </ng-template>

      <p>Содержимое окна</p>
    </extra-dialog>
  \`,
})
export class DialogHeaderComponent {
  visible = false;
}
        `
      }
    }
  }
};
