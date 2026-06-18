export const textareaCss = ({ dt }: { dt: (token: string) => string }): string => `

/* --- Base --- */
.p-textarea {
  border-width: ${dt('textarea.extend.borderWidth')};
  line-height: ${dt('textarea.extend.fonts_lineHeight_250')};
  min-height: ${dt('textarea.extend.minHeight')};
  font-family: ${dt('textarea.extend.fonts_fontFamily_base')};
}

.p-textarea::placeholder {
  font-family: ${dt('textarea.extend.fonts_fontFamily_base')};
}

.p-floatlabel:has(.p-textarea) label {
  font-family: ${dt('textarea.extend.fonts_fontFamily_base')};
}

/* --- Sizes --- */
.p-textarea.p-textarea-xlg {
  font-size: ${dt('textarea.extend.extXlg.fontSize')};
  padding: ${dt('textarea.extend.extXlg.paddingY')} ${dt('textarea.extend.extXlg.paddingX')};
}

/* --- States --- */
.p-textarea:enabled:read-only {
  background: ${dt('textarea.extend.readonlyBackground')};
  color: ${dt('textarea.color')};
}

.p-textarea:disabled {
  background: ${dt('textarea.disabledBackground')};
  color: ${dt('textarea.disabledColor')};
  opacity: 1;
}

/* --- Focus --- */
.p-textarea:enabled:focus {
  box-shadow: 0 0 0 ${dt('textarea.focusRing.width')} ${dt('textarea.focusRing.color')};
}

/* --- Invalid + Focus --- */
.p-textarea.p-invalid:focus {
  border-color: ${dt('textarea.invalidBorderColor')};
  box-shadow: 0 0 0 ${dt('textarea.focusRing.width')} ${dt('textarea.extend.focusRing_invalid')};
}

/* --- ClearButton (showClear) --- */
.p-iconfield:has(.p-textarea) {
  display: block;
  width: fit-content;
}

.p-iconfield:has(.p-textarea) .p-textarea {
  padding-right: ${dt('textarea.extend.form_padding_700')};
}

.p-iconfield:has(.p-textarea) .p-inputicon {
  top: ${dt('textarea.extend.form_padding_500')};
  transform: none;
  font-size: ${dt('textarea.extend.iconSize')};
  width: ${dt('textarea.extend.iconSize')};
  height: ${dt('textarea.extend.iconSize')};
  cursor: pointer;
}

`;
