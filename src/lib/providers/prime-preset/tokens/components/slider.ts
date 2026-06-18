/**
 * Кастомная CSS-стилизация для компонента p-slider.
 * Подключается в map-tokens.ts: `import { sliderCss } from './components/slider'`
 */
export const sliderCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Focus ring ползунка ─── */
  .p-slider-handle:focus-visible {
    outline: ${dt('slider.handle.focusRing.width')} ${dt('slider.handle.focusRing.style')} ${dt('focusRing.success')};
    outline-offset: ${dt('slider.handle.focusRing.offset')};
    box-shadow: none;
  }
`;
