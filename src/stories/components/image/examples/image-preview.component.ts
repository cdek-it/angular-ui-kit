import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraImageTemplateDirective } from '../../../../lib/components/image/image-template.directive';
import { ExtraImageComponent } from '../../../../lib/components/image/image.component';

const SRC = 'assets/images/avatar/avatar.png';

const template = `
<div class="p-4">
  <extra-image [src]="src" alt="Аватар" [preview]="true">
    <ng-template extraImageTemplate="rotateRightIcon"><i class="ti ti-refresh text-base"></i></ng-template>
    <ng-template extraImageTemplate="rotateLeftIcon"><i class="ti ti-arrow-back-up text-base"></i></ng-template>
    <ng-template extraImageTemplate="zoomOutIcon"><i class="ti ti-zoom-out text-base"></i></ng-template>
    <ng-template extraImageTemplate="zoomInIcon"><i class="ti ti-zoom-in text-base"></i></ng-template>
    <ng-template extraImageTemplate="closeIcon"><i class="ti ti-x text-base"></i></ng-template>
  </extra-image>
</div>
`;

@Component({
  selector: 'app-image-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraImageComponent, ExtraImageTemplateDirective],
  template
})
export class ImagePreviewComponent {
  readonly src = SRC;
}

export const Preview: StoryObj = {
  name: 'Preview',
  render: () => ({
    template: `<app-image-preview></app-image-preview>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`[preview]="true"` включает предпросмотр: по клику открывается маска и тулбар с зумом, поворотом влево/вправо и закрытием. Иконки заменяются шаблонами `extraImageTemplate`, закрыть можно кнопкой или клавишей Escape.'
      },
      source: {
        language: 'html',
        type: 'code',
        code: `<extra-image src="${SRC}" alt="Аватар" [preview]="true">
  <ng-template extraImageTemplate="rotateRightIcon"><i class="ti ti-refresh text-base"></i></ng-template>
  <ng-template extraImageTemplate="rotateLeftIcon"><i class="ti ti-arrow-back-up text-base"></i></ng-template>
  <ng-template extraImageTemplate="zoomOutIcon"><i class="ti ti-zoom-out text-base"></i></ng-template>
  <ng-template extraImageTemplate="zoomInIcon"><i class="ti ti-zoom-in text-base"></i></ng-template>
  <ng-template extraImageTemplate="closeIcon"><i class="ti ti-x text-base"></i></ng-template>
</extra-image>`
      }
    }
  }
};
