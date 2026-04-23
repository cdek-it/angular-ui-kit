import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { TimelineComponent } from '../../../../lib/components/timeline/timeline.component';

const template = `
<div style="display: flex; gap: 2rem;">
  <timeline [value]="events" line="solid"></timeline>
  <timeline [value]="events" line="dashed"></timeline>
  <timeline [value]="events" line="dotted"></timeline>
  <timeline [value]="events" line="none"></timeline>
</div>
`;

@Component({
  selector: 'app-timeline-dashed-line',
  standalone: true,
  imports: [TimelineComponent],
  template,
})
export class TimelineDashedLineComponent {
  events = ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'];
}

export const DashedLine: StoryObj = {
  render: () => ({
    template: `<app-timeline-dashed-line></app-timeline-dashed-line>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Варианты стиля линии: `solid`, `dashed`, `dotted`, `none`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TimelineComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-timeline-line',
  standalone: true,
  imports: [TimelineComponent],
  template: \`
    <timeline [value]="events" line="dashed"></timeline>
  \`,
})
export class TimelineLineComponent {
  events = ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'];
}
        `,
      },
    },
  },
};
