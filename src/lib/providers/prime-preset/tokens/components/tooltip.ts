/**
 * Кастомная CSS-стилизация для компонента p-tooltip.
 * Подключается в map-tokens.ts: `import { tooltipCss } from './tokens/components/tooltip'`
 *
 * Геометрию и цвета применяет сам PrimeNG из токенов пресета (tooltip.root.*, tooltip.colorScheme.*):
 * maxWidth, gutter (он же размер стрелки), padding, borderRadius, shadow, фон и цвет текста.
 * Типографики у Aura для подсказки нет вовсе — её задаём здесь.
 */
export const tooltipCss = ({ dt }: { dt: (token: string) => string }): string => `
/* Типографика для Tooltip.
   Figma <Tooltip> (24:1369) использует текстовый стиль secondary-font/text-base/font-normal:
   fontSize.200 + lineHeight.400. В ките стояла lineHeight.300 — 18px, подогнанные под базу 14. */
.p-tooltip .p-tooltip-text {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.400')};
  letter-spacing: ${dt('fonts.letterSpacing.500')};
}
`;
