import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<div class="flex gap-3 items-center">
  <extra-togglebutton label="Избранное" icon="ti ti-star" [formControl]="left"></extra-togglebutton>
  <extra-togglebutton
    label="Избранное"
    icon="ti ti-star"
    iconPosition="right"
    [formControl]="right"
  ></extra-togglebutton>
</div>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-with-icon',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class ToggleButtonWithIconComponent {
  left = new FormControl(false);
  right = new FormControl(true);
}

export const WithIcon: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-with-icon></app-togglebutton-with-icon>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Кнопка с иконкой через `icon` — та же иконка в обоих состояниях. Позиция управляется `iconPosition`.'
      },
      source: {
        language: 'html',
        code: `<extra-togglebutton label="Избранное" icon="ti ti-star" [formControl]="left"></extra-togglebutton>
<extra-togglebutton label="Избранное" icon="ti ti-star" iconPosition="right" [formControl]="right"></extra-togglebutton>`
      }
    }
  }
};
