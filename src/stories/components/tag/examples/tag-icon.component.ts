import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraTagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-center">
      @for (severity of severities; track severity) {
        <extra-tag [severity]="severity" [value]="severity" icon="ti ti-check"></extra-tag>
      }
    </div>
    <div class="flex gap-3 items-center">
      @for (severity of severities; track severity) {
        <extra-tag [severity]="severity" [value]="severity" icon="ti ti-check" [rounded]="true"></extra-tag>
      }
    </div>
    <div class="flex gap-3 items-center">
      @for (severity of severities; track severity) {
        <extra-tag [severity]="severity" icon="ti ti-bolt" [rounded]="true"></extra-tag>
      }
    </div>
  </div>
</div>
`;

@Component({
  selector: 'app-tag-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraTagComponent],
  template
})
export class TagIconComponent {
  severities = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];
}

export const WithIcon: StoryObj = {
  render: () => ({
    template: `<app-tag-icon></app-tag-icon>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Тег с иконкой tabler icon: иконка + текст во всех severity (обычные и скруглённые), а также тег без текста — только иконка (пустой value).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraTagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-icon',
  standalone: true,
  imports: [ExtraTagComponent],
  template: \`
    <div class="flex gap-3 items-center">
      <extra-tag severity="primary" value="Primary" icon="ti ti-check"></extra-tag>
      <extra-tag severity="secondary" value="Secondary" icon="ti ti-check"></extra-tag>
      <extra-tag severity="info" value="Info" icon="ti ti-check"></extra-tag>
      <extra-tag severity="success" value="Success" icon="ti ti-check"></extra-tag>
      <extra-tag severity="warning" value="Warning" icon="ti ti-check"></extra-tag>
      <extra-tag severity="danger" value="Danger" icon="ti ti-check"></extra-tag>
    </div>

    <!-- скруглённые с иконкой -->
    <div class="flex gap-3 items-center">
      <extra-tag severity="primary" value="Primary" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="secondary" value="Secondary" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="info" value="Info" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="success" value="Success" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="warning" value="Warning" icon="ti ti-check" [rounded]="true"></extra-tag>
      <extra-tag severity="danger" value="Danger" icon="ti ti-check" [rounded]="true"></extra-tag>
    </div>

    <!-- без текста, только иконка (пустой value) -->
    <div class="flex gap-3 items-center">
      <extra-tag severity="primary" icon="ti ti-bolt" [rounded]="true"></extra-tag>
      <extra-tag severity="secondary" icon="ti ti-bolt" [rounded]="true"></extra-tag>
      <extra-tag severity="info" icon="ti ti-bolt" [rounded]="true"></extra-tag>
      <extra-tag severity="success" icon="ti ti-bolt" [rounded]="true"></extra-tag>
      <extra-tag severity="warning" icon="ti ti-bolt" [rounded]="true"></extra-tag>
      <extra-tag severity="danger" icon="ti ti-bolt" [rounded]="true"></extra-tag>
    </div>
  \`,
})
export class TagIconComponent {}
        `
      }
    }
  }
};
