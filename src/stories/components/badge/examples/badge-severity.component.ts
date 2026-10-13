import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraBadgeSeverity, ExtraBadgeComponent } from '../../../../lib/components/badge/badge.component';

const template = `
<div class="p-4">
  <div class="flex gap-4 items-center">
    @for (severity of severities; track severity) {
      <extra-badge [severity]="severity" value="8"></extra-badge>
    }
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-badge-severity',
  standalone: true,
  imports: [ExtraBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class BadgeSeverityComponent {
  severities: ExtraBadgeSeverity[] = ['primary', 'info', 'success', 'warning', 'danger'];
}

export const Severity: StoryObj = {
  render: () => ({
    template: `<app-badge-severity></app-badge-severity>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Все варианты стиля (severity): primary, info, success, warning, danger.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraBadgeComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-badge-severity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBadgeComponent],
  template: \`
    <div class="flex gap-4 items-center">
      <extra-badge severity="primary" value="8"></extra-badge>
      <extra-badge severity="info" value="8"></extra-badge>
      <extra-badge severity="success" value="8"></extra-badge>
      <extra-badge severity="warning" value="8"></extra-badge>
      <extra-badge severity="danger" value="8"></extra-badge>
    </div>
  \`
})
export class BadgeSeverityComponent {}
        `
      }
    }
  }
};
