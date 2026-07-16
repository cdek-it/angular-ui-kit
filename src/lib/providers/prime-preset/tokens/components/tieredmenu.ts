export const tieredmenuCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-tieredmenu {
    width: min-content;
  }

  .p-tieredmenu-item-content {
    font-size: ${dt('tieredmenu.extend.fonts_fontSize_300')};
  }

  .p-tieredmenu-submenu-icon {
    font-size: ${dt('tieredmenu.extend.iconSize')};
  }

  /* ─── Selected (checked) item ─── */

  .p-tieredmenu .p-tieredmenu-item.p-tieredmenu-item-checked > .p-tieredmenu-item-content {
    background: ${dt('tieredmenu.item.activeBackground')};
    color: ${dt('tieredmenu.item.activeColor')};
  }

  .p-tieredmenu .p-tieredmenu-item.p-tieredmenu-item-checked > .p-tieredmenu-item-content :is(.p-tieredmenu-item-link, .p-tieredmenu-item-label, .p-tieredmenu-item-icon, .p-tieredmenu-submenu-icon) {
    color: ${dt('tieredmenu.item.activeColor')};
  }

  /* ─── Hover on selected ─── */

  .p-tieredmenu .p-tieredmenu-item.p-tieredmenu-item-checked:not(.p-disabled) > .p-tieredmenu-item-content:hover {
    background: ${dt('tieredmenu.item.focusBackground')};
    color: ${dt('tieredmenu.item.focusColor')};
  }

  .p-tieredmenu .p-tieredmenu-item.p-tieredmenu-item-checked:not(.p-disabled) > .p-tieredmenu-item-content:hover :is(.p-tieredmenu-item-link, .p-tieredmenu-item-label) {
    color: ${dt('tieredmenu.item.focusColor')};
  }

  .p-tieredmenu .p-tieredmenu-item.p-tieredmenu-item-checked:not(.p-disabled) > .p-tieredmenu-item-content:hover :is(.p-tieredmenu-item-icon, .p-tieredmenu-submenu-icon) {
    color: ${dt('tieredmenu.item.icon.focusColor')};
  }

  /* ─── Captions ─── */

  .p-tieredmenu .p-tieredmenu-item-caption {
    display: flex;
    flex-direction: column;
    gap: ${dt('tieredmenu.extend.extItem.caption.gap')};
  }

  .p-tieredmenu .p-tieredmenu-item-caption-text {
    font-size: ${dt('tieredmenu.extend.fonts_fontSize_200')};
    color: ${dt('tieredmenu.extend.extItem.caption.color')};
  }
`;
