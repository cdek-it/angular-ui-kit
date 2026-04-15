import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { DrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<button label="Open Drawer" (click)="visible = true"></button>

<drawer [(visible)]="visible" header="With Footer">
  <p>Drawer content with footer actions.</p>

  <ng-template #drawerFooter>
    <div class="flex justify-end gap-3">
      <button label="Cancel" variant="outlined" (click)="visible = false"></button>
      <button label="Save" (click)="visible = false"></button>
    </div>
  </ng-template>
</drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-with-footer',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
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
import { DrawerComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-with-footer',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent],
  template: \`
    <button label="Open Drawer" (click)="visible = true"></button>

    <drawer [(visible)]="visible" header="With Footer">
      <p>Drawer content with footer actions.</p>

      <ng-template #drawerFooter>
        <div class="flex justify-end gap-3">
          <button label="Cancel" variant="outlined" (click)="visible = false"></button>
          <button label="Save" (click)="visible = false"></button>
        </div>
      </ng-template>
    </drawer>
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
