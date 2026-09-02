export const menuCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-menu.p-component {
    padding: ${dt('menu.extend.paddingY')} ${dt('menu.extend.paddingX')};
  }

  .p-menu .p-menu-item-content .p-menu-item-link .p-menu-item-label {
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.none')};
  }

  .p-menu .p-menu-item-content .p-menu-item-icon {
    font-size: ${dt('menu.extend.iconSize')};
  }

  .p-menu .p-menu-item-content .menu-item-label {
    display: flex;
    flex-direction: column;
    gap: ${dt('menu.extend.extItem.caption.gap')};
  }

  .p-menu .p-menu-item-content .menu-item-caption {
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    color: ${dt('menu.extend.extItem.caption.color')};
  }

  /* Наведение на светлой поверхности — обычный пункт. */
  .p-menu .p-menu-item:not(.p-disabled):not(.p-menuitem-checked):not(.p-focus) .p-menu-item-content:hover,
  .p-menu .p-menu-item:not(.p-disabled):not(.p-menuitem-checked):not(.p-focus) .p-menu-item-content:hover .p-menu-item-link,
  .p-menu .p-menu-item:not(.p-disabled):not(.p-menuitem-checked):not(.p-focus) .p-menu-item-content:hover .p-menu-item-label,
  .p-menu .p-menu-item:not(.p-disabled):not(.p-menuitem-checked):not(.p-focus) .p-menu-item-content:hover .p-menu-item-icon {
    background: ${dt('color.bg.neutral.weak.hover')};
    color: ${dt('color.fg.default')};
  }

  .p-menu .p-menu-item.p-menuitem-checked > .p-menu-item-content,
  .p-menu .p-menu-item.p-focus > .p-menu-item-content {
    background: ${dt('menu.extend.extItem.activeBackground')};
    color: ${dt('menu.extend.extItem.activeColor')};
  }

  .p-menu .p-menu-item.p-menuitem-checked > .p-menu-item-content .p-menu-item-link,
  .p-menu .p-menu-item.p-menuitem-checked > .p-menu-item-content .p-menu-item-label,
  .p-menu .p-menu-item.p-focus > .p-menu-item-content .p-menu-item-link,
  .p-menu .p-menu-item.p-focus > .p-menu-item-content .p-menu-item-label {
    color: ${dt('menu.extend.extItem.activeColor')};
  }

  .p-menu .p-menu-item.p-menuitem-checked > .p-menu-item-content .p-menu-item-icon,
  .p-menu .p-menu-item.p-focus > .p-menu-item-content .p-menu-item-icon {
    color: ${dt('menu.extend.extItem.icon.activeColor')};
  }

  /*
   * Наведение на тёмной поверхности — выбранный или сфокусированный пункт. Ступень hover берётся
   * у той же поверхности, на которой пункт стоит: светлый weak.hover вернул бы ему вид обычного.
   * Текст не трогаем — он уже инверсный по правилам выше.
   */
  .p-menu .p-menu-item:not(.p-disabled).p-menuitem-checked > .p-menu-item-content:hover,
  .p-menu .p-menu-item:not(.p-disabled).p-focus > .p-menu-item-content:hover {
    background: ${dt('color.bg.neutral.strong.hover')};
  }

  /*
   * Нажатие. Меняется только фон — на ступень «active» той же поверхности, на которой пункт
   * уже стоит: невыбранный остаётся светлым, выбранный тёмным. Текст и иконка не трогаются,
   * иначе на невыбранном пункте они вспыхивали бы белым под тёмной подложкой.
   * .p-menu-list в цепочке поднимает специфичность выше правил наведения и выбора.
   * transition-duration: 0s гасит переход только на вдавливании: оттенок появляется мгновенно,
   * а на отпускании правило перестаёт совпадать и фон уходит по общему transition компонента.
   */
  .p-menu .p-menu-list .p-menu-item:not(.p-disabled):not(.p-menuitem-checked):not(.p-focus) > .p-menu-item-content:active {
    background: ${dt('color.bg.neutral.weak.active')};
    transition-duration: 0s;
  }

  .p-menu .p-menu-list .p-menu-item:not(.p-disabled).p-menuitem-checked > .p-menu-item-content:active,
  .p-menu .p-menu-list .p-menu-item:not(.p-disabled).p-focus > .p-menu-item-content:active {
    background: ${dt('color.bg.neutral.strong.active')};
    transition-duration: 0s;
  }

  .p-menu .p-menu-submenu-label {
    text-transform: uppercase;
    font-family: ${dt('fonts.fontFamily.heading')};
    font-size: ${dt('fonts.fontSize.100')};
    line-height: ${dt('fonts.lineHeight.none')};
  }
`;
