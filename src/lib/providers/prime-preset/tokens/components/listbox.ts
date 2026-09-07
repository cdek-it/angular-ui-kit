export const listboxCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-listbox-option {
  display: flex;
  align-items: center;
  gap: ${dt('listbox.extend.extOption.gap')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.none')};
}

.p-listbox-option:has(.p-listbox-option-label-group) {
  align-items: flex-start;
}

.p-listbox-option:has(.p-listbox-option-check-icon) {
  gap: unset;
}

.p-listbox-option-label-group {
  display: flex;
  flex-direction: column;
  gap: ${dt('listbox.extend.extOption.label.gap')};
}

.p-listbox-option-caption {
  color: ${dt('listbox.extend.extOption.caption.color')};
  font-size: ${dt('fonts.fontSize.200')};
  font-family: ${dt('fonts.fontFamily.heading')};
}

.p-listbox-striped li:nth-child(even of .p-listbox-option) .p-listbox-option-caption {
  color: ${dt('listbox.extend.extOption.caption.stripedColor')};
}

.p-listbox-check-icon {
  margin-inline-start: ${dt('listbox.checkmark.gutterStart')};
  margin-inline-end: ${dt('listbox.checkmark.gutterEnd')};
}

.p-listbox .p-listbox-list .p-listbox-option.p-listbox-option-selected .p-listbox-option-check-icon {
  color: ${dt('listbox.option.selectedColor')};
}
`;
