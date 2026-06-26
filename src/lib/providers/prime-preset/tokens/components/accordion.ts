/**
 * Кастомная CSS-стилизация для компонента p-accordion.
 * Подключается в map-tokens.ts: `import { accordionCss } from './tokens/components/accordion'`
 */
export const accordionCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Шрифт заголовка ─── */
  .p-accordionheader {
    font-family: ${dt('accordion.extend.fonts_fontFamily_base')};
    font-size: ${dt('accordion.extend.fonts_fontSize_300')};
  }

  /* ─── Размер иконки toggle ─── */
  .p-accordionheader-toggle-icon,
  .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
    width: ${dt('accordion.extend.extHeader.iconSize')};
    height: ${dt('accordion.extend.extHeader.iconSize')};
  }

  /* ─── Лэйаут заголовка: иконка + текст ─── */
  .p-accordionheader > div {
    display: flex;
    align-items: center;
    gap: ${dt('accordion.extend.extHeader.gap')};
  }

  /* ─── Размер иконки в заголовке ─── */
  .p-accordionheader > div > i {
    font-size: ${dt('accordion.extend.extHeader.iconSize')};
  }
`;
