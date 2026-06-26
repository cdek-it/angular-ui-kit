export const galleriaCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Подпись к изображению ─── */
  .p-galleria .p-galleria-caption {
    background: ${dt('galleria.caption.background')};
    padding: ${dt('galleria.extend.dimension_space_200')};
  }

  /* ─── Кнопки навигации в полноэкранном режиме ─── */
  .p-galleria-mask.p-overlay-mask .p-galleria-nav-button {
    top: 0%;
  }

  .p-galleria-mask.p-overlay-mask .p-galleria-items .p-galleria-nav-button {
    top: 50%;
  }
`;
