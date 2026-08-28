export const drawerCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-drawer-mask.p-overlay-mask {
  background: ${dt('drawer.extend.backdrop')};
}

.p-drawer.p-component {
  border-radius: ${dt('drawer.extend.borderRadius')};
}

.p-drawer.p-component .p-drawer-header {
  border-bottom: ${dt('drawer.extend.borderWidth')} solid ${dt('drawer.extend.extHeader.borderColor')};
  padding: ${dt('dimension.space.600')} ${dt('dimension.space.600')} ${dt('dimension.space.400')} ${dt('dimension.space.600')};
}

.p-drawer.p-component .p-drawer-title {
  font-weight: ${dt('drawer.title.fontWeight')};
  font-size: ${dt('drawer.title.fontSize')};
}

.p-drawer.p-component .p-drawer-header-actions {
  gap: ${dt('drawer.extend.extHeader.gap')};
}

.p-drawer.p-component .p-drawer-content {
  padding: ${dt('dimension.space.600')};
}

.p-drawer.p-component .p-drawer-footer {
  padding: 0 ${dt('dimension.space.600')} ${dt('dimension.space.600')} ${dt('dimension.space.600')};
}

/* Ширина панели: в экспорте у drawer одна ширина, поэтому размеры берём с той же ступени
   примитивов, что рисует Figma (коллекция sizing, width: 280 / 350 / 420 / 630) */
.p-drawer.p-component.p-drawer-left,
.p-drawer.p-component.p-drawer-right {
  margin: ${dt('drawer.extend.margin')};
  width: ${dt('sizing.175x')};
  height: calc(100% - ${dt('drawer.extend.margin')} * 2);
}

.p-drawer.p-component.p-drawer-left.p-drawer-sm,
.p-drawer.p-component.p-drawer-right.p-drawer-sm {
  width: ${dt('sizing.140x')};
}

.p-drawer.p-component.p-drawer-left.p-drawer-lg,
.p-drawer.p-component.p-drawer-right.p-drawer-lg {
  width: ${dt('sizing.210x')};
}

.p-drawer.p-component.p-drawer-left.p-drawer-xlg,
.p-drawer.p-component.p-drawer-right.p-drawer-xlg {
  width: ${dt('sizing.315x')};
}

.p-drawer.p-component.p-drawer-top,
.p-drawer.p-component.p-drawer-bottom {
  margin: ${dt('drawer.extend.margin')};
  width: calc(100% - ${dt('drawer.extend.margin')} * 2);
}

.p-drawer.p-component.p-drawer-full,
.p-drawer.p-component.p-drawer-full.p-drawer-sm,
.p-drawer.p-component.p-drawer-full.p-drawer-lg,
.p-drawer.p-component.p-drawer-full.p-drawer-xlg {
  margin: 0;
  width: 100%;
  height: 100%;
}

`;
