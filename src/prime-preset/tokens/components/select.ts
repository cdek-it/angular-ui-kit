export const selectCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Базовые стили ─── */
  .p-select.p-component {
    width: 100%;
    border-width: ${dt('select.extend.borderWidth')};
    line-height: ${dt('fonts.lineHeight.250')};
  }

  .p-select.p-component .p-select-label,
  .p-select-option {
    font-family: ${dt('fonts.fontFamily.base')};
  }

  /* ─── Focus ─── */
  .p-select.p-component:not(.p-disabled).p-focus {
    box-shadow: 0 0 0 ${dt('select.root.focusRing.width')} ${dt('select.root.focusRing.color')};
  }

  /* ─── Invalid + Focus ─── */
  .p-select.p-component.p-invalid.p-focus {
    border-color: ${dt('select.root.invalidBorderColor')};
    box-shadow: 0 0 0 ${dt('select.root.focusRing.width')} ${dt('focusRing.extend.invalid')};
  }

  /* ─── Readonly ─── */
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

  /* ─── XLarge ─── */
  .p-select.p-component.p-select-xlg .p-select-label {
    font-size: ${dt('inputtext.extend.extXlg.fontSize')};
    padding-block: ${dt('inputtext.extend.extXlg.paddingY')};
    padding-inline: ${dt('inputtext.extend.extXlg.paddingX')};
  }

  /* ─── FloatLabel ─── */
  .p-floatlabel:has(.p-select.p-component) label {
    font-family: ${dt('fonts.fontFamily.base')};
    font-weight: ${dt('floatlabel.root.fontWeight')};
    line-height: ${dt('fonts.lineHeight.250')};
    color: ${dt('floatlabel.root.color')};
  }

  .p-floatlabel:has(.p-select.p-component) .p-floatlabel-active label {
    font-weight: ${dt('floatlabel.root.active.fontWeight')};
  }

  .p-floatlabel-in .p-select.p-component .p-select-label {
    font-family: ${dt('fonts.fontFamily.base')};
    padding-block-start: ${dt('floatlabel.in.input.paddingTop')};
    padding-block-end: ${dt('floatlabel.in.input.paddingBottom')};
  }

  /* ─── Checkmark: выбранный элемент ─── */
  .p-select-option:has(.p-select-option-check-icon) {
    background: ${dt('select.option.selectedBackground')};
    color: ${dt('select.option.selectedColor')};
  }

  .p-select-option:has(.p-select-option-check-icon).p-focus {
    background: ${dt('select.option.selectedFocusBackground')};
    color: ${dt('select.option.selectedFocusColor')};
  }

  /* Скрываем PrimeNG SVG, заменяем на tabler-иконку */
  .p-select-option .p-select-option-check-icon,
  .p-select-option .p-select-option-blank-icon {
    display: none;
  }

  .p-select-option:has(.p-select-option-check-icon)::before,
  .p-select-option:has(.p-select-option-blank-icon)::before {
    font-family: 'tabler-icons';
    content: var(--p-select-checkmark-content, "\\ea5e");
    font-size: ${dt('select.extend.iconSize')};
    color: ${dt('select.checkmark.color')};
    flex-shrink: 0;
    margin-inline-start: ${dt('select.checkmark.gutterStart')};
    margin-inline-end: ${dt('select.checkmark.gutterEnd')};
  }

  .p-select-option:has(.p-select-option-blank-icon)::before {
    visibility: hidden;
  }

  /* ─── Иконки ─── */
  .p-select.p-component :is(.p-select-dropdown .p-select-dropdown-icon, .p-select-clear-icon, .p-select-loading-icon) {
    font-size: ${dt('select.extend.iconSize')};
    width: ${dt('select.extend.iconSize')};
    height: ${dt('select.extend.iconSize')};
    color: ${dt('select.root.placeholderColor')};
  }
`;
