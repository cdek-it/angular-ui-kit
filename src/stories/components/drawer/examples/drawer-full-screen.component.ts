import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { DrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<button label="Full Screen" (click)="visible = true"></button>

<drawer [(visible)]="visible" header="Full Screen" [fullScreen]="true">
  <p>Full screen drawer content.</p>
</drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-full-screen',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
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
import { DrawerComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-full-screen',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
  template: \`
    <button label="Full Screen" (click)="visible = true"></button>

    <drawer [(visible)]="visible" header="Full Screen" [fullScreen]="true">
      <p>Full screen drawer content.</p>
    </drawer>
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
