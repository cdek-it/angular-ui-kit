import { Component } from '@angular/core';
import { DividerComponent } from '../../../../lib/components/divider/divider.component';

const template = `
<div class="bg-surface-ground">
  <divider align="center">
    <i class="ti ti-map-pin"></i>
  </divider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-divider-with-icon',
  standalone: true,
  imports: [DividerComponent],
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
import { DividerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-divider-with-icon',
  standalone: true,
  imports: [DividerComponent],
  template: \`
    <divider align="center">
      <i class="ti ti-map-pin"></i>
    </divider>
  \`,
})
export class DividerWithIconComponent {}
        `,
      },
    },
  },
};
