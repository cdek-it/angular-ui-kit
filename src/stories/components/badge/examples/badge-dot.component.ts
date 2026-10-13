import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraBadgeSeverity, ExtraBadgeComponent } from '../../../../lib/components/badge/badge.component';

const template = `
<div class="p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      @for (severity of severities; track severity) {
        <extra-badge [dot]="true" [severity]="severity"></extra-badge>
      }
    </div>
    <div class="flex gap-4 items-center">
      <extra-badge [dot]="true" severity="danger"></extra-badge>
      <extra-badge [dot]="true" severity="danger" size="large"></extra-badge>
      <extra-badge [dot]="true" severity="danger" size="xlarge"></extra-badge>
    </div>
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-badge-dot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBadgeComponent],
  template,
  styles
})
export class BadgeDotComponent {
  severities: ExtraBadgeSeverity[] = ['primary', 'info', 'success', 'warning', 'danger'];
}

export const Dot: StoryObj = {
  render: () => ({
    template: `<app-badge-dot></app-badge-dot>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`[dot]="true"` — точка-индикатор без значения, приоритетнее `value`. Первый ряд — все severity, второй — размеры base, large, xlarge.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraBadgeComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-badge-dot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBadgeComponent],
  template: \`
    <div class="flex gap-4 items-center">
      <extra-badge [dot]="true" severity="primary"></extra-badge>
      <extra-badge [dot]="true" severity="info"></extra-badge>
      <extra-badge [dot]="true" severity="success"></extra-badge>
      <extra-badge [dot]="true" severity="warning"></extra-badge>
      <extra-badge [dot]="true" severity="danger"></extra-badge>
    </div>

    <!-- размеры точки -->
    <div class="flex gap-4 items-center">
      <extra-badge [dot]="true" severity="danger"></extra-badge>
      <extra-badge [dot]="true" severity="danger" size="large"></extra-badge>
      <extra-badge [dot]="true" severity="danger" size="xlarge"></extra-badge>
    </div>
  \`
})
export class BadgeDotComponent {}
        `
      }
    }
  }
};
