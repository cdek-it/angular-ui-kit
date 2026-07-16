export const tagCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-tag {
    font-family: ${dt('tag.extend.fonts_fontFamily_base')};
    line-height: ${dt('tag.extend.fonts_lineHeight_250')};
  }
`;
