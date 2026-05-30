import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraDrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex flex-wrap gap-3">
  <extra-button label="Default" (click)="visibleDefault = true"></extra-button>
  <extra-button label="Small" (click)="visibleSm = true"></extra-button>
  <extra-button label="Large" (click)="visibleLg = true"></extra-button>
  <extra-button label="Extra Large" (click)="visibleXlg = true"></extra-button>
</div>

<extra-drawer [(visible)]="visibleDefault" header="Default">
  <p>Default size drawer content.</p>
</extra-drawer>

<extra-drawer [(visible)]="visibleSm" header="Small" size="sm">
  <p>Small size drawer content.</p>
</extra-drawer>

<extra-drawer [(visible)]="visibleLg" header="Large" size="lg">
  <p>Large size drawer content.</p>
</extra-drawer>

<extra-drawer [(visible)]="visibleXlg" header="Extra Large" size="xlg">
  <p>Extra large size drawer content.</p>
</extra-drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-sizes',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
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
import { ExtraDrawerComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-sizes',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template: \`
    <div class="flex flex-wrap gap-3">
      <extra-button label="Default" (click)="visibleDefault = true"></extra-button>
      <extra-button label="Small" (click)="visibleSm = true"></extra-button>
      <extra-button label="Large" (click)="visibleLg = true"></extra-button>
      <extra-button label="Extra Large" (click)="visibleXlg = true"></extra-button>
    </div>

    <extra-drawer [(visible)]="visibleDefault" header="Default">
      <p>Default size drawer content.</p>
    </extra-drawer>

    <extra-drawer [(visible)]="visibleSm" header="Small" size="sm">
      <p>Small size drawer content.</p>
    </extra-drawer>

    <extra-drawer [(visible)]="visibleLg" header="Large" size="lg">
      <p>Large size drawer content.</p>
    </extra-drawer>

    <extra-drawer [(visible)]="visibleXlg" header="Extra Large" size="xlg">
      <p>Extra large size drawer content.</p>
    </extra-drawer>
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
