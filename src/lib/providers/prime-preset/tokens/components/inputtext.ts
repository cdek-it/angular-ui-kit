/**
 * Кастомная CSS-стилизация для компонента p-inputtext.
 * Подключается в map-tokens.ts: `import { inputtextCss } from './tokens/components/inputtext'`
 *
 * Размеры и цвета приходят токенами пресета (inputtext.root.*), размер xlg и толщина рамки —
 * здесь: у Aura нет ни того, ни другого (рамка зашита сырым 1px).
 */
export const inputtextCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Базовые стили ─── */
.p-inputtext {
  line-height: ${dt('fonts.lineHeight.250')};
  font-family: ${dt('fonts.fontFamily.base')};
  border-width: ${dt('inputtext.extend.borderWidth')};
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

/* ─── Высота по размерам ───
   Токена высоты поля в экспорте нет, а <input> в браузере не может быть ниже метрик шрифта:
   без явной высоты она диктуется глифами (21.5px вместо line-height 16px) и уезжает
   в дробные пиксели. Собираем высоту из тех же токенов, что задаёт дизайн. */
.p-inputtext {
  height: calc(
    ${dt('fonts.lineHeight.250')} + 2 * ${dt('inputtext.root.paddingY')} + 2 *
      ${dt('inputtext.extend.borderWidth')}
  );
}

.p-inputtext.p-inputtext-sm {
  height: calc(
    ${dt('fonts.lineHeight.250')} + 2 * ${dt('inputtext.root.sm.paddingY')} + 2 *
      ${dt('inputtext.extend.borderWidth')}
  );
}

.p-inputtext.p-inputtext-lg {
  height: calc(
    ${dt('fonts.lineHeight.250')} + 2 * ${dt('inputtext.root.lg.paddingY')} + 2 *
      ${dt('inputtext.extend.borderWidth')}
  );
}

.p-inputtext.p-inputtext-xlg {
  height: calc(
    ${dt('fonts.lineHeight.250')} + 2 * ${dt('inputtext.extend.extXlg.paddingY')} + 2 *
      ${dt('inputtext.extend.borderWidth')}
  );
}

/* Внутри float-label вертикальные паддинги задаёт сам плавающий лейбл (24/8),
   поэтому высоту там считать по базовым паддингам нельзя — оставляем содержимому */
.p-floatlabel .p-inputtext {
  height: auto;
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
