/**
 * Кастомная CSS-стилизация для компонента p-tag.
 * Подключается в map-tokens.ts: `import { tagCss } from './tokens/components/tag'`
 *
 * Размеры, цвета и радиусы приходят токенами пресета (tag.root.*, tag.icon.*, tag.colorScheme.*) —
 * PrimeNG применяет их сам. Здесь только то, чего нет в наборе токенов Aura.
 */
export const tagCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-tag {
    /* Дизайн набирает метку акцентным шрифтом (primary-font), а не текстовым */
    font-family: ${dt('fonts.fontFamily.heading')};
    line-height: ${dt('fonts.lineHeight.250')};
  }
`;
