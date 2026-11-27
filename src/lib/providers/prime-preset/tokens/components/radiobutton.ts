export const radiobuttonCss = ({ dt }: { dt: (token: string) => string }): string => `
.extra-radiobutton {
  display: inline-flex;
  align-items: flex-start;
  gap: ${dt('dimension.space.300')};
}
.extra-radiobutton--left {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
.extra-radiobutton-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: ${dt('dimension.space.50')};
}
.radio-label {
  color: ${dt('color.fg.default')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.400')};
  cursor: pointer;
}
.radio-label--disabled {
  cursor: default;
}
.p-radiobutton-box {
  border-radius: ${dt('radiobutton.root.extend.borderRadius')};
  border-width: ${dt('radiobutton.root.extend.borderWidth')};
}
.p-radiobutton:not(.p-disabled):not(.p-invalid):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
  border-width: 0;
  outline: none;
  box-shadow: 0 0 0 ${dt('radiobutton.root.focusRing.width')} ${dt('radiobutton.root.focusRing.color')};
}
.p-radiobutton.p-invalid .p-radiobutton-box {
  border-width: 0;
  outline: none;
  box-shadow: 0 0 0 ${dt('radiobutton.root.focusRing.width')} ${dt('color.border.status.danger.focus')};
}
`;
