import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { DrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<button label="Without Modal" (click)="visible = true"></button>

<drawer [(visible)]="visible" header="Without Modal" [modal]="false">
  <p>Drawer without backdrop overlay.</p>
</drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-without-modal',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
  template,
  styles,
})
export class DrawerWithoutModalComponent {
  visible = false;
}

export const WithoutModal: StoryObj = {
  render: () => ({
    template: `<app-drawer-without-modal></app-drawer-without-modal>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Drawer без модального оверлея.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { DrawerComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-without-modal',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
  template: \`
    <button label="Without Modal" (click)="visible = true"></button>

    <drawer [(visible)]="visible" header="Without Modal" [modal]="false">
      <p>Drawer without backdrop overlay.</p>
    </drawer>
  \`,
})
export class DrawerWithoutModalComponent {
  visible = false;
}
        `,
      },
    },
  },
};
