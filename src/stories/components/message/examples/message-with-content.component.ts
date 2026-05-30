import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../../lib/components/message/message.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-message severity="info" summary="Message" detail="caption" [closable]="true">
    <div class="mt-4">
      <div class="text-sm">CONTENT</div>
    </div>
    <div class="flex gap-2 mt-2">
      <div class="text-sm">Cell 1</div>
      <div class="text-sm">Cell 2</div>
    </div>
  </extra-message>
  <extra-message severity="success" summary="Message" detail="caption" [closable]="true">
    <div class="mt-4">
      <div class="text-sm">CONTENT</div>
    </div>
    <div class="flex gap-2 mt-2">
      <div class="text-sm">Cell 1</div>
      <div class="text-sm">Cell 2</div>
    </div>
  </extra-message>
  <extra-message severity="warn" summary="Message" detail="caption" [closable]="true">
    <div class="mt-4">
      <div class="text-sm">CONTENT</div>
    </div>
    <div class="flex gap-2 mt-2">
      <div class="text-sm">Cell 1</div>
      <div class="text-sm">Cell 2</div>
    </div>
  </extra-message>
  <extra-message severity="error" summary="Message" detail="caption" [closable]="true">
    <div class="mt-4">
      <div class="text-sm">CONTENT</div>
    </div>
    <div class="flex gap-2 mt-2">
      <div class="text-sm">Cell 1</div>
      <div class="text-sm">Cell 2</div>
    </div>
  </extra-message>
</div>
`;

@Component({
  selector: 'app-message-with-content',
  standalone: true,
  imports: [ExtraMessageComponent],
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
<extra-message severity="info" summary="Message" detail="caption" [closable]="true">
  <div class="mt-4">
    <div class="text-sm">CONTENT</div>
  </div>
  <div class="flex gap-2 mt-2">
    <div class="text-sm">Cell 1</div>
    <div class="text-sm">Cell 2</div>
  </div>
</extra-message>
        `,
      },
    },
  },
};
