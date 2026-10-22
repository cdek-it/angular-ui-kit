import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

const template = `
<div class="flex gap-3 items-center">
  <extra-toggleswitch [(ngModel)]="off" ariaLabel="Уведомления"></extra-toggleswitch>
  <extra-toggleswitch [(ngModel)]="on" ariaLabel="Автопродление"></extra-toggleswitch>
</div>
`;

@Component({
  selector: 'app-toggleswitch-bare',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraToggleSwitchComponent, FormsModule],
  template
})
export class ToggleSwitchBareComponent {
  off = false;
  on = true;
}

export const Bare: StoryObj = {
  render: () => ({
    template: `<app-toggleswitch-bare></app-toggleswitch-bare>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Без `label` и `caption` рендерится голый свитч без обёртки — для плотных layout’ов и таблиц. ' +
          'В этом режиме обязателен `ariaLabel`, иначе у свитча нет доступного имени.'
      },
      source: {
        language: 'html',
        code: `<extra-toggleswitch [(ngModel)]="off" ariaLabel="Уведомления"></extra-toggleswitch>`
      }
    }
  }
};
