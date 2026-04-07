export const avatarCss = ({ dt }: { dt: (token: string) => string }): string => `
  :root {
    --p-avatar-extend-border-color:         ${dt('avatar.extend.borderColor')};
    --p-avatar-extend-circle-border-radius: ${dt('avatar.extend.circle.borderRadius')};
    --p-avatar-group-border-color:          ${dt('avatar.group.borderColor')};
    --p-avatar-group-offset:                ${dt('avatar.group.offset')};
    --p-avatar-lg-group-offset:             ${dt('avatar.lg.group.offset')};
    --p-avatar-xl-group-offset:             ${dt('avatar.xl.group.offset')};
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
