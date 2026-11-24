export const inputnumberCss = ({ dt }: { dt: (token: string) => string }): string => `
.extra-inputnumber-field { position: relative; display: inline-flex; max-width: 100%; }
.extra-inputnumber-field--fluid { width: 100%; }
.extra-inputnumber-clear { border: 0; padding: 0; background: transparent; cursor: pointer; }
.extra-inputnumber { display: inline-flex; flex-direction: column; }
.extra-inputnumber--left { flex-direction: row; align-items: flex-start; gap: ${dt('dimension.space.350')}; }
.extra-inputnumber-body { display: flex; flex-direction: column; align-items: flex-start; gap: ${dt('dimension.space.100')}; min-width: 0; }
.extra-inputnumber--fluid, .extra-inputnumber--fluid > .extra-inputnumber-body, .extra-inputnumber--fluid .p-floatlabel { width: 100%; }
.extra-inputnumber--left > .extra-inputnumber-body { flex: 1 1 auto; }
.extra-inputnumber-label { display: inline-flex; align-items: center; gap: ${dt('dimension.space.100')}; color: ${dt('color.fg.default')}; font-family: ${dt('fonts.fontFamily.base')}; font-size: ${dt('fonts.fontSize.200')}; font-weight: ${dt('fonts.fontWeight.regular')}; line-height: ${dt('fonts.lineHeight.200')}; cursor: pointer; }
.extra-inputnumber-label-icon { font-size: ${dt('fonts.fontSize.200')}; line-height: 1; color: ${dt('color.fg.muted')}; cursor: help; }
.extra-inputnumber-required { color: ${dt('color.fg.status.danger.default')}; font-size: ${dt('fonts.fontSize.100')}; }
.p-inputnumber { width: ${dt('inputnumber.extend.field.width')}; }
.p-inputnumber .p-inputnumber-input { width: 100%; min-width: 0; font-family: ${dt('fonts.fontFamily.base')}; font-weight: ${dt('fonts.fontWeight.regular')}; color: ${dt('inputnumber.extend.field.color')}; background: ${dt('inputnumber.extend.field.background')}; border: ${dt('inputnumber.extend.borderWidth')} solid ${dt('inputnumber.extend.field.borderColor')}; border-radius: ${dt('inputnumber.extend.field.borderRadius')}; padding-inline: ${dt('inputnumber.extend.field.paddingX')}; }
.p-inputnumber .p-inputnumber-input::placeholder { color: ${dt('floatlabel.color')}; opacity: 1; }
.p-inputnumber .p-inputnumber-input:enabled:hover { border-color: ${dt('inputnumber.extend.field.hoverBorderColor')}; }
.p-inputnumber .p-inputnumber-input:enabled:focus { border-color: ${dt('inputnumber.extend.field.hoverBorderColor')}; box-shadow: 0 0 0 ${dt('inputnumber.extend.field.focusWidth')} ${dt('inputnumber.extend.field.focusColor')}; }
.p-inputnumber .p-inputnumber-input:disabled { color: ${dt('floatlabel.color')}; background: ${dt('inputnumber.extend.field.disabledBackground')}; }
.p-inputnumber .p-inputnumber-input:disabled.p-filled { color: ${dt('inputnumber.extend.field.color')}; }
.p-inputnumber .p-inputnumber-input:enabled:read-only { color: ${dt('inputnumber.extend.field.color')}; background: ${dt('inputnumber.extend.field.readonlyBackground')}; }
.p-inputnumber.p-invalid .p-inputnumber-input { border-color: ${dt('inputnumber.extend.field.invalidBorderColor')}; }
.p-inputnumber.p-invalid .p-inputnumber-input:enabled:focus { box-shadow: 0 0 0 ${dt('inputnumber.extend.field.focusWidth')} ${dt('inputnumber.extend.field.dangerFocusColor')}; }
.p-inputnumber.p-invalid .p-inputnumber-input::placeholder { color: ${dt('color.fg.status.danger.hover')}; }
.p-inputnumber.p-inputnumber-fluid { width: 100%; }
.p-inputnumber-button { border-width: ${dt('inputnumber.extend.borderWidth')}; }
.p-inputnumber-horizontal .p-inputnumber-button { min-height: ${dt('inputnumber.extend.extButton.height')}; border: ${dt('inputnumber.extend.borderWidth')} solid ${dt('inputnumber.button.borderColor')}; }
.p-inputnumber-horizontal .p-inputnumber-decrement-button { border-inline-end: 0; }
.p-inputnumber-horizontal .p-inputnumber-increment-button { border-inline-start: 0; }
.p-inputnumber-horizontal .p-inputnumber-input { border-radius: 0; }
.p-inputnumber-vertical .p-inputnumber-input { border-radius: 0; }
.p-inputnumber-button .ti { font-size: ${dt('inputnumber.extend.extButton.iconSize')}; width: ${dt('inputnumber.extend.extButton.iconSize')}; height: ${dt('inputnumber.extend.extButton.iconSize')}; line-height: 1; }
.p-inputnumber-button:disabled, .p-inputnumber:has(input[readonly]) .p-inputnumber-button { background: ${dt('inputnumber.extend.field.disabledBackground')}; color: ${dt('floatlabel.color')}; cursor: default; }
.p-inputnumber-horizontal .p-inputnumber-input:disabled, .p-inputnumber-horizontal .p-inputnumber-input[readonly] { border-radius: 0; }
.p-inputnumber-clear-icon { display: flex; align-items: center; justify-content: center; top: 50%; transform: translateY(-50%); margin-top: 0; color: ${dt('floatlabel.color')}; }
.p-inputnumber-clear-icon .ti { font-size: inherit; line-height: 1; }

.p-inputnumber.p-inputnumber-sm .p-inputnumber-input { height: calc(${dt('inputnumber.extend.field.small.lineHeight')} + ${dt('inputnumber.extend.field.small.paddingY')} * 2 + ${dt('inputnumber.extend.borderWidth')} * 2); font-size: ${dt('inputnumber.extend.field.small.fontSize')}; line-height: ${dt('inputnumber.extend.field.small.lineHeight')}; padding-block: ${dt('inputnumber.extend.field.small.paddingY')}; }
.extra-inputnumber--left:has(.p-inputnumber-sm) > .extra-inputnumber-label { margin-top: calc((${dt('inputnumber.extend.field.small.lineHeight')} + ${dt('inputnumber.extend.field.small.paddingY')} * 2 + ${dt('inputnumber.extend.borderWidth')} * 2 - ${dt('fonts.lineHeight.200')}) / 2); }
.p-inputnumber-sm .p-inputnumber-clear-icon { width: ${dt('inputnumber.extend.field.small.iconSize')}; height: ${dt('inputnumber.extend.field.small.iconSize')}; font-size: ${dt('inputnumber.extend.field.small.iconSize')}; inset-inline-end: ${dt('inputnumber.extend.field.paddingX')}; }
.p-inputnumber-sm:has(.p-inputnumber-clear-icon) .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.small.iconSize')}); }
.p-inputnumber-sm.p-inputnumber-horizontal .p-inputnumber-clear-icon, .p-inputnumber-sm.p-inputnumber-stacked .p-inputnumber-clear-icon { inset-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.p-inputnumber-sm.p-inputnumber-stacked .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.p-inputnumber-sm.p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.small.iconSize')}); }

.p-inputnumber.p-inputnumber-base .p-inputnumber-input { height: calc(${dt('inputnumber.extend.field.base.lineHeight')} + ${dt('inputnumber.extend.field.base.paddingY')} * 2 + ${dt('inputnumber.extend.borderWidth')} * 2); font-size: ${dt('inputnumber.extend.field.base.fontSize')}; line-height: ${dt('inputnumber.extend.field.base.lineHeight')}; padding-block: ${dt('inputnumber.extend.field.base.paddingY')}; }
.extra-inputnumber--left:has(.p-inputnumber-base) > .extra-inputnumber-label { margin-top: calc((${dt('inputnumber.extend.field.base.lineHeight')} + ${dt('inputnumber.extend.field.base.paddingY')} * 2 + ${dt('inputnumber.extend.borderWidth')} * 2 - ${dt('fonts.lineHeight.200')}) / 2); }
.p-inputnumber-base .p-inputnumber-clear-icon { width: ${dt('inputnumber.extend.field.base.iconSize')}; height: ${dt('inputnumber.extend.field.base.iconSize')}; font-size: ${dt('inputnumber.extend.field.base.iconSize')}; inset-inline-end: ${dt('inputnumber.extend.field.paddingX')}; }
.p-inputnumber-base:has(.p-inputnumber-clear-icon) .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.base.iconSize')}); }
.p-inputnumber-base.p-inputnumber-horizontal .p-inputnumber-clear-icon, .p-inputnumber-base.p-inputnumber-stacked .p-inputnumber-clear-icon { inset-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.p-inputnumber-base.p-inputnumber-stacked .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.p-inputnumber-base.p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.base.iconSize')}); }

.p-inputnumber.p-inputnumber-lg .p-inputnumber-input { height: calc(${dt('inputnumber.extend.field.large.lineHeight')} + ${dt('inputnumber.extend.field.large.paddingY')} * 2 + ${dt('inputnumber.extend.borderWidth')} * 2); font-size: ${dt('inputnumber.extend.field.large.fontSize')}; line-height: ${dt('inputnumber.extend.field.large.lineHeight')}; padding-block: ${dt('inputnumber.extend.field.large.paddingY')}; }
.extra-inputnumber--left:has(.p-inputnumber-lg) > .extra-inputnumber-label { margin-top: calc((${dt('inputnumber.extend.field.large.lineHeight')} + ${dt('inputnumber.extend.field.large.paddingY')} * 2 + ${dt('inputnumber.extend.borderWidth')} * 2 - ${dt('fonts.lineHeight.200')}) / 2); }
.p-inputnumber-lg .p-inputnumber-clear-icon { width: ${dt('inputnumber.extend.field.large.iconSize')}; height: ${dt('inputnumber.extend.field.large.iconSize')}; font-size: ${dt('inputnumber.extend.field.large.iconSize')}; inset-inline-end: ${dt('inputnumber.extend.field.paddingX')}; }
.p-inputnumber-lg:has(.p-inputnumber-clear-icon) .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.large.iconSize')}); }
.p-inputnumber-lg.p-inputnumber-horizontal .p-inputnumber-clear-icon, .p-inputnumber-lg.p-inputnumber-stacked .p-inputnumber-clear-icon { inset-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.p-inputnumber-lg.p-inputnumber-stacked .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.p-inputnumber-lg.p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.large.iconSize')}); }

.p-inputnumber.p-inputnumber-xlg .p-inputnumber-input { height: calc(${dt('inputnumber.extend.field.xlarge.lineHeight')} + ${dt('inputnumber.extend.field.xlarge.paddingY')} * 2 + ${dt('inputnumber.extend.borderWidth')} * 2); font-size: ${dt('inputnumber.extend.field.xlarge.fontSize')}; line-height: ${dt('inputnumber.extend.field.xlarge.lineHeight')}; padding-block: ${dt('inputnumber.extend.field.xlarge.paddingY')}; }
.extra-inputnumber--left:has(.p-inputnumber-xlg) > .extra-inputnumber-label { margin-top: calc((${dt('inputnumber.extend.field.xlarge.lineHeight')} + ${dt('inputnumber.extend.field.xlarge.paddingY')} * 2 + ${dt('inputnumber.extend.borderWidth')} * 2 - ${dt('fonts.lineHeight.200')}) / 2); }
.p-inputnumber-xlg .p-inputnumber-clear-icon { width: ${dt('inputnumber.extend.field.xlarge.iconSize')}; height: ${dt('inputnumber.extend.field.xlarge.iconSize')}; font-size: ${dt('inputnumber.extend.field.xlarge.iconSize')}; inset-inline-end: ${dt('inputnumber.extend.field.paddingX')}; }
.p-inputnumber-xlg:has(.p-inputnumber-clear-icon) .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.xlarge.iconSize')}); }
.p-inputnumber-xlg.p-inputnumber-horizontal .p-inputnumber-clear-icon, .p-inputnumber-xlg.p-inputnumber-stacked .p-inputnumber-clear-icon { inset-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.p-inputnumber-xlg.p-inputnumber-stacked .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.p-inputnumber-xlg.p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.xlarge.iconSize')}); }

.extra-inputnumber-field:has(.p-inputnumber-sm) > .p-inputnumber-clear-icon { width: ${dt('inputnumber.extend.field.small.iconSize')}; height: ${dt('inputnumber.extend.field.small.iconSize')}; font-size: ${dt('inputnumber.extend.field.small.iconSize')}; inset-inline-end: ${dt('inputnumber.extend.field.paddingX')}; }
.extra-inputnumber-field:has(> .p-inputnumber-clear-icon) .p-inputnumber-sm .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.small.iconSize')}); }
.extra-inputnumber-field:has(.p-inputnumber-horizontal, .p-inputnumber-stacked) > .p-inputnumber-clear-icon { inset-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.extra-inputnumber-field:has(> .p-inputnumber-clear-icon) .p-inputnumber-sm.p-inputnumber-stacked .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.small.iconSize')}); }

.extra-inputnumber-field:has(.p-inputnumber-base) > .p-inputnumber-clear-icon { width: ${dt('inputnumber.extend.field.base.iconSize')}; height: ${dt('inputnumber.extend.field.base.iconSize')}; font-size: ${dt('inputnumber.extend.field.base.iconSize')}; inset-inline-end: ${dt('inputnumber.extend.field.paddingX')}; }
.extra-inputnumber-field:has(> .p-inputnumber-clear-icon) .p-inputnumber-base .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.base.iconSize')}); }
.extra-inputnumber-field:has(.p-inputnumber-horizontal, .p-inputnumber-stacked) > .p-inputnumber-clear-icon { inset-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.extra-inputnumber-field:has(> .p-inputnumber-clear-icon) .p-inputnumber-base.p-inputnumber-stacked .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.base.iconSize')}); }

.extra-inputnumber-field:has(.p-inputnumber-lg) > .p-inputnumber-clear-icon { width: ${dt('inputnumber.extend.field.large.iconSize')}; height: ${dt('inputnumber.extend.field.large.iconSize')}; font-size: ${dt('inputnumber.extend.field.large.iconSize')}; inset-inline-end: ${dt('inputnumber.extend.field.paddingX')}; }
.extra-inputnumber-field:has(> .p-inputnumber-clear-icon) .p-inputnumber-lg .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.large.iconSize')}); }
.extra-inputnumber-field:has(.p-inputnumber-horizontal, .p-inputnumber-stacked) > .p-inputnumber-clear-icon { inset-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.extra-inputnumber-field:has(> .p-inputnumber-clear-icon) .p-inputnumber-lg.p-inputnumber-stacked .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.large.iconSize')}); }

.extra-inputnumber-field:has(.p-inputnumber-xlg) > .p-inputnumber-clear-icon { width: ${dt('inputnumber.extend.field.xlarge.iconSize')}; height: ${dt('inputnumber.extend.field.xlarge.iconSize')}; font-size: ${dt('inputnumber.extend.field.xlarge.iconSize')}; inset-inline-end: ${dt('inputnumber.extend.field.paddingX')}; }
.extra-inputnumber-field:has(> .p-inputnumber-clear-icon) .p-inputnumber-xlg .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.xlarge.iconSize')}); }
.extra-inputnumber-field:has(.p-inputnumber-horizontal, .p-inputnumber-stacked) > .p-inputnumber-clear-icon { inset-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')}); }
.extra-inputnumber-field:has(> .p-inputnumber-clear-icon) .p-inputnumber-xlg.p-inputnumber-stacked .p-inputnumber-input { padding-inline-end: calc(${dt('inputnumber.button.width')} + ${dt('inputnumber.extend.field.paddingX')} * 2 + ${dt('inputnumber.extend.field.xlarge.iconSize')}); }

.extra-inputnumber .p-floatlabel { display: block; }
.extra-inputnumber .p-floatlabel .p-inputnumber-input { height: ${dt('dimension.size.1300')}; padding-block: ${dt('floatlabel.in.input.paddingTop')} ${dt('floatlabel.in.input.paddingBottom')}; font-size: ${dt('fonts.fontSize.200')}; line-height: ${dt('fonts.lineHeight.200')}; }
.extra-inputnumber .p-floatlabel > .extra-inputnumber-label { position: absolute; inset-inline-start: calc(${dt('inputnumber.extend.field.paddingX')} + ${dt('inputnumber.extend.borderWidth')}); top: ${dt('dimension.space.350')}; transform: none; margin: 0; font-size: ${dt('fonts.fontSize.100')}; line-height: ${dt('fonts.lineHeight.200')}; font-weight: ${dt('fonts.fontWeight.regular')}; color: ${dt('floatlabel.color')}; gap: ${dt('dimension.space.50')}; pointer-events: none; }
.extra-inputnumber .p-floatlabel > .extra-inputnumber-label .extra-inputnumber-required { font-size: inherit; }
.extra-inputnumber .p-floatlabel > .extra-inputnumber-label .extra-inputnumber-label-icon { font-size: ${dt('fonts.fontSize.100')}; pointer-events: auto; }
.extra-inputnumber .p-floatlabel:has(input:not(.p-filled)) > .extra-inputnumber-label { top: ${dt('dimension.size.450')}; font-size: ${dt('fonts.fontSize.200')}; line-height: ${dt('fonts.lineHeight.400')}; }
.extra-inputnumber .p-floatlabel:has(input:not(.p-filled)) input::placeholder { color: transparent; }
.extra-inputnumber .p-floatlabel:has(.p-invalid) > .extra-inputnumber-label { color: ${dt('color.fg.status.danger.hover')}; }
.extra-inputnumber .p-floatlabel:has(.p-inputnumber-horizontal) > .extra-inputnumber-label { margin-inline-start: ${dt('inputnumber.button.width')}; }
`;
