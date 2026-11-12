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
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.200')};
  cursor: pointer;
}

.extra-inputtext-label-icon {
  color: ${dt('color.fg.subtle')};
  font-size: ${dt('dimension.size.400')};
  cursor: help;
}

/* ─── Маркер обязательности ─── */
.extra-inputtext-required {
  color: ${dt('color.fg.status.danger.default')};
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

/* ─── Высота по размерам ───
   Chrome не даёт текстовому input стать ниже собственной высоты строки (normal ≈ 1.36 от шрифта),
   поэтому line-height 14 и 16 высоту не задают: 36 и 42 из макета держим явно. */
.p-inputtext {
  height: ${dt('inputtext.extend.height')};
}
.p-inputtext.p-inputtext-sm {
  height: ${dt('inputtext.extend.extSm.height')};
}
.p-inputtext.p-inputtext-lg {
  height: ${dt('inputtext.extend.extLg.height')};
}
.p-inputtext.p-inputtext-xlg {
  height: ${dt('inputtext.extend.extXlg.height')};
}

/* ─── Межстрочный интервал по размерам (Figma: form.lineHeight в модах small / large / xlarge) ─── */
.p-inputtext.p-inputtext-sm {
  line-height: ${dt('fonts.lineHeight.200')};
}
.p-inputtext.p-inputtext-lg {
  line-height: ${dt('fonts.lineHeight.400')};
}

/* ─── Extra Large ─── */
.p-inputtext.p-inputtext-xlg {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  line-height: ${dt('fonts.lineHeight.550')};
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

/* Размер иконки в поле зависит от размера поля (Figma: form.iconSize в модах sizing) */
.p-iconfield:has(.p-inputtext-sm) .p-inputicon {
  font-size: ${dt('inputtext.extend.extSm.iconSize')};
  width: ${dt('inputtext.extend.extSm.iconSize')};
  height: ${dt('inputtext.extend.extSm.iconSize')};
}
.p-iconfield:has(.p-inputtext-lg) .p-inputicon {
  font-size: ${dt('inputtext.extend.extLg.iconSize')};
  width: ${dt('inputtext.extend.extLg.iconSize')};
  height: ${dt('inputtext.extend.extLg.iconSize')};
}
.p-iconfield:has(.p-inputtext-xlg) .p-inputicon {
  font-size: ${dt('inputtext.extend.extXlg.iconSize')};
  width: ${dt('inputtext.extend.extXlg.iconSize')};
  height: ${dt('inputtext.extend.extXlg.iconSize')};
}

/* ─── Float label (Figma: has-float-label=true) ───
   Поле выше обычного (min-height 56) и с радиусом 14; контент центрируется внутри min-height,
   поэтому поднятый лейбл стоит на 2px выше значения floatlabel.in.active.top, а текст ввода — на 2px
   выше paddingTop (Figma: лейбл y=12, ввод y=26 при paddingTop 10 и контенте 28 в поле 56). */
.p-floatlabel:has(> .p-inputtext) > .p-inputtext {
  height: ${dt('inputtext.extend.extXlg.height')};
  border-radius: ${dt('dimension.borderRadius.400')};
  padding-top: calc(${dt('floatlabel.in.input.paddingTop')} - ${dt('dimension.space.50')});
}
/* В покое лейбл остаётся «лейблом» и при заданном placeholder (Figma: has-placeholder=true);
   PrimeNG в этом случае поднимает его правилом :has(input[placeholder]), поэтому селектор усилен :not() */
.p-floatlabel:has(> .p-inputtext:not(:focus):not(.p-filled):not(:-webkit-autofill)) > label {
  top: 50%;
  margin-top: calc(${dt('fonts.lineHeight.400')} / -2);
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.400')};
}
.p-floatlabel:has(> .p-inputtext:not(:focus)) > .p-inputtext::placeholder {
  color: transparent;
}
.p-floatlabel:has(> .p-inputtext:focus) > label,
.p-floatlabel:has(> .p-inputtext.p-filled) > label,
.p-floatlabel:has(> .p-inputtext:-webkit-autofill) > label {
  top: calc(${dt('floatlabel.in.active.top')} - ${dt('dimension.space.50')});
  font-size: ${dt('floatlabel.root.active.fontSize')};
  line-height: ${dt('fonts.lineHeight.150')};
}
`;
