export const megamenuCss = ({ dt }: { dt: (token: string) => string }): string => `
/* ─── Размер иконок ─── */
.p-megamenu-submenu-icon,
.p-megamenu-item-icon {
  font-size: ${dt('megamenu.extend.iconSize')};
}

/* ─── Типографика пунктов меню ─── */
.p-megamenu-item-label {
  font-size: ${dt('megamenu.extend.fonts_fontSize_300')};
  font-weight: ${dt('megamenu.extend.fonts_fontWeight_regular')};
}

/* ─── Caption (описание) для кастомных пунктов ─── */
.p-megamenu .megamenu-item-label {
  display: flex;
  flex-direction: column;
  gap: ${dt('megamenu.extend.extItem.caption.gap')};
}

.p-megamenu .megamenu-item-caption {
  font-size: ${dt('megamenu.extend.fonts_fontSize_200')};
  color: ${dt('megamenu.extend.extItem.caption.color')};
}

/* ─── Иконка мобильной кнопки ─── */
.p-megamenu-mobile-button-icon {
  font-size: ${dt('megamenu.extend.iconSize')};
}

/* ─── Размер ширины панели по контенту и позиционирование для активных пунктов горизонтального вида от начала пункта меню ─── */
.p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay,
.p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay {
  min-width: fit-content;
  left: unset;
}

/* ─── Позиционирование оверлея от пункта для вертикального вида ─── */
.p-megamenu.p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay {
  left: 100%;
}
`;
