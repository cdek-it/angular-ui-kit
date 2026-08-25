/**
 * Кастомная CSS-стилизация для компонента p-checkbox.
 * Подключается в map-tokens.ts: `import { checkboxCss } from './tokens/components/checkbox'`
 *
 * Размеры бокса и цвета приходят токенами пресета (checkbox.root.*): их применяет сам PrimeNG.
 * Здесь — типографика подписей, толщина рамки, indeterminate и кольцо фокуса: ни того, ни другого
 * у Aura нет (indeterminate не покрашен, толщина рамки зашита сырым 1px).
 */
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
  display: flex;
  align-items: center;
  color: ${dt('color.fg.default')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.300')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.300')};
  cursor: pointer;
}

.checkbox-label--hover {
  color: ${dt('color.fg.brand.default')};
}

.checkbox-label--disabled {
  color: ${dt('color.fg.muted')};
  cursor: default;
}

.checkbox-caption {
  color: ${dt('color.fg.subtle')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.250')};
}

.checkbox-caption--hover {
  color: ${dt('color.fg.brand.default')};
}

.checkbox-caption--disabled {
  color: ${dt('color.fg.muted')};
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

/* ─── Цвет иконки на залитом боксе ───
   checkbox.icon.checkedColor ссылается на color.fg.on.fill.default, а эта ветка не
   инвертируется: и в light, и в dark она #ffffff. Фон бокса при этом инвертируется
   (color.bg.neutral.strong.default: тёмный в light, светлый в dark), поэтому в тёмной теме
   белая галочка пропадала на светлом фоне. Берём инверсный алиас — он меняется вместе с фоном. */
.p-checkbox-checked .p-checkbox-icon,
.p-checkbox-indeterminate .p-checkbox-icon {
  color: ${dt('color.fg.inverse.default')};
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
  box-shadow: 0 0 0 ${dt('checkbox.root.focusRing.width')} ${dt('color.border.focus')};
}

/* Focus ring с красным цветом для состояний с ошибкой */
.p-checkbox.p-invalid .p-checkbox-box,
.p-checkbox-checked.p-invalid .p-checkbox-box,
.p-checkbox-indeterminate.p-invalid .p-checkbox-box {
  box-shadow: 0 0 0 ${dt('checkbox.root.focusRing.width')} ${dt('color.bg.status.danger.weak.active')};
}
`;
