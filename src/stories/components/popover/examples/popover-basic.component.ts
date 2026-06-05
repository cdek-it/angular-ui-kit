import { Component, ViewChild } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraPopoverComponent } from '../../../../lib/components/popover/popover.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="min-h-[200px]">
  <div class="relative inline-block">
    <extra-button label="Показать" (click)="popover.toggle($event)"></extra-button>
    <extra-popover #popover appendTo="self">
      <p>Содержимое popover.</p>
    </extra-popover>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-popover-basic',
  standalone: true,
  imports: [ExtraPopoverComponent, ExtraButtonComponent],
  template,
  styles,
})
export class PopoverBasicComponent {
  @ViewChild('popover') popover!: ExtraPopoverComponent;
}

export const Basic: StoryObj = {
  render: () => ({
    template: `<app-popover-basic></app-popover-basic>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Базовый popover с текстовым содержимым.' },
      source: {
        language: 'ts',
        code: `
import { Component, ViewChild } from '@angular/core';
import { ExtraPopoverComponent } from '@cdek-it/angular-ui-kit';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-popover-basic',
  standalone: true,
  imports: [ExtraPopoverComponent, ExtraButtonComponent],
  template: \`
    <extra-button label="Показать" (click)="popover.toggle($event)"></extra-button>
    <extra-popover #popover appendTo="self">
      <p>Содержимое popover.</p>
    </extra-popover>
  \`,
})
export class PopoverBasicComponent {
  @ViewChild('popover') popover!: ExtraPopoverComponent;
}
        `,
      },
    },
  },
};
