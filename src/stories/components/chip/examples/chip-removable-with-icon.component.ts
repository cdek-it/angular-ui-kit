import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraChipComponent } from '../../../../lib/components/chip/chip.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex flex-col gap-4">
  <div class="flex gap-2">
    @if (visible()) {
      <extra-chip
        label="Задержан"
        icon="ti ti-alert-triangle"
        [removable]="true"
        (onRemove)="visible.set(false)"
      ></extra-chip>
    } @else {
      <span class="text-sm">Чип удалён</span>
    }
  </div>

  <extra-button label="Вернуть" icon="ti ti-refresh" size="small" (click)="visible.set(true)"></extra-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-removable-with-icon',
  standalone: true,
  imports: [ExtraChipComponent, ExtraButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class ChipRemovableWithIconComponent {
  visible = signal(true);
}

export const RemovableWithIcon: StoryObj = {
  render: () => ({
    template: `<app-chip-removable-with-icon></app-chip-removable-with-icon>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Чип с иконкой и кнопкой удаления.' },
      source: {
        language: 'html',
        code: `@if (visible()) {
  <extra-chip
    label="Задержан"
    icon="ti ti-alert-triangle"
    [removable]="true"
    (onRemove)="visible.set(false)"
  ></extra-chip>
}`
      }
    }
  }
};
