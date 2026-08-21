export const tagCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-tag {
    font-family: ${dt('fonts.fontFamily.base')};
    line-height: ${dt('fonts.lineHeight.250')};
  }
`;
