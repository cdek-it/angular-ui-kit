export const toggleswitchCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Раскладка: свитч и текст в строку, по центру ─── */
  .extra-toggleswitch {
    display: flex;
    align-items: center;
    gap: ${dt('dimension.space.200')};
  }

  .extra-toggleswitch--left {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  /* ─── Label типографика ─── */
  .toggleswitch-label {
    display: flex;
    align-items: center;
    color: ${dt('color.fg.default')};
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.300')};
    cursor: pointer;
  }

  .toggleswitch-label--disabled {
    color: ${dt('color.fg.muted')};
    cursor: default;
  }

  /* ─── Caption типографика ─── */
  .toggleswitch-caption {
    color: ${dt('color.fg.subtle')};
    font-family: ${dt('fonts.fontFamily.heading')};
    font-size: ${dt('fonts.fontSize.200')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.250')};
  }

  .toggleswitch-caption--disabled {
    color: ${dt('color.fg.muted')};
  }

  /* Focus ring для валидных состояний */
  .p-toggleswitch:not(.p-disabled):not(.p-invalid):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: 0 0 0 ${dt('toggleswitch.root.focusRing.width')} ${dt('color.border.focus')};
  }

  /* Focus ring для состояния ошибки */
  .p-toggleswitch.p-invalid:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: 0 0 0 ${dt('dimension.space.100')} ${dt('color.bg.status.danger.weak.active')};
  }
`;
