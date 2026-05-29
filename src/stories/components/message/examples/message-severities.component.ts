import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../../lib/components/message/message.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-message severity="info" summary="Message" detail="caption"></extra-message>
  <extra-message severity="success" summary="Message" detail="caption"></extra-message>
  <extra-message severity="warn" summary="Message" detail="caption"></extra-message>
  <extra-message severity="error" summary="Message" detail="caption"></extra-message>
</div>
`;

@Component({
  selector: 'app-message-severities',
  standalone: true,
  imports: [ExtraMessageComponent],
  template,
})
export class MessageSeveritiesComponent {}

export const Severities: StoryObj = {
  render: () => ({
    template: `<app-message-severities></app-message-severities>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Четыре типа сообщений: информация, успех, предупреждение, ошибка.' },
      source: {
        language: 'html',
        code: `
<extra-message severity="info" summary="Message" detail="caption"></extra-message>
<extra-message severity="success" summary="Message" detail="caption"></extra-message>
<extra-message severity="warn" summary="Message" detail="caption"></extra-message>
<extra-message severity="error" summary="Message" detail="caption"></extra-message>
        `,
      },
    },
  },
};
