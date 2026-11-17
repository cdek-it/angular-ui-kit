export const ratingCss = ({ dt }: { dt: (key: string) => string }) => `
extra-rating {
  display: inline-flex;
}
.extra-rating {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${dt('rating.root.gap')};
}
.extra-rating-row {
  display: inline-flex;
  align-items: center;
  gap: ${dt('rating.root.gap')};
}
.extra-rating .p-rating {
  gap: ${dt('rating.root.gap')};
}
.extra-rating--interactive .p-rating {
  gap: ${dt('rating.extend.interactiveGap')};
}
.extra-rating .p-rating-option {
  flex: none;
  justify-content: center;
  border-radius: ${dt('dimension.borderRadius.none')};
}
.extra-rating--interactive .p-rating-option {
  padding: ${dt('rating.extend.itemPadding')};
}
.extra-rating .p-rating-icon,
.extra-rating-clear .ti {
  display: block;
  flex: none;
  width: ${dt('rating.icon.size')};
  height: ${dt('rating.icon.size')};
  font-size: ${dt('rating.icon.size')};
  line-height: ${dt('rating.icon.size')};
}
.extra-rating--base .p-rating-icon,
.extra-rating--base .extra-rating-clear .ti {
  width: ${dt('rating.extend.base.iconSize')};
  height: ${dt('rating.extend.base.iconSize')};
  font-size: ${dt('rating.extend.base.iconSize')};
  line-height: ${dt('rating.extend.base.iconSize')};
}
.extra-rating--large .p-rating-icon,
.extra-rating--large .extra-rating-clear .ti {
  width: ${dt('rating.extend.large.iconSize')};
  height: ${dt('rating.extend.large.iconSize')};
  font-size: ${dt('rating.extend.large.iconSize')};
  line-height: ${dt('rating.extend.large.iconSize')};
}
.extra-rating .p-rating.p-disabled,
.extra-rating-clear:disabled {
  opacity: ${dt('effects.opacity.50')};
}
.extra-rating .p-rating.p-readonly .p-rating-option {
  cursor: default;
}
.extra-rating .p-rating-option:has(input:focus-visible),
.extra-rating-clear:focus-visible {
  outline: ${dt('rating.root.focusRing.width')} ${dt('rating.root.focusRing.style')} ${dt('rating.root.focusRing.color')};
  outline-offset: ${dt('rating.root.focusRing.offset')};
  box-shadow: ${dt('rating.root.focusRing.shadow')};
}
.extra-rating .extra-rating-preview {
  color: ${dt('rating.icon.hoverColor')};
}
.extra-rating-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${dt('dimension.size.none')};
  border: none;
  background: transparent;
  color: ${dt('rating.icon.color')};
  cursor: pointer;
}
.extra-rating--interactive .extra-rating-clear {
  padding: ${dt('rating.extend.itemPadding')};
}
.extra-rating-clear:not(:disabled):hover {
  color: ${dt('rating.icon.hoverColor')};
}
.extra-rating-clear:disabled {
  cursor: default;
}
.extra-rating-labels {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${dt('rating.extend.itemPadding')};
  width: calc(5 * ${dt('rating.icon.size')} + 4 * ${dt('rating.root.gap')});
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.100')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.200')};
  letter-spacing: ${dt('fonts.letterSpacing.500')};
  color: ${dt('rating.icon.color')};
}
.extra-rating-labels > span {
  min-width: 0;
  overflow-wrap: anywhere;
}
`;
