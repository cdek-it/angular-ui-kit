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
    <i [class]="icon"></i>
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
  styles
})
export class DividerWithIconComponent {
  @Input() layout: ExtraDividerLayout = 'horizontal';
  @Input() type: ExtraDividerType = 'solid';
  @Input() align: ExtraDividerAlign = 'center';
  @Input() icon = 'ti ti-map-pin';
}

export const WithIcon = {
  render: (args: Record<string, unknown>) => {
    const layout = (args['layout'] as ExtraDividerLayout) ?? 'horizontal';
    const align = (layout === 'vertical' ? args['verticalAlign'] : args['horizontalAlign']) as ExtraDividerAlign;

    return {
      props: { ...args, layout, align },
      template: `<app-divider-with-icon
  [layout]="layout"
  [type]="type"
  [align]="align"
  [icon]="icon"
></app-divider-with-icon>`
    };
  },
  args: {
    layout: 'horizontal' as const,
    type: 'solid' as const,
    horizontalAlign: 'center',
    verticalAlign: 'center',
    icon: 'ti ti-map-pin'
  },
  argTypes: {
    content: { table: { disable: true } },
    icon: {
      control: 'text',
      description: 'Класс иконки tabler icon',
      table: {
        category: 'Слоты',
        type: { summary: 'string' }
      }
    }
  },
  parameters: {
    docs: {
      description: { story: 'Разделитель с иконкой.' },
      source: {
        language: 'ts',
        code: `
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
        `
      }
    }
  }
};
