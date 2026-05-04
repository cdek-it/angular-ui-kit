import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MessageComponent } from '../../../../lib/components/message/message.component';

const template = `
<div class="flex flex-col gap-4">
  <ui-message severity="info" summary="Message" detail="caption" [closable]="true">
    <div class="mt-4">
      <div class="text-sm">CONTENT</div>
    </div>
    <div class="flex gap-2 mt-2">
      <div class="text-sm">Cell 1</div>
      <div class="text-sm">Cell 2</div>
    </div>
  </ui-message>
  <ui-message severity="success" summary="Message" detail="caption" [closable]="true">
    <div class="mt-4">
      <div class="text-sm">CONTENT</div>
    </div>
    <div class="flex gap-2 mt-2">
      <div class="text-sm">Cell 1</div>
      <div class="text-sm">Cell 2</div>
    </div>
  </ui-message>
  <ui-message severity="warn" summary="Message" detail="caption" [closable]="true">
    <div class="mt-4">
      <div class="text-sm">CONTENT</div>
    </div>
    <div class="flex gap-2 mt-2">
      <div class="text-sm">Cell 1</div>
      <div class="text-sm">Cell 2</div>
    </div>
  </ui-message>
  <ui-message severity="error" summary="Message" detail="caption" [closable]="true">
    <div class="mt-4">
      <div class="text-sm">CONTENT</div>
    </div>
    <div class="flex gap-2 mt-2">
      <div class="text-sm">Cell 1</div>
      <div class="text-sm">Cell 2</div>
    </div>
  </ui-message>
</div>
`;

@Component({
  selector: 'app-message-with-content',
  standalone: true,
  imports: [MessageComponent],
  template,
})
export class MessageWithContentComponent {}

export const WithContent: StoryObj = {
  render: () => ({
    template: `<app-message-with-content></app-message-with-content>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Сообщения с дополнительным контентом и кнопкой закрытия.' },
      source: {
        language: 'html',
        code: `
<ui-message severity="info" summary="Message" detail="caption" [closable]="true">
  <div class="mt-4">
    <div class="text-sm">CONTENT</div>
  </div>
  <div class="flex gap-2 mt-2">
    <div class="text-sm">Cell 1</div>
    <div class="text-sm">Cell 2</div>
  </div>
</ui-message>
        `,
      },
    },
  },
};
