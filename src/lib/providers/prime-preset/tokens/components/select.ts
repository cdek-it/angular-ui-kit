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
    /* без flex-start поле растягивается на всю ширину обёртки и игнорирует [fluid]="false" */
    align-items: flex-start;
    gap: ${dt('dimension.space.100')};
    min-width: 0;
  }

  /* Поле (или его p-floatlabel-обёртка) не должно вылезать за пределы фиксированного
     родителя: inline-flex с min-width:auto у flex-ребёнка пускает контент шире контейнера. */
  .extra-select-body > :is(.p-select, .p-floatlabel) {
    max-width: 100%;
  }

  .extra-select--left > .extra-select-body {
    flex: 1 1 auto;
  }

  .extra-select-body > .p-floatlabel:has(.p-select-fluid) {
    width: 100%;
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

  /* Внутри p-floatlabel лейбл лежит поверх поля — курсор должен быть как у поля */
  .extra-select-body > .p-floatlabel > .extra-select-label {
    cursor: pointer;
  }

  /* ─── Поле ─── */
  .p-select.p-component {
    min-width: ${dt('select.extend.width')};
    border-width: ${dt('select.extend.borderWidth')};
    line-height: ${dt('fonts.lineHeight.250')};

    /* select.dropdown.width приходит из DS как {dimension.size.1700} = 17rem (272px):
       зона chevron съедает почти всю строку и выдавливает подпись поля в многоточие,
       а .p-select-clear-icon позиционируется от этой же переменной и уезжает к середине.
       Переопределяем саму переменную — за ней следуют обе точки использования.
       min-width берём из extend.width, а не из dropdown.width: значение токена в CSS
       разворачивается в переменную --p-select-dropdown-width, и её переопределение
       (40px) превращало поле в карлик во float-режиме. */
    --p-select-dropdown-width: calc(${dt('select.root.paddingX')} * 2 + ${dt('select.extend.iconSize')});
  }

  .p-select.p-component .p-select-label,
  .p-select-option {
    font-family: ${dt('fonts.fontFamily.base')};
  }

  .p-select.p-component.p-select-sm {
    line-height: ${dt('fonts.lineHeight.200')};
  }

  .p-select.p-component.p-select-lg {
    line-height: ${dt('fonts.lineHeight.400')};
  }

  /* xlarge PrimeNG не знает: обёртка ставит p-select-xlg поверх large.
     Мода xlarge DS (form/*): font 20, paddingX 12, paddingY 14, lineHeight 26, icon 20. */
  .p-select.p-component.p-select-xlg {
    line-height: ${dt('fonts.lineHeight.550')};
    --p-select-dropdown-width: calc(${dt('select.extend.extXlg.paddingX')} * 2 + ${dt('dimension.size.600')});
  }

  .p-select.p-component.p-select-xlg .p-select-label {
    font-size: ${dt('select.extend.extXlg.fontSize')};
    padding-block: ${dt('select.extend.extXlg.paddingY')};
    padding-inline: ${dt('select.extend.extXlg.paddingX')};
  }

  .p-select.p-component.p-select-xlg :is(.p-select-dropdown .p-icon, .p-select-clear-icon, .p-select-loading-icon) {
    font-size: ${dt('dimension.size.600')};
    width: ${dt('dimension.size.600')};
    height: ${dt('dimension.size.600')};
  }

  .p-select.p-component .p-select-label.p-select-label-empty {
    padding: 0;
  }

  .p-select-option {
    background: ${dt('select.extend.extOption.background')};
    gap: ${dt('select.extend.extOption.gap')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.300')};
  }

  /* Figma _<Select.Group>: textCase UPPER; токена регистра в базе PrimeUIX нет,
     зона дизайнера в CSS-слое кита (как у menu/divider). */
  .p-select-option-group {
    font-size: ${dt('fonts.fontSize.100')};
    gap: ${dt('select.extend.extOptionGroup.gap')};
    text-transform: uppercase;
  }

  /* ─── Focus ─── */
  .p-select.p-component:not(.p-disabled).p-focus {
    box-shadow: 0 0 0 ${dt('select.root.focusRing.width')} ${dt('select.root.focusRing.color')};
  }

  .p-select.p-component.p-invalid.p-focus {
    border-color: ${dt('select.root.invalidBorderColor')};
    box-shadow: 0 0 0 ${dt('select.root.focusRing.width')} ${dt('color.border.status.danger.focus')};
  }

  /* ─── Readonly ─── */
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

  /* ─── FloatLabel (variant in) ───
     Поведение как у InputText: в покое лейбл стоит в центре поля вместо placeholder
     (placeholder в float-режиме не передаётся), при фокусе и значении уменьшается
     до 12/14 и поднимается. Геометрия значения по референсу Figma:
     10px до лейбл-зоны, лейбл 14px, 4px до значения, 14px снизу. */
  .p-floatlabel-in:has(.p-select.p-component) label {
    font-family: ${dt('fonts.fontFamily.base')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.250')};
    color: ${dt('color.fg.muted')};
  }

  .p-floatlabel-in:has(.p-select.p-inputwrapper-focus) label,
  .p-floatlabel-in:has(.p-select.p-inputwrapper-filled) label {
    top: ${dt('floatlabel.in.active.top')};
  }

  .p-floatlabel-in:has(.p-select.p-component) label .extra-select-label-icon {
    display: none;
  }

  .p-floatlabel-in .p-select.p-component .p-select-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.200')};
    line-height: ${dt('fonts.lineHeight.200')};
    min-height: ${dt('floatlabel.extend.height')};
    padding-block-start: ${dt('floatlabel.in.input.paddingTop')};
    padding-block-end: ${dt('floatlabel.in.input.paddingBottom')};
  }

  /* ─── Опции: отметка выбранных ─── */
  .p-select-overlay .p-select-list .p-select-option[aria-selected='true'] {
    background: ${dt('select.option.selectedBackground')};
    color: ${dt('select.option.selectedColor')};
  }

  .p-select-overlay .p-select-list .p-select-option[aria-selected='true'].p-focus {
    background: ${dt('select.option.selectedFocusBackground')};
    color: ${dt('select.option.selectedFocusColor')};
  }

  .p-select-option .p-select-option-check-icon,
  .p-select-option .p-select-option-blank-icon {
    display: none;
  }

  .p-select-option:has(.p-select-option-check-icon, .p-select-option-blank-icon) {
    padding-inline-start: ${dt('select.extend.extOption.checkmarkTextOffset')};
  }

  .p-select-option[aria-selected='true']:has(.p-select-option-check-icon)::before {
    position: absolute;
    inset-inline-start: ${dt('select.extend.extOption.checkmarkInset')};
    top: 50%;
    transform: translateY(-50%);
    font-family: 'tabler-icons';
    content: var(--extra-select-checkmark-content, "\\ea5e");
    font-size: ${dt('select.extend.extOption.checkmarkSize')};
    line-height: ${dt('select.extend.extOption.checkmarkSize')};
    width: ${dt('select.extend.extOption.checkmarkSize')};
    height: ${dt('select.extend.extOption.checkmarkSize')};
    color: ${dt('select.checkmark.color')};
  }

  .p-select-option[aria-selected='true']:has(.p-select-option-check-icon).p-focus::before {
    color: ${dt('select.option.focusColor')};
  }


  /* ─── Иконки поля ─── */
  .p-select.p-component :is(.p-select-dropdown .p-select-dropdown-icon, .p-select-clear-icon, .p-select-loading-icon) {
    font-size: ${dt('select.extend.iconSize')};
    width: ${dt('select.extend.iconSize')};
    height: ${dt('select.extend.iconSize')};
    color: ${dt('select.root.placeholderColor')};
  }
`;
