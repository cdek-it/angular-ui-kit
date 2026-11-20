export const imageCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-image {
  border-radius: ${dt('image.root.borderRadius')};
  overflow: hidden;
}

.p-image-preview-mask {
  background: ${dt('image.preview.mask.background')};
}

.p-image-mask {
  background: ${dt('image.mask.background')};
}

/* Aura задаёт фон маски анимацией с forwards — переопределяем её. */
.p-image-mask.p-overlay-mask-enter {
  animation-name: p-image-mask-enter;
}

.p-image-mask.p-overlay-mask-leave {
  animation-name: p-image-mask-leave;
}

@keyframes p-image-mask-enter {
  from {
    background: transparent;
  }
  to {
    background: ${dt('image.mask.background')};
  }
}

@keyframes p-image-mask-leave {
  from {
    background: ${dt('image.mask.background')};
  }
  to {
    background: transparent;
  }
}

.p-image-toolbar {
  background: ${dt('image.toolbar.background')};
  border: ${dt('image.toolbar.borderWidth')} solid ${dt('image.toolbar.borderColor')};
  border-radius: ${dt('image.toolbar.borderRadius')};
  padding: ${dt('image.toolbar.padding')};
  gap: ${dt('image.toolbar.gap')};
  box-shadow: ${dt('image.toolbar.shadow')};
}

.p-image-toolbar .p-image-action {
  width: ${dt('image.action.size')};
  height: ${dt('image.action.size')};
  border-radius: ${dt('image.action.borderRadius')};
  color: ${dt('image.action.color')};
}

.p-image-toolbar .p-image-action:hover {
  background: ${dt('image.action.hoverBackground')};
  color: ${dt('image.action.hoverColor')};
}

.p-image-toolbar .p-image-action:focus-visible {
  outline: ${dt('image.action.focusRing.width')} solid ${dt('image.action.focusRing.color')};
  outline-offset: 0;
  box-shadow: none;
}

.p-image-toolbar .p-image-action .p-icon {
  width: ${dt('image.action.iconSize')};
  height: ${dt('image.action.iconSize')};
  font-size: ${dt('image.action.iconSize')};
}
`;
