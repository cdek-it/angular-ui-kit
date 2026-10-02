import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-toggleswitch [(ngModel)]="right" label="Лейбл справа" labelPosition="right"></extra-toggleswitch>
  <extra-toggleswitch [(ngModel)]="left" label="Лейбл слева" labelPosition="left"></extra-toggleswitch>
</div>
`;

@Component({
  selector: 'app-toggleswitch-positions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraToggleSwitchComponent, FormsModule],
  template
})
export class ToggleSwitchPositionsComponent {
  right = true;
  left = true;
}

export const Positions: StoryObj = {
  render: () => ({
    template: `<app-toggleswitch-positions></app-toggleswitch-positions>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'labelPosition="right" (по умолчанию) и "left" — рядом для наглядного сравнения.'
      },
      source: {
        language: 'ts',
        code: `
<extra-toggleswitch [(ngModel)]="right" label="Лейбл справа" labelPosition="right"></extra-toggleswitch>
<extra-toggleswitch [(ngModel)]="left" label="Лейбл слева" labelPosition="left"></extra-toggleswitch>
        `
      }
    }
  }
};
