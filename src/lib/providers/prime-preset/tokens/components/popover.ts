export const popoverCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-popover.p-component::before {
    border-width: 0.73rem;
    margin-left: -0.86rem;
  }

  .p-popover.p-component::after {
    margin-left: calc(-1 * ${dt('popover.extend.arrow.width')});
  }
`;
