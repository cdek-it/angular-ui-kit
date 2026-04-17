export const inputotpCss = ({ dt }: { dt: (token: string) => string }): string => `
/* Стили границы */
.p-inputotp.p-component .p-inputtext {
  border-width: ${dt('inputotp.extend.borderWidth')};
  padding-inline: 0;
}

/* ─── Small ─── */
.p-inputotp.p-component .p-inputtext.p-inputtext-sm {
  padding-block: ${dt('inputtext.root.sm.paddingY')};
}

/* ─── Base ─── */
.p-inputotp.p-component .p-inputtext:not(.p-inputtext-sm):not(.p-inputtext-lg):not(.p-inputtext-xlg) {
  padding-block: ${dt('inputtext.root.paddingY')};
}

/* ─── Large ─── */
.p-inputotp.p-component .p-inputtext.p-inputtext-lg {
  padding-block: ${dt('inputtext.root.lg.paddingY')};
}

/* ─── Extra Large ─── */
.p-inputotp.p-component.p-inputotp-xlg .p-inputtext {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  padding-block: ${dt('inputtext.extend.extXlg.paddingY')};
}
`;
