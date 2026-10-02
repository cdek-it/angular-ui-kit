import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

/**
 * Схема соответствия вариантов кнопок Figma ↔ код (UI Kit (DS) v2.1, node-id=484:6197).
 * Слева — вариант из Figma (страница Buttons: primary / secondary / tertiary / text / link;
 * страница Severity: outlined × severity), справа — реальный инстанс extra-button,
 * отрисованный тем же PrimeNG v20, что и в проде. По одному инстансу на вариант.
 */

const template = `
<div class="fm-root">
  <div class="fm-head fm-grid">
    <div>Figma variant</div>
    <div>extra-button instance</div>
    <div>PrimeNG v20 props</div>
  </div>
  @for (row of rows; track row.figma) {
    <div class="fm-grid" [class.fm-broken]="row.broken">
      <div class="fm-figma">
        <span class="fm-page">{{ row.page }}</span>
        <span class="fm-variant">{{ row.figma }}</span>
      </div>
      <div class="fm-instance">
        <extra-button
          [label]="row.label"
          [variant]="row.variant"
          [severity]="row.severity">
        </extra-button>
      </div>
      <div class="fm-props"><code>{{ row.props }}</code></div>
    </div>
  }
</div>
`;

const stateStyles = `
.fm-root { display: flex; flex-direction: column; gap: 0.5rem; max-width: 56rem; }
.fm-grid {
  display: grid;
  grid-template-columns: 14rem 16rem 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
}
.fm-head { font-weight: 600; font-size: 0.875rem; opacity: 0.7; }
.fm-figma { display: flex; flex-direction: column; gap: 0.125rem; }
.fm-page { font-size: 0.75rem; opacity: 0.6; }
.fm-variant { font-weight: 600; font-size: 0.875rem; }
.fm-props code { font-size: 0.8125rem; }
.fm-broken { outline: 2px dashed #dc3009; outline-offset: 2px; }
`;

interface FigmaMappingRow {
  page: string;
  figma: string;
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'text' | 'link';
  severity: 'success' | 'warning' | 'danger' | 'info' | null;
  props: string;
  broken?: boolean;
}

@Component({
  selector: 'app-button-figma-mapping',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ExtraButtonComponent],
  template,
  styles: stateStyles
})
export class ButtonFigmaMappingComponent {
  // Расхождение tertiary → outlined исправлено: tertiary без severity теперь
  // уходит в severity=contrast (серая заливка), outlined остаётся только для
  // tertiary + severity (Figma Severity/variant=outlined).
  readonly rows: FigmaMappingRow[] = [
    {
      page: 'Buttons',
      figma: 'variant=primary',
      label: 'Primary',
      variant: 'primary',
      severity: null,
      props: 'p-button label'
    },
    {
      page: 'Buttons',
      figma: 'variant=secondary',
      label: 'Secondary',
      variant: 'secondary',
      severity: null,
      props: 'p-button severity="secondary"'
    },
    {
      page: 'Buttons',
      figma: 'variant=tertiary (gray)',
      label: 'Tertiary',
      variant: 'tertiary',
      severity: null,
      props: 'p-button severity="contrast"'
    },
    {
      page: 'Buttons',
      figma: 'variant=text',
      label: 'Text',
      variant: 'text',
      severity: null,
      props: 'p-button variant="text"'
    },
    {
      page: 'Buttons',
      figma: 'variant=link',
      label: 'Link',
      variant: 'link',
      severity: null,
      props: 'p-button link'
    },
    {
      page: 'Severity',
      figma: 'variant=outlined severity=danger',
      label: 'Danger',
      variant: 'tertiary',
      severity: 'danger',
      props: 'p-button variant="outlined" severity="danger"'
    }
  ];
}

export const FigmaMapping: StoryObj = {
  name: 'Figma mapping',
  render: () => ({
    template: `<app-button-figma-mapping></app-button-figma-mapping>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Схема соответствия вариантов кнопок Figma (UI Kit (DS) v2.1, node-id=484:6197) и инстансов extra-button на PrimeNG v20. По одному инстансу на вариант. Красной пунктирной рамкой отмечено расхождение: Figma tertiary (серая заливка) сейчас рендерится как outlined.'
      }
    }
  }
};
