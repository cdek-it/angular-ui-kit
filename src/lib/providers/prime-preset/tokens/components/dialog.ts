export const dialogCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-dialog .p-dialog-title {
    font-family: ${dt('dialog.extend.fonts_fontFamily_heading')};
    font-size: ${dt('dialog.title.fontSize')};
    font-weight: ${dt('dialog.title.fontWeight')};
    line-height: ${dt('dialog.extend.fonts_lineHeight_550')};
  }

  .p-dialog .p-dialog-content {
    font-family: ${dt('dialog.extend.fonts_fontFamily_base')};
    font-size: ${dt('dialog.extend.fonts_fontSize_300')};
    font-weight: ${dt('dialog.extend.fonts_fontWeight_regular')};
    line-height: ${dt('dialog.extend.fonts_lineHeight_500')};
  }

  .p-dialog .p-dialog-header {
    border-bottom: ${dt('dialog.extend.dimension_borderWidth_100')} solid ${dt('dialog.root.borderColor')};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .p-dialog .p-dialog-header-actions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .p-dialog .p-dialog-header-actions .p-dialog-close-button.p-button-text:focus-visible,
  .p-dialog .p-dialog-header-actions .p-dialog-close-button.p-button:focus-visible,
  .p-dialog .p-button-text:focus-visible,
  .p-dialog .p-button:focus-visible {
    outline: 0 none;
    outline-color: transparent;
    box-shadow: none;
  }

  .p-dialog {
    width: ${dt('dialog.extend.dimension_overlayWidth_base')};
  }

  .p-dialog.p-component.p-dialog-sm {
    width: ${dt('dialog.extend.dimension_overlayWidth_sm')};
  }

  .p-dialog.p-component.p-dialog-lg {
    width: ${dt('dialog.extend.dimension_overlayWidth_lg')};
  }

  .p-dialog.p-component.p-dialog-xlg {
    width: ${dt('dialog.extend.dimension_overlayWidth_xlg')};
  }
`;
