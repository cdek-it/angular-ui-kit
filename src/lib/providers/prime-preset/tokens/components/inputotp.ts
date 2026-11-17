export const inputotpCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-inputotp.p-component {
  display: inline-flex;
  gap: ${dt('inputotp.root.gap')};
}
.p-inputotp.p-component .p-inputtext {
  box-sizing: border-box;
  height: ${dt('inputotp.extend.height')};
  padding: 0;
  border: 0;
  outline: ${dt('inputotp.extend.borderWidth')} solid ${dt('inputotp.extend.field.borderColor')};
  outline-offset: 0;
  border-radius: ${dt('inputotp.extend.field.borderRadius')};
  box-shadow: none;
  background: ${dt('inputotp.extend.field.background')};
  color: ${dt('inputotp.extend.field.color')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.300')};
}
.p-inputotp.p-component .p-inputtext:enabled:hover {
  outline-color: ${dt('inputotp.extend.field.hoverBorderColor')};
}
.p-inputotp.p-component .p-inputtext:disabled {
  background: ${dt('inputotp.extend.field.disabledBackground')};
  opacity: ${dt('inputotp.extend.field.disabledOpacity')};
}
.p-inputotp.p-component .p-inputtext:enabled:read-only {
  background: ${dt('inputotp.extend.field.readonlyBackground')};
}
.p-inputotp.p-component .p-inputtext.p-invalid {
  outline-color: ${dt('inputotp.extend.field.invalidBorderColor')};
}
.p-inputotp.p-component .p-inputtext:enabled:focus {
  outline: none;
  box-shadow: 0 0 0 ${dt('inputotp.extend.field.focusWidth')} ${dt('inputotp.extend.field.focusColor')};
}
.p-inputotp.p-component .p-inputtext.p-invalid:enabled:focus {
  box-shadow: 0 0 0 ${dt('inputotp.extend.field.focusWidth')} ${dt('inputotp.extend.field.dangerFocusColor')};
}
.p-inputotp.p-component .p-inputtext.p-inputtext-sm {
  height: ${dt('inputotp.extend.extSm.height')};
  border-radius: ${dt('inputotp.extend.extSm.borderRadius')};
}
.p-inputotp.p-component .p-inputtext.p-inputtext-lg {
  height: ${dt('inputotp.extend.extLg.height')};
}
`;
