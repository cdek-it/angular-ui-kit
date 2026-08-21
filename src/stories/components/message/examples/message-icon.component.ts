import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../../lib/components/message/message.component';

const template = `
<div class="bg-surface-ground p-4 flex flex-col gap-4">
  <extra-message severity="info" message="Стандартная иконка" caption="icon не задан — иконка по severity"></extra-message>
  <extra-message severity="info" message="Своя иконка" caption='icon="ti ti-send"' icon="ti ti-send"></extra-message>
  <extra-message severity="success" message="Своя иконка" caption='icon="ti ti-rocket"' icon="ti ti-rocket"></extra-message>
  <extra-message severity="warning" message="Без иконки" caption="[icon]=null — иконка скрыта" [icon]="null"></extra-message>
  <extra-message severity="danger" message="Без иконки" caption="[icon]=null — иконка скрыта" [icon]="null"></extra-message>
</div>
`;

@Component({
  selector: 'app-message-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMessageComponent],
  template
})
export class MessageIconComponent {}

export const WithIcon: StoryObj = {
  render: () => ({
    template: `<app-message-icon></app-message-icon>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Иконка tabler icon: не задана — стандартная по severity; своя — через icon; значение null скрывает иконку.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMessageComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-message-icon',
  standalone: true,
  imports: [ExtraMessageComponent],
  template: \`
    <!-- стандартная иконка по severity -->
    <extra-message severity="info" message="Message" caption="caption"></extra-message>

    <!-- своя иконка -->
    <extra-message severity="info" message="Message" caption="caption" icon="ti ti-send"></extra-message>

    <!-- иконка скрыта -->
    <extra-message severity="warning" message="Message" caption="caption" [icon]="null"></extra-message>
  \`,
})
export class MessageIconComponent {}
        `
      }
    }
  }
};
