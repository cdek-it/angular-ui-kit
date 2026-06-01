export const checkboxCss = ({ dt }: { dt: (token: string) => string }): string => `
/* ─── Label типографика ─── */
.checkbox-label {
  display: flex;
  align-items: center;
  color: ${dt('text.color')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.300')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: normal;
  cursor: pointer;
}

.checkbox-label--hover {
  color: ${dt('text.primaryColor')};
}

.checkbox-label--disabled {
  color: ${dt('text.mutedColor')};
  cursor: default;
}

.checkbox-caption {
  color: ${dt('text.secondaryColor')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: normal;
}

.checkbox-caption--hover {
  color: ${dt('text.primaryColor')};
}

.checkbox-caption--disabled {
  color: ${dt('text.disabledColor')};
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
  box-shadow: 0 0 0 ${dt('checkbox.root.focusRing.focusRing')} ${dt('focusRing.extend.success')};
}

/* Focus ring с красным цветом для состояний с ошибкой */
.p-checkbox.p-invalid .p-checkbox-box,
.p-checkbox-checked.p-invalid .p-checkbox-box,
.p-checkbox-indeterminate.p-invalid .p-checkbox-box {
  box-shadow: 0 0 0 ${dt('focusRing.width')} ${dt('focusRing.extend.invalid')};
}
`;
