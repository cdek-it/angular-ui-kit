export const inputtextCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Базовые стили ─── */
.p-inputtext {
  border-width: ${dt('inputtext.extend.borderWidth')};
  line-height: ${dt('fonts.lineHeight.250')};
}

/* ─── Readonly ─── */
.p-inputtext:enabled:read-only {
  background: ${dt('inputtext.extend.readonlyBackground')};
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
