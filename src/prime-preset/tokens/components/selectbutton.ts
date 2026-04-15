export const selectbuttonCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-selectbutton.p-component {
  background: ${dt('selectbutton.colorScheme.light.extend.background')};
  padding: ${dt('selectbutton.extend.paddingY')} ${dt('selectbutton.extend.paddingX')};
  gap: ${dt('selectbutton.extend.gap')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-weight: ${dt('fonts.fontWeight.demibold')};
}

.p-selectbutton.p-component .p-togglebutton.p-component {
  font-family: ${dt('fonts.fontFamily.heading')};
  font-weight: ${dt('fonts.fontWeight.demibold')};
  line-height: ${dt('fonts.lineHeight.500')};
  height: ${dt('controls.iconOnly.700')};
  border-radius: ${dt('selectbutton.extend.ext.borderRadius')};
}

.p-selectbutton.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('fonts.lineHeight.400')};
}

.p-selectbutton.p-component .p-togglebutton.p-togglebutton-checked.p-component,
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-checked.p-component:hover {
  background: ${dt('selectbutton.extend.checkedBackground')};
  border-radius: ${dt('selectbutton.extend.ext.borderRadius')};
  border-color: ${dt('selectbutton.extend.checkedBorderColor')};
  color: ${dt('selectbutton.extend.checkedColor')};
}

.p-selectbutton.p-component .p-togglebutton.p-component:not(:disabled):not(.p-togglebutton-checked):hover {
  border-radius: ${dt('selectbutton.extend.ext.borderRadius')};
  border-color: ${dt('togglebutton.extend.hoverBorderColor')};
}

/* Size: sm */
.p-selectbutton.p-selectbutton-sm.p-component .p-togglebutton.p-component {
  line-height: ${dt('fonts.lineHeight.300')};
  height: ${dt('controls.iconOnly.600')};
}

.p-selectbutton.p-selectbutton-sm.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-selectbutton-sm.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('fonts.lineHeight.250')};
}

.p-selectbutton.p-selectbutton-sm.p-component .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-selectbutton-sm.p-component .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.sm')};
}

/* Size: md (base) */
.p-selectbutton.p-component:not(.p-selectbutton-sm):not(.p-selectbutton-lg):not(.p-selectbutton-xlg) .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-component:not(.p-selectbutton-sm):not(.p-selectbutton-lg):not(.p-selectbutton-xlg) .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.md')};
}

/* Size: lg */
.p-selectbutton.p-selectbutton-lg.p-component .p-togglebutton.p-component {
  line-height: ${dt('fonts.lineHeight.550')};
  height: ${dt('controls.iconOnly.850')};
}

.p-selectbutton.p-selectbutton-lg.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-selectbutton-lg.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('fonts.lineHeight.550')};
}

.p-selectbutton.p-selectbutton-lg.p-component .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-selectbutton-lg.p-component .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.lg')};
}

/* Size: xlg */
.p-selectbutton.p-selectbutton-xlg.p-component .p-togglebutton.p-component {
  font-size: ${dt('fonts.fontSize.600')};
  line-height: ${dt('fonts.lineHeight.550')};
  height: ${dt('controls.iconOnly.900')};
}

.p-selectbutton.p-selectbutton-xlg.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-selectbutton-xlg.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('fonts.lineHeight.700')};
}

.p-selectbutton.p-selectbutton-xlg.p-component .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-selectbutton-xlg.p-component .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.xlg')};
}
`;
