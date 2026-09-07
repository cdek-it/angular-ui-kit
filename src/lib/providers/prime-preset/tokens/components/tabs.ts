export const tabsCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-tabs .p-tablist.p-tablist,
.p-tabs .p-tablist-content.p-tablist-content,
.p-tabs .p-tablist-viewport.p-tablist-viewport {
  overflow: visible;
}

.p-tabs .p-tablist .p-tab.p-tab {
  display: flex;
  align-items: center;
  gap: ${dt('tabs.tab.gap')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('tabs.tab.fontWeight')};
  line-height: ${dt('fonts.lineHeight.none')};
}

.p-tabs .p-tablist {
  border-style: solid;
  border-width: ${dt('tabs.tablist.borderWidth')};
  border-color: ${dt('tabs.tablist.borderColor')};
}
`;
