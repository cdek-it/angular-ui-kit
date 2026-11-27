import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogSize } from '../../../../lib/components/dialog/dialog.component';

const template = `
<div class="p-4">
  <extra-button (click)="visible = true" label="Открыть окно"></extra-button>

  <extra-dialog
    [header]="header"
    [visible]="visible"
    (visibleChange)="onVisibleChange($event)"
    [showOverlay]="showOverlay"
    [showMaximize]="showMaximize"
    [showClose]="showClose"
    [size]="size"
    [dismissableMask]="dismissableMask"
    [closeOnEscape]="closeOnEscape"
    [focusOnShow]="focusOnShow"
    [appendTo]="appendTo"
    (onShow)="log('onShow')"
    (onHide)="log('onHide')"
    (onMaximize)="log('onMaximize')"
  >
    <p>Проверка свойств Dialog.</p>
  </extra-dialog>

  <div class="mt-3 text-sm">Лог: {{ logEntries().length ? logEntries().join(' → ') : '—' }}</div>
</div>
`;

@Component({
  selector: 'app-dialog-properties',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraButtonComponent],
  template
})
export class DialogPropertiesComponent {
  @Input() header = 'Свойства Dialog';
  @Input() visible = false;
  @Input() showOverlay = true;
  @Input() showMaximize = false;
  @Input() showClose = true;
  @Input() size: ExtraDialogSize = 'default';
  @Input() dismissableMask = false;
  @Input() closeOnEscape = true;
  @Input() focusOnShow = false;
  @Input() appendTo = 'body';

  logEntries = signal<string[]>([]);

  onVisibleChange(value: boolean): void {
    this.visible = value;
    this.log(`visibleChange:${value}`);
  }

  log(entry: string): void {
    this.logEntries.update((entries) => [...entries, entry]);
  }
}

export const Properties: StoryObj = {
  args: {
    header: 'Свойства Dialog',
    showOverlay: true,
    showMaximize: false,
    showClose: true,
    size: 'default',
    dismissableMask: false,
    closeOnEscape: true,
    focusOnShow: false,
    appendTo: 'body',
    visible: false
  },
  render: (args) => ({
    props: args,
    template: `<app-dialog-properties
  [header]="header"
  [visible]="visible"
  [showOverlay]="showOverlay"
  [showMaximize]="showMaximize"
  [showClose]="showClose"
  [size]="size"
  [dismissableMask]="dismissableMask"
  [closeOnEscape]="closeOnEscape"
  [focusOnShow]="focusOnShow"
  [appendTo]="appendTo"
></app-dialog-properties>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Все входы Dialog: showOverlay, showMaximize, showClose, header, size, dismissableMask, closeOnEscape, focusOnShow, appendTo, visible.'
      }
    }
  }
};
