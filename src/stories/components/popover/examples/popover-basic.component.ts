import { Component, ViewChild } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { PopoverComponent } from '../../../../lib/components/popover/popover.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="min-h-[200px]">
  <div class="relative inline-block">
    <button label="Показать" (click)="popover.toggle($event)"></button>
    <popover #popover appendTo="self">
      <p>Содержимое popover.</p>
    </popover>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-popover-basic',
  standalone: true,
  imports: [PopoverComponent, ButtonComponent],
  template,
  styles,
})
export class PopoverBasicComponent {
  @ViewChild('popover') popover!: PopoverComponent;
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
import { PopoverComponent } from '@cdek-it/angular-ui-kit';
import { ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-popover-basic',
  standalone: true,
  imports: [PopoverComponent, ButtonComponent],
  template: \`
    <button label="Показать" (click)="popover.toggle($event)"></button>
    <popover #popover appendTo="self">
      <p>Содержимое popover.</p>
    </popover>
  \`,
})
export class PopoverBasicComponent {
  @ViewChild('popover') popover!: PopoverComponent;
}
        `,
      },
    },
  },
};
