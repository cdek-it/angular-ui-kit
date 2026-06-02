export const inputmaskCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Sizes ─── */
input-mask.input-mask-xlg .p-inputtext {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  padding: ${dt('inputtext.extend.extXlg.paddingY')} ${dt('inputtext.extend.extXlg.paddingX')};
}
`;
