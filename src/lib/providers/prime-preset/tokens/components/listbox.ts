export const listboxCss = ({ dt }: { dt: (token: string) => string }): string => `
extra-listbox {
  display: block;
}
.p-listbox {
  border-width: 0;
  outline: ${dt('dimension.borderWidth.100')} solid ${dt('listbox.root.borderColor')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.300')};
}
.p-listbox.p-invalid {
  outline-color: ${dt('listbox.root.invalidBorderColor')};
}
.p-listbox.p-listbox-overlay {
  box-shadow: ${dt('listbox.extend.overlayShadow')};
}
.p-listbox .p-listbox-header {
  display: flex;
  align-items: center;
  gap: ${dt('listbox.extend.headerGap')};
}
.p-listbox .extra-listbox-filter {
  flex: 1;
  min-width: 0;
  position: relative;
}
.p-listbox .p-listbox-filter {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: ${dt('listbox.extend.filter.height')};
  padding: ${dt('listbox.extend.filter.padding')};
  padding-inline-end: calc(${dt('dimension.space.350')} + ${dt('listbox.extend.filter.iconSize')} + ${dt('dimension.space.100')});
  border: 0;
  outline: ${dt('dimension.borderWidth.100')} solid ${dt('listbox.extend.filter.borderColor')};
  border-radius: ${dt('listbox.root.borderRadius')};
  background: ${dt('listbox.extend.filter.background')};
  color: ${dt('listbox.extend.filter.color')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.150')};
  box-shadow: none;
}
.p-listbox .p-listbox-filter::placeholder {
  color: ${dt('listbox.extend.filter.placeholderColor')};
}
.p-listbox .p-listbox-filter:not(:placeholder-shown) {
  background: ${dt('listbox.extend.filter.filledBackground')};
}
.p-listbox .p-listbox-filter:enabled:hover {
  outline-color: ${dt('listbox.extend.filter.hoverBorderColor')};
}
.p-listbox .p-listbox-filter:enabled:focus {
  outline-color: ${dt('listbox.extend.filter.focusBorderColor')};
  box-shadow: ${dt('listbox.extend.filter.focusShadow')};
}
.p-listbox.p-invalid .p-listbox-filter {
  outline-color: ${dt('listbox.extend.filter.invalidBorderColor')};
  box-shadow: ${dt('listbox.extend.filter.invalidShadow')};
}
.p-listbox .p-listbox-filter:disabled {
  background: ${dt('listbox.extend.filter.disabledBackground')};
  color: ${dt('listbox.root.disabledColor')};
}
.p-listbox .extra-listbox-filter-icon {
  position: absolute;
  pointer-events: none;
  inset-inline-end: ${dt('dimension.space.350')};
  top: 50%;
  transform: translateY(-50%);
  font-size: ${dt('listbox.extend.filter.iconSize')};
  color: ${dt('listbox.extend.filter.placeholderColor')};
}
.p-listbox .extra-listbox-close {
  margin-inline-start: auto;
}
.p-listbox .extra-listbox-close .p-button.p-button-icon-only.p-button-sm {
  width: ${dt('listbox.extend.closeSize')};
  height: ${dt('listbox.extend.closeSize')};
  min-height: ${dt('listbox.extend.closeSize')};
  padding: 0;
  border-radius: ${dt('listbox.root.borderRadius')};
}
.p-listbox .p-listbox-option {
  display: flex;
  align-items: center;
  gap: ${dt('listbox.extend.extOption.gap')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.300')};
}
.p-listbox.p-listbox-checkmark .p-listbox-option:not(:has(.p-listbox-option-label-group)) {
  height: ${dt('listbox.extend.checkmarkHeight')};
  flex-shrink: 0;
}
.p-listbox .p-listbox-option-check-icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${dt('listbox.extend.iconSize')};
  height: ${dt('listbox.extend.iconSize')};
  font-size: ${dt('listbox.extend.iconSize')};
  margin-inline-start: ${dt('listbox.checkmark.gutterStart')};
  margin-inline-end: ${dt('listbox.checkmark.gutterEnd')};
}
.p-listbox .p-listbox-option .p-checkbox-input {
  display: none;
}
.p-listbox .p-checkbox.p-listbox-option-check-icon,
.p-listbox .p-checkbox,
.p-listbox .p-checkbox-box {
  width: ${dt('listbox.extend.checkboxSize')};
  height: ${dt('listbox.extend.checkboxSize')};
}
.p-listbox .p-listbox-option > i:not(.p-listbox-option-check-icon) {
  width: ${dt('listbox.extend.iconSize')};
  height: ${dt('listbox.extend.iconSize')};
  font-size: ${dt('listbox.extend.iconSize')};
  flex-shrink: 0;
}
.p-listbox .p-listbox-option:has(.p-listbox-option-label-group) {
  align-items: flex-start;
  font-size: ${dt('fonts.fontSize.300')};
}
.p-listbox-option-label-group {
  display: flex;
  flex-direction: column;
  gap: ${dt('listbox.extend.extOption.label.gap')};
}
.p-listbox-option-caption {
  color: ${dt('listbox.extend.extOption.caption.color')};
  font-size: ${dt('fonts.fontSize.100')};
  font-family: ${dt('fonts.fontFamily.heading')};
  line-height: ${dt('fonts.lineHeight.300')};
}
.p-listbox-striped li:nth-child(even of .p-listbox-option) .p-listbox-option-caption,
.p-listbox-option-selected .p-listbox-option-caption {
  color: ${dt('listbox.extend.extOption.caption.stripedColor')};
}
.p-listbox .p-listbox-option-group {
  display: flex;
  align-items: center;
  gap: ${dt('listbox.extend.extOption.gap')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.100')};
  line-height: ${dt('fonts.lineHeight.300')};
}
.p-listbox .p-listbox-option-group > i {
  font-size: ${dt('listbox.extend.iconSize')};
  width: ${dt('listbox.extend.iconSize')};
  height: ${dt('listbox.extend.iconSize')};
}
.p-listbox:not(.p-disabled) .p-listbox-option.p-listbox-option-selected:hover {
  background: ${dt('listbox.option.selectedFocusBackground')};
  color: ${dt('listbox.option.selectedFocusColor')};
}
.p-listbox .p-listbox-list-container:has(> .p-listbox-empty-message) {
  padding: ${dt('listbox.list.padding')};
}
.p-listbox .p-listbox-empty-message {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.300')};
}
`;
