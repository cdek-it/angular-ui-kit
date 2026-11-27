import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraImageComponent } from '../../../../lib/components/image/image.component';

const SRC = 'assets/images/avatar/avatar.png';

const template = `
<div class="p-4">
  <extra-image [src]="src" alt="Аватар шириной 120" width="120"></extra-image>
</div>
`;

@Component({
  selector: 'app-image-width',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraImageComponent],
  template
})
export class ImageWidthComponent {
  readonly src = SRC;
}

export const Width: StoryObj = {
  name: 'Width',
  render: () => ({
    template: `<app-image-width></app-image-width>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`width` — строка, как HTML-атрибут: задаёт ширину изображения, высота остаётся пропорциональной. Без `width` изображение рисуется в натуральную величину — как в Default.'
      },
      source: {
        language: 'html',
        type: 'code',
        code: `<extra-image src="${SRC}" alt="Аватар шириной 120" width="120"></extra-image>`
      }
    }
  }
};
