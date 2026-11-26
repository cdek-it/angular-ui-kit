export const dividerCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-divider-content {
  display: flex;
  align-items: center;
  gap: ${dt('divider.extend.content.gap')};
  background: ${dt('color.bg.surface.default.default')};
  color: ${dt('color.fg.muted')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.medium')};
  line-height: ${dt('fonts.lineHeight.200')};
  letter-spacing: ${dt('fonts.letterSpacing.500')};
  text-transform: uppercase;
}

.p-divider-content .ti {
  font-size: ${dt('divider.extend.iconSize')};
}

.p-divider.p-divider-vertical.p-divider-top .p-divider-content {
  align-items: flex-start;
}

.p-divider.p-divider-vertical.p-divider-bottom .p-divider-content {
  align-items: flex-end;
}
`;
