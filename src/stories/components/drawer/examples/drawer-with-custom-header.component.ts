import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraDrawerComponent } from '../../../../lib/components/drawer/drawer.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<extra-button label="Open Drawer" (click)="visible = true"></extra-button>

<extra-drawer [(visible)]="visible">
  <ng-template #drawerHeader>
    <div class="flex items-center justify-between w-full">
      <span class="text-xl font-semibold text-primary">Custom Header</span>
      <extra-button icon="ti ti-arrow-right" [iconOnly]="true" variant="text" (click)="visible = false"></extra-button>
    </div>
  </ng-template>

  <p>Drawer content with a custom header template.</p>
</extra-drawer>
`;
const styles = '';

@Component({
  selector: 'app-drawer-with-custom-header',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template,
  styles
})
export class DrawerWithCustomHeaderComponent {
  visible = false;
}

export const WithCustomHeader: StoryObj = {
  render: () => ({
    template: `<app-drawer-with-custom-header></app-drawer-with-custom-header>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Drawer с кастомным заголовком через ng-template #drawerHeader.' },
      source: {
        language: 'ts',
        code: `
import { ExtraDrawerComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-drawer-with-custom-header',
  standalone: true,
  imports: [ExtraDrawerComponent, ExtraButtonComponent],
  template: \`
    <extra-button label="Open Drawer" (click)="visible = true"></extra-button>

    <extra-drawer [(visible)]="visible">
      <ng-template #drawerHeader>
        <div class="flex items-center justify-between w-full">
          <span class="text-xl font-semibold text-primary">Custom Header</span>
          <extra-button icon="ti ti-arrow-right" [iconOnly]="true" variant="text" (click)="visible = false"></extra-button>
        </div>
      </ng-template>

      <p>Drawer content with a custom header template.</p>
    </extra-drawer>
  \`,
})
export class DrawerWithCustomHeaderComponent {
  visible = false;
}
        `
      }
    }
  }
};
