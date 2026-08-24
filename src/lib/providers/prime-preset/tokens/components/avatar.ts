export const avatarCss = ({ dt }: { dt: (token: string) => string }): string => `
.p-avatar-group .ui-avatar + .ui-avatar {
  margin-inline-start: ${dt('avatar.group.offset')};
}

.p-avatar-group .ui-avatar-lg + .ui-avatar-lg {
  margin-inline-start: ${dt('avatar.lg.group.offset')};
}

.p-avatar-group .ui-avatar-xl + .ui-avatar-xl {
  margin-inline-start: ${dt('avatar.xl.group.offset')};
}

.p-avatar.p-avatar-circle {
  border-radius: ${dt('avatar.extend.circle.borderRadius')};
  overflow: hidden;
}

.p-overlaybadge.p-overlaybadge {
  width: fit-content;
}
`;
