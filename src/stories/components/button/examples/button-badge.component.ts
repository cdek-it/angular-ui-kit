import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="p-4">
  <div class="flex gap-3 items-end">
    <extra-button label="Emails" [showBadge]="true" badge="8" size="small"></extra-button>
    <extra-button label="Emails" [showBadge]="true" badge="8"></extra-button>
    <extra-button label="Emails" [showBadge]="true" badge="8" size="large"></extra-button>
    <extra-button
      label="Messages"
      icon="ti ti-users"
      [showBadge]="true"
      badge="2"
      badgeSeverity="danger"
      variant="outlined"
    ></extra-button>
  </div>
</div>
`;

@Component({
  selector: 'app-button-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class ButtonBadgeComponent {}

export const Badge: StoryObj = {
  render: () => ({
    template: `<app-button-badge></app-button-badge>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Бейдж поверх кнопки (`showBadge` + `badge` + `badgeSeverity`) — например, для счётчиков уведомлений.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-badge',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <extra-button label="Emails" [showBadge]="true" badge="8"></extra-button>
    <extra-button
      label="Messages"
      icon="ti ti-users"
      [showBadge]="true"
      badge="2"
      badgeSeverity="danger"
      variant="outlined"
    ></extra-button>
  \`,
})
export class ButtonBadgeComponent {}
        `
      }
    }
  }
};
