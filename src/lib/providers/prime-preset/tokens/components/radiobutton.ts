/**
 * Кастомная CSS-стилизация для компонента p-radiobutton.
 * Подключается в map-tokens.ts: `import { radiobuttonCss } from './tokens/components/radiobutton'`
 *
 * Цвета и базовые размеры приходят токенами пресета (radiobutton.root.*): их применяет сам PrimeNG.
 * Здесь — кольцо фокуса, ступень sm и цвет точки: этого у Aura нет либо
 * значение теряется на коллизии имён (см. комментарии ниже).
 */
export const radiobuttonCss = ({ dt }: { dt: (token: string) => string }): string => `
/* Focus ring с зеленым цветом для валидных состояний */
.p-radiobutton:not(.p-disabled):not(.p-invalid):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box,
.p-radiobutton-checked:not(.p-disabled):not(.p-invalid):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
  outline: none;
  box-shadow: 0 0 0 ${dt('radiobutton.focusRing.width')} ${dt('color.border.focus')};
}

/* Focus ring с красным цветом для состояний с ошибкой */
.p-radiobutton.p-invalid .p-radiobutton-box,
.p-radiobutton.p-invalid:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box,
.p-radiobutton-checked.p-invalid .p-radiobutton-box,
.p-radiobutton-checked.p-invalid:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
  box-shadow: 0 0 0 ${dt('radiobutton.focusRing.width')} ${dt('color.bg.status.danger.weak.active')};
}

/* ─── Ступень sm ───
   Ширина sm продублирована в экспорте на двух уровнях: radiobutton.sm.width = dimension.size.450
   (16px) и radiobutton.root.sm.width = dimension.size.200 (8px). PrimeUIX отбрасывает сегмент
   root, обе схлопываются в --p-radiobutton-sm-width, и побеждает объявленная позже — 8px,
   вдвое меньше замысла: точка (8px) не помещалась в бокс. Через dt('radiobutton.sm.width')
   правильное значение не достать — это то же имя переменной, поэтому ссылаемся на ту самую
   ступень, на которую указывает radiobutton.sm.width. Коллизию чинить в Figma. */
.p-radiobutton.p-radiobutton-sm,
.p-radiobutton.p-radiobutton-sm .p-radiobutton-box {
  width: ${dt('dimension.size.450')};
  height: ${dt('dimension.size.450')};
}

.p-radiobutton.p-radiobutton-sm .p-radiobutton-icon {
  width: ${dt('radiobutton.icon.sm.size')};
  height: ${dt('radiobutton.icon.sm.size')};
}

/* ─── Цвет точки ───
   radiobutton.icon.checkedColor ссылается на color.fg.on.fill.default, а эта ветка не
   инвертируется: и в light, и в dark она #ffffff. Фон бокса при этом инвертируется
   (color.bg.neutral.strong.default: тёмный в light, светлый в dark), поэтому в тёмной теме
   белая точка пропадала на светлом фоне. Берём инверсный алиас — он меняется вместе с фоном. */
.p-radiobutton-checked .p-radiobutton-icon {
  background: ${dt('color.fg.inverse.default')};
}
`;
