export const inputmaskCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Base ─── */
.p-inputmask {
  border-width: ${dt('inputmask.extend.borderWidth')};
  line-height: ${dt('fonts.lineHeight.250')};
}

/* ─── Readonly ─── */
.p-inputmask .p-inputtext:enabled:read-only {
  background: ${dt('inputmask.extend.readonlyBackground')};
}

/* ─── Extra Large ─── */
.p-inputmask.p-inputmask-xlg .p-inputtext {
  font-size: ${dt('inputmask.extend.extXlg.fontSize')};
  padding: ${dt('inputmask.extend.extXlg.paddingY')} ${dt('inputmask.extend.extXlg.paddingX')};
}
`;
