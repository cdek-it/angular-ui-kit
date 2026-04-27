/**
 * Кастомная CSS-стилизация для компонента p-password.
 * Подключается в map-tokens.ts: `import { passwordCss } from './components/password'`
 */
export const passwordCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Иконки управления ─── */
  .p-password-toggle-mask-icon,
  .p-icon.p-password-toggle-mask-icon.p-password-unmask-icon {
    cursor: pointer;
  }

  /* ─── Оверлей и индикатор ─── */
  .p-password-overlay {
    border-width: ${dt('password.extend.borderWidth')};
  }

  .p-password-meter-text {
    color: ${dt('text.mutedColor')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.medium')};
  }

  /* ─── Focus ─── */
  .p-password:has(.p-inputtext:enabled:focus) {
    box-shadow: 0 0 0 ${dt('inputtext.focusRing.width')} ${dt('inputtext.focusRing.color')};
    border-radius: ${dt('inputtext.root.borderRadius')};
  }

  /* ─── Invalid + Focus ─── */
  .p-password:has(.p-inputtext.p-invalid:focus) {
    box-shadow: 0 0 0 ${dt('inputtext.focusRing.width')} ${dt('focusRing.extend.invalid')};
    border-radius: ${dt('inputtext.root.borderRadius')};
  }

  .p-password:has(.p-inputtext.p-invalid:focus) .p-inputtext {
    border-color: ${dt('inputtext.root.invalidBorderColor')};
  }

  /* ─── FloatLabel ─── */
  .p-floatlabel:has(.p-password) label {
    font-family: ${dt('fonts.fontFamily.base')};
    font-weight: ${dt('floatlabel.root.fontWeight')};
    line-height: ${dt('fonts.lineHeight.250')};
    color: ${dt('floatlabel.root.color')};
  }

  .p-floatlabel:has(.p-password) .p-floatlabel-active label {
    font-weight: ${dt('floatlabel.root.active.fontWeight')};
  }

  .p-floatlabel-in .p-password .p-inputtext {
    font-family: ${dt('fonts.fontFamily.base')};
    padding-block-start: ${dt('floatlabel.in.input.paddingTop')};
    padding-block-end: ${dt('floatlabel.in.input.paddingBottom')};
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
    gap: ${dt('content.gap.200')};
    font-size: ${dt('fonts.fontSize.100')};
  }

  /* ─── Состояния иконок правил ─── */
  .p-password-rule i {
    font-size: ${dt('fonts.fontSize.200')};
  }

  .p-password-rule .ti-circle {
    color: ${dt('surface.400')};
  }

  .p-password-rule .ti-circle-check {
    color: ${dt('password.colorScheme.light.strength.strongBackground')};
  }

  .p-password-rule .ti-circle-x {
    color: ${dt('password.colorScheme.light.strength.weakBackground')};
  }
`;
