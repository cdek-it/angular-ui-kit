export const checkboxCss = ({ dt }: { dt: (token: string) => string }): string => `
/* ─── Label типографика ─── */
.checkbox-label {
  display: flex;
  align-items: center;
  color: ${dt('checkbox.extend.text_color')};
  font-family: ${dt('checkbox.extend.fonts_fontFamily_base')};
  font-size: ${dt('checkbox.extend.fonts_fontSize_300')};
  font-weight: ${dt('checkbox.extend.fonts_fontWeight_regular')};
  line-height: normal;
  cursor: pointer;
}

.checkbox-label--hover {
  color: ${dt('checkbox.extend.text_brand')};
}

.checkbox-label--disabled {
  color: ${dt('checkbox.extend.text_mutedColor')};
  cursor: default;
}

.checkbox-caption {
  color: ${dt('checkbox.extend.text_subtle')};
  font-family: ${dt('checkbox.extend.fonts_fontFamily_heading')};
  font-size: ${dt('checkbox.extend.fonts_fontSize_200')};
  font-weight: ${dt('checkbox.extend.fonts_fontWeight_regular')};
  line-height: normal;
}

.checkbox-caption--hover {
  color: ${dt('checkbox.extend.text_brand')};
}

.checkbox-caption--disabled {
  color: ${dt('checkbox.extend.text_disabled')};
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
