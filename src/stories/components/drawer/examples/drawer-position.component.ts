import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { DrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex flex-wrap gap-3">
  <button label="Left" (click)="visibleLeft = true"></button>
  <button label="Right" (click)="visibleRight = true"></button>
  <button label="Top" (click)="visibleTop = true"></button>
  <button label="Bottom" (click)="visibleBottom = true"></button>
</div>

<drawer [(visible)]="visibleLeft" header="Left" position="left">
  <p>Left drawer content.</p>
</drawer>

<drawer [(visible)]="visibleRight" header="Right" position="right">
  <p>Right drawer content.</p>
</drawer>

<drawer [(visible)]="visibleTop" header="Top" position="top">
  <p>Top drawer content.</p>
</drawer>

<drawer [(visible)]="visibleBottom" header="Bottom" position="bottom">
  <p>Bottom drawer content.</p>
</drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-position',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
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
import { DrawerComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-position',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
  template: \`
    <div class="flex flex-wrap gap-3">
      <button label="Left" (click)="visibleLeft = true"></button>
      <button label="Right" (click)="visibleRight = true"></button>
      <button label="Top" (click)="visibleTop = true"></button>
      <button label="Bottom" (click)="visibleBottom = true"></button>
    </div>

    <drawer [(visible)]="visibleLeft" header="Left" position="left">
      <p>Left drawer content.</p>
    </drawer>

    <drawer [(visible)]="visibleRight" header="Right" position="right">
      <p>Right drawer content.</p>
    </drawer>

    <drawer [(visible)]="visibleTop" header="Top" position="top">
      <p>Top drawer content.</p>
    </drawer>

    <drawer [(visible)]="visibleBottom" header="Bottom" position="bottom">
      <p>Bottom drawer content.</p>
    </drawer>
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
