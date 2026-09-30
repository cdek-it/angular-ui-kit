import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ExtraDividerAlign,
  ExtraDividerComponent,
  ExtraDividerLayout,
  ExtraDividerType
} from '../../../../lib/components/divider/divider.component';

/* Вертикальному разделителю нужна высота от родителя: без неё он ровно по контенту,
   и выравнивать внутри нечего — top, center и bottom дают одно и то же. */
const template = `
<div [class]="layout === 'vertical' ? 'flex h-40' : ''">
  <extra-divider [layout]="layout" [type]="type" [align]="align">
    <span>{{ content }}</span>
  </extra-divider>
</div>
`;
const styles = '';

@Component({
  selector: 'app-divider-with-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDividerComponent],
  template,
  styles
})
export class DividerWithContentComponent {
  @Input() layout: ExtraDividerLayout = 'horizontal';
  @Input() type: ExtraDividerType = 'solid';
  @Input() align: ExtraDividerAlign = 'center';
  @Input() content = 'Москва → Новосибирск';
}

export const WithContent = {
  render: (args: Record<string, unknown>) => {
    const layout = (args['layout'] as ExtraDividerLayout) ?? 'horizontal';
    const align = (layout === 'vertical' ? args['verticalAlign'] : args['horizontalAlign']) as ExtraDividerAlign;

    return {
      props: { ...args, layout, align },
      template: `<app-divider-with-content
  [layout]="layout"
  [type]="type"
  [align]="align"
  [content]="content"
></app-divider-with-content>`
    };
  },
  args: {
    layout: 'horizontal' as const,
    type: 'solid' as const,
    horizontalAlign: 'center',
    verticalAlign: 'center',
    content: 'Москва → Новосибирск'
  },
  parameters: {
    docs: {
      description: { story: 'Разделитель с текстовым контентом по центру.' },
      source: {
        language: 'ts',
        code: `
import { ExtraDividerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-divider-with-content',
  standalone: true,
  imports: [ExtraDividerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-divider align="center">
      <span>Москва → Новосибирск</span>
    </extra-divider>
  \`,
})
export class DividerWithContentComponent {}
        `
      }
    }
  }
};
