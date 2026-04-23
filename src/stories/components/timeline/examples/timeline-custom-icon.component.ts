import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { TimelineComponent } from '../../../../lib/components/timeline/timeline.component';

const template = `
<timeline [value]="events" icon="ti ti-check"></timeline>
`;

@Component({
  selector: 'app-timeline-custom-icon',
  standalone: true,
  imports: [TimelineComponent],
  template,
})
export class TimelineCustomIconComponent {
  events = ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'];
}

export const CustomIcon: StoryObj = {
  render: () => ({
    template: `<app-timeline-custom-icon></app-timeline-custom-icon>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Кастомная иконка маркера через проп `icon` (CSS-класс иконки, например Tabler Icons).',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TimelineComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-timeline-custom-icon',
  standalone: true,
  imports: [TimelineComponent],
  template: \`
    <timeline [value]="events" icon="ti ti-check"></timeline>
  \`,
})
export class TimelineCustomIconComponent {
  events = ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'];
}
        `,
      },
    },
  },
};
