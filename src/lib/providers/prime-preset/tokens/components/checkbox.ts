/**
 * Кастомная CSS-стилизация для компонента p-checkbox.
 * Подключается в map-tokens.ts: `import { checkboxCss } from './tokens/components/checkbox'`
 *
 * Размеры бокса и цвета приходят токенами пресета (checkbox.root.*): их применяет сам PrimeNG.
 * Здесь — типографика подписей, толщина рамки, indeterminate, иконки Tabler и кольцо фокуса: этого
 * у Aura нет (indeterminate не покрашен, толщина рамки зашита сырым 1px, иконки — свои svg).
 */

// PrimeNG добавляет data-pc-section через Pass Through к своим SVG, включая шапку MultiSelect.
const primeIcon = ".p-checkbox-box > svg.p-checkbox-icon[data-pc-section='icon']";

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

/* Инверсный цвет следует за цветом залитого бокса в светлой и тёмной теме,
   в том числе на hover. Эти правила применяются и к пользовательским иконкам. */
.p-checkbox-checked .p-checkbox-icon,
.p-checkbox-indeterminate .p-checkbox-icon {
  color: ${dt('color.fg.inverse.default')};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon,
.p-checkbox-indeterminate:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
  color: ${dt('color.fg.inverse.default')};
}

/* Контуры Tabler Icons 3.35.0 (MIT), Copyright (c) 2020-2025 Paweł Kuna.
   https://github.com/tabler/tabler-icons/tree/v3.35.0/icons/outline
   Координаты обводки 2px в viewBox 24×24 переведены в проценты от размера SVG.
   clip-path использует размеры и цвет PrimeNG без загрузки ресурсов (в том числе при CSP img-src 'self').
   В forced colors сохраняем путь PrimeNG: браузер может перекрасить фон SVG. */
@supports (clip-path: polygon(0 0, 100% 0, 0 100%)) {
  @media (forced-colors: none) {
    ${primeIcon}[data-p-icon='check'] {
      clip-path: polygon(
        23.780% 47.054%, 41.667% 64.941%,
        80.387% 26.220%, 81.739% 25.317%, 83.333% 25%, 84.928% 25.317%, 86.280% 26.220%,
        87.183% 27.572%, 87.500% 29.167%, 87.183% 30.761%, 86.280% 32.113%,
        44.613% 73.780%, 43.261% 74.683%, 41.667% 75%, 40.072% 74.683%, 38.720% 73.780%,
        17.887% 52.946%, 16.984% 51.595%, 16.667% 50%, 16.984% 48.405%, 17.887% 47.054%,
        19.239% 46.151%, 20.833% 45.833%, 22.428% 46.151%
      );
    }

    ${primeIcon}[data-p-icon='minus'] {
      clip-path: inset(45.833% 16.667% round 1em);
    }

    ${primeIcon}:is([data-p-icon='check'], [data-p-icon='minus']) {
      background-color: currentColor;
    }

    ${primeIcon}:is([data-p-icon='check'], [data-p-icon='minus']) > path {
      visibility: hidden;
    }
  }
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
