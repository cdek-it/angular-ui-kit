import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraImageComponent } from '../../../../lib/components/image/image.component';

const SRC = 'assets/images/avatar/avatar.png';

const template = `
<div class="p-4">
  <extra-image
    [src]="src"
    alt="Аватар в рамке"
    styleClass="inline-block bg-surface-card p-1 border border-surface-border"
    imageClass="h-24 w-24 object-cover"
  ></extra-image>
</div>
`;

@Component({
  selector: 'app-image-frame',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraImageComponent],
  template
})
export class ImageFrameComponent {
  readonly src = SRC;
}

export const Frame: StoryObj = {
  name: 'Frame',
  render: () => ({
    template: `<app-image-frame></app-image-frame>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`styleClass` применяется к корневому `<span>`: рамка, фон и внутренние отступы вокруг изображения. Для рамки и padding корню нужен `inline-block` — у inline-элемента с блочным `<img>` граница рисуется полосой.'
      },
      source: {
        language: 'html',
        type: 'code',
        code: `<extra-image
  src="${SRC}"
  alt="Аватар в рамке"
  styleClass="inline-block bg-surface-card p-1 border border-surface-border"
  imageClass="h-24 w-24 object-cover"
></extra-image>`
      }
    }
  }
};
