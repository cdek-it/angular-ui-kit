export const togglebuttonCss = ({ dt }: { dt: (token: string) => string }): string => `
extra-togglebutton {
  display: inline-flex;
  vertical-align: middle;
}
extra-togglebutton:has(> .p-togglebutton-fluid) {
  display: flex;
  width: 100%;
}
.p-togglebutton.p-component {
  align-items: center;
  justify-content: center;
  height: ${dt('togglebutton.extend.iconOnlyWidth')};
  border-width: ${dt('togglebutton.root.borderWidth')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-weight: ${dt('togglebutton.root.fontWeight')};
  font-size: ${dt('togglebutton.root.fontSize')};
  line-height: ${dt('togglebutton.root.lineHeight')};
}
.p-togglebutton .p-togglebutton-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${dt('togglebutton.extend.iconSize.md')};
  width: ${dt('togglebutton.extend.iconSize.md')};
  height: ${dt('togglebutton.extend.iconSize.md')};
  line-height: 1;
}
.p-togglebutton.p-togglebutton-sm {
  height: ${dt('togglebutton.extend.extSm.iconOnlyWidth')};
  font-size: ${dt('togglebutton.root.sm.fontSize')};
  line-height: ${dt('fonts.lineHeight.300')};
}
.p-togglebutton.p-togglebutton-sm .p-togglebutton-icon {
  font-size: ${dt('togglebutton.extend.iconSize.sm')};
  width: ${dt('togglebutton.extend.iconSize.sm')};
  height: ${dt('togglebutton.extend.iconSize.sm')};
}
.p-togglebutton.p-togglebutton-lg {
  height: ${dt('togglebutton.extend.extLg.iconOnlyWidth')};
  font-size: ${dt('togglebutton.root.lg.fontSize')};
  line-height: ${dt('togglebutton.root.lineHeight')};
}
.p-togglebutton.p-togglebutton-lg .p-togglebutton-content {
  gap: ${dt('togglebutton.extend.ext.gap')};
}
.p-togglebutton.p-togglebutton-lg .p-togglebutton-icon {
  font-size: ${dt('togglebutton.extend.iconSize.lg')};
  width: ${dt('togglebutton.extend.iconSize.lg')};
  height: ${dt('togglebutton.extend.iconSize.lg')};
}
.p-togglebutton.p-togglebutton-xlarge {
  height: ${dt('togglebutton.extend.extXlg.iconOnlyWidth')};
  padding: ${dt('togglebutton.extend.extXlg.padding')};
  font-size: ${dt('togglebutton.extend.extXlg.fontSize')};
  line-height: ${dt('togglebutton.extend.extXlg.lineHeight')};
}
.p-togglebutton.p-togglebutton-icon-only {
  padding: ${dt('dimension.space.none')};
  width: ${dt('togglebutton.extend.iconOnlyWidth')};
}
.p-togglebutton.p-togglebutton-sm.p-togglebutton-icon-only {
  width: ${dt('togglebutton.extend.extSm.iconOnlyWidth')};
}
.p-togglebutton.p-togglebutton-lg.p-togglebutton-icon-only {
  width: ${dt('togglebutton.extend.extLg.iconOnlyWidth')};
}
.p-togglebutton.p-togglebutton-xlarge.p-togglebutton-icon-only {
  width: ${dt('togglebutton.extend.extXlg.iconOnlyWidth')};
}
.p-togglebutton.p-togglebutton-icon-only .p-togglebutton-label {
  display: none;
}
.p-togglebutton.p-component:not(.p-disabled):not(.p-togglebutton-checked):hover {
  border-color: ${dt('togglebutton.extend.hoverBorderColor')};
}
.p-togglebutton.p-component.p-togglebutton-checked:not(.p-disabled):hover {
  background: ${dt('togglebutton.extend.checkedHoverBackground')};
  border-color: ${dt('togglebutton.extend.checkedHoverBorderColor')};
  color: ${dt('togglebutton.extend.checkedHoverColor')};
}
.p-togglebutton.p-component:focus-visible {
  border-width: 0;
  outline: none;
  box-shadow: 0 0 0 ${dt('togglebutton.root.borderWidth')} ${dt('togglebutton.extend.focusBorderColor')}, ${dt('togglebutton.root.focusRing.shadow')};
}
.p-togglebutton.p-component:not(.p-togglebutton-icon-only):focus-visible {
  height: calc(${dt('togglebutton.extend.iconOnlyWidth')} - ${dt('togglebutton.root.borderWidth')} * 2);
}
.p-togglebutton.p-component.p-togglebutton-sm:not(.p-togglebutton-icon-only):focus-visible {
  height: calc(${dt('togglebutton.extend.extSm.iconOnlyWidth')} - ${dt('togglebutton.root.borderWidth')} * 2);
}
.p-togglebutton.p-component.p-togglebutton-lg:not(.p-togglebutton-icon-only):focus-visible {
  height: calc(${dt('togglebutton.extend.extLg.iconOnlyWidth')} - ${dt('togglebutton.root.borderWidth')} * 2);
}
.p-togglebutton.p-component.p-togglebutton-xlarge:not(.p-togglebutton-icon-only):focus-visible {
  height: calc(${dt('togglebutton.extend.extXlg.iconOnlyWidth')} - ${dt('togglebutton.root.borderWidth')} * 2);
}
.p-togglebutton.p-component.p-disabled,
.p-togglebutton.p-component.p-disabled:hover {
  cursor: default;
  background: ${dt('togglebutton.root.disabledBackground')};
  border-color: ${dt('togglebutton.root.disabledBorderColor')};
  color: ${dt('togglebutton.root.disabledColor')};
}
.p-togglebutton.p-component.p-disabled .p-togglebutton-icon {
  color: ${dt('togglebutton.icon.disabledColor')};
}
`;
