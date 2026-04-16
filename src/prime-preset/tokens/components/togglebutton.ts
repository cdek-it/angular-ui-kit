export const togglebuttonCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Типографика ─── */
.p-togglebutton.p-component {
  font-family: ${dt('fonts.fontFamily.heading')};
  font-weight: ${dt('fonts.fontWeight.demibold')};
  line-height: ${dt('fonts.lineHeight.50')};
}

/* ─── Hover unchecked ─── */
.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
  border-color: ${dt('togglebutton.extend.hoverBorderColor')};
}

/* ─── Hover checked ─── */
.p-togglebutton.p-togglebutton-checked:hover {
  background: ${dt('togglebutton.extend.checkedHoverBackground')};
  border-color: ${dt('togglebutton.extend.checkedHoverBorderColor')};
  color: ${dt('togglebutton.extend.checkedHoverColor')};
}

/* ─── Small ─── */
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-sm {
  line-height: ${dt('fonts.lineHeight.30')};
}
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-sm .p-togglebutton-label {
  line-height: ${dt('fonts.lineHeight.25')};
}
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-sm .p-togglebutton-icon {
  font-size: ${dt('togglebutton.extend.iconSize.sm')};
}

/* ─── Base (default) ─── */
.p-togglebutton.p-component:not(.p-togglebutton-sm):not(.p-togglebutton-lg):not(.p-togglebutton-xlg) .p-togglebutton-icon {
  font-size: ${dt('togglebutton.extend.iconSize.md')};
}

/* ─── Large ─── */
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-lg {
  line-height: ${dt('fonts.lineHeight.55')};
  gap: ${dt('togglebutton.root.gap')};
}
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-lg .p-togglebutton-content {
  gap: ${dt('togglebutton.extend.ext.gap')};
}
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-lg .p-togglebutton-icon {
  font-size: ${dt('togglebutton.extend.iconSize.lg')};
}

/* ─── Extra Large ─── */
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-xlg {
  padding: ${dt('togglebutton.extend.extXlg.padding')};
  font-size: ${dt('fonts.fontSize.2xl')};
  line-height: ${dt('fonts.lineHeight.55')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${dt('togglebutton.root.gap')};
}
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-xlg .p-togglebutton-content {
  gap: ${dt('togglebutton.extend.ext.gap')};
}
.p-togglebutton.p-togglebutton.p-component.p-togglebutton-xlg .p-togglebutton-icon {
  font-size: ${dt('togglebutton.extend.iconSize.lg')};
}

/* ─── Icon-only base ─── */
.p-togglebutton.p-togglebutton-icon-only {
  padding: 0;
  width: ${dt('togglebutton.extend.iconOnlyWidth')};
  height: ${dt('togglebutton.extend.iconOnlyWidth')};
  border-radius: ${dt('togglebutton.root.borderRadius')};
}
.p-togglebutton.p-togglebutton-icon-only .p-togglebutton-label {
  display: none;
}

/* ─── Icon-only sm ─── */
.p-togglebutton.p-togglebutton-sm.p-togglebutton-icon-only {
  width: ${dt('togglebutton.extend.extSm.iconOnlyWidth')};
  height: ${dt('togglebutton.extend.extSm.iconOnlyWidth')};
}

/* ─── Icon-only lg ─── */
.p-togglebutton.p-togglebutton-lg.p-togglebutton-icon-only {
  width: ${dt('togglebutton.extend.extLg.iconOnlyWidth')};
  height: ${dt('togglebutton.extend.extLg.iconOnlyWidth')};
}

/* ─── Icon-only xlg ─── */
.p-togglebutton.p-togglebutton-xlg.p-togglebutton-icon-only {
  width: ${dt('togglebutton.extend.extXlg.iconOnlyWidth')};
  height: ${dt('togglebutton.extend.extXlg.iconOnlyWidth')};
}
`;
