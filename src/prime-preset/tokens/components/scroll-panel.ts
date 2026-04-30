/**
 * Кастомная CSS-стилизация для компонента p-scrollpanel.
 * Подключается в map-tokens.ts: `import { scrollPanelCss } from './tokens/components/scroll-panel'`
 */
export const scrollPanelCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Полоса прокрутки ─── */
  .p-scrollpanel-bar {
    background: ${dt('scrollpanel.bar.background')};
    border-radius: ${dt('scrollpanel.bar.borderRadius')};
    transition-duration: ${dt('scrollpanel.root.transitionDuration')};
  }

  .p-scrollpanel-bar:focus-visible {
    outline-width: ${dt('scrollpanel.bar.focusRing.width')};
    outline-style: ${dt('scrollpanel.bar.focusRing.style')};
    outline-color: ${dt('scrollpanel.bar.focusRing.color')};
    outline-offset: ${dt('scrollpanel.bar.focusRing.offset')};
    box-shadow: ${dt('scrollpanel.bar.focusRing.shadow')};
  }
`;
