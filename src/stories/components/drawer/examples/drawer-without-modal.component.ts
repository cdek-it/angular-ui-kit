import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraDrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<extra-button label="Without Modal" (click)="visible = true"></extra-button>

<extra-drawer [(visible)]="visible" header="Without Modal" [modal]="false">
  <p>Drawer without backdrop overlay.</p>
</extra-drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-without-modal',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
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
import { ExtraDrawerComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-without-modal',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template: \`
    <extra-button label="Without Modal" (click)="visible = true"></extra-button>

    <extra-drawer [(visible)]="visible" header="Without Modal" [modal]="false">
      <p>Drawer without backdrop overlay.</p>
    </extra-drawer>
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
