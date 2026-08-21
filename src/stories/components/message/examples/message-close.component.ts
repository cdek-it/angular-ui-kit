import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../../lib/components/message/message.component';

const template = `
<div class="bg-surface-ground p-4 flex flex-col gap-4">
  @for (severity of severities; track severity) {
    <extra-message [severity]="severity" message="Message" caption="caption" [showClose]="true"></extra-message>
  }
</div>
`;

@Component({
  selector: 'app-message-close',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMessageComponent],
  template
})
export class MessageCloseComponent {
  severities = ['info', 'success', 'warning', 'danger'];
}

export const WithClose: StoryObj = {
  render: () => ({
    template: `<app-message-close></app-message-close>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Кнопка закрытия ([show-close]="true") во всех severity. При закрытии срабатывает событие onClose.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMessageComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-message-close',
  standalone: true,
  imports: [ExtraMessageComponent],
  template: \`
    <extra-message severity="info" message="Message" caption="caption" [showClose]="true" (onClose)="onClose()"></extra-message>
    <extra-message severity="success" message="Message" caption="caption" [showClose]="true"></extra-message>
    <extra-message severity="warning" message="Message" caption="caption" [showClose]="true"></extra-message>
    <extra-message severity="danger" message="Message" caption="caption" [showClose]="true"></extra-message>
  \`,
})
export class MessageCloseComponent {
  onClose(): void {
    console.log('closed');
  }
}
        `
      }
    }
  }
};
