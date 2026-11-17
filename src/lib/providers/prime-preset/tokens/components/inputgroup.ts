export const inputgroupCss = ({ dt }: { dt: (token: string) => string }): string => `
extra-input-group {
  display: block;
  min-width: 0;
}

extra-input-group > .p-inputgroup {
  align-items: stretch;
  min-width: 0;
  gap: ${dt('dimension.space.none')};
}

.p-inputgroup > extra-input-group-addon,
.p-inputgroup > extra-input-text {
  display: contents;
}

.p-inputgroup > extra-input-group-addon > .p-inputgroupaddon {
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  min-width: ${dt('inputgroup.addon.minWidth')};
  padding: ${dt('inputgroup.addon.padding')};
  border: 0;
  border-radius: 0;
  font-family: ${dt('fonts.fontFamily.base')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  font-size: ${dt('fonts.fontSize.300')};
  line-height: ${dt('fonts.lineHeight.300')};
}

.p-inputgroup > extra-input-group-addon > .extra-input-group-addon--icon {
  width: ${dt('inputgroup.addon.minWidth')};
}

.p-inputgroup > extra-input-group-addon > .p-inputgroupaddon::before {
  content: '';
  position: absolute;
  pointer-events: none;
  inset: calc(-1 * ${dt('inputgroup.extend.borderWidth')});
  border-block: ${dt('inputgroup.extend.borderWidth')} solid ${dt('inputgroup.addon.borderColor')};
  border-radius: inherit;
}

.p-inputgroup > extra-input-group-addon:first-child > .p-inputgroupaddon {
  border-start-start-radius: ${dt('inputgroup.addon.borderRadius')};
  border-end-start-radius: ${dt('inputgroup.addon.borderRadius')};
}

.p-inputgroup > extra-input-group-addon:first-child > .p-inputgroupaddon::before,
.p-inputgroup > extra-input-group-addon + extra-input-group-addon > .p-inputgroupaddon::before {
  border-inline-start: ${dt('inputgroup.extend.borderWidth')} solid ${dt('inputgroup.addon.borderColor')};
}

.p-inputgroup > extra-input-group-addon:last-child > .p-inputgroupaddon {
  border-start-end-radius: ${dt('inputgroup.addon.borderRadius')};
  border-end-end-radius: ${dt('inputgroup.addon.borderRadius')};
}

.p-inputgroup > extra-input-group-addon:last-child > .p-inputgroupaddon::before {
  border-inline-end: ${dt('inputgroup.extend.borderWidth')} solid ${dt('inputgroup.addon.borderColor')};
}

.p-inputgroup > extra-input-text .p-inputtext {
  min-width: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  outline: ${dt('inputgroup.extend.borderWidth')} solid ${dt('inputgroup.extend.field.borderColor')};
  outline-offset: 0;
  box-shadow: none;
  background: ${dt('inputgroup.extend.field.background')};
  color: ${dt('inputgroup.extend.field.color')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-weight: ${dt('fonts.fontWeight.regular')};
}

.p-inputgroup > extra-input-text .p-inputtext::placeholder {
  color: ${dt('inputgroup.extend.field.placeholderColor')};
}

.p-inputgroup > extra-input-text:first-child .p-inputtext {
  border-start-start-radius: ${dt('inputgroup.addon.borderRadius')};
  border-end-start-radius: ${dt('inputgroup.addon.borderRadius')};
}

.p-inputgroup > extra-input-text:last-child .p-inputtext {
  border-start-end-radius: ${dt('inputgroup.addon.borderRadius')};
  border-end-end-radius: ${dt('inputgroup.addon.borderRadius')};
}

.p-inputgroup > extra-input-text .p-inputtext:enabled:hover,
.p-inputgroup > extra-input-text .p-inputtext:enabled:focus {
  outline-color: ${dt('inputgroup.extend.field.hoverBorderColor')};
}

.p-inputgroup > extra-input-text .p-inputtext:enabled:focus {
  box-shadow: 0 0 0 ${dt('inputgroup.extend.field.focusRingWidth')} ${dt('inputgroup.extend.field.focusRingColor')};
}

.p-inputgroup > extra-input-text .p-inputtext.p-invalid,
.p-inputgroup > extra-input-text .p-inputtext.p-invalid:enabled:hover,
.p-inputgroup > extra-input-text .p-inputtext.p-invalid:enabled:focus {
  outline-color: ${dt('inputgroup.extend.field.invalidBorderColor')};
}

.p-inputgroup > extra-input-text .p-inputtext.p-invalid:focus {
  box-shadow: 0 0 0 ${dt('inputgroup.extend.field.focusRingWidth')} ${dt('inputgroup.extend.field.invalidFocusRingColor')};
}

.p-inputgroup > extra-input-text .p-inputtext:enabled:read-only {
  background: ${dt('inputgroup.extend.field.readonlyBackground')};
}

.p-inputgroup:has(input:disabled) > extra-input-group-addon > .p-inputgroupaddon,
.p-inputgroup:has(textarea:disabled) > extra-input-group-addon > .p-inputgroupaddon,
.p-inputgroup:has(.p-component[disabled]) > extra-input-group-addon > .p-inputgroupaddon,
.p-inputgroup:has(.p-component.p-disabled) > extra-input-group-addon > .p-inputgroupaddon,
.p-inputgroup > extra-input-text .p-inputtext:disabled {
  background: ${dt('inputgroup.extend.disabledBackground')};
  color: ${dt('inputgroup.extend.disabledColor')};
  opacity: 1;
}

.p-inputgroup .p-inputgroupaddon i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 1;
  font-size: ${dt('inputgroup.extend.iconSize')};
  width: ${dt('inputgroup.extend.iconSize')};
  height: ${dt('inputgroup.extend.iconSize')};
}

extra-input-group > .p-inputgroup:not(.p-inputgroup-sm):not(.p-inputgroup-lg):not(.p-inputgroup-xlg) {
  height: calc(${dt('inputgroup.extend.base.lineHeight')} + 2 * ${dt('inputgroup.extend.base.paddingY')});
}

.p-inputgroup:not(.p-inputgroup-sm):not(.p-inputgroup-lg):not(.p-inputgroup-xlg) > extra-input-text .p-inputtext {
  padding: ${dt('inputgroup.extend.base.paddingY')} ${dt('inputgroup.extend.base.paddingX')};
  font-size: ${dt('inputgroup.extend.base.fontSize')};
  line-height: ${dt('inputgroup.extend.base.lineHeight')};
}

.p-inputgroup:not(.p-inputgroup-sm):not(.p-inputgroup-lg):not(.p-inputgroup-xlg) .p-inputgroupaddon i {
  font-size: ${dt('inputgroup.extend.base.iconSize')};
  width: ${dt('inputgroup.extend.base.iconSize')};
  height: ${dt('inputgroup.extend.base.iconSize')};
}

extra-input-group > .p-inputgroup.p-inputgroup-sm {
  height: calc(${dt('inputgroup.extend.small.lineHeight')} + 2 * ${dt('inputgroup.extend.small.paddingY')});
}

.p-inputgroup.p-inputgroup-sm > extra-input-text .p-inputtext {
  padding: ${dt('inputgroup.extend.small.paddingY')} ${dt('inputgroup.extend.small.paddingX')};
  font-size: ${dt('inputgroup.extend.small.fontSize')};
  line-height: ${dt('inputgroup.extend.small.lineHeight')};
}

.p-inputgroup.p-inputgroup-sm .p-inputgroupaddon i {
  font-size: ${dt('inputgroup.extend.small.iconSize')};
  width: ${dt('inputgroup.extend.small.iconSize')};
  height: ${dt('inputgroup.extend.small.iconSize')};
}

extra-input-group > .p-inputgroup.p-inputgroup-lg {
  height: calc(${dt('inputgroup.extend.large.lineHeight')} + 2 * ${dt('inputgroup.extend.large.paddingY')});
}

.p-inputgroup.p-inputgroup-lg > extra-input-text .p-inputtext {
  padding: ${dt('inputgroup.extend.large.paddingY')} ${dt('inputgroup.extend.large.paddingX')};
  font-size: ${dt('inputgroup.extend.large.fontSize')};
  line-height: ${dt('inputgroup.extend.large.lineHeight')};
}

.p-inputgroup.p-inputgroup-lg .p-inputgroupaddon i {
  font-size: ${dt('inputgroup.extend.large.iconSize')};
  width: ${dt('inputgroup.extend.large.iconSize')};
  height: ${dt('inputgroup.extend.large.iconSize')};
}

extra-input-group > .p-inputgroup.p-inputgroup-xlg {
  height: calc(${dt('inputgroup.extend.xlarge.lineHeight')} + 2 * ${dt('inputgroup.extend.xlarge.paddingY')});
}

.p-inputgroup.p-inputgroup-xlg > extra-input-text .p-inputtext {
  padding: ${dt('inputgroup.extend.xlarge.paddingY')} ${dt('inputgroup.extend.xlarge.paddingX')};
  font-size: ${dt('inputgroup.extend.xlarge.fontSize')};
  line-height: ${dt('inputgroup.extend.xlarge.lineHeight')};
}

.p-inputgroup.p-inputgroup-xlg .p-inputgroupaddon i {
  font-size: ${dt('inputgroup.extend.xlarge.iconSize')};
  width: ${dt('inputgroup.extend.xlarge.iconSize')};
  height: ${dt('inputgroup.extend.xlarge.iconSize')};
}
`;
