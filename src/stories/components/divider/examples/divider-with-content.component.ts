import { Component } from '@angular/core';
import { ExtraDividerComponent } from '../../../../lib/components/divider/divider.component';

const template = `
<div class="bg-surface-ground">
  <extra-divider align="center">
    <span>Москва → Новосибирск</span>
  </extra-divider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-divider-with-content',
  standalone: true,
  imports: [ExtraDividerComponent],
  template,
  styles,
})
export class DividerWithContentComponent {}

export const WithContent = {
  render: () => ({
    template: `<app-divider-with-content></app-divider-with-content>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Разделитель с текстовым контентом по центру.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDividerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-divider-with-content',
  standalone: true,
  imports: [ExtraDividerComponent],
  template: \`
    <extra-divider align="center">
      <span>Москва → Новосибирск</span>
    </extra-divider>
  \`,
})
export class DividerWithContentComponent {}
        `,
      },
    },
  },
};
