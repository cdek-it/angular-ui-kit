/**
 * Кастомная CSS-стилизация для компонента p-selectbutton.
 * Подключается в map-tokens.ts: `import { selectbuttonCss } from './tokens/components/selectbutton'`
 *
 * Высоты и hover-рамка берутся из токенов togglebutton: selectbutton — контейнер кнопок-переключателей,
 * и их размерная лестница задаётся дизайном именно там.
 */
export const selectbuttonCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-selectbutton.p-component {
  background: ${dt('selectbutton.colorScheme.light.extend.background')};
  padding: ${dt('selectbutton.extend.paddingY')} ${dt('selectbutton.extend.paddingX')};
  gap: ${dt('selectbutton.extend.gap')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.300')};
  font-weight: ${dt('fonts.fontWeight.demibold')};
}

/* Сегмент: подпись Noto Sans 16/20, паддинги 8×14, радиус 8, высота 36 — как <SelectButton.Item> в Figma. */
.p-selectbutton.p-component .p-togglebutton.p-component {
  font-family: ${dt('fonts.fontFamily.base')};
  font-weight: ${dt('fonts.fontWeight.demibold')};
  line-height: ${dt('fonts.lineHeight.400')};
  height: ${dt('dimension.size.1000')};
  border-radius: ${dt('selectbutton.extend.ext.borderRadius')};
}

.p-selectbutton.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('fonts.lineHeight.400')};
}

.p-selectbutton.p-component .p-togglebutton.p-togglebutton-checked.p-component,
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-checked.p-component:hover {
  background: ${dt('selectbutton.extend.checkedBackground')};
  border-radius: ${dt('selectbutton.extend.ext.borderRadius')};
  border-color: ${dt('selectbutton.extend.checkedBorderColor')};
  color: ${dt('selectbutton.extend.checkedColor')};
}

.p-selectbutton.p-component .p-togglebutton.p-component:not(:disabled):not(.p-disabled):not(.p-togglebutton-checked):hover {
  border-radius: ${dt('selectbutton.extend.ext.borderRadius')};
  border-color: ${dt('togglebutton.extend.hoverBorderColor')};
}

/* Disabled: Figma задаёт явные цвета сегмента (фон, рамка, muted-текст), а не общую
   прозрачность PrimeNG; выбранный сегмент сохраняет заливку выбора и гасит текст.
   Значения — из вложенного <ToggleButton>, варианта checked+disabled в Figma нет. */
.p-selectbutton.p-component .p-togglebutton.p-disabled {
  opacity: ${dt('effects.opacity.100')};
  background: ${dt('togglebutton.colorScheme.light.root.disabledBackground')};
  border-color: ${dt('togglebutton.colorScheme.light.root.disabledBorderColor')};
  color: ${dt('togglebutton.colorScheme.light.root.disabledColor')};
  cursor: default;
}
.p-selectbutton.p-component .p-togglebutton.p-disabled i {
  color: ${dt('togglebutton.colorScheme.light.icon.disabledColor')};
}
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-checked.p-disabled {
  background: ${dt('selectbutton.extend.checkedBackground')};
  border-color: ${dt('selectbutton.extend.checkedBorderColor')};
  color: ${dt('togglebutton.colorScheme.light.root.disabledColor')};
  cursor: default;
}

/* Size: small — PrimeNG вешает .p-togglebutton-sm на дочерний p-togglebutton */
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-sm.p-component {
  line-height: ${dt('fonts.lineHeight.300')};
  height: ${dt('togglebutton.extend.extSm.iconOnlyWidth')};
}

.p-selectbutton.p-component .p-togglebutton.p-togglebutton-sm .p-togglebutton-label,
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-sm .p-togglebutton-content > span {
  line-height: ${dt('fonts.lineHeight.250')};
}

.p-selectbutton.p-component .p-togglebutton.p-togglebutton-sm .p-togglebutton-icon,
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-sm i {
  font-size: ${dt('selectbutton.extend.iconSize.sm')};
}

/* Size: base — токен md для togglebutton без класса размера (исключая xlarge-корень) */
.p-selectbutton.p-component:not(.p-selectbutton-xlarge) .p-togglebutton:not(.p-togglebutton-sm):not(.p-togglebutton-lg) .p-togglebutton-icon,
.p-selectbutton.p-component:not(.p-selectbutton-xlarge) .p-togglebutton:not(.p-togglebutton-sm):not(.p-togglebutton-lg) i {
  font-size: ${dt('selectbutton.extend.iconSize.md')};
}

/* Size: large — PrimeNG вешает .p-togglebutton-lg на дочерний p-togglebutton */
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-lg.p-component {
  line-height: ${dt('fonts.lineHeight.550')};
  height: ${dt('togglebutton.extend.extLg.iconOnlyWidth')};
}

.p-selectbutton.p-component .p-togglebutton.p-togglebutton-lg .p-togglebutton-label,
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-lg .p-togglebutton-content > span {
  line-height: ${dt('fonts.lineHeight.550')};
}

.p-selectbutton.p-component .p-togglebutton.p-togglebutton-lg .p-togglebutton-icon,
.p-selectbutton.p-component .p-togglebutton.p-togglebutton-lg i {
  font-size: ${dt('selectbutton.extend.iconSize.lg')};
}

/* Size: xlarge — PrimeNG не вешает на дочерний p-togglebutton класс размера (у него нет
   ступени xlg), поэтому паддинги остаются базовыми: задаём их сами, как у отдельного
   togglebutton в этой же ступени. */
.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton.p-component {
  padding: ${dt('togglebutton.extend.extXlg.padding')};
  font-size: ${dt('fonts.fontSize.600')};
  line-height: ${dt('fonts.lineHeight.550')};
  height: ${dt('togglebutton.extend.extXlg.iconOnlyWidth')};
}

.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton .p-togglebutton-label,
.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton .p-togglebutton-content > span {
  line-height: ${dt('fonts.lineHeight.700')};
}

.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton .p-togglebutton-icon,
.p-selectbutton.p-selectbutton-xlarge.p-component .p-togglebutton i {
  font-size: ${dt('selectbutton.extend.iconSize.xlg')};
}
`;
