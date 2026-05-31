import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraDrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<extra-button label="Open Drawer" (click)="visible = true"></extra-button>

<extra-drawer [(visible)]="visible" header="With Footer">
  <p>Drawer content with footer actions.</p>

  <ng-template #drawerFooter>
    <div class="flex justify-end gap-3">
      <extra-button label="Cancel" variant="outlined" (click)="visible = false"></extra-button>
      <extra-button label="Save" (click)="visible = false"></extra-button>
    </div>
  </ng-template>
</extra-drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-with-footer',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template,
  styles,
})
export class DrawerWithFooterComponent {
  visible = false;
}

export const WithFooter: StoryObj = {
  render: () => ({
    template: `<app-drawer-with-footer></app-drawer-with-footer>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Drawer с футером, содержащим кнопки действий.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDrawerComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-with-footer',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template: \`
    <extra-button label="Open Drawer" (click)="visible = true"></extra-button>

    <extra-drawer [(visible)]="visible" header="With Footer">
      <p>Drawer content with footer actions.</p>

      <ng-template #drawerFooter>
        <div class="flex justify-end gap-3">
          <extra-button label="Cancel" variant="outlined" (click)="visible = false"></extra-button>
          <extra-button label="Save" (click)="visible = false"></extra-button>
        </div>
      </ng-template>
    </extra-drawer>
  \`,
})
export class DrawerWithFooterComponent {
  visible = false;
}
        `,
      },
    },
  },
};
