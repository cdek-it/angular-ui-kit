/**
 * Кастомная CSS-стилизация для компонента p-password.
 * Подключается в map-tokens.ts: `import { passwordCss } from './components/password'`
 */
export const passwordCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Иконки управления ─── */
  .p-password-toggle-mask-icon,
  .p-icon.p-password-toggle-mask-icon.p-password-unmask-icon {
    cursor: pointer;
    color: ${dt('password.icon.color')};
  }

  /* ─── Оверлей и индикатор ─── */
  .p-password-overlay {
    border-width: ${dt('password.extend.borderWidth')};
  }

  .p-password-meter-text {
    font-family: ${dt('password.extend.fonts_fontFamily_base')};
    font-size: ${dt('password.extend.fonts_fontSize_200')};
    font-weight: ${dt('password.extend.fonts_fontWeight_regular')};
    line-height: ${dt('password.extend.fonts_lineHeight_250')};
    color: ${dt('password.overlay.color')};
  }

  /* ─── Focus ─── */
  .p-password:has(.p-inputtext:enabled:focus) {
    box-shadow: 0 0 0 ${dt('inputtext.focusRing.width')} ${dt('inputtext.focusRing.color')};
    border-radius: ${dt('inputtext.root.borderRadius')};
  }

  /* ─── Invalid + Focus ─── */
  .p-password:has(.p-inputtext.p-invalid:focus) {
    box-shadow: 0 0 0 ${dt('inputtext.focusRing.width')} ${dt('password.extend.focusRing_invalid')};
    border-radius: ${dt('inputtext.root.borderRadius')};
  }

  .p-password:has(.p-inputtext.p-invalid:focus) .p-inputtext {
    border-color: ${dt('inputtext.root.invalidBorderColor')};
  }

  /* ─── FloatLabel ─── */
  .p-floatlabel:has(.p-password) label {
    font-family: ${dt('password.extend.fonts_fontFamily_base')};
    font-weight: ${dt('password.extend.floatlabel_root_fontWeight')};
    line-height: ${dt('password.extend.fonts_lineHeight_250')};
    color: ${dt('password.extend.floatlabel_root_color')};
  }

  .p-floatlabel:has(.p-password) .p-floatlabel-active label {
    font-weight: ${dt('password.extend.floatlabel_root_active_fontWeight')};
  }

  .p-floatlabel-in .p-password .p-inputtext {
    font-family: ${dt('password.extend.fonts_fontFamily_base')};
    padding-block-start: ${dt('password.extend.floatlabel_in_input_paddingTop')};
    padding-block-end: ${dt('password.extend.floatlabel_in_input_paddingBottom')};
  }

  /* ─── Кастомный контент (правила пароля) ─── */
  .p-password-rules {
    display: flex;
    flex-direction: column;
    gap: ${dt('password.content.gap')};
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .p-password-rule {
    display: flex;
    align-items: center;
    gap: ${dt('password.content.gap')};
    font-family: ${dt('password.extend.fonts_fontFamily_base')};
    font-size: ${dt('password.extend.fonts_fontSize_200')};
    font-weight: ${dt('password.extend.fonts_fontWeight_regular')};
    line-height: ${dt('password.extend.fonts_lineHeight_250')};
    color: ${dt('password.overlay.color')};
  }

  /* ─── Состояния иконок правил ─── */
  .p-password-rule i {
    font-size: ${dt('password.extend.fonts_fontSize_200')};
  }

  .p-password-rule .ti-circle {
    color: ${dt('password.extend.surface_400')};
  }

  .p-password-rule .ti-circle-check {
    color: ${dt('password.colorScheme.light.strength.strongBackground')};
  }

  .p-password-rule .ti-circle-x {
    color: ${dt('password.colorScheme.light.strength.weakBackground')};
  }
`;
