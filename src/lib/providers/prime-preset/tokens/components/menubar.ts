export const menubarCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-menubar .p-menubar-item-content .p-menubar-submenu-icon,
  .p-menubar .p-menubar-item-content .p-menubar-item-icon {
    font-size: ${dt('menubar.extend.iconSize')};
  }

  .p-menubar-item-label {
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
  }

  .p-menubar-item-caption {
    font-size: ${dt('fonts.fontSize.200')};
    color: ${dt('menubar.extend.extItem.caption.color')};
  }

  .p-menubar .menubar-item-label {
    display: flex;
    flex-direction: column;
    gap: ${dt('menubar.extend.extItem.caption.gap')};
  }

  .p-menubar .menubar-item-caption {
    font-size: ${dt('fonts.fontSize.200')};
    color: ${dt('menubar.extend.extItem.caption.color')};
  }

  .p-menubar-submenu-label {
    padding: ${dt('menubar.extend.extSubmenuLabel.padding')};
    font-weight: ${dt('menubar.extend.extSubmenuLabel.fontWeight')};
    background: ${dt('menubar.extend.extSubmenuLabel.background')};
    color: ${dt('menubar.extend.extSubmenuLabel.color')};
  }

  .p-menubar-mobile-button-icon {
    font-size: ${dt('menubar.extend.iconSize')};
  }

/* ─── Нажатие пункта: pressedBackground из Figma ItemBase ─── */
.p-menubar .p-menubar-item:not(.p-disabled) > .p-menubar-item-content > .p-menubar-item-link:active {
  background: ${dt('menubar.extend.extItem.pressedBackground')};
}
`;
