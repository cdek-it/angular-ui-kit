export const inputtextCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Раскладка обёртки с label/caption ───
   Шаблон ExtraInputTextComponent оборачивает поле в .extra-inputtext только когда задан
   label или caption. Без этих правил div остаётся block-элементом: inline-label при
   label-position="default" встаёт в одну строку с полем, а при "left" — наоборот,
   выдавливается на строку выше (label-position работает ровно наоборот спецификации). */
.extra-inputtext {
  display: flex;
  flex-direction: column;
}

.extra-inputtext--left {
  flex-direction: row;
  align-items: flex-start;
  gap: ${dt('dimension.space.200')};
}

/* Лейбл слева выравниваем по высоте поля, а не по центру всего body с caption */
.extra-inputtext--left > .extra-inputtext-label {
  padding-block: calc(${dt('inputtext.root.paddingY')} + ${dt('inputtext.extend.borderWidth')});
}

.extra-inputtext-body {
  display: flex;
  flex-direction: column;
  /* без flex-start поле растягивается на всю ширину обёртки и игнорирует [fluid]="false";
     при fluid ширина задана самим инпутом (width: 100%) и flex-start ей не мешает */
  align-items: flex-start;
  gap: ${dt('dimension.space.100')};
}

/* Обёртки поля (clearable → p-iconfield, label-position="float" → p-floatlabel) собственной
   ширины не имеют, поэтому при align-items: flex-start схлопываются по содержимому и
   [fluid]="true" внутри них перестаёт работать. Ширину задаём явно: align-self: stretch
   не помогает — у .p-iconfield ширина не auto. */
.extra-inputtext-body .p-iconfield:has(.p-inputtext-fluid),
.extra-inputtext-body > .p-floatlabel:has(.p-inputtext-fluid) {
  width: 100%;
}

/* В режиме left body забирает остаток строки — иначе [fluid] некуда растягиваться */
.extra-inputtext--left > .extra-inputtext-body {
  flex: 1 1 auto;
  min-width: 0;
}

/* ─── Label ─── */
.extra-inputtext-label {
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

.extra-inputtext-label-icon {
  color: ${dt('color.fg.subtle')};
  font-size: ${dt('inputtext.extend.iconSize')};
  cursor: help;
}

/* ─── Caption ─── */
.extra-inputtext-caption {
  color: ${dt('color.fg.subtle')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.250')};
}

/* Внутри p-floatlabel лейбл лежит поверх поля — курсор должен быть как у ввода */
.extra-inputtext-body > .p-floatlabel > .extra-inputtext-label {
  cursor: text;
}

/* ─── Базовые стили ─── */
.p-inputtext {
  line-height: ${dt('fonts.lineHeight.250')};
  font-family: ${dt('fonts.fontFamily.base')};
}

.p-inputtext::placeholder {
  font-family: ${dt('fonts.fontFamily.base')};
}

.p-floatlabel:has(.p-inputtext) label {
  font-family: ${dt('fonts.fontFamily.base')};
}

/* ─── Disabled ─── */
.p-inputtext:disabled {
  background: ${dt('inputtext.root.disabledBackground')};
  color: ${dt('inputtext.root.disabledColor')};
}

/* ─── Readonly ─── */
.p-inputtext:enabled:read-only {
  background: ${dt('inputtext.extend.readonlyBackground')};
  color: ${dt('inputtext.root.color')};
}

/* ─── Focus ─── */
.p-inputtext:enabled:focus {
  box-shadow: 0 0 0 ${dt('inputtext.root.focusRing.width')} ${dt('inputtext.root.focusRing.color')};
}

/* ─── Invalid + Focus ─── */
.p-inputtext.p-invalid:focus {
  border-color: ${dt('inputtext.root.invalidBorderColor')};
  box-shadow: 0 0 0 ${dt('inputtext.root.focusRing.width')} ${dt('color.border.status.danger.focus')};
}

/* ─── Extra Large ─── */
.p-inputtext.p-inputtext-xlg {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  padding: ${dt('inputtext.extend.extXlg.paddingY')} ${dt('inputtext.extend.extXlg.paddingX')};
}

/* ─── IconField ─── */
.p-iconfield[data-pc-name="iconfield"] {
  width: fit-content;
}

.p-iconfield .p-inputicon {
  font-size: ${dt('inputtext.extend.iconSize')};
  width: ${dt('inputtext.extend.iconSize')};
  height: ${dt('inputtext.extend.iconSize')};
  cursor: pointer;
}
`;
