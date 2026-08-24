export const toggleswitchCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* Focus ring для валидных состояний */
  .p-toggleswitch:not(.p-disabled):not(.p-invalid):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: 0 0 0 ${dt('toggleswitch.root.focusRing.width')} ${dt('color.border.focus')};
  }

  /* Focus ring для состояния ошибки */
  .p-toggleswitch.p-invalid:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: 0 0 0 ${dt('dimension.space.100')} ${dt('color.bg.status.danger.weak.active')};
  }
`;
