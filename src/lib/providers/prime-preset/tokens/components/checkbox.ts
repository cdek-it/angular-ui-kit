/**
 * Кастомная CSS-стилизация для компонента p-checkbox.
 * Подключается в map-tokens.ts: `import { checkboxCss } from './tokens/components/checkbox'`
 *
 * Размеры бокса и цвета приходят токенами пресета (checkbox.root.*): их применяет сам PrimeNG.
 * Здесь — типографика подписей, толщина рамки, indeterminate, иконки tabler и кольцо фокуса: этого
 * у Aura нет (indeterminate не покрашен, толщина рамки зашита сырым 1px, иконки — свои svg).
 */
export const checkboxCss = ({ dt }: { dt: (token: string) => string }): string => `
/* ─── Раскладка: бокс и текст в строку, по центру ─── */
.extra-checkbox {
  display: flex;
  align-items: center;
  gap: ${dt('dimension.space.200')};
}

.extra-checkbox--left {
  flex-direction: row-reverse;
  justify-content: flex-end;
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

/* ─── Иконка: глифы tabler вместо svg PrimeNG ───
   По DS в боксе ti-check (checked) и ti-minus (indeterminate), а PrimeNG рисует свои
   CheckIcon/MinusIcon. Прячем svg и рисуем глиф через ::before бокса — тем же приёмом,
   что галочка в select. Глиф выбираем по самой svg, а не по классам состояния: так правило
   работает и для p-checkbox внутри multiselect/listbox, где класса indeterminate нет.

   Цвет — color.fg.inverse.default, а не checkbox.icon.checkedColor: тот ссылается на
   color.fg.on.fill.default, а эта ветка не инвертируется (#ffffff в обеих темах). Фон бокса
   при этом инвертируется (color.bg.neutral.strong.default), и в тёмной теме белая иконка
   пропадала на светлом боксе. Инверсный алиас меняется вместе с фоном, на hover — тоже. */
.p-checkbox-box > svg.p-checkbox-icon {
  display: none;
}

.p-checkbox-box:has(> svg.p-checkbox-icon)::before {
  font-family: 'tabler-icons';
  font-style: normal;
  font-weight: normal;
  font-size: ${dt('checkbox.icon.size')};
  line-height: 1;
  color: ${dt('color.fg.inverse.default')};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.p-checkbox-box:has(> svg[data-p-icon='check'])::before {
  content: '\\ea5e';
}

.p-checkbox-box:has(> svg[data-p-icon='minus'])::before {
  content: '\\eaf2';
}

.p-checkbox.p-disabled .p-checkbox-box::before {
  color: ${dt('checkbox.icon.disabledColor')};
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
