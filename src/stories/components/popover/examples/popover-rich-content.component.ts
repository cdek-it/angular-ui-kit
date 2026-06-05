import { Component, ViewChild } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraPopoverComponent } from '../../../../lib/components/popover/popover.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="min-h-[250px]">
  <div class="relative inline-block">
    <extra-button label="Показать" (click)="popover.toggle($event)"></extra-button>
    <extra-popover #popover appendTo="self">
      <div class="flex flex-col gap-2">
        <span class="font-semibold">Заголовок</span>
        <p class="text-sm text-color-secondary">Дополнительное описание или любой произвольный контент внутри popover.</p>
      </div>
    </extra-popover>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-popover-rich-content',
  standalone: true,
  imports: [ExtraPopoverComponent, ExtraButtonComponent],
  template,
  styles,
})
export class PopoverRichContentComponent {
  @ViewChild('popover') popover!: ExtraPopoverComponent;
}

export const RichContent: StoryObj = {
  render: () => ({
    template: `<app-popover-rich-content></app-popover-rich-content>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Popover с расширенным содержимым: заголовок и описание.' },
      source: {
        language: 'ts',
        code: `
import { Component, ViewChild } from '@angular/core';
import { ExtraPopoverComponent } from '@cdek-it/angular-ui-kit';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-popover-rich-content',
  standalone: true,
  imports: [ExtraPopoverComponent, ExtraButtonComponent],
  template: \`
    <extra-button label="Показать" (click)="popover.toggle($event)"></extra-button>
    <extra-popover #popover appendTo="self">
      <div class="flex flex-col gap-2">
        <span class="font-semibold">Заголовок</span>
        <p class="text-sm text-color-secondary">Дополнительное описание или любой произвольный контент внутри popover.</p>
      </div>
    </extra-popover>
  \`,
})
export class PopoverRichContentComponent {
  @ViewChild('popover') popover!: ExtraPopoverComponent;
}
        `,
      },
    },
  },
};
