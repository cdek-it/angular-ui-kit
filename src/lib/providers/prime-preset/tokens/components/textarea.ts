export const textareaCss = ({ dt }: { dt: (token: string) => string }): string => `

/* --- Маркер обязательности --- */
.extra-textarea-required {
  color: ${dt('color.fg.status.danger.default')};
}

/* --- Раскладка обёртки с label/caption ---
   Шаблон ExtraTextareaComponent оборачивает поле в .extra-textarea только когда задан label или caption.
   Без этих правил div остаётся block-элементом: inline-label встаёт в одну строку с полем на базовой
   линии (то есть внизу многострочного поля), а при labelPosition="left" раскладка не работает. */
.extra-textarea {
  display: flex;
  flex-direction: column;
}

.extra-textarea--left {
  flex-direction: row;
  align-items: flex-start;
  gap: ${dt('dimension.space.200')};
}

/* Лейбл слева выравниваем по верху поля: по высоте первой строки текста */
.extra-textarea--left > .extra-textarea-label {
  padding-block: calc(${dt('textarea.root.paddingY')} + ${dt('textarea.extend.borderWidth')});
}

.extra-textarea--left > .extra-textarea-body {
  flex: 1 1 auto;
  min-width: 0;
}

.extra-textarea-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${dt('dimension.space.100')};
}

/* Обёртки поля (clearable → p-iconfield, labelPosition="float" → p-floatlabel) собственной ширины не имеют,
   поэтому при align-items: flex-start схлопываются по содержимому и fluid внутри них не работает */
.extra-textarea-body .p-iconfield:has(.p-textarea-fluid),
.extra-textarea-body > .p-floatlabel:has(.p-textarea-fluid) {
  width: 100%;
}

/* --- Label --- */
.extra-textarea-label {
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

.extra-textarea-label-icon {
  color: ${dt('color.fg.subtle')};
  font-size: ${dt('dimension.size.400')};
  cursor: help;
}

/* Внутри p-floatlabel лейбл лежит поверх поля — курсор как у ввода */
.extra-textarea-body > .p-floatlabel > .extra-textarea-label {
  cursor: text;
}

/* --- Base --- */
.p-textarea {
  border-width: ${dt('textarea.extend.borderWidth')};
  line-height: ${dt('fonts.lineHeight.250')};
  min-height: ${dt('textarea.extend.minHeight')};
  font-family: ${dt('fonts.fontFamily.base')};
}

.p-textarea::placeholder {
  font-family: ${dt('fonts.fontFamily.base')};
}

.p-floatlabel:has(.p-textarea) label {
  font-family: ${dt('fonts.fontFamily.base')};
}

/* --- Sizes ---
   Межстрочный интервал по размерам (Figma: form.lineHeight в модах small / large / xlarge) */
.p-textarea.p-textarea-sm {
  line-height: ${dt('fonts.lineHeight.200')};
}
.p-textarea.p-textarea-lg {
  line-height: ${dt('fonts.lineHeight.400')};
}
.p-textarea.p-textarea-xlg {
  font-size: ${dt('textarea.extend.extXlg.fontSize')};
  line-height: ${dt('fonts.lineHeight.550')};
  padding: ${dt('textarea.extend.extXlg.paddingY')} ${dt('textarea.extend.extXlg.paddingX')};
}

/* --- States --- */
.p-textarea:enabled:read-only {
  background: ${dt('textarea.extend.readonlyBackground')};
  color: ${dt('textarea.root.color')};
}

.p-textarea:disabled {
  background: ${dt('textarea.root.disabledBackground')};
  color: ${dt('textarea.root.disabledColor')};
  opacity: 1;
}

/* --- Focus --- */
.p-textarea:enabled:focus {
  box-shadow: 0 0 0 ${dt('textarea.root.focusRing.width')} ${dt('textarea.root.focusRing.color')};
}

/* --- Invalid + Focus --- */
.p-textarea.p-invalid:focus {
  border-color: ${dt('textarea.root.invalidBorderColor')};
  box-shadow: 0 0 0 ${dt('textarea.root.focusRing.width')} ${dt('color.bg.status.danger.weak.active')};
}

/* --- ClearButton (showClear) --- */
.p-iconfield:has(.p-textarea) {
  display: block;
  width: fit-content;
}

.p-iconfield:has(.p-textarea) .p-textarea {
  padding-right: ${dt('dimension.space.700')};
}

.p-iconfield:has(.p-textarea) .p-inputicon {
  top: ${dt('dimension.space.500')};
  transform: none;
  font-size: ${dt('textarea.extend.iconSize')};
  width: ${dt('textarea.extend.iconSize')};
  height: ${dt('textarea.extend.iconSize')};
  cursor: pointer;
}


/* --- Float label (Figma: has-float-label=true) ---
   Лейбл 12/14 стоит в верхнем паддинге 10, текст начинается сразу под ним (10 + 14). */
.p-floatlabel:has(> .p-textarea) > .p-textarea {
  padding-top: calc(${dt('dimension.space.300')} + ${dt('fonts.lineHeight.200')});
}
/* В покое лейбл остаётся «лейблом» и при заданном placeholder (Figma: has-placeholder=true);
   PrimeNG в этом случае поднимает его правилом :has(textarea[placeholder]), поэтому селектор усилен :not() */
.p-floatlabel:has(> .p-textarea:not(:focus):not(.p-filled):not(:-webkit-autofill)) > label {
  top: ${dt('dimension.space.300')};
  margin-top: 0;
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.400')};
}
.p-floatlabel:has(> .p-textarea:not(:focus)) > .p-textarea::placeholder {
  color: transparent;
}
.p-floatlabel:has(> .p-textarea:focus) > label,
.p-floatlabel:has(> .p-textarea.p-filled) > label {
  top: ${dt('dimension.space.300')};
  font-size: ${dt('floatlabel.root.active.fontSize')};
  line-height: ${dt('fonts.lineHeight.200')};
}

`;
