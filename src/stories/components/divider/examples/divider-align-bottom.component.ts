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
  selector: 'app-divider-align-bottom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDividerComponent],
  template,
  styles
})
export class DividerAlignBottomComponent {
  @Input() layout: ExtraDividerLayout = 'vertical';
  @Input() type: ExtraDividerType = 'solid';
  @Input() align: ExtraDividerAlign = 'bottom';
  @Input() content = 'Отправитель';
}

export const AlignBottom = {
  render: (args: Record<string, unknown>) => {
    const layout = (args['layout'] as ExtraDividerLayout) ?? 'vertical';
    const align = (layout === 'vertical' ? args['verticalAlign'] : args['horizontalAlign']) as ExtraDividerAlign;

    return {
      props: { ...args, layout, align },
      template: `<app-divider-align-bottom
  [layout]="layout"
  [type]="type"
  [align]="align"
  [content]="content"
></app-divider-align-bottom>`
    };
  },
  args: {
    layout: 'vertical' as const,
    type: 'solid' as const,
    horizontalAlign: 'center',
    verticalAlign: 'bottom',
    content: 'Отправитель'
  },
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
