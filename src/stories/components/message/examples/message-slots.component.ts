import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../../lib/components/message/message.component';
import { ExtraMessageTemplateDirective } from '../../../../lib/components/message/message-template.directive';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4 flex flex-col gap-4">
  <extra-message severity="info" message="Message" caption="caption">
    <div class="text-sm">Контент после caption (слот content)</div>
  </extra-message>

  <extra-message severity="warning" message="Message" caption="caption" [showClose]="true">
    <div class="flex gap-2 mt-3">
      <span class="text-sm">Cell 1</span>
      <span class="text-sm">Cell 2</span>
      <span class="text-sm">Cell 3</span>
    </div>
  </extra-message>

  <extra-message severity="danger" message="Message" caption="caption">
    Контент напрямую, без обёртки
    <ng-template extraMessageTemplate="footer">
      <div class="flex gap-2 mt-3">
        <extra-button label="Действие" size="small"></extra-button>
        <extra-button label="Отмена" variant="tertiary" size="small"></extra-button>
      </div>
    </ng-template>
  </extra-message>

  <extra-message severity="success" message="Message" caption="caption" [showClose]="true">
    <div class="text-sm">Контент после caption (слот content)</div>
    <ng-template extraMessageTemplate="footer">
      <div class="flex gap-2 mt-3">
        <extra-button label="Принять" size="small"></extra-button>
      </div>
    </ng-template>
  </extra-message>
</div>
`;

@Component({
  selector: 'app-message-slots',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMessageComponent, ExtraMessageTemplateDirective, ExtraButtonComponent],
  template
})
export class MessageSlotsComponent {}

export const Slots: StoryObj = {
  render: () => ({
    template: `<app-message-slots></app-message-slots>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Слот content — любой проецируемый контент после caption (без атрибутов). Слот footer — через директиву extraMessageTemplate="footer", например кнопки действий.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMessageComponent, ExtraMessageTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-message-slots',
  standalone: true,
  imports: [ExtraMessageComponent, ExtraMessageTemplateDirective],
  template: \`
    <!-- content: проецируемый контент после caption -->
    <extra-message severity="info" message="Message" caption="caption">
      <div>Контент после caption</div>
    </extra-message>

    <!-- footer через директиву -->
    <extra-message severity="danger" message="Message" caption="caption">
      <ng-template extraMessageTemplate="footer">
        <div class="flex gap-2">
          <extra-button label="Действие" size="small"></extra-button>
          <extra-button label="Отмена" variant="tertiary" size="small"></extra-button>
        </div>
      </ng-template>
    </extra-message>

    <!-- оба слота + закрытие -->
    <extra-message severity="success" message="Message" caption="caption" [showClose]="true">
      <div>Контент после caption</div>
      <ng-template extraMessageTemplate="footer">
        <extra-button label="Принять" size="small"></extra-button>
      </ng-template>
    </extra-message>
  \`,
})
export class MessageSlotsComponent {}
        `
      }
    }
  }
};
