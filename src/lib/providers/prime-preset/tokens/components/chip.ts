export const chipCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-chip {
  border: ${dt('chip.extend.borderWidth')} solid ${dt('chip.extend.borderColor')};
}

.p-chip-icon {
  font-size: ${dt('chip.icon.size')};
}

.p-chip-label {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.none')};
}

.p-chip:has(.p-chip-remove-icon) {
  padding-inline-end: ${dt('chip.root.paddingX')};
}

.p-chip-remove-icon:focus-visible {
  outline: ${dt('chip.removeIcon.focusRing.width')} solid ${dt('chip.removeIcon.focusRing.color')};
}

.p-chip.p-disabled {
  opacity: ${dt('effects.opacity.50')};
  pointer-events: none;
}

.p-chip.p-disabled .p-chip-remove-icon {
  pointer-events: none;
}
`;
