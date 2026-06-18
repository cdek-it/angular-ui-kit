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
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.400')};
  }

  /* ─── Сброс уменьшенного padding PrimeNG при наличии кнопки удаления ─── */
  .p-chip:has(.p-chip-remove-icon) {
    padding-inline-end: ${dt('chip.root.paddingX')};
  }

  /* ─── Focus ring иконки удаления ─── */
  .p-chip-remove-icon:focus-visible {
    outline: ${dt('chip.removeIcon.focusRing.width')} solid ${dt('focusRing.success')};
  }

  /* ─── Disabled состояние ─── */
  .p-chip.p-disabled {
    opacity: ${dt('opacity.500')};
    pointer-events: none;
  }

  .p-chip.p-disabled .p-chip-remove-icon {
    pointer-events: none;
  }
`;
