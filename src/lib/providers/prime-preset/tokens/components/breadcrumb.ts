export const breadcrumbCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-breadcrumb-item-link {
    padding: ${dt('breadcrumb.extend.extItem.padding')};
    font-size: ${dt('breadcrumb.extend.fonts_fontSize_200')};
  }

  .p-breadcrumb-item-link:hover {
    background: ${dt('breadcrumb.extend.hoverBackground')};
  }

  .p-breadcrumb-item-icon {
    font-size: ${dt('breadcrumb.extend.iconSize')};
  }

  .p-breadcrumb-item:last-child .p-breadcrumb-item-link {
    opacity: ${dt('breadcrumb.extend.opacity_500')};
    pointer-events: none;
    cursor: default;
  }

  .p-breadcrumb-item:last-child .p-breadcrumb-item-link:hover {
    background: ${dt('breadcrumb.extend.transparent')};
  }
`;
