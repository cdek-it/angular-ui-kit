export const paginatorCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Current page report ─── */
  .p-paginator .p-paginator-current {
    font-family: ${dt('paginator.extend.fonts_fontFamily_base')};
    font-size: ${dt('paginator.extend.fonts_fontSize_300')};
    font-weight: ${dt('paginator.extend.fonts_fontWeight_regular')};
    line-height: ${dt('paginator.extend.fonts_lineHeight_250')};
    color: ${dt('paginator.currentPageReport.color')};
  }

  /* ─── Page number buttons ─── */
  .p-paginator .p-paginator-page {
    font-family: ${dt('paginator.extend.fonts_fontFamily_base')};
    font-size: ${dt('paginator.extend.fonts_fontSize_300')};
    font-weight: ${dt('paginator.extend.fonts_fontWeight_regular')};
    line-height: ${dt('paginator.extend.fonts_lineHeight_250')};
  }
`;
