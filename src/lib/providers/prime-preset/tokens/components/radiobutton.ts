export const radiobuttonCss = ({ dt }: { dt: (token: string) => string }): string => `
/* Focus ring с зеленым цветом для валидных состояний */
.p-radiobutton:not(.p-disabled):not(.p-invalid):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box,
.p-radiobutton-checked:not(.p-disabled):not(.p-invalid):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
  outline: none;
  box-shadow: 0 0 0 ${dt('radiobutton.focusRing.width')} ${dt('focusRing.success')};
}

/* Focus ring с красным цветом для состояний с ошибкой */
.p-radiobutton.p-invalid .p-radiobutton-box,
.p-radiobutton.p-invalid:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box,
.p-radiobutton-checked.p-invalid .p-radiobutton-box,
.p-radiobutton-checked.p-invalid:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
  box-shadow: 0 0 0 ${dt('radiobutton.focusRing.width')} ${dt('focusRing.invalid')};
}
`;
