export const selectbuttonCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-selectbutton.p-component {
  background: ${dt('selectbutton.colorScheme.light.extend.background')};
  padding: ${dt('selectbutton.extend.paddingY')} ${dt('selectbutton.extend.paddingX')};
  gap: ${dt('selectbutton.extend.gap')};
  font-family: ${dt('selectbutton.extend.fonts_fontFamily_heading')};
  font-weight: ${dt('selectbutton.extend.fonts_fontWeight_demibold')};
}

.p-selectbutton.p-component .p-togglebutton.p-component {
  font-family: ${dt('selectbutton.extend.fonts_fontFamily_heading')};
  font-weight: ${dt('selectbutton.extend.fonts_fontWeight_demibold')};
  line-height: ${dt('selectbutton.extend.fonts_lineHeight_500')};
  height: ${dt('selectbutton.extend.controls_iconOnly_700')};
  border-radius: ${dt('selectbutton.extend.ext.borderRadius')};
}

.p-selectbutton.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('selectbutton.extend.fonts_lineHeight_400')};
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

/* Size: small */
.p-selectbutton.p-selectbutton-small.p-component .p-togglebutton.p-component {
  line-height: ${dt('selectbutton.extend.fonts_lineHeight_300')};
  height: ${dt('selectbutton.extend.controls_iconOnly_600')};
}

.p-selectbutton.p-selectbutton-small.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-selectbutton-small.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('selectbutton.extend.fonts_lineHeight_250')};
}

.p-selectbutton.p-selectbutton-small.p-component .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-selectbutton-small.p-component .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.sm')};
}

/* Size: base */
.p-selectbutton.p-component:not(.p-selectbutton-small):not(.p-selectbutton-large):not(.p-selectbutton-xlarge) .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-component:not(.p-selectbutton-small):not(.p-selectbutton-large):not(.p-selectbutton-xlarge) .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.md')};
}

/* Size: large */
.p-selectbutton.p-selectbutton-large.p-component .p-togglebutton.p-component {
  line-height: ${dt('selectbutton.extend.fonts_lineHeight_550')};
  height: ${dt('selectbutton.extend.controls_iconOnly_850')};
}

.p-selectbutton.p-selectbutton-large.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-selectbutton-large.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('selectbutton.extend.fonts_lineHeight_550')};
}

.p-selectbutton.p-selectbutton-large.p-component .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-selectbutton-large.p-component .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.lg')};
}

/* Size: xlarge */
.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton.p-component {
  font-size: ${dt('selectbutton.extend.fonts_fontSize_600')};
  line-height: ${dt('selectbutton.extend.fonts_lineHeight_550')};
  height: ${dt('selectbutton.extend.controls_iconOnly_900')};
}

.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('selectbutton.extend.fonts_lineHeight_700')};
}

.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.xlg')};
}
`;
