export const badgeCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-badge.p-component {
  font-family: ${dt('fonts.fontFamily.heading')};
  line-height: ${dt('fonts.lineHeight.350')};
}

.p-badge.p-badge-dot {
  padding: ${dt('badge.extend.ext.padding')};
}

.p-badge.p-badge-dot.p-badge-success {
  background: ${dt('badge.extend.extDot.success.background')};
}

.p-badge.p-badge-dot.p-badge-info {
  background: ${dt('badge.extend.extDot.info.background')};
}

.p-badge.p-badge-dot.p-badge-warn {
  background: ${dt('badge.extend.extDot.warn.background')};
}

.p-badge.p-badge-dot.p-badge-danger {
  background: ${dt('badge.extend.extDot.danger.background')};
}

.p-badge.p-badge-dot.p-badge-lg {
  min-width: unset;
  width: ${dt('badge.extend.extDot.lg.size')};
  height: ${dt('badge.extend.extDot.lg.size')};
}

.p-badge.p-badge-dot.p-badge-xl {
  min-width: unset;
  width: ${dt('badge.extend.extDot.xlg.size')};
  height: ${dt('badge.extend.extDot.xlg.size')};
}
`;
