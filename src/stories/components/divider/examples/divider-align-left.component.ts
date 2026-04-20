import { Component, ChangeDetectionStrategy} from '@angular/core';
import { DividerComponent } from '../../../../lib/components/divider/divider.component';

const template = `
<div class="bg-surface-ground">
  <divider align="left">
    <span>Отправитель</span>
  </divider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-divider-align-left',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DividerComponent],
  template,
  styles,
})
export class DividerAlignLeftComponent {}

export const AlignLeft = {
  render: () => ({
    template: `<app-divider-align-left></app-divider-align-left>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Контент разделителя выровнен по левому краю.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { DividerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-divider-align-left',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DividerComponent],
  template: \`
    <divider align="left">
      <span>Отправитель</span>
    </divider>
  \`,
})
export class DividerAlignLeftComponent {}
        `,
      },
    },
  },
};
