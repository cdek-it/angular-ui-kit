export const multiselectCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Базовые стили ─── */
  .p-multiselect.p-component {
    width: 100%;
    border-width: ${dt('multiselect.extend.borderWidth')};
    line-height: ${dt('fonts.lineHeight.250')};
  }

  /* ─── Focus ─── */
  .p-multiselect.p-component:not(.p-disabled).p-focus {
    box-shadow: 0 0 0 ${dt('multiselect.root.focusRing.width')} ${dt('form.focusRing.color')};
  }

  /* ─── Invalid + Focus ─── */
  .p-multiselect.p-component.p-invalid.p-focus {
    border-color: ${dt('form.invalidBorderColor')};
    box-shadow: 0 0 0 ${dt('multiselect.root.focusRing.width')} ${dt('focusRing.extend.invalid')};
  }

  /* ─── Readonly ─── */
  .p-multiselect.p-component[readonly] {
    background: ${dt('multiselect.extend.readonlyBackground')};
    border-color: ${dt('form.borderColor')};
    cursor: default;
    pointer-events: none;
  }

  /* ─── XLarge ─── */
  .p-multiselect.p-component.p-multiselect-xlg .p-multiselect-label {
    font-size: ${dt('inputtext.extend.extXlg.fontSize')};
    padding-block: ${dt('inputtext.extend.extXlg.paddingY')};
    padding-inline: ${dt('inputtext.extend.extXlg.paddingX')};
  }

  /* ─── Chips: базовые отступы ─── */
  .p-multiselect.p-component.p-multiselect-display-chip .p-multiselect-label:has(.p-chip) {
    padding-block: calc(${dt('multiselect.root.paddingY')} - 7px);
    padding-inline: calc(${dt('multiselect.root.paddingX')} - 7px);
  }

  .p-multiselect.p-component.p-multiselect-sm.p-multiselect-display-chip .p-multiselect-label:has(.p-chip) {
    padding-block: calc(${dt('multiselect.root.sm.paddingY')} - 7px);
    padding-inline: calc(${dt('multiselect.root.sm.paddingX')} - 7px);
  }

  .p-multiselect.p-component.p-multiselect-lg.p-multiselect-display-chip .p-multiselect-label:has(.p-chip) {
    padding-block: calc(${dt('multiselect.root.lg.paddingY')} - 7px);
    padding-inline: calc(${dt('multiselect.root.lg.paddingX')} - 7px);
  }

  .p-multiselect.p-component.p-multiselect-xlg.p-multiselect-display-chip .p-multiselect-label:has(.p-chip) {
    padding-block: calc(${dt('inputtext.extend.extXlg.paddingY')} - 7px);
    padding-inline: calc(${dt('inputtext.extend.extXlg.paddingX')} - 7px);
  }

  /* ─── Chip: отступ при наличии иконки удаления ─── */
  .p-multiselect .p-chip:has(.p-chip-remove-icon) {
    padding-inline-end: ${dt('chip.root.paddingX')};
  }

  /* ─── FloatLabel variant="in" ─── */
  .p-floatlabel-in .p-multiselect.p-component .p-multiselect-label {
    padding-block-start: ${dt('floatlabel.in.input.paddingTop')};
    padding-block-end: ${dt('floatlabel.in.input.paddingBottom')};
  }
`;
