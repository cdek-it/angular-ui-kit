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
  selector: 'app-divider-align-left',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDividerComponent],
  template,
  styles
})
export class DividerAlignLeftComponent {
  @Input() layout: ExtraDividerLayout = 'horizontal';
  @Input() type: ExtraDividerType = 'solid';
  @Input() align: ExtraDividerAlign = 'left';
  @Input() content = 'Отправитель';
}

export const AlignLeft = {
  render: (args: Record<string, unknown>) => {
    const layout = (args['layout'] as ExtraDividerLayout) ?? 'horizontal';
    const align = (layout === 'vertical' ? args['verticalAlign'] : args['horizontalAlign']) as ExtraDividerAlign;

    return {
      props: { ...args, layout, align },
      template: `<app-divider-align-left
  [layout]="layout"
  [type]="type"
  [align]="align"
  [content]="content"
></app-divider-align-left>`
    };
  },
  args: {
    layout: 'horizontal' as const,
    type: 'solid' as const,
    horizontalAlign: 'left',
    verticalAlign: 'top',
    content: 'Отправитель'
  },
  parameters: {
    docs: {
      description: { story: 'Контент разделителя выровнен по левому краю.' },
      source: {
        language: 'ts',
        code: `
import { ExtraDividerComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-divider-align-left',
  standalone: true,
  imports: [ExtraDividerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-divider align="left">
      <span>Отправитель</span>
    </extra-divider>
  \`,
})
export class DividerAlignLeftComponent {}
        `
      }
    }
  }
};
