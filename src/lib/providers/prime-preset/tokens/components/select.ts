export const selectCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-select.p-component {
    width: 100%;
    border-width: ${dt('select.extend.borderWidth')};
    line-height: ${dt('fonts.lineHeight.250')};
  }

  .p-select.p-component .p-select-label,
  .p-select-option {
    font-family: ${dt('fonts.fontFamily.base')};
  }

  .p-select-option {
    background: ${dt('select.extend.extOption.background')};
    gap: ${dt('select.extend.extOption.gap')};
  }

  .p-select-option-group {
    gap: ${dt('select.extend.extOptionGroup.gap')};
  }

  .p-select.p-component:not(.p-disabled).p-focus {
    box-shadow: 0 0 0 ${dt('select.root.focusRing.width')} ${dt('select.root.focusRing.color')};
  }

  .p-select.p-component.p-invalid.p-focus {
    border-color: ${dt('select.root.invalidBorderColor')};
    box-shadow: 0 0 0 ${dt('select.root.focusRing.width')} ${dt('color.bg.status.danger.weak.active')};
  }

  .p-select.p-component[readonly] {
    background: ${dt('select.extend.readonlyBackground')};
    border-color: ${dt('select.root.borderColor')};
    color: ${dt('select.root.color')};
    cursor: default;
    pointer-events: none;
  }

  .p-select.p-component[readonly] :is(.p-select-dropdown .p-select-dropdown-icon, .p-select-clear-icon) {
    color: ${dt('select.root.placeholderColor')};
  }

  .p-select.p-component.p-select-xlg .p-select-label {
    font-size: ${dt('inputtext.extend.extXlg.fontSize')};
    padding-block: ${dt('inputtext.extend.extXlg.paddingY')};
    padding-inline: ${dt('inputtext.extend.extXlg.paddingX')};
  }

  .p-floatlabel:has(.p-select.p-component) label {
    font-family: ${dt('fonts.fontFamily.base')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.250')};
    color: ${dt('color.bg.neutral.medium.strong')};
  }

  .p-floatlabel:has(.p-select.p-component) .p-floatlabel-active label {
    font-weight: ${dt('fonts.fontWeight.regular')};
  }

  .p-floatlabel-in .p-select.p-component .p-select-label {
    font-family: ${dt('fonts.fontFamily.base')};
    padding-block-start: ${dt('dimension.space.700')};
    padding-block-end: ${dt('dimension.space.300')};
  }

  .p-select-option:has(.p-select-option-check-icon) {
    background: ${dt('select.option.selectedBackground')};
    color: ${dt('select.option.selectedColor')};
  }

  .p-select-option:has(.p-select-option-check-icon).p-focus {
    background: ${dt('select.option.selectedFocusBackground')};
    color: ${dt('select.option.selectedFocusColor')};
  }

  .p-select-option .p-select-option-check-icon,
  .p-select-option .p-select-option-blank-icon {
    display: none;
  }

  .p-select-option:has(.p-select-option-check-icon)::before,
  .p-select-option:has(.p-select-option-blank-icon)::before {
    font-family: 'tabler-icons';
    content: "\\ea5e";
    font-size: ${dt('select.extend.iconSize')};
    color: ${dt('select.option.selectedColor')};
    flex-shrink: 0;
    margin-inline-start: ${dt('select.checkmark.gutterStart')};
    margin-inline-end: ${dt('select.checkmark.gutterEnd')};
  }

  .p-select-option:has(.p-select-option-check-icon).p-focus::before {
    color: ${dt('select.option.focusColor')};
  }

  .p-select-option:has(.p-select-option-blank-icon)::before {
    visibility: hidden;
  }

  .p-select.p-component :is(.p-select-dropdown .p-select-dropdown-icon, .p-select-clear-icon, .p-select-loading-icon) {
    font-size: ${dt('select.extend.iconSize')};
    width: ${dt('select.extend.iconSize')};
    height: ${dt('select.extend.iconSize')};
    color: ${dt('select.root.placeholderColor')};
  }
`;
