import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogHeaderDirective } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Открыть диалог"></extra-button>

  <extra-dialog
    [visible]="visible"
    (visibleChange)="visible = $event"
  >
    <ng-template extraDialogHeader>
      <div class="flex items-center gap-2">
        <i class="ti ti-truck-delivery text-primary text-xl"></i>
        <span class="font-semibold">Детали отправления</span>
      </div>
    </ng-template>

    <p>Содержимое диалога с кастомным заголовком. Шаблон заголовка заменяет строковый проп <code>header</code>.</p>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-custom-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogHeaderDirective, ExtraButtonComponent],
  template
})
export class DialogCustomHeaderComponent {
  visible = false;
}
