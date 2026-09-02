import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraDividerComponent } from '../../../../lib/components/divider/divider.component';

const template = `
<div class="flex h-40">
  <extra-divider layout="vertical" align="bottom">
    <span>Отправитель</span>
  </extra-divider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-divider-align-bottom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDividerComponent],
  template,
  styles
})
export class DividerAlignBottomComponent {}

export const AlignBottom = {
  render: () => ({
    template: `<app-divider-align-bottom></app-divider-align-bottom>`
  }),
  parameters: {
    docs: {
      description: { story: 'Контент вертикального разделителя выровнен по нижнему краю.' },
      source: {
        language: 'ts',
        code: `
import { ExtraDividerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-divider-align-bottom',
  standalone: true,
  imports: [ExtraDividerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-divider layout="vertical" align="bottom">
      <span>Отправитель</span>
    </extra-divider>
  \`,
})
export class DividerAlignBottomComponent {}
        `
      }
    }
  }
};
