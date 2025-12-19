const css = ({ dt }: any) => `
.p-breadcrumb .p-breadcrumb-list .p-breadcrumb-item .p-breadcrumb-item-link:hover {
  background: ${dt('breadcrumb.extend.hoverBackground')};
}
`;

export default css;
