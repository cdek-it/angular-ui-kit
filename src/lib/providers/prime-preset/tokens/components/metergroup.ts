export const metergroupCss = ({ dt }: { dt: (path: string) => string }) => `
  .p-metergroup-label-text {
    font-family: ${dt('metergroup.extend.fonts_fontFamily_base')};
    font-size: ${dt('metergroup.extend.fonts_fontSize_200')};
    font-weight: ${dt('metergroup.extend.fonts_fontWeight_regular')};
    line-height: ${dt('metergroup.extend.fonts_lineHeight_200')};
    color: ${dt('metergroup.extend.extLabel.color')};
  }
  .p-metergroup-label .p-metergroup-label-text + span {
    font-family: ${dt('metergroup.extend.fonts_fontFamily_base')};
    font-size: ${dt('metergroup.extend.fonts_fontSize_200')};
    font-weight: ${dt('metergroup.extend.fonts_fontWeight_medium')};
    color: ${dt('metergroup.extend.text_color')};
  }
  .p-metergroup-horizontal .p-metergroup-meter { min-height: 100%; }
  .p-metergroup-vertical .p-metergroup-meter { min-width: 100%; }
`;
