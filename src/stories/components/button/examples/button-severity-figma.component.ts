import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

/**
 * Зеркало страницы Figma «Severity 🔵» (UI Kit (DS) v2.1, node 24646:65002):
 * секция 📱Severity → light-theme, компонент-сеты <Button.Danger>/<Button.Warning>/<Button.Success>/<Button.Info>.
 * Матрица как в макете: колонки Basic / Outlined / Text × ряды Default / Disabled / Loading;
 * в ячейке — size (small/base/large/xlarge) × rounded (false/true) × icon (plain/prefix/postfix/icon-only).
 */

const ICON = 'ti ti-file-alert';

const template = `
<div class="flex flex-col gap-8">
  @for (sev of severities; track sev.value) {
    <section class="flex flex-col gap-3">
      <h3 class="text-lg font-semibold">{{ sev.label }}</h3>
      <div class="sf-matrix">
        <div class="sf-corner"></div>
        @for (variant of variants; track variant.value) {
          <div class="sf-col-head">{{ variant.label }}</div>
        }
        @for (state of states; track state.value) {
          <div class="sf-row-head">{{ state.label }}</div>
          @for (variant of variants; track variant.value) {
            <div class="sf-cell">
              @for (size of sizes; track size) {
                <div class="flex gap-2 items-center flex-wrap">
                  @for (cfg of iconConfigs; track cfg.position ?? 'none') {
                    @for (isRounded of roundedVals; track $index) {
                      <extra-button
                        [label]="sev.label"
                        [severity]="sev.value"
                        [variant]="variant.value"
                        [size]="size"
                        [rounded]="isRounded"
                        [icon]="cfg.hasIcon ? icon : ''"
                        [iconPosition]="cfg.position"
                        [iconOnly]="cfg.iconOnly"
                        [ariaLabel]="cfg.iconOnly ? sev.label : undefined"
                        [disabled]="state.value === 'disabled'"
                        [loading]="state.value === 'loading'">
                      </extra-button>
                    }
                  }
                </div>
              }
            </div>
          }
        }
      </div>
    </section>
  }
</div>
`;

// Раскладка матрицы severity.
const stateStyles = `
.sf-matrix {
  display: grid;
  grid-template-columns: minmax(7rem, auto) repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  align-items: start;
}
.sf-col-head, .sf-row-head { font-weight: 600; font-size: 0.875rem; }
.sf-row-head { padding-top: 0.375rem; }
.sf-cell { display: flex; flex-direction: column; gap: 0.5rem; }
`;

@Component({
  selector: 'app-button-severity-figma',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ExtraButtonComponent],
  template,
  styles: stateStyles
})
export class ButtonSeverityFigmaComponent {
  readonly icon = ICON;
  readonly severities = [
    { label: 'Danger', value: 'danger' },
    { label: 'Warning', value: 'warning' },
    { label: 'Success', value: 'success' },
    { label: 'Info', value: 'info' }
  ] as const;
  readonly variants = [
    { label: 'Basic', value: 'primary' },
    { label: 'Outlined', value: 'tertiary' },
    { label: 'Text', value: 'text' }
  ] as const;
  readonly states = [
    { label: 'Default', value: 'default' },
    { label: 'Disabled', value: 'disabled' },
    { label: 'Loading', value: 'loading' }
  ] as const;
  readonly sizes = ['small', 'base', 'large', 'xlarge'] as const;
  readonly roundedVals = [false, true];
  readonly iconConfigs = [
    { position: null, iconOnly: false, hasIcon: false },
    { position: 'prefix', iconOnly: false, hasIcon: true },
    { position: 'postfix', iconOnly: false, hasIcon: true },
    { position: null, iconOnly: true, hasIcon: true }
  ] as const;
}

export const SeverityFigma: StoryObj = {
  name: 'Severity (Figma)',
  render: () => ({
    template: `<app-button-severity-figma></app-button-severity-figma>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Зеркало страницы Figma «Severity 🔵» (UI Kit (DS) v2.1, node-id=24646:65002): матрица Basic / Outlined / Text × Default / Disabled / Loading для Button.Danger / Warning / Success / Info. В каждой ячейке — size (small / base / large / xlarge) × rounded × icon (plain / prefix / postfix / icon-only). Отрисовано как есть из базы кода, без подложек.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-severity-figma',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <!-- Danger / Warning / Success / Info × basic / outlined / text ×
         default / disabled / loading ×
         small / base / large / xlarge × rounded × icon -->
    <extra-button label="Danger" severity="danger"></extra-button>
    <extra-button label="Danger" severity="danger" variant="tertiary"></extra-button>
    <extra-button label="Danger" severity="danger" variant="text"></extra-button>
  \`
})
export class ButtonSeverityFigmaComponent {}
        `
      }
    }
  }
};
