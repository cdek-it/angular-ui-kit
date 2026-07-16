export const menuCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-menu.p-component {
    padding: ${dt('menu.extend.paddingY')} ${dt('menu.extend.paddingX')};
  }

  .p-menu .p-menu-item-content .p-menu-item-link .p-menu-item-label {
    font-family: ${dt('menu.extend.fonts_fontFamily_base')};
    font-size: ${dt('menu.extend.fonts_fontSize_300')};
    font-weight: ${dt('menu.extend.fonts_fontWeight_regular')};
    line-height: ${dt('menu.extend.fonts_lineHeight_400')};
  }

  .p-menu .p-menu-item-content .menu-item-label {
    display: flex;
    flex-direction: column;
    gap: ${dt('menu.extend.extItem.caption.gap')};
  }

  .p-menu .p-menu-item-content .menu-item-caption {
    font-family: ${dt('menu.extend.fonts_fontFamily_base')};
    font-size: ${dt('menu.extend.fonts_fontSize_200')};
    font-weight: ${dt('menu.extend.fonts_fontWeight_regular')};
    color: ${dt('menu.colorScheme.light.extend.extItem.caption.color')};
  }

  .p-menu .p-menu-item:not(.p-disabled) .p-menu-item-content:hover,
  .p-menu .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-link,
  .p-menu .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-label,
  .p-menu .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
    background: ${dt('menu.colorScheme.light.item.focusBackground')};
    color: ${dt('menu.colorScheme.light.item.focusColor')};
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
    color: ${dt('menu.colorScheme.light.extend.extItem.icon.activeColor')};
  }

  .p-menu .p-menu-item.p-menuitem-checked:not(.p-disabled) > .p-menu-item-content:hover {
    background: ${dt('menu.colorScheme.light.item.focusBackground')};
    color: ${dt('menu.colorScheme.light.item.focusColor')};
  }

  .p-menu .p-menu-item.p-menuitem-checked:not(.p-disabled) > .p-menu-item-content:hover .p-menu-item-icon {
    color: ${dt('menu.colorScheme.light.item.focusColor')};
  }

  .p-menu .p-menu-submenu-label {
    text-transform: uppercase;
    font-size: ${dt('menu.extend.fonts_fontSize_200')};
    font-family: ${dt('menu.extend.fonts_fontFamily_heading')};
    line-height: ${dt('menu.extend.fonts_lineHeight_400')};
  }
`;
