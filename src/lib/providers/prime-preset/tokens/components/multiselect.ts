export const multiselectCss = ({ dt }: { dt: (token: string) => string }): string => `

  /* ─── Раскладка обёртки с label/caption ───
     Шаблон ExtraMultiSelectComponent оборачивает поле в .extra-multiselect только когда
     задан label или caption. Без этих правил div остаётся block-элементом: inline-лейбл
     при labelPosition="top" встаёт в одну строку с полем, а при "left" — выдавливается
     на строку выше (labelPosition работает ровно наоборот спецификации). */
  .extra-multiselect {
    display: flex;
    flex-direction: column;
  }

  .extra-multiselect--left {
    flex-direction: row;
    align-items: flex-start;
    gap: ${dt('dimension.space.200')};
  }

  .extra-multiselect--left > .extra-multiselect-label {
    padding-block: calc(${dt('multiselect.root.paddingY')} + ${dt('multiselect.extend.borderWidth')});
  }

  .extra-multiselect-body {
    display: flex;
    flex-direction: column;
    /* без flex-start поле растягивается на всю ширину обёртки и игнорирует [fluid]="false" */
    align-items: flex-start;
    gap: ${dt('dimension.space.100')};
    min-width: 0;
  }

  /* Поле (или его p-floatlabel-обёртка) не должно вылезать за пределы фиксированного
     родителя: inline-flex с min-width:auto у flex-ребёнка пускает контент шире контейнера. */
  .extra-multiselect-body > :is(.p-multiselect, .p-floatlabel) {
    max-width: 100%;
  }

  .extra-multiselect--left > .extra-multiselect-body {
    flex: 1 1 auto;
  }

  .extra-multiselect-body > .p-floatlabel:has(.p-multiselect-fluid) {
    width: 100%;
  }

  /* ─── Label ─── */
  .extra-multiselect-label {
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

  .extra-multiselect-label-icon {
    color: ${dt('color.fg.subtle')};
    font-size: ${dt('multiselect.extend.iconSize')};
    cursor: help;
  }

  .extra-multiselect-body > .p-floatlabel > .extra-multiselect-label {
    cursor: pointer;
  }

  /* ─── Поле ─── */
  .p-multiselect.p-component {
    min-width: ${dt('multiselect.extend.width')};
    border-width: ${dt('multiselect.extend.borderWidth')};
    line-height: ${dt('fonts.lineHeight.250')};

    /* multiselect.dropdown.width приходит из DS как {dimension.size.1700} = 17rem (272px):
       зона chevron съедает почти всю ширину поля и выдавливает подпись в многоточие,
       а .p-multiselect-clear-icon позиционируется от этой же переменной и уезжает к середине.
       Переопределяем саму переменную — за ней следуют обе точки использования. */
    --p-multiselect-dropdown-width: calc(${dt('multiselect.root.paddingX')} * 2 + ${dt('multiselect.extend.iconSize')});
  }

  .p-multiselect.p-component .p-multiselect-label {
    font-family: ${dt('fonts.fontFamily.base')};
  }

  .p-multiselect.p-component.p-multiselect-sm {
    line-height: ${dt('fonts.lineHeight.200')};
  }

  .p-multiselect.p-component.p-multiselect-lg {
    line-height: ${dt('fonts.lineHeight.400')};
  }

  /* xlarge PrimeNG не знает: обёртка ставит p-multiselect-xlg поверх large.
     Мода xlarge DS (form/*): font 20, paddingX 12, paddingY 14, lineHeight 26, icon 20. */
  .p-multiselect.p-component.p-multiselect-xlg {
    line-height: ${dt('fonts.lineHeight.550')};
    --p-multiselect-dropdown-width: calc(${dt('multiselect.root.paddingX')} * 2 + ${dt('dimension.size.600')});
  }

  .p-multiselect.p-component.p-multiselect-xlg .p-multiselect-label {
    font-size: ${dt('fonts.fontSize.500')};
    padding-block: ${dt('dimension.space.400')};
    padding-inline: ${dt('multiselect.root.paddingX')};
  }

  .p-multiselect.p-component.p-multiselect-xlg :is(.p-multiselect-dropdown .p-icon, .p-multiselect-clear-icon, .p-multiselect-loading-icon) {
    font-size: ${dt('dimension.size.600')};
    width: ${dt('dimension.size.600')};
    height: ${dt('dimension.size.600')};
  }

  .p-multiselect.p-component .p-multiselect-label.p-multiselect-label-empty {
    padding: 0;
  }

  /* ─── Focus ─── */
  .p-multiselect.p-component:not(.p-disabled).p-focus {
    box-shadow: 0 0 0 ${dt('multiselect.root.focusRing.width')} ${dt('multiselect.root.focusRing.color')};
  }

  .p-multiselect.p-component.p-invalid.p-focus {
    border-color: ${dt('multiselect.root.invalidBorderColor')};
    box-shadow: 0 0 0 ${dt('multiselect.root.focusRing.width')} ${dt('color.border.status.danger.focus')};
  }

  /* ─── Readonly ─── */
  .p-multiselect.p-component.p-multiselect-readonly {
    background: ${dt('multiselect.extend.readonlyBackground')};
    border-color: ${dt('multiselect.root.borderColor')};
    color: ${dt('multiselect.root.color')};
    cursor: default;
    pointer-events: none;
  }

  .p-multiselect.p-component.p-multiselect-readonly :is(.p-multiselect-dropdown, .p-multiselect-clear-icon) {
    color: ${dt('multiselect.root.placeholderColor')};
  }

  /* ─── Опции и группы ─── */
  .p-multiselect-option,
  .p-multiselect-option-group {
    font-family: ${dt('fonts.fontFamily.base')};
  }

  .p-multiselect-option-group {
    text-transform: uppercase;
  }

  .p-multiselect-empty-message {
    font-family: ${dt('fonts.fontFamily.base')};
  }

  /* ─── FloatLabel (variant in) ───
     Поведение как у InputText: в покое лейбл стоит в центре поля вместо placeholder
     (placeholder в float-режиме не передаётся), при фокусе и значении уменьшается
     до 12/14 и поднимается. Геометрия значения по референсу Figma:
     10px до лейбла-зоны, лейбл 14px, 4px до значения, 14px снизу. */
  .p-floatlabel-in:has(.p-multiselect.p-component) label {
    font-family: ${dt('fonts.fontFamily.base')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.250')};
    color: ${dt('color.fg.muted')};
  }

  .p-floatlabel-in:has(.p-multiselect.p-component) label .extra-multiselect-label-icon {
    display: none;
  }

  .p-floatlabel-in .p-multiselect.p-component .p-multiselect-label {
    font-family: ${dt('fonts.fontFamily.base')};
    padding-block-start: calc(${dt('dimension.space.300')} + ${dt('fonts.lineHeight.200')} + ${dt('dimension.space.100')});
    padding-block-end: ${dt('dimension.space.400')};
  }
`;
