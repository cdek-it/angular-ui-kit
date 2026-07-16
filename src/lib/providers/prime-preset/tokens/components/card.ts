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
    box-shadow: ${dt('card.extend.overlay_popover_shadow')};
  }

  /* ─── Caption (Title & Subtitle wrapper) ─── */
  .p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${dt('card.caption.gap')};
  }

  /* ─── Subtitle typography ─── */
  .p-card-subtitle {
    font-family: ${dt('card.extend.fonts_fontFamily_heading')};
    font-size: ${dt('card.extend.fonts_fontSize_200')};
    font-weight: ${dt('card.extend.fonts_fontWeight_regular')};
  }
`;
