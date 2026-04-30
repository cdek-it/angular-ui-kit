import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MessageComponent } from '../../../../lib/components/message/message.component';

const template = `
<div class="flex flex-col gap-4">
  <ui-message severity="info" summary="Message" detail="caption" [closable]="true"></ui-message>
  <ui-message severity="success" summary="Message" detail="caption" [closable]="true"></ui-message>
  <ui-message severity="warn" summary="Message" detail="caption" [closable]="true"></ui-message>
  <ui-message severity="error" summary="Message" detail="caption" [closable]="true"></ui-message>
</div>
`;

@Component({
  selector: 'app-message-with-close-button',
  standalone: true,
  imports: [MessageComponent],
  template,
})
export class MessageWithCloseButtonComponent {}

export const WithCloseButton: StoryObj = {
  render: () => ({
    template: `<app-message-with-close-button></app-message-with-close-button>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Сообщения с кнопкой закрытия.' },
      source: {
        language: 'html',
        code: `<ui-message severity="info" summary="Message" detail="caption" [closable]="true"></ui-message>`,
      },
    },
  },
};
