export const inputtextCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Базовые стили ─── */
.p-inputtext {
  line-height: ${dt('inputtext.extend.fonts_lineHeight_250')};
  font-family: ${dt('inputtext.extend.fonts_fontFamily_base')};
}

.p-inputtext::placeholder {
  font-family: ${dt('inputtext.extend.fonts_fontFamily_base')};
}

.p-floatlabel:has(.p-inputtext) label {
  font-family: ${dt('inputtext.extend.fonts_fontFamily_base')};
}

/* ─── Disabled ─── */
.p-inputtext:disabled {
  background: ${dt('inputtext.root.disabledBackground')};
  color: ${dt('inputtext.root.disabledColor')};
}

/* ─── Readonly ─── */
.p-inputtext:enabled:read-only {
  background: ${dt('inputtext.extend.readonlyBackground')};
  color: ${dt('inputtext.root.color')};
}

/* ─── Focus ─── */
.p-inputtext:enabled:focus {
  box-shadow: 0 0 0 ${dt('inputtext.focusRing.width')} ${dt('inputtext.focusRing.color')};
}

/* ─── Invalid + Focus ─── */
.p-inputtext.p-invalid:focus {
  border-color: ${dt('inputtext.root.invalidBorderColor')};
  box-shadow: 0 0 0 ${dt('inputtext.focusRing.width')} ${dt('inputtext.extend.focusRing_invalid')};
}

/* ─── Extra Large ─── */
.p-inputtext.p-inputtext-xlg {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  padding: ${dt('inputtext.extend.extXlg.paddingY')} ${dt('inputtext.extend.extXlg.paddingX')};
}

/* ─── IconField ─── */
.p-iconfield[data-pc-name="iconfield"] {
  width: fit-content;
}

.p-iconfield .p-inputicon {
  font-size: ${dt('inputtext.extend.iconSize')};
  width: ${dt('inputtext.extend.iconSize')};
  height: ${dt('inputtext.extend.iconSize')};
  cursor: pointer;
}
`;
