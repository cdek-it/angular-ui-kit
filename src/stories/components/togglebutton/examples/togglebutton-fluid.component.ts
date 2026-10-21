import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<div class="bg-surface-ground p-4" style="width: 320px">
  <extra-togglebutton label="Подписка" [fluid]="true" [formControl]="control"></extra-togglebutton>
</div>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-fluid',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class ToggleButtonFluidComponent {
  control = new FormControl(false);
}

export const Fluid: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-fluid></app-togglebutton-fluid>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'С `[fluid]="true"` кнопка занимает всю ширину контейнера — серая подложка показывает его границы.'
      },
      source: {
        language: 'html',
        code: `<div style="width: 320px">
  <extra-togglebutton label="Подписка" [fluid]="true" [formControl]="control"></extra-togglebutton>
</div>`
      }
    }
  }
};
