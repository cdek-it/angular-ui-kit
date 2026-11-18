export const autocompleteCss = ({ dt }: { dt: (token: string) => string }): string => `
  .extra-autocomplete,
  .extra-autocomplete-body {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .extra-autocomplete-body {
    align-items: flex-start;
    gap: ${dt('dimension.space.100')};
    width: ${dt('autocomplete.dropdown.width')};
    max-width: 100%;
  }

  .extra-autocomplete:has(.p-autocomplete-fluid) > .extra-autocomplete-body {
    width: 100%;
  }

  .extra-autocomplete--left {
    flex-direction: row;
    align-items: flex-start;
    gap: ${dt('dimension.space.200')};
  }

  .extra-autocomplete--left > .extra-autocomplete-label {
    padding-block: calc(${dt('autocomplete.root.paddingY')} + ${dt('dimension.borderWidth.100')});
  }

  .extra-autocomplete-body > .p-floatlabel {
    width: 100%;
  }

  .extra-autocomplete-label {
    display: inline-flex;
    align-items: center;
    gap: ${dt('dimension.space.100')};
    color: ${dt('color.fg.default')};
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.200')};
    cursor: pointer;
  }

  .extra-autocomplete-required {
    color: ${dt('color.fg.status.danger.default')};
    font-size: ${dt('fonts.fontSize.100')};
    line-height: ${dt('fonts.lineHeight.200')};
  }

  .extra-autocomplete-label-icon {
    color: ${dt('color.fg.subtle')};
    font-size: ${dt('dimension.size.400')};
    cursor: help;
  }

  /* Size variables belong to the root: multiple has a plain input, not InputText. */
  .p-autocomplete {
    --extra-autocomplete-font-size: ${dt('fonts.fontSize.300')};
    --extra-autocomplete-line-height: ${dt('fonts.lineHeight.250')};
    --extra-autocomplete-padding-x: ${dt('autocomplete.root.paddingX')};
    --extra-autocomplete-padding-y: ${dt('autocomplete.root.paddingY')};
    --extra-autocomplete-icon-size: ${dt('dimension.size.450')};
    --extra-autocomplete-height: calc(var(--extra-autocomplete-line-height) + var(--extra-autocomplete-padding-y) * 2 + ${dt('dimension.borderWidth.100')} * 2);
    --extra-autocomplete-dropdown-width: calc(var(--extra-autocomplete-padding-x) * 2 + var(--extra-autocomplete-icon-size));
    width: ${dt('autocomplete.dropdown.width')};
    max-width: 100%;
    min-width: 0;
    border-radius: ${dt('autocomplete.root.borderRadius')};
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: var(--extra-autocomplete-font-size);
    line-height: var(--extra-autocomplete-line-height);
  }

  .p-autocomplete.extra-autocomplete-sm {
    --extra-autocomplete-font-size: ${dt('fonts.fontSize.200')};
    --extra-autocomplete-line-height: ${dt('fonts.lineHeight.200')};
    --extra-autocomplete-padding-y: ${dt('dimension.space.300')};
    --extra-autocomplete-icon-size: ${dt('dimension.size.400')};
  }

  .p-autocomplete.extra-autocomplete-lg {
    --extra-autocomplete-font-size: ${dt('fonts.fontSize.400')};
    --extra-autocomplete-line-height: ${dt('fonts.lineHeight.400')};
    --extra-autocomplete-padding-y: ${dt('dimension.space.400')};
    --extra-autocomplete-icon-size: ${dt('dimension.size.500')};
  }

  .p-autocomplete.extra-autocomplete-xlg {
    --extra-autocomplete-font-size: ${dt('fonts.fontSize.500')};
    --extra-autocomplete-line-height: ${dt('fonts.lineHeight.550')};
    --extra-autocomplete-padding-y: ${dt('dimension.space.400')};
    --extra-autocomplete-icon-size: ${dt('dimension.size.600')};
  }

  .p-autocomplete.p-autocomplete-fluid,
  .extra-autocomplete-body > .p-autocomplete,
  .extra-autocomplete-body > .p-floatlabel > .p-autocomplete {
    width: 100%;
  }

  .p-autocomplete.p-component .p-inputtext.p-autocomplete-input,
  .p-autocomplete.p-component .p-autocomplete-input-multiple {
    min-width: 0;
    font-family: inherit;
    font-size: var(--extra-autocomplete-font-size);
    line-height: var(--extra-autocomplete-line-height);
    padding: var(--extra-autocomplete-padding-y) var(--extra-autocomplete-padding-x);
    border-radius: ${dt('autocomplete.root.borderRadius')};
    border-color: ${dt('autocomplete.root.borderColor')};
    box-shadow: none;
  }

  .p-autocomplete.p-component .p-inputtext.p-autocomplete-input {
    flex: 1 1 auto;
    width: 100%;
    height: var(--extra-autocomplete-height);
  }

  .p-autocomplete .p-autocomplete-input-multiple {
    flex: 1 1 auto;
    width: 100%;
    min-height: var(--extra-autocomplete-height);
  }

  /* The text input inside a chip list must not inherit the single field height. */
  .p-autocomplete .p-autocomplete-input-chip {
    flex: 1 1 ${dt('dimension.size.1200')};
    min-width: ${dt('dimension.size.1200')};
    padding: 0;
  }

  .p-autocomplete .p-autocomplete-input-chip .p-autocomplete-input {
    width: 100%;
  }

  .p-autocomplete .p-autocomplete-input-chip .p-autocomplete-input {
    height: var(--extra-autocomplete-line-height);
    min-width: 0;
    font: inherit;
    line-height: var(--extra-autocomplete-line-height);
    color: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0;
    margin: 0;
  }

  .p-autocomplete .p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
    padding-block: max(${dt('dimension.space.none')}, calc((var(--extra-autocomplete-height) - ${dt('chip.removeIcon.size')} - ${dt('chip.root.paddingY')} * 2 - ${dt('chip.extend.borderWidth')} * 2 - ${dt('dimension.borderWidth.100')} * 2) / 2));
    padding-inline: ${dt('dimension.space.100')};
  }

  .p-autocomplete .p-autocomplete-dropdown {
    flex: 0 0 var(--extra-autocomplete-dropdown-width);
    width: var(--extra-autocomplete-dropdown-width);
    border-inline-start: 0 none;
    border-start-end-radius: ${dt('autocomplete.root.borderRadius')};
    border-end-end-radius: ${dt('autocomplete.root.borderRadius')};
  }

  .p-autocomplete:has(.p-autocomplete-dropdown) .p-inputtext.p-autocomplete-input {
    border-inline-end-width: 0;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  .p-autocomplete:not(.p-invalid):not(:has(input:disabled)):not(:has(input[readonly])):hover :is(.p-inputtext.p-autocomplete-input, .p-autocomplete-input-multiple, .p-autocomplete-dropdown),
  .p-autocomplete:not(.p-invalid):focus-within :is(.p-inputtext.p-autocomplete-input, .p-autocomplete-input-multiple, .p-autocomplete-dropdown) {
    border-color: ${dt('autocomplete.root.hoverBorderColor')};
  }

  .p-autocomplete:focus-within {
    box-shadow: 0 0 0 ${dt('autocomplete.root.focusRing.width')} ${dt('autocomplete.root.focusRing.color')};
  }

  .p-autocomplete.p-invalid :is(.p-inputtext.p-autocomplete-input, .p-autocomplete-input-multiple, .p-autocomplete-dropdown) {
    border-color: ${dt('autocomplete.root.invalidBorderColor')};
  }

  .p-autocomplete.p-invalid:focus-within {
    box-shadow: 0 0 0 ${dt('autocomplete.root.focusRing.width')} ${dt('color.border.status.danger.focus')};
  }

  .p-autocomplete:has(input:disabled) :is(.p-inputtext.p-autocomplete-input, .p-autocomplete-input-multiple, .p-autocomplete-dropdown) {
    border-color: ${dt('color.fg.muted')};
  }

  .p-autocomplete-clear-icon,
  .p-autocomplete-dropdown .p-icon {
    color: ${dt('autocomplete.dropdown.color')};
    width: var(--extra-autocomplete-icon-size);
    height: var(--extra-autocomplete-icon-size);
  }

  .p-autocomplete.p-component:has(.p-autocomplete-dropdown) .p-autocomplete-clear-icon {
    inset-inline-end: calc(var(--extra-autocomplete-dropdown-width) + var(--extra-autocomplete-padding-x));
  }

  .p-autocomplete.extra-autocomplete-chips-locked .p-chip-remove-icon {
    display: none;
  }

  .p-autocomplete .p-autocomplete-chip-item {
    display: flex;
    align-items: center;
  }

  .p-autocomplete .p-autocomplete-chip {
    font-size: ${dt('fonts.fontSize.200')};
    line-height: ${dt('fonts.lineHeight.250')};
    padding-block: ${dt('chip.root.paddingY')};
  }

  .p-autocomplete .p-autocomplete-chip,
  .p-autocomplete-option {
    gap: ${dt('autocomplete.extend.extOption.gap')};
  }

  .p-autocomplete .p-chip.p-chip:has(.p-chip-remove-icon) {
    padding-inline-end: ${dt('chip.root.paddingX')};
  }

  .p-autocomplete-option,
  .p-autocomplete-option-group {
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    line-height: ${dt('fonts.lineHeight.300')};
  }

  .p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-focus) {
    background: ${dt('autocomplete.extend.option.background')};
  }

  .p-autocomplete-option-group {
    font-size: ${dt('fonts.fontSize.100')};
    gap: ${dt('autocomplete.extend.extOptionGroup.gap')};
    text-transform: uppercase;
  }

  .p-autocomplete-option .p-checkbox {
    width: ${dt('autocomplete.extend.checkmarkSize')};
    height: ${dt('autocomplete.extend.checkmarkSize')};
  }

  /* FloatLabel uses the same interaction as the other form fields. */
  .p-floatlabel-in:has(.p-autocomplete.p-component) label {
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.250')};
    color: ${dt('color.fg.muted')};
  }

  .p-floatlabel-in:has(.p-autocomplete:is(.p-inputwrapper-focus, .p-inputwrapper-filled)) label {
    font-size: ${dt('fonts.fontSize.100')};
    line-height: ${dt('fonts.lineHeight.200')};
  }

  .p-floatlabel-in:has(.p-autocomplete.p-component) label .extra-autocomplete-label-icon {
    display: none;
  }

  .p-floatlabel-in .p-autocomplete.p-component {
    --extra-autocomplete-padding-y: ${dt('dimension.space.400')};
    --extra-autocomplete-height: calc(${dt('dimension.space.300')} + ${dt('fonts.lineHeight.200')} + ${dt('dimension.space.100')} + var(--extra-autocomplete-line-height) + ${dt('dimension.space.400')} + ${dt('dimension.borderWidth.100')} * 2);
  }

  .p-floatlabel-in .p-autocomplete.p-component .p-inputtext.p-autocomplete-input,
  .p-floatlabel-in .p-autocomplete.p-component .p-autocomplete-input-multiple {
    padding-block-start: calc(${dt('dimension.space.300')} + ${dt('fonts.lineHeight.200')} + ${dt('dimension.space.100')});
    padding-block-end: ${dt('dimension.space.400')};
  }
`;
