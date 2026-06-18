export const progressbarCss = ({ dt }: { dt: (path: string) => string }) => `
  .p-progressbar-label {
    font-family: ${dt('progressbar.extend.fonts_fontFamily_base')};
  }
`;
