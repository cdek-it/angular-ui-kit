import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { DrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex flex-wrap gap-3">
  <button label="Default" (click)="visibleDefault = true"></button>
  <button label="Small" (click)="visibleSm = true"></button>
  <button label="Large" (click)="visibleLg = true"></button>
  <button label="Extra Large" (click)="visibleXlg = true"></button>
</div>

<drawer [(visible)]="visibleDefault" header="Default">
  <p>Default size drawer content.</p>
</drawer>

<drawer [(visible)]="visibleSm" header="Small" size="sm">
  <p>Small size drawer content.</p>
</drawer>

<drawer [(visible)]="visibleLg" header="Large" size="lg">
  <p>Large size drawer content.</p>
</drawer>

<drawer [(visible)]="visibleXlg" header="Extra Large" size="xlg">
  <p>Extra large size drawer content.</p>
</drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-sizes',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
  template,
  styles,
})
export class DrawerSizesComponent {
  visibleDefault = false;
  visibleSm = false;
  visibleLg = false;
  visibleXlg = false;
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-drawer-sizes></app-drawer-sizes>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Drawer в различных размерах: default, sm, lg, xlg.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { DrawerComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-sizes',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
  template: \`
    <div class="flex flex-wrap gap-3">
      <button label="Default" (click)="visibleDefault = true"></button>
      <button label="Small" (click)="visibleSm = true"></button>
      <button label="Large" (click)="visibleLg = true"></button>
      <button label="Extra Large" (click)="visibleXlg = true"></button>
    </div>

    <drawer [(visible)]="visibleDefault" header="Default">
      <p>Default size drawer content.</p>
    </drawer>

    <drawer [(visible)]="visibleSm" header="Small" size="sm">
      <p>Small size drawer content.</p>
    </drawer>

    <drawer [(visible)]="visibleLg" header="Large" size="lg">
      <p>Large size drawer content.</p>
    </drawer>

    <drawer [(visible)]="visibleXlg" header="Extra Large" size="xlg">
      <p>Extra large size drawer content.</p>
    </drawer>
  \`,
})
export class DrawerSizesComponent {
  visibleDefault = false;
  visibleSm = false;
  visibleLg = false;
  visibleXlg = false;
}
        `,
      },
    },
  },
};
