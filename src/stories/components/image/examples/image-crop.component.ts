import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraImageComponent } from '../../../../lib/components/image/image.component';

const SRC = 'assets/images/avatar/avatar.png';

const template = `
<div class="p-4">
  <extra-image
    [src]="src"
    alt="Аватар 240 на 160"
    imageClass="h-40 w-60 object-cover"
  ></extra-image>
</div>
`;

@Component({
  selector: 'app-image-crop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraImageComponent],
  template
})
export class ImageCropComponent {
  readonly src = SRC;
}

export const Crop: StoryObj = {
  name: 'Crop',
  render: () => ({
    template: `<app-image-crop></app-image-crop>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`imageClass` задаёт размер и обрезку самого `<img>`: `h-40 w-60 object-cover` даёт 240 × 160 с обрезкой. Атрибут `height` здесь не фиксирует высоту — её перекрывает глобальный `img { height: auto }` (Tailwind preflight).'
      },
      source: {
        language: 'html',
        type: 'code',
        code: `<extra-image
  src="${SRC}"
  alt="Аватар 240 на 160"
  imageClass="h-40 w-60 object-cover"
></extra-image>`
      }
    }
  }
};
