/**
 * Кастомная CSS-стилизация для компонента p-button.
 * Публикует extend-токены как CSS-переменные и применяет глобальные стили.
 * Подключается в components.ts: `import { buttonCss } from './components/button'`
 */
export const buttonCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Button extend: публикуем кастомные переменные в :root ─── */
  :root {
    --p-button-extend-disabled-background:           ${dt('button.extend.disabledBackground')};
    --p-button-extend-disabled-color:                ${dt('button.extend.disabledColor')};
    --p-button-extend-border-width:                  ${dt('button.extend.borderWidth')};
    --p-button-extend-icon-size-sm:                  ${dt('button.extend.iconSize.sm')};
    --p-button-extend-icon-size-md:                  ${dt('button.extend.iconSize.md')};
    --p-button-extend-icon-size-lg:                  ${dt('button.extend.iconSize.lg')};
    --p-button-extend-ext-link-padding-x:            ${dt('button.extend.extLink.paddingX')};
    --p-button-extend-ext-link-padding-y:            ${dt('button.extend.extLink.paddingY')};
    --p-button-extend-ext-link-color-hover:          ${dt('button.extend.extLink.colorHover')};
    --p-button-extend-ext-link-sm-icon-only-width:   ${dt('button.extend.extLink.sm.iconOnlyWidth')};
    --p-button-extend-ext-link-base-icon-only-width: ${dt('button.extend.extLink.base.iconOnlyWidth')};
    --p-button-extend-ext-link-lg-icon-only-width:   ${dt('button.extend.extLink.lg.iconOnlyWidth')};
    --p-button-extend-ext-link-xlg-icon-only-width:  ${dt('button.extend.extLink.xlg.iconOnlyWidth')};
    --p-button-extend-ext-sm-border-radius:          ${dt('button.extend.extSm.borderRadius')};
    --p-button-extend-ext-sm-gap:                    ${dt('button.extend.extSm.gap')};
    --p-button-extend-ext-lg-border-radius:          ${dt('button.extend.extLg.borderRadius')};
    --p-button-extend-ext-lg-gap:                    ${dt('button.extend.extLg.gap')};
    --p-button-extend-ext-lg-height:                 ${dt('button.extend.extLg.height')};
    --p-button-extend-ext-xlg-border-radius:         ${dt('button.extend.extXlg.borderRadius')};
    --p-button-extend-ext-xlg-gap:                   ${dt('button.extend.extXlg.gap')};
    --p-button-extend-ext-xlg-icon-only-width:       ${dt('button.extend.extXlg.iconOnlyWidth')};
    --p-button-extend-ext-xlg-padding-x:             ${dt('button.extend.extXlg.paddingX')};
    --p-button-extend-ext-xlg-padding-y:             ${dt('button.extend.extXlg.paddingY')};
    --p-button-extend-ext-xlg-height:                ${dt('button.extend.extXlg.height')};
  }

  /* ─── Шрифт для текста кнопки ─── */
  .p-button.p-component .p-button-label {
    font-family: var(--p-fonts-font-family-heading, 'TT Fellows', sans-serif);
  }

  /* ─── Button badge ─── */
  .p-button, .p-ripple.p-button {
    position: relative;
    overflow: visible;
  }

  .p-button .p-badge {
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      transform: translate(50%, -50%);
      transform-origin: 100% 0;
      margin: 0;
  }

  /* ─── Размеры иконок ─── */
  .p-button .p-button-icon {
    font-size: var(--p-button-extend-icon-size-md);
  }
  .p-button.p-button-sm .p-button-icon {
    font-size: var(--p-button-extend-icon-size-sm);
  }
  .p-button.p-button-lg .p-button-icon {
    font-size: var(--p-button-extend-icon-size-lg);
  }
  .p-button-xlg.p-button .p-button-icon,
  .p-button-link.p-button-xlg .p-button-icon {
    font-size: var(--p-button-extend-icon-size-lg);
  }

  /* ─── Disabled / loading ─── */
  .p-button:is(.p-disabled, :disabled, .p-button-loading) {
    mix-blend-mode: inherit;
    opacity: var(--p-opacity-1000);
    color: var(--p-button-extend-disabled-color);
    background: var(--p-button-extend-disabled-background);
    border-color: var(--p-button-extend-disabled-background);
  }
  .p-button.p-button-outlined:is(.p-disabled, :disabled, .p-button-loading) {
    color: var(--p-button-extend-disabled-color);
    background: transparent;
    border-color: transparent;
  }
  .p-button.p-button-text:is(.p-disabled, :disabled, .p-button-loading) {
    color: var(--p-button-extend-disabled-color);
    background: transparent;
    border-color: transparent;
  }
  .p-button.p-button-link:is(.p-disabled, :disabled, .p-button-loading) {
    color: var(--p-button-extend-disabled-color);
    background: transparent;
    border-color: transparent;
  }

  /* ─── Link кнопки ─── */
  .p-button-link.p-button:is(.p-button, .p-button-xlg) {
    padding: var(--p-button-extend-ext-link-padding-y) var(--p-button-extend-ext-link-padding-x);
  }
  .p-button-link.p-button {
    width: min-content;
  }
  .p-button-link.p-button.p-button-xlg {
    font-size: var(--p-fonts-font-size-600);
  }
  .p-button.p-button-link:not(:disabled):hover {
    color: var(--p-button-extend-ext-link-color-hover);
  }
  .p-button.p-button-link:not(:disabled):hover .p-button-label {
    text-decoration: none;
  }

  /* ─── Icon-only link кнопки ─── */
  .p-button-link.p-button-icon-only {
    width: var(--p-button-extend-ext-link-base-icon-only-width);
    height: var(--p-button-extend-ext-link-base-icon-only-width);
  }
  .p-button-link.p-button-icon-only.p-button-sm {
    width: var(--p-button-extend-ext-link-sm-icon-only-width);
    height: var(--p-button-extend-ext-link-sm-icon-only-width);
  }
  .p-button-link.p-button-icon-only.p-button-lg {
    width: var(--p-button-extend-ext-link-lg-icon-only-width);
    height: var(--p-button-extend-ext-link-lg-icon-only-width);
  }

  /* ─── Line-height ─── */
  .p-button-sm {
    line-height: var(--p-fonts-line-height-250);
  }
  .p-button:is(.p-button-lg, .p-button-xlg) {
    line-height: var(--p-fonts-line-height-550);
  }

  /* ─── Border-radius для lg / xlg ─── */
  .p-button:is(.p-button-lg, .p-button-xlg):not(.p-button-rounded) {
    border-radius: var(--p-button-extend-ext-lg-border-radius);
  }
  .p-button-xlg.p-button:not(.p-button-rounded) {
    border-radius: var(--p-button-extend-ext-xlg-border-radius);
  }

  /* ─── Padding / font-size / height для lg ─── */
  .p-button-lg.p-button:not(.p-button-icon-only):not(.p-button-link) {
    padding: var(--p-button-lg-padding-y) var(--p-button-lg-padding-x);
    font-size: var(--p-button-lg-font-size);
    height: var(--p-controls-icon-only-850);
  }

  /* ─── Padding / font-size / height для xlg ─── */
  .p-button-xlg.p-button:not(.p-button-icon-only):not(.p-button-link) {
    padding: var(--p-button-extend-ext-xlg-padding-y) var(--p-button-extend-ext-xlg-padding-x);
    font-size: var(--p-fonts-font-size-500);
    height: var(--p-controls-icon-only-900);
  }

  /* ─── Icon-only размеры ─── */
  .p-button-icon-only {
    width: var(--p-button-icon-only-width);
    height: var(--p-button-icon-only-width);
  }
  .p-button-sm.p-button-icon-only {
    width: var(--p-button-sm-icon-only-width);
    height: var(--p-button-sm-icon-only-width);
  }
  .p-button-lg.p-button-icon-only {
    width: var(--p-button-lg-icon-only-width);
    height: var(--p-button-lg-icon-only-width);
  }
  .p-button-xlg.p-button-icon-only {
    width: var(--p-button-extend-ext-xlg-icon-only-width);
    height: var(--p-button-extend-ext-xlg-icon-only-width);
  }
`;
