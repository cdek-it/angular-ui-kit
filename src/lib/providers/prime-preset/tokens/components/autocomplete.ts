
export const autocompleteCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Base ─── */
  .p-autocomplete {
    width: 100%;
  }

  .p-autocomplete:has(input:disabled) .p-autocomplete-input,
  .p-autocomplete:has(input:disabled) .p-autocomplete-input-multiple,
  .p-autocomplete:has(input:disabled) .p-autocomplete-dropdown {
    border-color: ${dt('form.borderColor')};
  }

  /* ─── Инпут и границы ─── */
  .p-autocomplete .p-autocomplete-input {
    width: 100%;
    padding: ${dt('autocomplete.root.paddingY')} ${dt('autocomplete.root.paddingX')};
    line-height: ${dt('fonts.lineHeight.250')};
  }

  /* Монолитный вид: убираем стыкующиеся границы инпута и dropdown-кнопки.
     border-inline-end-width не перезаписывается hover/focus, т.к. те меняют только border-color. */
  .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input {
    border-inline-end-width: 0;
  }

  /* Dropdown: дублируем border-inline-start: 0 с повышенной специфичностью,
     чтобы наш селектор гарантированно побеждал базовое правило PrimeNG. */
  .p-autocomplete .p-autocomplete-dropdown {
    border-inline-start: 0 none;
  }

  /* ─── States: Hover ─── */
  .p-autocomplete.p-component:not(:has(input:disabled)):hover .p-inputtext.p-autocomplete-input,
  .p-autocomplete.p-component:not(:has(input:disabled)):hover .p-autocomplete-dropdown,
  .p-autocomplete.p-component:not(:has(input:disabled)):has(.p-autocomplete-input:hover) .p-autocomplete-dropdown {
    border-color: ${dt('form.hoverBorderSecondaryColor')};
  }

  /* ─── States: Focus ─── */
  .p-autocomplete:has(.p-autocomplete-input:focus) .p-autocomplete-dropdown {
    border-color: ${dt('form.focusBorderSecondaryColor')};
  }

  /* ─── Иконки ─── */
  .p-autocomplete-clear-icon,
  .p-autocomplete-dropdown .p-icon {
    color: var(--p-form-field-icon-color);
  }

  .p-autocomplete.p-component:has(.p-autocomplete-dropdown) .p-autocomplete-clear-icon {
    inset-inline-end: ${dt('form.width.300')};
  }

  /* ─── Multiple: чипсы ─── */
  .p-autocomplete .p-autocomplete-input-multiple {
    line-height: ${dt('fonts.lineHeight.250')};
    padding: ${dt('autocomplete.root.paddingY')} ${dt('autocomplete.root.paddingX')};
  }

  .p-autocomplete .p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding: calc(${dt('autocomplete.root.paddingY')} - 5px);
  }

  .p-autocomplete .p-autocomplete-input-chip {
    padding-block-start: 0;
    padding-block-end: 0;
  }

  .p-autocomplete .p-autocomplete-input-multiple [data-pc-section="input"] {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0;
    margin: 0;
    line-height: inherit;
  }

  .p-autocomplete .p-autocomplete-chip,
  .p-autocomplete-option {
    gap: ${dt('autocomplete.extend.extOption.gap')};
  }

  .p-autocomplete-option-group {
    gap: ${dt('autocomplete.extend.extOptionGroup.gap')};
  }

  .p-chip.p-chip:has(.p-chip-remove-icon) {
    padding-inline-end: ${dt('chip.root.paddingX')};
  }

  /* ─── Sizes ─────────────────────────────────────────────────────────────────
     Повторяем padding-block / padding-inline из PrimeNG inputtext-size классов,
     но с повышенной специфичностью (.p-autocomplete.p-component + класс размера),
     чтобы перебить base-padding из .p-autocomplete .p-autocomplete-input выше.
  ──────────────────────────────────────────────────────────────────────────── */

  /* sm */
  .p-autocomplete.p-component .p-inputtext-sm.p-autocomplete-input,
  .p-autocomplete.p-component .p-inputtext-sm.p-autocomplete-input-multiple {
    font-size: ${dt('inputtext.root.sm.fontSize')};
    padding-block: ${dt('inputtext.root.sm.paddingY')};
    padding-inline: ${dt('inputtext.root.sm.paddingX')};
  }

  .p-autocomplete.p-component .p-inputtext-sm.p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-block: calc(${dt('inputtext.root.sm.paddingY')} - 4.75px);
    padding-inline: calc(${dt('inputtext.root.sm.paddingY')} - 4.75px);
  }

  /* lg */
  .p-autocomplete.p-component .p-inputtext-lg.p-autocomplete-input,
  .p-autocomplete.p-component .p-inputtext-lg.p-autocomplete-input-multiple {
    font-size: ${dt('inputtext.root.lg.fontSize')};
    padding-block: ${dt('inputtext.root.lg.paddingY')};
    padding-inline: ${dt('inputtext.root.lg.paddingX')};
  }

  .p-autocomplete.p-component .p-inputtext-lg.p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-block: calc(${dt('inputtext.root.lg.paddingY')} - 4.75px);
    padding-inline: calc(${dt('inputtext.root.lg.paddingY')} - 4.75px);
  }

  /* xlg */
  .p-autocomplete.p-component .p-inputtext-xlg.p-autocomplete-input,
  .p-autocomplete.p-component .p-inputtext-xlg.p-autocomplete-input-multiple {
    font-size: ${dt('inputtext.extend.extXlg.fontSize')};
    padding-block: ${dt('inputtext.extend.extXlg.paddingY')};
    padding-inline: ${dt('inputtext.extend.extXlg.paddingX')};
  }

  .p-autocomplete.p-component .p-inputtext-xlg.p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-block: calc(${dt('inputtext.extend.extXlg.paddingY')} - 4.75px);
    padding-inline: calc(${dt('inputtext.extend.extXlg.paddingY')} - 4.75px);
  }

  .p-autocomplete.p-component .p-inputtext-xlg .p-autocomplete-chip {
    padding-top: ${dt('dimension.space.200')};
    padding-bottom: ${dt('dimension.space.200')};
    font-size: ${dt('fonts.fontSize.300')};
  }
`;
