import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogSize } from '../../../../lib/components/dialog/dialog.component';

const template = `
<div class="p-4 flex flex-col gap-3">
  <div class="flex gap-3 flex-wrap items-center">
    @for (s of sizes; track s) {
      <extra-button
        [label]="s.toUpperCase()"
        (click)="open(s)"
      ></extra-button>
    }
  </div>

  <extra-dialog
    [header]="'Размер ' + size"
    [size]="size"
    [visible]="visible"
    (visibleChange)="visible = $event"
  >
    <p>Окно размера {{ size }}. Содержимое одинаковое — меняется ширина окна.</p>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraButtonComponent],
  template
})
export class DialogSizesComponent {
  sizes: ExtraDialogSize[] = ['sm', 'default', 'lg', 'xlg'];
  size: ExtraDialogSize = 'default';
  visible = false;

  open(size: ExtraDialogSize): void {
    this.size = size;
    this.visible = true;
  }
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-dialog-sizes></app-dialog-sizes>`
  }),
  argTypes: {
    showOverlay: { control: false, table: { disable: true } },
    showMaximize: { control: false, table: { disable: true } },
    showClose: { control: false, table: { disable: true } },
    size: { control: false, table: { disable: true } },
    header: { control: false, table: { disable: true } },
    dismissableMask: { control: false, table: { disable: true } },
    closeOnEscape: { control: false, table: { disable: true } },
    focusOnShow: { control: false, table: { disable: true } },
    appendTo: { control: false, table: { disable: true } },
    visible: { control: false, table: { disable: true } },
  },
  parameters: {
    controls: { exclude: ['showOverlay', 'showMaximize', 'showClose', 'size', 'header', 'dismissableMask', 'closeOnEscape', 'focusOnShow', 'appendTo', 'visible'] },
    docs: {
      description: {
        story:
          'Размеры окна: sm (280px), default (350px), lg (420px), xlg (630px) — ширина задаётся дизайн-токенами. Нажмите кнопку размера — окно откроется сразу. Чтобы посмотреть другой размер, закройте окно и нажмите другую кнопку.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDialogComponent, ExtraDialogSize } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-sizes',
  standalone: true,
  imports: [ExtraDialogComponent],
  template: \`
    <extra-dialog
      [header]="'Размер ' + size"
      [size]="size"
      [visible]="visible"
      (visibleChange)="visible = $event"
    >
      <p>Окно размера {{ size }}</p>
    </extra-dialog>
  \`,
})
export class DialogSizesComponent {
  size: ExtraDialogSize = 'default';
  visible = false;
}
        `
      }
    }
  }
};
