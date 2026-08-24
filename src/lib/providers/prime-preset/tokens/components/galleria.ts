export const galleriaCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-galleria .p-galleria-caption {
  background: ${dt('galleria.caption.background')};
  padding: ${dt('dimension.space.200')};
}

.p-galleria-thumbnails-content {
  background: ${dt('galleria.thumbnailContent.background')};
}

.p-galleria-mask.p-overlay-mask {
  background: ${dt('galleria.extend.backdrop')};
}

.p-galleria-mask.p-overlay-mask .p-galleria-nav-button {
  top: 0;
}

.p-galleria-mask.p-overlay-mask .p-galleria-items .p-galleria-nav-button {
  top: 50%;
}
`;
