import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogSize } from '../../../../lib/components/dialog/dialog.component';

const template = `
<div class="bg-surface-ground p-4 flex flex-col gap-3">
  <div class="flex gap-3 flex-wrap items-center">
    @for (s of sizes; track s) {
      <extra-button
        [label]="s.toUpperCase()"
        [variant]="s === size ? 'primary' : 'secondary'"
        (click)="size = s"
      ></extra-button>
    }
  </div>

  <div>
    <extra-button [label]="'Открыть окно (' + size + ')'" (click)="visible = true"></extra-button>
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
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-dialog-sizes></app-dialog-sizes>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Размеры окна: sm (280px), default (350px), lg (420px), xlg (630px) — ширина задаётся дизайн-токенами. Размер выбирается до открытия: отметьте нужный и нажмите «Открыть окно». Чтобы посмотреть другой размер, закройте окно и выберите заново.'
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
