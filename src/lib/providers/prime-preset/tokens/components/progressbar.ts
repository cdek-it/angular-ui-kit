export const progressbarCss = ({ dt }: { dt: (path: string) => string }) => `
  .p-progressbar-label {
    font-family: ${dt('fonts.fontFamily.base')};
  }
`;
