/**
 * Кастомная CSS-стилизация для компонента p-card.
 * Подключается в map-tokens.ts: `import { cardCss } from './tokens/components/card'`
 *
 * Все значения берутся через dt() — PrimeUIX сам выпускает CSS-переменную для каждого токена
 * пресета, поэтому объявлять их повторно в :root не нужно.
 */
export const cardCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Рамка и базовое состояние ─── */
  .p-card.p-component {
    border: ${dt('card.extend.borderWidth')} solid ${dt('card.extend.borderColor')};
    overflow: hidden;
    box-shadow: ${dt('card.root.shadow')};
  }

  /* ─── Overlay: тень задаётся токеном карточки, а не общей шкалой ─── */
  .p-card.p-component.shadow-md {
    box-shadow: ${dt('card.overlay.shadow')};
  }

  /* ─── Caption: обёртка заголовка и подзаголовка ─── */
  .p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${dt('card.caption.gap')};
  }

  /* ─── Типографика подзаголовка ─── */
  .p-card-subtitle {
    font-family: ${dt('fonts.fontFamily.heading')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.regular')};
  }
`;
