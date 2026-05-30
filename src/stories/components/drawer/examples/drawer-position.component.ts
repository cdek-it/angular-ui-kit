import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraDrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex flex-wrap gap-3">
  <extra-button label="Left" (click)="visibleLeft = true"></extra-button>
  <extra-button label="Right" (click)="visibleRight = true"></extra-button>
  <extra-button label="Top" (click)="visibleTop = true"></extra-button>
  <extra-button label="Bottom" (click)="visibleBottom = true"></extra-button>
</div>

<extra-drawer [(visible)]="visibleLeft" header="Left" position="left">
  <p>Left drawer content.</p>
</extra-drawer>

<extra-drawer [(visible)]="visibleRight" header="Right" position="right">
  <p>Right drawer content.</p>
</extra-drawer>

<extra-drawer [(visible)]="visibleTop" header="Top" position="top">
  <p>Top drawer content.</p>
</extra-drawer>

<extra-drawer [(visible)]="visibleBottom" header="Bottom" position="bottom">
  <p>Bottom drawer content.</p>
</extra-drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-position',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template,
  styles,
})
export class DrawerPositionComponent {
  visibleLeft = false;
  visibleRight = false;
  visibleTop = false;
  visibleBottom = false;
}

export const Position: StoryObj = {
  render: () => ({
    template: `<app-drawer-position></app-drawer-position>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Drawer с различными позициями: left, right, top, bottom.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDrawerComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-position',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template: \`
    <div class="flex flex-wrap gap-3">
      <extra-button label="Left" (click)="visibleLeft = true"></extra-button>
      <extra-button label="Right" (click)="visibleRight = true"></extra-button>
      <extra-button label="Top" (click)="visibleTop = true"></extra-button>
      <extra-button label="Bottom" (click)="visibleBottom = true"></extra-button>
    </div>

    <extra-drawer [(visible)]="visibleLeft" header="Left" position="left">
      <p>Left drawer content.</p>
    </extra-drawer>

    <extra-drawer [(visible)]="visibleRight" header="Right" position="right">
      <p>Right drawer content.</p>
    </extra-drawer>

    <extra-drawer [(visible)]="visibleTop" header="Top" position="top">
      <p>Top drawer content.</p>
    </extra-drawer>

    <extra-drawer [(visible)]="visibleBottom" header="Bottom" position="bottom">
      <p>Bottom drawer content.</p>
    </extra-drawer>
  \`,
})
export class DrawerPositionComponent {
  visibleLeft = false;
  visibleRight = false;
  visibleTop = false;
  visibleBottom = false;
}
        `,
      },
    },
  },
};
