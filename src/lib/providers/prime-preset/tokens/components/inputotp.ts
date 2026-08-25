export const inputotpCss = ({ dt }: { dt: (token: string) => string }): string => `
/* Стили границы */
.p-inputotp.p-component .p-inputtext {
  border-width: ${dt('inputotp.extend.borderWidth')};
  padding-inline: 0;
  padding-block: ${dt('inputtext.root.paddingY')};
}

/* ─── Disabled ─── */
.p-inputotp.p-component .p-inputtext:disabled {
  background: ${dt('inputtext.root.disabledBackground')};
  color: ${dt('inputtext.root.disabledColor')};
}

/* ─── Focus ─── */
.p-inputotp.p-component .p-inputtext:enabled:focus {
  box-shadow: 0 0 0 ${dt('inputtext.focusRing.width')} ${dt('inputtext.focusRing.color')};
}

/* ─── Invalid + Focus ─── */
.p-inputotp.p-component .p-inputtext.p-invalid:focus {
  border-color: ${dt('inputtext.root.invalidBorderColor')};
  box-shadow: 0 0 0 ${dt('inputtext.focusRing.width')} ${dt('inputtext.root.invalidBorderColor')};
}
`;
