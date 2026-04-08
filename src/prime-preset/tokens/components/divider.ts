/**
 * Кастомная CSS-стилизация для компонента p-divider.
 * Публикует extend-токены как CSS-переменные и применяет глобальные стили.
 * Подключается в map-tokens.ts: `import { dividerCss } from './components/divider'`
 */
export const dividerCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Divider extend: публикуем кастомные переменные в :root ─── */
  :root {
    --p-divider-extend-content-gap:  ${dt('divider.extend.content.gap')};
    --p-divider-extend-icon-size:    ${dt('divider.extend.iconSize')};
  }

  /* ─── Контент разделителя ─── */
  .p-divider-content {
    display: flex;
    align-items: center;
    gap: var(--p-divider-extend-content-gap);
    font-family: ${dt('fonts.fontFamily.heading')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.regular')};
  }

  .p-divider-content .ti {
    font-size: var(--p-divider-extend-icon-size);
  }

  /* ─── Вертикальное выравнивание ─── */
  .p-divider.p-divider-vertical.p-divider-top .p-divider-content {
    align-items: flex-start;
  }
  .p-divider.p-divider-vertical.p-divider-bottom .p-divider-content {
    align-items: flex-end;
  }
`;
