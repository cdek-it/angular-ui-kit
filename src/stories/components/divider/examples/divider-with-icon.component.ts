import { Component, ChangeDetectionStrategy} from '@angular/core';
import { DividerComponent } from '../../../../lib/components/divider/divider.component';
import { Component } from '@angular/core';
import { ExtraDividerComponent } from '../../../../lib/components/divider/divider.component';

const template = `
<div class="bg-surface-ground">
  <extra-divider align="center">
    <i class="ti ti-map-pin"></i>
  </extra-divider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-divider-with-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDividerComponent],
  template,
  styles,
})
export class DividerWithIconComponent {}

export const WithIcon = {
  render: () => ({
    template: `<app-divider-with-icon></app-divider-with-icon>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Разделитель с иконкой.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDividerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-divider-with-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDividerComponent],
  template: \`
    <extra-divider align="center">
      <i class="ti ti-map-pin"></i>
    </extra-divider>
  \`,
})
export class DividerWithIconComponent {}
        `,
      },
    },
  },
};
