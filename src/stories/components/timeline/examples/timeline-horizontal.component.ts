import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { TimelineComponent } from '../../../../lib/components/timeline/timeline.component';

const template = `
<timeline [value]="events" layout="horizontal" align="top"></timeline>
`;
const styles = '';

@Component({
  selector: 'app-timeline-horizontal',
  standalone: true,
  imports: [TimelineComponent],
  template,
  styles,
})
export class TimelineHorizontalComponent {
  events = ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'];
}

export const Horizontal: StoryObj = {
  render: () => ({
    template: `<app-timeline-horizontal></app-timeline-horizontal>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Горизонтальная ориентация через `layout="horizontal"` и `align="top"`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TimelineComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-timeline-horizontal',
  standalone: true,
  imports: [TimelineComponent],
  template: \`
    <timeline [value]="events" layout="horizontal" align="top"></timeline>
  \`,
})
export class TimelineHorizontalComponent {
  events = ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'];
}
        `,
      },
    },
  },
};
