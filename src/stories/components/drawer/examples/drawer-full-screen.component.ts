import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraDrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<extra-button label="Full Screen" (click)="visible = true"></extra-button>

<extra-drawer [(visible)]="visible" header="Full Screen" [fullScreen]="true">
  <p>Full screen drawer content.</p>
</extra-drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-full-screen',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template,
  styles,
})
export class DrawerFullScreenComponent {
  visible = false;
}

export const FullScreen: StoryObj = {
  render: () => ({
    template: `<app-drawer-full-screen></app-drawer-full-screen>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Drawer в полноэкранном режиме.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDrawerComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-full-screen',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template: \`
    <extra-button label="Full Screen" (click)="visible = true"></extra-button>

    <extra-drawer [(visible)]="visible" header="Full Screen" [fullScreen]="true">
      <p>Full screen drawer content.</p>
    </extra-drawer>
  \`,
})
export class DrawerFullScreenComponent {
  visible = false;
}
        `,
      },
    },
  },
};
