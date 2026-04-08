/**
 * Кастомная CSS-стилизация для компонента p-card.
 * Публикует extend-токены как CSS-переменные и применяет глобальные стили.
 * Подключается в map-tokens.ts: `import { cardCss } from './tokens/components/card'`
 */
export const cardCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Card extend: публикуем кастомные переменные в :root ─── */
  :root {
    --p-card-extend-border-color: ${dt('card.extend.borderColor')};
    --p-card-extend-border-width: ${dt('card.extend.borderWidth')};
  }

  /* ─── Card base styles ─── */
  .p-card.p-component {
    border: var(--p-card-extend-border-width) solid var(--p-card-extend-border-color);
    overflow: hidden;
    box-shadow: none;
  }

  /* ─── Overlay variant ─── */
  .p-card.p-component.shadow-md {
    box-shadow: ${dt('overlay.popover.shadow')};
  }

  /* ─── Subtitle typography ─── */
  .p-card-subtitle {
    font-family: ${dt('fonts.fontFamily.heading')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.regular')};
  }
`;
