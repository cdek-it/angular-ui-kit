import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const template = `
<div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
  <div>
    <div style="font-size: 12px; color: var(--p-text-muted-color); margin-bottom: 4px">small</div>
    <ui-textarea size="small" placeholder="Small" [(ngModel)]="value"></ui-textarea>
  </div>
  <div>
    <div style="font-size: 12px; color: var(--p-text-muted-color); margin-bottom: 4px">base</div>
    <ui-textarea placeholder="Base" [(ngModel)]="value"></ui-textarea>
  </div>
  <div>
    <div style="font-size: 12px; color: var(--p-text-muted-color); margin-bottom: 4px">large</div>
    <ui-textarea size="large" placeholder="Large" [(ngModel)]="value"></ui-textarea>
  </div>
  <div>
    <div style="font-size: 12px; color: var(--p-text-muted-color); margin-bottom: 4px">xlarge</div>
    <ui-textarea size="xlarge" placeholder="XLarge" [(ngModel)]="value"></ui-textarea>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-textarea-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextareaComponent, FormsModule],
  template,
  styles,
})
export class TextareaSizesComponent {
  value = '';
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-textarea-sizes></app-textarea-sizes>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Все доступные размеры компонента: small, base, large, xlarge.',
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
