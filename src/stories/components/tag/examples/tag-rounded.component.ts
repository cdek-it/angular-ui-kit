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
    <div class="flex gap-3 items-center">
      @for (severity of severities; track severity) {
        <extra-tag [severity]="severity" value="Rounded" icon="ti ti-check" [rounded]="true"></extra-tag>
      }
    </div>
  </div>
</div>
`;

@Component({
  selector: 'app-tag-rounded',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraTagComponent],
  template
})
export class TagRoundedComponent {
  severities = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];
}

export const Rounded: StoryObj = {
  render: () => ({
    template: `<app-tag-rounded></app-tag-rounded>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Скруглённые теги ([rounded]="true") во всех severity: обычные и скруглённые для сравнения, а также скруглённые с иконкой.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraTagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-rounded',
  standalone: true,
  imports: [ExtraTagComponent],
  template: \`
    <!-- обычные -->
    <div class="flex gap-3 items-center">
      <extra-tag severity="primary" value="Primary"></extra-tag>
      <extra-tag severity="secondary" value="Secondary"></extra-tag>
      <extra-tag severity="info" value="Info"></extra-tag>
      <extra-tag severity="success" value="Success"></extra-tag>
      <extra-tag severity="warning" value="Warning"></extra-tag>
      <extra-tag severity="danger" value="Danger"></extra-tag>
    </div>

    <!-- скруглённые -->
    <div class="flex gap-3 items-center">
      <extra-tag severity="primary" value="Primary" [rounded]="true"></extra-tag>
      <extra-tag severity="secondary" value="Secondary" [rounded]="true"></extra-tag>
      <extra-tag severity="info" value="Info" [rounded]="true"></extra-tag>
      <extra-tag severity="success" value="Success" [rounded]="true"></extra-tag>
      <extra-tag severity="warning" value="Warning" [rounded]="true"></extra-tag>
      <extra-tag severity="danger" value="Danger" [rounded]="true"></extra-tag>
    </div>

    <!-- скруглённые с иконкой -->
    <div class="flex gap-3 items-center">
      <extra-tag severity="primary" value="Rounded" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="secondary" value="Rounded" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="info" value="Rounded" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="success" value="Rounded" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="warning" value="Rounded" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="danger" value="Rounded" icon="ti ti-check" [rounded]="true"></extra-tag>
    </div>
  \`,
})
export class TagRoundedComponent {}
        `
      }
    }
  }
};
