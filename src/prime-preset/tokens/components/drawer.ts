const drawerCss = ({ dt }: { dt: (token: string) => string }): string => `

/* Скругление углов */
.p-drawer.p-component {
  border-radius: ${dt('drawer.extend.borderRadius')};
}

/* Нижняя граница и внутренние отступы заголовка */
.p-drawer.p-component .p-drawer-header {
  border-bottom: 1px solid ${dt('drawer.extend.extHeader.borderColor')};
  padding: ${dt('overlay.modal.padding.300')} ${dt('overlay.modal.padding.300')} ${dt('overlay.modal.padding.100')} ${dt('overlay.modal.padding.300')};
}

/* Типографика */
.p-drawer.p-component .p-drawer-title {
  font-weight: ${dt('drawer.title.fontWeight')};
  font-size: ${dt('drawer.title.fontSize')};
}

/* Кнопки действий в заголовке - расстояние между элементами */
.p-drawer.p-component .p-drawer-header-actions {
  gap: ${dt('drawer.extend.extHeader.gap')};
}

/* Внутренние отступы контента и футера */
.p-drawer.p-component .p-drawer-content {
  padding: ${dt('overlay.modal.padding.300')};
}

.p-drawer.p-component .p-drawer-footer {
  padding: 0 ${dt('overlay.modal.padding.300')} ${dt('overlay.modal.padding.300')} ${dt('overlay.modal.padding.300')};
}

/* Кнопка закрытия — нейтральный outlined стиль вместо secondary */
.p-drawer.p-component .p-drawer-close-button {
  background: transparent;
  border: 1px solid ${dt('drawer.root.borderColor')};
  color: ${dt('text.color')};
}

.p-drawer.p-component .p-drawer-close-button:hover {
  background: ${dt('surface.100')};
  border-color: ${dt('drawer.root.borderColor')};
  color: ${dt('text.color')};
}

.p-drawer.p-component .p-drawer-close-button:active {
  background: ${dt('surface.200')};
}

/* Боковые drawer (слева/справа) - базовые размеры и отступы от краев экрана */
.p-drawer.p-component.p-drawer-left,
.p-drawer.p-component.p-drawer-right {
  margin: ${dt('drawer.extend.padding')};
  width: ${dt('drawer.root.width')};
  height: calc(100% - ${dt('drawer.extend.padding')} * 2);
}

.p-drawer.p-component.p-drawer-left.p-drawer-sm,
.p-drawer.p-component.p-drawer-right.p-drawer-sm {
  width: ${dt('drawer.sm.width')};
}

.p-drawer.p-component.p-drawer-left.p-drawer-lg,
.p-drawer.p-component.p-drawer-right.p-drawer-lg {
  width: ${dt('drawer.lg.width')};
}

.p-drawer.p-component.p-drawer-left.p-drawer-xlg,
.p-drawer.p-component.p-drawer-right.p-drawer-xlg {
  width: ${dt('drawer.xlg.width')};
}

/* Горизонтальные drawer (сверху/снизу) - базовые размеры и отступы от краев экрана */
.p-drawer.p-component.p-drawer-top,
.p-drawer.p-component.p-drawer-bottom {
  margin: ${dt('drawer.extend.padding')};
  width: calc(100% - ${dt('drawer.extend.padding')} * 2);
}

`;

export { drawerCss };
