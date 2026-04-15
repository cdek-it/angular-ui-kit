import { Component, ViewChild } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { PopoverComponent } from '../../../../lib/components/popover/popover.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex justify-center min-h-[250px] pt-8">
  <button label="Открыть" (click)="popover.toggle($event)"></button>
  <popover #popover>
    <div class="flex flex-col gap-2">
      <span class="font-semibold">Заголовок</span>
      <p class="text-sm text-color-secondary">Дополнительное описание или любой произвольный контент внутри popover.</p>
    </div>
  </popover>
</div>
`;
const styles = '';

@Component({
  selector: 'app-popover-rich-content',
  standalone: true,
  imports: [PopoverComponent, ButtonComponent],
  template,
  styles,
})
export class PopoverRichContentComponent {
  @ViewChild('popover') popover!: PopoverComponent;
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
import { PopoverComponent } from '@cdek-it/angular-ui-kit';
import { ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-popover-rich-content',
  standalone: true,
  imports: [PopoverComponent, ButtonComponent],
  template: \`
    <button label="Открыть" (click)="popover.toggle($event)"></button>
    <popover #popover>
      <div class="flex flex-col gap-2">
        <span class="font-semibold">Заголовок</span>
        <p class="text-sm text-color-secondary">Дополнительное описание или любой произвольный контент внутри popover.</p>
      </div>
    </popover>
  \`,
})
export class PopoverRichContentComponent {
  @ViewChild('popover') popover!: PopoverComponent;
}
        `,
      },
    },
  },
};
