/**
 * Кастомная CSS-стилизация для компонента p-button.
 * Подключается в map-tokens.ts: `import { buttonCss } from './tokens/components/button'`
 *
 * Все значения берутся через dt() — PrimeUIX сам выпускает CSS-переменную для каждого токена
 * пресета, поэтому объявлять их повторно в :root не нужно.
 */
export const buttonCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Шрифт для текста кнопки ─── */
  .p-button.p-component .p-button-label {
    font-family: ${dt('fonts.fontFamily.heading')}, sans-serif;
    font-weight: ${dt('button.root.label.fontWeight')};
  }

  /* ─── Рамка ─── */
  .p-button {
    border-width: ${dt('button.extend.borderWidth')};
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
    font-size: ${dt('button.extend.iconSize.md')};
  }
  .p-button.p-button-sm .p-button-icon {
    font-size: ${dt('button.extend.iconSize.sm')};
  }
  .p-button.p-button-lg .p-button-icon {
    font-size: ${dt('button.extend.iconSize.lg')};
  }
  .p-button-xlg.p-button .p-button-icon,
  .p-button-link.p-button-xlg .p-button-icon {
    font-size: ${dt('button.extend.iconSize.lg')};
  }

  /* ─── Disabled / loading ─── */
  .p-button:is(.p-disabled, :disabled, .p-button-loading) {
    mix-blend-mode: inherit;
    opacity: ${dt('effects.opacity.100')};
    color: ${dt('button.extend.disabledColor')};
    background: ${dt('button.extend.disabledBackground')};
    border-color: ${dt('button.extend.disabledBackground')};
  }
  .p-button.p-button-outlined:is(.p-disabled, :disabled, .p-button-loading) {
    color: ${dt('button.extend.disabledColor')};
    background: transparent;
    border-color: transparent;
  }
  .p-button.p-button-text:is(.p-disabled, :disabled, .p-button-loading) {
    color: ${dt('button.extend.disabledColor')};
    background: transparent;
    border-color: transparent;
  }
  .p-button.p-button-link:is(.p-disabled, :disabled, .p-button-loading) {
    color: ${dt('button.extend.disabledColor')};
    background: transparent;
    border-color: transparent;
  }

  /* ─── Link кнопки ─── */
  .p-button-link.p-button:is(.p-button, .p-button-xlg) {
    padding: ${dt('button.extend.extLink.paddingY')} ${dt('button.extend.extLink.paddingX')};
  }
  .p-button-link.p-button {
    width: min-content;
    height: auto;
    background: ${dt('button.extend.extLink.background')};
  }
  .p-button-link.p-button.p-button-xlg {
    font-size: ${dt('fonts.fontSize.600')};
  }
  .p-button.p-button-link:not(:disabled):hover {
    color: ${dt('button.extend.extLink.colorHover')};
  }
  .p-button.p-button-link:not(:disabled):hover .p-button-label {
    text-decoration: none;
  }

  /* ─── Icon-only link кнопки ─── */
  .p-button-link.p-button-icon-only {
    width: ${dt('button.extend.extLink.base.iconOnlyWidth')};
    height: ${dt('button.extend.extLink.base.iconOnlyWidth')};
  }
  .p-button-link.p-button-icon-only.p-button-sm {
    width: ${dt('button.extend.extLink.sm.iconOnlyWidth')};
    height: ${dt('button.extend.extLink.sm.iconOnlyWidth')};
  }
  .p-button-link.p-button-icon-only.p-button-lg {
    width: ${dt('button.extend.extLink.lg.iconOnlyWidth')};
    height: ${dt('button.extend.extLink.lg.iconOnlyWidth')};
  }
  .p-button-link.p-button-icon-only.p-button-xlg {
    width: ${dt('button.extend.extLink.xlg.iconOnlyWidth')};
    height: ${dt('button.extend.extLink.xlg.iconOnlyWidth')};
  }

  /* ─── Line-height ─── */
  .p-button-sm {
    line-height: ${dt('fonts.lineHeight.250')};
  }
  .p-button:is(.p-button-lg, .p-button-xlg) {
    line-height: ${dt('fonts.lineHeight.550')};
  }

  /* ─── Border-radius / gap для sm / lg / xlg ─── */
  .p-button.p-button-sm:not(.p-button-rounded) {
    border-radius: ${dt('button.extend.extSm.borderRadius')};
  }
  .p-button.p-button-sm {
    gap: ${dt('button.extend.extSm.gap')};
  }
  .p-button:is(.p-button-lg, .p-button-xlg):not(.p-button-rounded) {
    border-radius: ${dt('button.extend.extLg.borderRadius')};
  }
  .p-button.p-button-lg {
    gap: ${dt('button.extend.extLg.gap')};
  }
  .p-button.p-button-xlg {
    gap: ${dt('button.extend.extXlg.gap')};
  }
  .p-button-xlg.p-button:not(.p-button-rounded) {
    border-radius: ${dt('button.extend.extXlg.borderRadius')};
  }

  /* ─── Высота по размерам (base/sm задаются токенами дизайна) ─── */
  .p-button:not(.p-button-link) {
    height: ${dt('button.root.height')};
  }
  .p-button.p-button-sm:not(.p-button-link) {
    height: ${dt('button.extend.extSm.height')};
  }

  /* ─── Padding / font-size / height для lg ─── */
  .p-button-lg.p-button:not(.p-button-icon-only):not(.p-button-link) {
    padding: ${dt('button.root.lg.paddingY')} ${dt('button.root.lg.paddingX')};
    font-size: ${dt('button.root.lg.fontSize')};
    height: ${dt('button.extend.extLg.height')};
  }

  /* ─── Padding / font-size / height для xlg ─── */
  .p-button-xlg.p-button:not(.p-button-icon-only):not(.p-button-link) {
    padding: ${dt('button.extend.extXlg.paddingY')} ${dt('button.extend.extXlg.paddingX')};
    font-size: ${dt('fonts.fontSize.500')};
    height: ${dt('button.extend.extXlg.height')};
  }

  /* ─── Icon-only размеры ─── */
  .p-button-icon-only {
    width: ${dt('button.root.iconOnlyWidth')};
    height: ${dt('button.root.iconOnlyWidth')};
  }
  .p-button-sm.p-button-icon-only {
    width: ${dt('button.root.sm.iconOnlyWidth')};
    height: ${dt('button.root.sm.iconOnlyWidth')};
  }
  .p-button-lg.p-button-icon-only {
    width: ${dt('button.root.lg.iconOnlyWidth')};
    height: ${dt('button.root.lg.iconOnlyWidth')};
  }
  .p-button-xlg.p-button-icon-only {
    width: ${dt('button.extend.extXlg.iconOnlyWidth')};
    height: ${dt('button.extend.extXlg.iconOnlyWidth')};
  }

  /* ─── Фон в фокусе для severity (outlined / text) ─── */
  .p-button.p-button-outlined.p-button-danger:focus-visible {
    background: ${dt('button.extend.extOutlined.danger.focusBackground')};
  }
  .p-button.p-button-outlined.p-button-warn:focus-visible {
    background: ${dt('button.extend.extOutlined.warn.focusBackground')};
  }
  .p-button.p-button-outlined.p-button-info:focus-visible {
    background: ${dt('button.extend.extOutlined.info.focusBackground')};
  }
  .p-button.p-button-outlined.p-button-help:focus-visible {
    background: ${dt('button.extend.extOutlined.help.focusBackground')};
  }
  .p-button.p-button-outlined.p-button-success:focus-visible {
    background: ${dt('button.extend.extOutlined.success.focusBackground')};
  }
  .p-button.p-button-text.p-button-danger:focus-visible {
    background: ${dt('button.extend.extText.danger.focusBackground')};
  }
  .p-button.p-button-text.p-button-warn:focus-visible {
    background: ${dt('button.extend.extText.warn.focusBackground')};
  }
  .p-button.p-button-text.p-button-info:focus-visible {
    background: ${dt('button.extend.extText.info.focusBackground')};
  }
  .p-button.p-button-text.p-button-help:focus-visible {
    background: ${dt('button.extend.extText.help.focusBackground')};
  }
  .p-button.p-button-text.p-button-success:focus-visible {
    background: ${dt('button.extend.extText.success.focusBackground')};
  }
`;
