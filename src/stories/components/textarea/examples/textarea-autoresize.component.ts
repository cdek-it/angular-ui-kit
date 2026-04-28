import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const template = `
<div style="display: flex; flex-direction: column; gap: 8px; width: 320px;">
  <ui-textarea
    [autoResize]="true"
    [rows]="2"
    placeholder="Начните вводить текст — поле расширится..."
    [(ngModel)]="value"
  ></ui-textarea>
</div>
`;
const styles = '';

@Component({
  selector: 'app-textarea-autoresize',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextareaComponent, FormsModule],
  template,
  styles,
})
export class TextareaAutoResizeComponent {
  value = '';
}

export const AutoResize: StoryObj = {
  render: () => ({
    template: `<app-textarea-autoresize></app-textarea-autoresize>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Режим авторасширения — поле увеличивается по высоте по мере ввода текста.',
      },
      source: {
        language: 'ts',
        code: `@Component({
  template: \`${template}\`,
})`,
      },
    },
  },
};
