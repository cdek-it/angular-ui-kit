import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';

const template = `
<div class="bg-surface-ground p-4 flex gap-3 flex-wrap">
  <extra-button label="SM" variant="secondary" (click)="size = 'sm'"></extra-button>
  <extra-button label="Default" variant="secondary" (click)="size = 'default'"></extra-button>
  <extra-button label="LG" variant="secondary" (click)="size = 'lg'"></extra-button>
  <extra-button label="XLG" variant="secondary" (click)="size = 'xlg'"></extra-button>

  @for (s of sizes; track s) {
    <extra-dialog
      [header]="'Размер ' + s"
      [size]="s"
      [visible]="size === s"
      (visibleChange)="size = $event ? s : null"
    >
      <p>Окно размера {{ s }}. Содержимое одинаковое — меняется ширина окна.</p>
    </extra-dialog>
  }
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
  sizes = ['sm', 'default', 'lg', 'xlg'];
  size: string | null = null;
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-dialog-sizes></app-dialog-sizes>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Размеры окна: sm, default, lg, xlg (ширина задаётся дизайн-токенами).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDialogComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-sizes',
  standalone: true,
  imports: [ExtraDialogComponent],
  template: \`
    <extra-dialog header="Размер SM" size="sm" [visible]="visible" (visibleChange)="visible = $event">
      <p>Маленькое окно</p>
    </extra-dialog>

    <extra-dialog header="Размер XLG" size="xlg" [visible]="visible" (visibleChange)="visible = $event">
      <p>Очень широкое окно</p>
    </extra-dialog>
  \`,
})
export class DialogSizesComponent {
  visible = false;
}
        `
      }
    }
  }
};
