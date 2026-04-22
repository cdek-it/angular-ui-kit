/**
 * Кастомная CSS-стилизация для компонента p-skeleton.
 * Публикует extend-токены как CSS-переменные и применяет минимальную ширину.
 * Подключается в map-tokens.ts: `import { skeletonCss } from './tokens/components/skeleton'`
 */
export const skeletonCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Skeleton extend: публикуем кастомные переменные в :root ─── */
  :root {
    --p-skeleton-extend-min-width: ${dt('skeleton.extend.minWidth')};
    --p-skeleton-extend-height:    ${dt('skeleton.extend.height')};
  }

  /* ─── Минимальная ширина ─── */
  .p-skeleton {
    min-width: var(--p-skeleton-extend-min-width);
  }
`;
