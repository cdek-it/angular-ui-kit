export const tooltipCss = ({ dt }: { dt: (token: string) => string }): string => `
/* Типографика для Tooltip */
.p-tooltip .p-tooltip-text {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.300')};
}
`;
