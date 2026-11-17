export const checkboxCss = ({ dt }: { dt: (token: string) => string }): string => `
.extra-checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: ${dt('dimension.space.350')};
}
.extra-checkbox--left {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
.extra-checkbox-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: ${dt('dimension.space.50')};
}
.checkbox-label {
  color: ${dt('color.fg.default')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.400')};
  cursor: pointer;
}
.checkbox-label--disabled {
  cursor: default;
}
.p-checkbox-box {
  border-width: ${dt('checkbox.root.extend.borderWidth')};
}
.p-checkbox:not(.p-disabled):has(.p-checkbox-box > svg[data-p-icon='minus']) .p-checkbox-box {
  background: ${dt('checkbox.root.checkedBackground')};
  border-color: ${dt('checkbox.root.checkedBorderColor')};
}
.p-checkbox-box > svg.p-checkbox-icon {
  display: none;
}
.p-checkbox-box:has(> svg.p-checkbox-icon)::before {
  font-family: 'tabler-icons';
  font-style: normal;
  font-weight: normal;
  font-size: ${dt('checkbox.icon.size')};
  line-height: 1;
  color: ${dt('checkbox.icon.checkedColor')};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.p-checkbox-box:has(> svg[data-p-icon='check'])::before {
  content: '\\ea5e';
}
.p-checkbox-box:has(> svg[data-p-icon='minus'])::before {
  content: '\\eaf2';
}
.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box::before {
  color: ${dt('checkbox.icon.checkedHoverColor')};
}
.p-checkbox.p-disabled .p-checkbox-box::before {
  color: ${dt('checkbox.icon.disabledColor')};
}
.p-checkbox:not(.p-disabled):has(.p-checkbox-box > svg[data-p-icon='minus']):has(.p-checkbox-input:hover) .p-checkbox-box {
  background: ${dt('checkbox.root.checkedHoverBackground')};
  border-color: ${dt('checkbox.root.checkedHoverBorderColor')};
}
.p-checkbox.p-disabled .p-checkbox-box {
  background: ${dt('checkbox.root.disabledBackground')};
  border-color: ${dt('checkbox.root.checkedDisabledBorderColor')};
}
.p-checkbox:not(.p-disabled):not(.p-invalid):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
  border-width: 0;
  box-shadow: 0 0 0 ${dt('checkbox.root.focusRing.width')} ${dt('checkbox.root.focusRing.color')};
}
.p-checkbox.p-invalid .p-checkbox-box {
  border-width: 0;
  box-shadow: 0 0 0 ${dt('checkbox.root.focusRing.width')} ${dt('color.border.status.danger.focus')};
}
`;
