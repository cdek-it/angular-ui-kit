export const inputtextCss = ({ dt }: { dt: (token: string) => string }): string => `

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
  box-shadow: 0 0 0 ${dt('inputtext.root.focusRing.width')} ${dt('color.bg.status.danger.weak.active')};
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

/* ─── Обёртка label / caption (label-position) ─── */
.extra-inputtext {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
}

.extra-inputtext--left {
  flex-direction: row;
  align-items: center;
  gap: ${dt('inputtext.extend.extGap.left')};
}

.extra-inputtext-body {
  display: flex;
  flex-direction: column;
  gap: ${dt('inputtext.extend.extGap.caption')};
}

/* Label типографика */
.extra-inputtext-label {
  display: inline-flex;
  align-items: center;
  gap: ${dt('inputtext.extend.extGap.infoIcon')};
  color: ${dt('inputtext.extend.extLabel.color')};
  font-family: ${dt('inputtext.extend.extLabel.fontFamily')};
  font-size: ${dt('inputtext.extend.extLabel.fontSize')};
  font-weight: ${dt('inputtext.extend.extLabel.fontWeight')};
  line-height: ${dt('inputtext.extend.extLabel.lineHeight')};
}

/* Отступ label → поле (только при положении сверху) */
.extra-inputtext-body > .extra-inputtext-label {
  margin-bottom: ${dt('inputtext.extend.extGap.label')};
}

/* Иконка info в label (тултип) */
.extra-inputtext-label-icon {
  font-size: ${dt('inputtext.extend.extInfoIcon.size')};
  color: ${dt('inputtext.extend.extInfoIcon.color')};
  cursor: help;
}

/* Caption типографика */
.extra-inputtext-caption {
  color: ${dt('inputtext.extend.extCaption.color')};
  font-family: ${dt('inputtext.extend.extCaption.fontFamily')};
  font-size: ${dt('inputtext.extend.extCaption.fontSize')};
  font-weight: ${dt('inputtext.extend.extCaption.fontWeight')};
  line-height: ${dt('inputtext.extend.extCaption.lineHeight')};
}
`;
