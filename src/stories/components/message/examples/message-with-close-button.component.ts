import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../../lib/components/message/message.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-message severity="info" summary="Message" detail="caption" [closable]="true"></extra-message>
  <extra-message severity="success" summary="Message" detail="caption" [closable]="true"></extra-message>
  <extra-message severity="warning" summary="Message" detail="caption" [closable]="true"></extra-message>
  <extra-message severity="danger" summary="Message" detail="caption" [closable]="true"></extra-message>
</div>
`;

@Component({
  selector: 'app-message-with-close-button',
  standalone: true,
  imports: [ExtraMessageComponent],
  template
})
export class MessageWithCloseButtonComponent {}

export const WithCloseButton: StoryObj = {
  render: () => ({
    template: `<app-message-with-close-button></app-message-with-close-button>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Сообщения с кнопкой закрытия.' },
      source: {
        language: 'html',
        code: `<extra-message severity="info" summary="Message" detail="caption" [closable]="true"></extra-message>`
      }
    }
  }
};
