export const badgeCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Badge extend: публикуем кастомные переменные в :root ─── */
  :root {
    --p-badge-extend-dot-success-background: ${dt('badge.extend.extDot.success.background')};
    --p-badge-extend-dot-info-background:    ${dt('badge.extend.extDot.info.background')};
    --p-badge-extend-dot-warn-background:    ${dt('badge.extend.extDot.warn.background')};
    --p-badge-extend-dot-danger-background:  ${dt('badge.extend.extDot.danger.background')};
    --p-badge-extend-dot-lg-size:            ${dt('badge.extend.extDot.lg.size')};
    --p-badge-extend-dot-xlg-size:           ${dt('badge.extend.extDot.xlg.size')};
    --p-badge-extend-padding:                ${dt('badge.extend.ext.padding')};
  }

  /* ─── Dot-вариант: бейдж без значения ─── */
  .p-badge.p-badge-dot {
    padding: var(--p-badge-extend-padding);
  }

  .p-badge.p-badge-dot.p-badge-success { background: var(--p-badge-extend-dot-success-background); }
  .p-badge.p-badge-dot.p-badge-info    { background: var(--p-badge-extend-dot-info-background); }
  .p-badge.p-badge-dot.p-badge-warn    { background: var(--p-badge-extend-dot-warn-background); }
  .p-badge.p-badge-dot.p-badge-danger  { background: var(--p-badge-extend-dot-danger-background); }

  .p-badge.p-badge-dot.p-badge-lg  { min-width: unset; width: var(--p-badge-extend-dot-lg-size);  height: var(--p-badge-extend-dot-lg-size); }
  .p-badge.p-badge-dot.p-badge-xl  { min-width: unset; width: var(--p-badge-extend-dot-xlg-size); height: var(--p-badge-extend-dot-xlg-size); }
`;
