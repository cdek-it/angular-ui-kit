import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../../lib/components/message/message.component';

const template = `
<div class="bg-surface-ground p-4 flex flex-col gap-4">
  @for (severity of severities; track severity) {
    <extra-message [severity]="severity" message="Message" caption="caption"></extra-message>
  }
</div>
`;

@Component({
  selector: 'app-message-severity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMessageComponent],
  template
})
export class MessageSeverityComponent {
  severities = ['info', 'success', 'warning', 'danger'];
}

export const Severity: StoryObj = {
  render: () => ({
    template: `<app-message-severity></app-message-severity>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Все типы сообщений (severity): info, success, warning, danger. Иконка по умолчанию подставляется по severity.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMessageComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-message-severity',
  standalone: true,
  imports: [ExtraMessageComponent],
  template: \`
    <extra-message severity="info" message="Message" caption="caption"></extra-message>
    <extra-message severity="success" message="Message" caption="caption"></extra-message>
    <extra-message severity="warning" message="Message" caption="caption"></extra-message>
    <extra-message severity="danger" message="Message" caption="caption"></extra-message>
  \`,
})
export class MessageSeverityComponent {}
        `
      }
    }
  }
};
