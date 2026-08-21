import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-center">
      @for (severity of severities; track severity) {
        <extra-tag [severity]="severity" [value]="severity"></extra-tag>
      }
    </div>
    <div class="flex gap-3 items-center">
      @for (severity of severities; track severity) {
        <extra-tag [severity]="severity" [value]="severity" [rounded]="true"></extra-tag>
      }
    </div>
  </div>
</div>
`;

@Component({
  selector: 'app-tag-severity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraTagComponent],
  template
})
export class TagSeverityComponent {
  severities = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];
}

export const Severity: StoryObj = {
  render: () => ({
    template: `<app-tag-severity></app-tag-severity>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Все варианты стиля (severity): primary, secondary, info, success, warning, danger — обычные и полностью скруглённые (rounded).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraTagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-severity',
  standalone: true,
  imports: [ExtraTagComponent],
  template: \`
    <div class="flex gap-3 items-center">
      <extra-tag severity="primary" value="Primary"></extra-tag>
      <extra-tag severity="secondary" value="Secondary"></extra-tag>
      <extra-tag severity="info" value="Info"></extra-tag>
      <extra-tag severity="success" value="Success"></extra-tag>
      <extra-tag severity="warning" value="Warning"></extra-tag>
      <extra-tag severity="danger" value="Danger"></extra-tag>
    </div>

    <!-- то же самое с полным скруглением -->
    <div class="flex gap-3 items-center">
      <extra-tag severity="primary" value="Primary" [rounded]="true"></extra-tag>
      <extra-tag severity="secondary" value="Secondary" [rounded]="true"></extra-tag>
      <extra-tag severity="info" value="Info" [rounded]="true"></extra-tag>
      <extra-tag severity="success" value="Success" [rounded]="true"></extra-tag>
      <extra-tag severity="warning" value="Warning" [rounded]="true"></extra-tag>
      <extra-tag severity="danger" value="Danger" [rounded]="true"></extra-tag>
    </div>
  \`,
})
export class TagSeverityComponent {}
        `
      }
    }
  }
};
