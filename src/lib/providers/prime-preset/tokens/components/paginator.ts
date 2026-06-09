export const paginatorCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Current page report ─── */
  .p-paginator .p-paginator-current {
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.250')};
    color: ${dt('paginator.currentPageReport.color')};
  }

  /* ─── Page number buttons ─── */
  .p-paginator .p-paginator-page {
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.250')};
  }
`;
