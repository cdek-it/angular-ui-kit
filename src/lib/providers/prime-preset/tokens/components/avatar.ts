export const avatarCss = ({ dt }: { dt: (token: string) => string }): string => `
  :root {
    --p-avatar-extend-border-color:         ${dt('avatar.extend.borderColor')};
    --p-avatar-extend-circle-border-radius: ${dt('avatar.extend.circle.borderRadius')};
    --p-avatar-group-border-color:          ${dt('content.background')};
    --p-avatar-group-offset:                calc(-1 * ${dt('media.padding.300')});
    --p-avatar-lg-group-offset:             calc(-1 * ${dt('media.padding.300')});
    --p-avatar-xl-group-offset:             calc(-1 * ${dt('media.padding.600')});
  }

  /* ─── Группировка: отступы для кастомных классов хост-элемента <avatar> ─── */
  .p-avatar-group .ui-avatar + .ui-avatar {
    margin-inline-start: var(--p-avatar-group-offset);
  }

  .p-avatar-group .ui-avatar-lg + .ui-avatar-lg {
    margin-inline-start: var(--p-avatar-lg-group-offset);
  }

  .p-avatar-group .ui-avatar-xl + .ui-avatar-xl {
    margin-inline-start: var(--p-avatar-xl-group-offset);
  }

  /* ─── Круглая форма: clip изображения по максимальному border-radius ─── */
  .p-avatar.p-avatar-circle {
    border-radius: var(--p-avatar-extend-circle-border-radius);
    overflow: hidden;
  }

  .p-overlaybadge.p-overlaybadge {
    width: fit-content;
  }
`;
