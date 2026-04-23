import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { TimelineComponent } from '../../../../lib/components/timeline/timeline.component';

const template = `
<div style="display: flex; gap: 2rem;">
  <timeline [value]="events" markerColor="#e53e3e"></timeline>
  <timeline [value]="events" markerColor="#38a169"></timeline>
  <timeline [value]="events" markerColor="#3182ce"></timeline>
</div>
`;

@Component({
  selector: 'app-timeline-marker-color',
  standalone: true,
  imports: [TimelineComponent],
  template,
})
export class TimelineMarkerColorComponent {
  events = ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'];
}

export const MarkerColor: StoryObj = {
  render: () => ({
    template: `<app-timeline-marker-color></app-timeline-marker-color>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Кастомный цвет маркера через проп `markerColor`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TimelineComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-timeline-marker-color',
  standalone: true,
  imports: [TimelineComponent],
  template: \`
    <timeline [value]="events" markerColor="#e53e3e"></timeline>
  \`,
})
export class TimelineMarkerColorComponent {
  events = ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'];
}
        `,
      },
    },
  },
};
