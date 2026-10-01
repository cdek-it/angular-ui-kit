export const selectCss = ({ dt }: { dt: (token: string) => string }): string => `

  /* ─── Раскладка обёртки с label/caption ───
     Шаблон ExtraSelectComponent оборачивает поле в .extra-select только когда задан
     label или caption. Без этих правил div остаётся block-элементом: inline-лейбл при
     labelPosition="top" встаёт в одну строку с полем, а при "left" — выдавливается
     на строку выше (labelPosition работает ровно наоборот спецификации). */
  .extra-select {
    display: flex;
    flex-direction: column;
  }

  .extra-select--left {
    flex-direction: row;
    align-items: flex-start;
    gap: ${dt('dimension.space.200')};
  }

  /* Лейбл слева выравниваем по высоте поля, а не по центру всего body с caption */
  .extra-select--left > .extra-select-label {
    padding-block: calc(${dt('select.root.paddingY')} + ${dt('select.extend.borderWidth')});
  }

  .extra-select-body {
    display: flex;
    flex-direction: column;
    gap: ${dt('dimension.space.100')};
    min-width: 0;
  }

  /* В режиме left body забирает остаток строки — иначе полю некуда растягиваться */
  .extra-select--left > .extra-select-body {
    flex: 1 1 auto;
  }

  /* ─── Label ─── */
  .extra-select-label {
    display: inline-flex;
    align-items: center;
    gap: ${dt('dimension.space.100')};
    color: ${dt('color.fg.default')};
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.300')};
    cursor: pointer;
  }

  .extra-select-label-icon {
    color: ${dt('color.fg.subtle')};
    font-size: ${dt('select.extend.iconSize')};
    cursor: help;
  }

  /* ─── Caption ─── */
  .extra-select-caption {
    color: ${dt('color.fg.subtle')};
    font-family: ${dt('fonts.fontFamily.heading')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.250')};
  }

  /* Внутри p-floatlabel лейбл лежит поверх поля — курсор должен быть как у поля */
  .extra-select-body > .p-floatlabel > .extra-select-label {
    cursor: pointer;
  }

  .p-select.p-component {
    width: 100%;
    border-width: ${dt('select.extend.borderWidth')};
    line-height: ${dt('fonts.lineHeight.250')};

    /* select.dropdown.width приходит из DS как {dimension.size.1700} = 17rem (272px):
       зона chevron съедает почти всю строку и выдавливает подпись поля в многоточие,
       а .p-select-clear-icon позиционируется от этой же переменной и уезжает к середине.
       Переопределяем саму переменную — за ней следуют обе точки использования. */
    --p-select-dropdown-width: calc(${dt('select.root.paddingX')} * 2 + ${dt('select.extend.iconSize')});
  }

  .p-select.p-component.p-select-xlg {
    --p-select-dropdown-width: calc(${dt('select.extend.extXlg.paddingX')} * 2 + ${dt('select.extend.iconSize')});
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

  .p-select.p-component:is([readonly], .p-select-readonly) {
    background: ${dt('select.extend.readonlyBackground')};
    border-color: ${dt('select.root.borderColor')};
    color: ${dt('select.root.color')};
    cursor: default;
    pointer-events: none;
  }

  .p-select.p-component:is([readonly], .p-select-readonly)
    :is(.p-select-dropdown .p-select-dropdown-icon, .p-select-clear-icon) {
    color: ${dt('select.root.placeholderColor')};
  }

  /* Размер xlg берём из собственных токенов селекта: переменные --p-inputtext-*
     эмитятся, только если на странице отрисован компонент семейства InputText,
     и на экране с одним селектом поле схлопывалось до нулевых паддингов. */
  .p-select.p-component.p-select-xlg .p-select-label {
    font-size: ${dt('select.extend.extXlg.fontSize')};
    padding-block: ${dt('select.extend.extXlg.paddingY')};
    padding-inline: ${dt('select.extend.extXlg.paddingX')};
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
    content: var(--p-select-checkmark-content, "\\ea5e");
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
