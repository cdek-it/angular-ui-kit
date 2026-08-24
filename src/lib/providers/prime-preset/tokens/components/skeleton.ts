export const skeletonCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-skeleton {
  min-width: ${dt('skeleton.extend.minWidth')};
}
`;
