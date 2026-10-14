export const popoverCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-popover.p-component::before {
  border-width: ${dt('popover.extend.arrow.height')} calc(${dt('popover.extend.arrow.width')} / 2);
  margin-left: calc(-1 * ${dt('popover.extend.arrow.width')} / 2);
}

.p-popover.p-component::after {
  border-width: calc(${dt('popover.extend.arrow.height')} - ${dt('popover.extend.borderWidth')})
    calc(${dt('popover.extend.arrow.width')} / 2 - ${dt('popover.extend.borderWidth')});
  margin-left: calc(-1 * (${dt('popover.extend.arrow.width')} / 2 - ${dt('popover.extend.borderWidth')}));
}
`;
