/**
 * Кастомная CSS-стилизация для компонента p-slider.
 * Подключается в map-tokens.ts: `import { sliderCss } from './components/slider'`
 */
export const sliderCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Вертикальная ориентация: высота берётся с обёртки extra-slider ─── */
  .p-slider-vertical {
    height: inherit;
  }

  /* ─── Disabled: Figma задаёт opacity 0.5 на компоненте (PrimeNG рисует 0.6) ─── */
  .p-slider.p-disabled {
    opacity: ${dt('effects.opacity.50')};
  }

  .p-slider.p-disabled .p-slider-handle {
    cursor: default;
  }

  /* ─── Hover бегунка ─── */
  .p-slider:not(.p-disabled) .p-slider-handle:hover {
    box-shadow: ${dt('slider.handle.extend.hoverRing')};
  }

  /* ─── Focus ring ползунка ─── */
  .p-slider-handle:focus-visible {
    outline: ${dt('slider.handle.focusRing.width')} solid ${dt('color.border.focus')};
    outline-offset: ${dt('slider.handle.focusRing.offset')};
  }

  /* PrimeNG рисует фокус тенью — она не нужна, кроме случая, когда тень занята hover-кольцом */
  .p-slider-handle:focus-visible:not(:hover) {
    box-shadow: none;
  }
`;
