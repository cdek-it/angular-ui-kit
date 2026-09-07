export const autocompleteCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Base ─── */
  .p-autocomplete {
    width: 100%;
  }

  .p-autocomplete:has(input:disabled) .p-autocomplete-input,
  .p-autocomplete:has(input:disabled) .p-autocomplete-input-multiple,
  .p-autocomplete:has(input:disabled) .p-autocomplete-dropdown {
    border-color: ${dt('color.fg.muted')};
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
    border-color: ${dt('color.bg.brand.strong.hover')};
  }

  /* ─── States: Focus ─── */
  .p-autocomplete:has(.p-autocomplete-input:focus) .p-autocomplete-dropdown {
    border-color: ${dt('color.bg.brand.strong.hover')};
  }

  /* ─── Иконки ─── */
  .p-autocomplete-clear-icon,
  .p-autocomplete-dropdown .p-icon {
    color: ${dt('autocomplete.dropdown.color')};
  }

  .p-autocomplete.p-component:has(.p-autocomplete-dropdown) .p-autocomplete-clear-icon {
    inset-inline-end: ${dt('dimension.size.1100')};
  }

  /* ─── Multiple: чипсы ─── */
  .p-autocomplete .p-autocomplete-input-multiple {
    line-height: ${dt('fonts.lineHeight.250')};
    padding: ${dt('autocomplete.root.paddingY')} ${dt('autocomplete.root.paddingX')};
  }

  .p-autocomplete .p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding: calc(${dt('autocomplete.root.paddingY')} - ${dt('chip.root.paddingY')} - ${dt('chip.extend.borderWidth')});
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

  .p-autocomplete-option {
    background: ${dt('autocomplete.extend.option.background')};
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
    padding-block: calc(${dt('inputtext.root.sm.paddingY')} - ${dt('chip.root.paddingY')} - ${dt('chip.extend.borderWidth')});
    padding-inline: calc(${dt('inputtext.root.sm.paddingY')} - ${dt('chip.root.paddingY')} - ${dt('chip.extend.borderWidth')});
  }

  /* lg */
  .p-autocomplete.p-component .p-inputtext-lg.p-autocomplete-input,
  .p-autocomplete.p-component .p-inputtext-lg.p-autocomplete-input-multiple {
    font-size: ${dt('inputtext.root.lg.fontSize')};
    padding-block: ${dt('inputtext.root.lg.paddingY')};
    padding-inline: ${dt('inputtext.root.lg.paddingX')};
  }

  .p-autocomplete.p-component .p-inputtext-lg.p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-block: calc(${dt('inputtext.root.lg.paddingY')} - ${dt('chip.root.paddingY')} - ${dt('chip.extend.borderWidth')});
    padding-inline: calc(${dt('inputtext.root.lg.paddingY')} - ${dt('chip.root.paddingY')} - ${dt('chip.extend.borderWidth')});
  }

  /* xlg */
  .p-autocomplete.p-component .p-inputtext-xlg.p-autocomplete-input,
  .p-autocomplete.p-component .p-inputtext-xlg.p-autocomplete-input-multiple {
    font-size: ${dt('inputtext.extend.extXlg.fontSize')};
    padding-block: ${dt('inputtext.extend.extXlg.paddingY')};
    padding-inline: ${dt('inputtext.extend.extXlg.paddingX')};
  }

  .p-autocomplete.p-component .p-inputtext-xlg.p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-block: calc(${dt('inputtext.extend.extXlg.paddingY')} - ${dt('chip.root.paddingY')} - ${dt('chip.extend.borderWidth')});
    padding-inline: calc(${dt('inputtext.extend.extXlg.paddingY')} - ${dt('chip.root.paddingY')} - ${dt('chip.extend.borderWidth')});
  }

  .p-autocomplete.p-component .p-inputtext-xlg .p-autocomplete-chip {
    padding-top: ${dt('dimension.space.200')};
    padding-bottom: ${dt('dimension.space.200')};
    font-size: ${dt('fonts.fontSize.300')};
  }
`;
