export const checkboxCss = ({ dt }: { dt: (token: string) => string }): string => `
/* ─── Обёртка label / caption (label-position) ─── */
.extra-checkbox {
  display: flex;
  align-items: center;
  gap: ${dt('checkbox.extend.extGap.row')};
}

.extra-checkbox--left {
  flex-direction: row-reverse;
}

.extra-checkbox-body {
  display: flex;
  flex-direction: column;
  gap: ${dt('checkbox.extend.extGap.caption')};
}

/* ─── Label типографика ─── */
.checkbox-label {
  color: ${dt('checkbox.extend.extLabel.color')};
  font-family: ${dt('checkbox.extend.extLabel.fontFamily')};
  font-size: ${dt('checkbox.extend.extLabel.fontSize')};
  font-weight: ${dt('checkbox.extend.extLabel.fontWeight')};
  line-height: ${dt('checkbox.extend.extLabel.lineHeight')};
  cursor: pointer;
}

.checkbox-label:hover {
  color: ${dt('text.hoverColor')};
}

.checkbox-label--disabled,
.checkbox-label--disabled:hover {
  color: ${dt('checkbox.extend.extLabel.disabledColor')};
  cursor: default;
}

.checkbox-caption {
  color: ${dt('checkbox.extend.extCaption.color')};
  font-family: ${dt('checkbox.extend.extCaption.fontFamily')};
  font-size: ${dt('checkbox.extend.extCaption.fontSize')};
  font-weight: ${dt('checkbox.extend.extCaption.fontWeight')};
  line-height: ${dt('checkbox.extend.extCaption.lineHeight')};
}

.checkbox-caption--disabled {
  color: ${dt('checkbox.extend.extCaption.disabledColor')};
}

/* Переопределение ширины border для checkbox */
.p-checkbox-box {
  border-width: ${dt('checkbox.root.extend.borderWidth')};
}

/* Состояние indeterminate - фон и border как у checked */
.p-checkbox-indeterminate .p-checkbox-box {
  background: ${dt('checkbox.root.checkedBackground')};
  border-color: ${dt('checkbox.root.checkedBorderColor')};
}

/* Состояние indeterminate - цвет иконки как у checked */
.p-checkbox-indeterminate .p-checkbox-icon {
  color: ${dt('checkbox.icon.checkedColor')};
}

/* Состояние hover для indeterminate */
.p-checkbox-indeterminate:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
  background: ${dt('checkbox.root.checkedHoverBackground')};
  border-color: ${dt('checkbox.root.checkedHoverBorderColor')};
}

/* Focus ring с зеленым цветом для валидных состояний */
.p-checkbox:not(.p-disabled):not(.p-checkbox-checked):not(.p-invalid):has(.p-checkbox-input:focus-visible) .p-checkbox-box,
.p-checkbox-checked:not(.p-disabled):not(.p-invalid):has(.p-checkbox-input:focus-visible) .p-checkbox-box,
.p-checkbox-indeterminate:not(.p-disabled):not(.p-invalid):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
  box-shadow: 0 0 0 ${dt('checkbox.root.focusRing.focusRing')} ${dt('checkbox.extend.focusRing_success')};
}

/* Focus ring с красным цветом для состояний с ошибкой */
.p-checkbox.p-invalid .p-checkbox-box,
.p-checkbox-checked.p-invalid .p-checkbox-box,
.p-checkbox-indeterminate.p-invalid .p-checkbox-box {
  box-shadow: 0 0 0 ${dt('checkbox.extend.focusRing_width')} ${dt('checkbox.extend.focusRing_invalid')};
}
`;
