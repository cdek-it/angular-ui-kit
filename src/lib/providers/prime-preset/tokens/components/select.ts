export const selectCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Базовые стили ─── */
  .p-select.p-component {
    width: 100%;
    border-width: ${dt('select.extend.borderWidth')};
    line-height: ${dt('select.extend.fonts_lineHeight_250')};
  }

  .p-select.p-component .p-select-label,
  .p-select-option {
    font-family: ${dt('select.extend.fonts_fontFamily_base')};
  }

  /* ─── Focus ─── */
  .p-select.p-component:not(.p-disabled).p-focus {
    box-shadow: 0 0 0 ${dt('select.root.focusRing.width')} ${dt('select.root.focusRing.color')};
  }

  /* ─── Invalid + Focus ─── */
  .p-select.p-component.p-invalid.p-focus {
    border-color: ${dt('select.root.invalidBorderColor')};
    box-shadow: 0 0 0 ${dt('select.root.focusRing.width')} ${dt('select.extend.focusRing_invalid')};
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
    font-family: ${dt('select.extend.fonts_fontFamily_base')};
    font-weight: ${dt('select.extend.floatlabel_root_fontWeight')};
    line-height: ${dt('select.extend.fonts_lineHeight_250')};
    color: ${dt('select.extend.floatlabel_root_color')};
  }

  .p-floatlabel:has(.p-select.p-component) .p-floatlabel-active label {
    font-weight: ${dt('select.extend.floatlabel_root_active_fontWeight')};
  }

  .p-floatlabel-in .p-select.p-component .p-select-label {
    font-family: ${dt('select.extend.fonts_fontFamily_base')};
    padding-block-start: ${dt('select.extend.floatlabel_in_input_paddingTop')};
    padding-block-end: ${dt('select.extend.floatlabel_in_input_paddingBottom')};
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
    color: var(--p-select-option-selected-color);
    flex-shrink: 0;
    margin-inline-start: ${dt('select.checkmark.gutterStart')};
    margin-inline-end: ${dt('select.checkmark.gutterEnd')};
  }

  .p-select-option:has(.p-select-option-check-icon).p-focus::before {
    color: var(--p-select-option-focus-color);
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
