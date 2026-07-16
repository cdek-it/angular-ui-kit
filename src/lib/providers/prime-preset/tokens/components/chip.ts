/**
 * Кастомная CSS-стилизация для компонента p-chip.
 * Публикует extend-токены как CSS-переменные и применяет глобальные стили.
 * Подключается в map-tokens.ts: `import { chipCss } from './components/chip'`
 */
export const chipCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Chip extend: публикуем кастомные переменные в :root ─── */
  :root {
    --p-chip-extend-border-color: ${dt('chip.extend.borderColor')};
    --p-chip-extend-border-width: ${dt('chip.extend.borderWidth')};
  }

  /* ─── Граница чипа ─── */
  .p-chip {
    border: var(--p-chip-extend-border-width) solid var(--p-chip-extend-border-color);
  }

  /* ─── Типографика лейбла ─── */
  .p-chip-label {
    font-family: ${dt('chip.extend.fonts_fontFamily_base')};
    font-size: ${dt('chip.extend.fonts_fontSize_300')};
    font-weight: ${dt('chip.extend.fonts_fontWeight_regular')};
    line-height: ${dt('chip.extend.fonts_lineHeight_400')};
  }

  /* ─── Сброс уменьшенного padding PrimeNG при наличии кнопки удаления ─── */
  .p-chip:has(.p-chip-remove-icon) {
    padding-inline-end: ${dt('chip.root.paddingX')};
  }

  /* ─── Focus ring иконки удаления ─── */
  .p-chip-remove-icon:focus-visible {
    outline: ${dt('chip.removeIcon.focusRing.width')} solid ${dt('chip.extend.focusRing_success')};
  }

  /* ─── Disabled состояние ─── */
  .p-chip.p-disabled {
    opacity: ${dt('chip.extend.opacity_500')};
    pointer-events: none;
  }

  .p-chip.p-disabled .p-chip-remove-icon {
    pointer-events: none;
  }
`;
