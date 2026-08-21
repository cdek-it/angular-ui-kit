export const textareaCss = ({ dt }: { dt: (token: string) => string }): string => `

/* --- Base --- */
.p-textarea {
  border-width: ${dt('textarea.extend.borderWidth')};
  line-height: ${dt('fonts.lineHeight.250')};
  min-height: ${dt('textarea.extend.minHeight')};
  font-family: ${dt('fonts.fontFamily.base')};
}

.p-textarea::placeholder {
  font-family: ${dt('fonts.fontFamily.base')};
}

.p-floatlabel:has(.p-textarea) label {
  font-family: ${dt('fonts.fontFamily.base')};
}

/* --- Sizes --- */
.p-textarea.p-textarea-xlg {
  font-size: ${dt('textarea.extend.extXlg.fontSize')};
  padding: ${dt('textarea.extend.extXlg.paddingY')} ${dt('textarea.extend.extXlg.paddingX')};
}

/* --- States --- */
.p-textarea:enabled:read-only {
  background: ${dt('textarea.extend.readonlyBackground')};
  color: ${dt('textarea.root.color')};
}

.p-textarea:disabled {
  background: ${dt('textarea.root.disabledBackground')};
  color: ${dt('textarea.root.disabledColor')};
  opacity: 1;
}

/* --- Focus --- */
.p-textarea:enabled:focus {
  box-shadow: 0 0 0 ${dt('textarea.root.focusRing.width')} ${dt('textarea.root.focusRing.color')};
}

/* --- Invalid + Focus --- */
.p-textarea.p-invalid:focus {
  border-color: ${dt('textarea.root.invalidBorderColor')};
  box-shadow: 0 0 0 ${dt('textarea.root.focusRing.width')} ${dt('color.bg.status.danger.weak.active')};
}

/* --- ClearButton (showClear) --- */
.p-iconfield:has(.p-textarea) {
  display: block;
  width: fit-content;
}

.p-iconfield:has(.p-textarea) .p-textarea {
  padding-right: ${dt('dimension.space.700')};
}

.p-iconfield:has(.p-textarea) .p-inputicon {
  top: ${dt('dimension.space.500')};
  transform: none;
  font-size: ${dt('textarea.extend.iconSize')};
  width: ${dt('textarea.extend.iconSize')};
  height: ${dt('textarea.extend.iconSize')};
  cursor: pointer;
}

`;
