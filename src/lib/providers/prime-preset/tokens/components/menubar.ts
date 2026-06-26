export const menubarCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-menubar-submenu-icon,
  .p-menubar-item-icon {
    font-size: ${dt('menubar.extend.iconSize')};
  }

  .p-menubar-item-label {
    font-family: ${dt('menubar.extend.fonts_fontFamily_base')};
    font-size: ${dt('menubar.extend.fonts_fontSize_300')};
    font-weight: ${dt('menubar.extend.fonts_fontWeight_regular')};
  }

  .p-menubar-item-caption {
    font-size: ${dt('menubar.extend.fonts_fontSize_200')};
    color: ${dt('menubar.extend.extItem.caption.color')};
  }

  .p-menubar .menubar-item-label {
    display: flex;
    flex-direction: column;
    gap: ${dt('menubar.extend.extItem.caption.gap')};
  }

  .p-menubar .menubar-item-caption {
    font-size: ${dt('menubar.extend.fonts_fontSize_200')};
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
`;
