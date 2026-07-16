export const tooltipCss = ({ dt }: { dt: (token: string) => string }): string => `
/* Типографика для Tooltip */
.p-tooltip .p-tooltip-text {
  font-family: ${dt('tooltip.extend.fonts_fontFamily_base')};
  font-size: ${dt('tooltip.extend.fonts_fontSize_200')};
  font-weight: ${dt('tooltip.extend.fonts_fontWeight_regular')};
  line-height: ${dt('tooltip.extend.fonts_lineHeight_300')};
}
`;
