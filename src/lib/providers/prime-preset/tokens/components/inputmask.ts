export const inputmaskCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Раскладка обёртки с label/caption ───
   Шаблон ExtraInputMaskComponent оборачивает поле в .extra-inputmask только когда задан
   label или caption. Без этих правил div остаётся block-элементом: inline-лейбл при
   labelPosition="top" встаёт в одну строку с полем, а при "left" — выдавливается
   на строку выше (labelPosition работает ровно наоборот спецификации). */
.extra-inputmask {
  display: flex;
  flex-direction: column;
}

.extra-inputmask--left {
  flex-direction: row;
  align-items: flex-start;
  gap: ${dt('dimension.space.200')};
}

/* Лейбл слева выравниваем по высоте поля, а не по центру всего body с caption */
.extra-inputmask--left > .extra-inputmask-label {
  padding-block: calc(${dt('inputtext.root.paddingY')} + ${dt('inputtext.extend.borderWidth')});
}

.extra-inputmask-body {
  display: flex;
  flex-direction: column;
  /* без flex-start поле растягивается на всю ширину обёртки и игнорирует [fluid]="false";
     при fluid ширину задаёт сам p-inputmask (:has(.p-inputtext-fluid) → width: 100%),
     и flex-start ей не мешает */
  align-items: flex-start;
  gap: ${dt('dimension.space.100')};
}

/* В режиме left body забирает остаток строки — иначе [fluid] некуда растягиваться */
.extra-inputmask--left > .extra-inputmask-body {
  flex: 1 1 auto;
  min-width: 0;
}

/* ─── Label ─── */
.extra-inputmask-label {
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

.extra-inputmask-label-icon {
  color: ${dt('color.fg.subtle')};
  font-size: ${dt('inputtext.extend.iconSize')};
  cursor: help;
}

/* ─── Caption ─── */
.extra-inputmask-caption {
  color: ${dt('color.fg.subtle')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.250')};
}

/* Внутри p-floatlabel лейбл лежит поверх поля — курсор должен быть как у ввода */
.extra-inputmask-body > .p-floatlabel > .extra-inputmask-label {
  cursor: text;
}

/* ─── Clear icon ───
   Иконка очистки у p-inputmask своя (не p-iconfield), поэтому размер задаём ей отдельно
   тем же токеном, что и иконкам inputtext. */
.p-inputmask-clear-icon {
  width: ${dt('inputtext.extend.iconSize')};
  height: ${dt('inputtext.extend.iconSize')};
  margin-top: calc(${dt('inputtext.extend.iconSize')} / -2);
}

/* Иконка лежит поверх поля абсолютом — освобождаем под неё место справа, иначе
   значение уезжает под крестик. Класс ставится по пропу clearable (а не по наличию
   иконки), чтобы padding не прыгал на первом введённом символе. */
.p-inputtext.extra-inputmask-clearable {
  padding-inline-end: calc(${dt('inputtext.root.paddingX')} * 2 + ${dt('inputtext.extend.iconSize')});
}

.p-inputtext.extra-inputmask-clearable.p-inputtext-xlg {
  padding-inline-end: calc(${dt('inputtext.extend.extXlg.paddingX')} * 2 + ${dt('inputtext.extend.iconSize')});
}

/* ─── Sizes ───
   Базовые small/large приходят из pSize, xlg — класс на самом input (styleClass).
   Хост extra-input-mask с display: contents из раскладки выпадает, селектор идёт
   от p-inputmask. */
p-inputmask > .p-inputtext.p-inputtext-xlg {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  padding: ${dt('inputtext.extend.extXlg.paddingY')} ${dt('inputtext.extend.extXlg.paddingX')};
}
`;
