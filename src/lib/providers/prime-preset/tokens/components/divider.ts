export const dividerCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-divider-content {
  display: flex;
  align-items: center;
  gap: ${dt('divider.extend.content.gap')};
  background: ${dt('color.bg.surface.default.default')};
  color: ${dt('color.fg.default')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.demibold')};
  line-height: ${dt('fonts.lineHeight.350')};
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
