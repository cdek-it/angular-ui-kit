import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';
import { ExtraDialogTemplateDirective } from '../../../../lib/components/dialog/dialog-template.directive';

const template = `
<div class="bg-surface-ground p-4 flex flex-col gap-4">
  <div class="flex gap-3 flex-wrap">
    <extra-button label="Обычное окно" (click)="open('basic')"></extra-button>
    <extra-button label="Без маски (showOverlay=false)" variant="secondary" (click)="open('noOverlay')"></extra-button>
    <extra-button label="С разворотом (showMaximize)" variant="secondary" (click)="open('maximize')"></extra-button>
    <extra-button label="Без закрытия (showClose=false)" variant="tertiary" (click)="open('noClose')"></extra-button>
  </div>
  <div class="text-sm">Лог событий: {{ log().length ? log().join(' → ') : '—' }}</div>

  <extra-dialog
    header="Обычное окно"
    [visible]="visible() === 'basic'"
    (visibleChange)="visible.set($event ? 'basic' : null)"
    (onShow)="addLog('onShow (basic)')"
    (onHide)="addLog('onHide (basic)')"
  >
    <p>Стандартное модальное окно: маска + кнопка закрытия.</p>
  </extra-dialog>

  <extra-dialog
    header="Без маски"
    [showOverlay]="false"
    [visible]="visible() === 'noOverlay'"
    (visibleChange)="visible.set($event ? 'noOverlay' : null)"
    (onShow)="addLog('onShow (noOverlay)')"
    (onHide)="addLog('onHide (noOverlay)')"
  >
    <p>Окно без маски ([showOverlay]="false") — фон не блокируется, интерфейс под окном доступен.</p>
  </extra-dialog>

  <extra-dialog
    header="С разворотом"
    [showMaximize]="true"
    [visible]="visible() === 'maximize'"
    (visibleChange)="visible.set($event ? 'maximize' : null)"
    (onShow)="addLog('onShow (maximize)')"
    (onHide)="addLog('onHide (maximize)')"
    (onMaximize)="addLog('onMaximize')"
  >
    <p>Кнопка разворота ([showMaximize]="true") в заголовке. onMaximize срабатывает при развороте и сворачивании.</p>
  </extra-dialog>

  <extra-dialog
    header="Без кнопки закрытия"
    [showClose]="false"
    [visible]="visible() === 'noClose'"
    (visibleChange)="visible.set($event ? 'noClose' : null)"
    (onShow)="addLog('onShow (noClose)')"
    (onHide)="addLog('onHide (noClose)')"
  >
    <p>Окно без крестика ([showClose]="false"). Закрыть можно только программно:</p>
    <ng-template extraDialogTemplate="footer">
      <extra-button label="Закрыть программно" (click)="visible.set(null)"></extra-button>
    </ng-template>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-features',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective, ExtraButtonComponent],
  template
})
export class DialogFeaturesComponent {
  visible = signal<string | null>(null);
  log = signal<string[]>([]);

  open(kind: string): void {
    this.visible.set(kind);
  }

  addLog(entry: string): void {
    this.log.update((entries) => [...entries, entry]);
  }
}

export const Features: StoryObj = {
  render: () => ({
    template: `<app-dialog-features></app-dialog-features>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Свойства спецификации: showOverlay (маска), showMaximize (разворот на весь экран), showClose (кнопка закрытия). Все события (onShow, onHide, onMaximize) логируются.'
      },
      source: {
        language: 'ts',
        code: `
import { Component, signal } from '@angular/core';
import { ExtraDialogComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-features',
  standalone: true,
  imports: [ExtraDialogComponent],
  template: \`
    <!-- без маски -->
    <extra-dialog header="Без маски" [showOverlay]="false" [visible]="visible" (visibleChange)="visible = $event">
      <p>Фон не блокируется</p>
    </extra-dialog>

    <!-- с разворотом -->
    <extra-dialog header="С разворотом" [showMaximize]="true" [visible]="visible" (visibleChange)="visible = $event"
      (onMaximize)="onMaximize()">
      <p>Кнопка разворота в заголовке</p>
    </extra-dialog>

    <!-- без кнопки закрытия -->
    <extra-dialog header="Без закрытия" [showClose]="false" [visible]="visible" (visibleChange)="visible = $event">
      <p>Закрыть можно только программно</p>
    </extra-dialog>
  \`,
})
export class DialogFeaturesComponent {
  visible = false;
}
        `
      }
    }
  }
};
