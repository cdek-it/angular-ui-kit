export const datePickerCss = ({ dt }: { dt: (token: string) => string }): string => `
.extra-date-picker {
  display: flex;
  flex-direction: column;
  gap: ${dt('dimension.space.100')};
  width: fit-content;
  max-width: 100%;
  font-family: ${dt('fonts.fontFamily.base')};
}
.extra-date-picker-body {
  display: flex;
  flex-direction: column;
  gap: ${dt('dimension.space.100')};
  min-width: 0;
}
.extra-date-picker--left {
  flex-direction: row;
  align-items: flex-start;
  gap: ${dt('dimension.space.200')};
}
.extra-date-picker--left > .extra-date-picker-label {
  margin-top: ${dt('datepicker.extend.extField.paddingY')};
}
.extra-date-picker-label {
  display: inline-flex;
  align-items: center;
  gap: ${dt('dimension.space.100')};
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.200')};
  color: ${dt('color.fg.default')};
}
.extra-date-picker-label .ti {
  color: ${dt('color.fg.muted')};
}
.extra-date-picker-required {
  color: ${dt('color.fg.status.danger.default')};
}
.extra-date-picker--fluid,
.extra-date-picker--fluid > .extra-date-picker-body,
.extra-date-picker-body > .p-floatlabel {
  width: 100%;
}
.extra-date-picker-field.p-datepicker {
  position: relative;
  width: ${dt('datepicker.extend.extField.width')};
  max-width: 100%;
}
.extra-date-picker-field--fluid.p-datepicker {
  width: 100%;
}
.extra-date-picker-field .p-datepicker-input.p-inputtext {
  width: 100%;
  min-width: 0;
  font-family: ${dt('fonts.fontFamily.base')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  font-size: ${dt('datepicker.extend.extField.fontSize')};
  line-height: ${dt('datepicker.extend.extField.lineHeight')};
  padding: ${dt('datepicker.extend.extField.paddingY')} ${dt('datepicker.extend.extField.paddingX')};
  height: calc(${dt('datepicker.extend.extField.lineHeight')} + (${dt('datepicker.extend.extField.paddingY')} * 2) + (${dt('datepicker.extend.extField.borderWidth')} * 2));
  background: ${dt('datepicker.extend.extField.background')};
  color: ${dt('datepicker.extend.extField.color')};
  border: ${dt('datepicker.extend.extField.borderWidth')} solid ${dt('datepicker.extend.extField.borderColor')};
  border-radius: ${dt('datepicker.extend.extField.borderRadius')};
  box-shadow: none;
}
.extra-date-picker-field .p-datepicker-input::placeholder {
  color: ${dt('datepicker.extend.extField.placeholderColor')};
}
.extra-date-picker-field .p-datepicker-input:not(:disabled):hover {
  border-color: ${dt('datepicker.extend.extField.hoverBorderColor')};
}
.extra-date-picker-field .p-datepicker-input:enabled:focus {
  border-color: ${dt('datepicker.extend.extField.hoverBorderColor')};
  box-shadow: 0 0 0 ${dt('dimension.focusRing.width')} ${dt('datepicker.extend.extField.focusRingColor')};
}
.extra-date-picker-field .p-datepicker-input.ng-invalid {
  border-color: ${dt('datepicker.extend.extField.invalidBorderColor')};
}
.extra-date-picker-field .p-datepicker-input.ng-invalid::placeholder {
  color: ${dt('datepicker.extend.extField.invalidPlaceholderColor')};
}
.extra-date-picker-field .p-datepicker-input.ng-invalid:focus {
  box-shadow: 0 0 0 ${dt('dimension.focusRing.width')} ${dt('datepicker.extend.extField.invalidFocusRingColor')};
}
.extra-date-picker-field .p-datepicker-input:disabled {
  background: ${dt('datepicker.extend.extField.disabledBackground')};
  color: ${dt('datepicker.extend.extField.disabledColor')};
  opacity: 1;
}
.extra-date-picker-field--readonly {
  pointer-events: none;
}
.extra-date-picker-field--readonly .p-datepicker-input.p-inputtext {
  background: ${dt('datepicker.extend.extField.readonlyBackground')};
}
.extra-date-picker-field .p-datepicker-input-icon-container {
  inset-inline-end: ${dt('datepicker.extend.extField.paddingX')};
  margin: 0;
  transform: translateY(-50%);
}
.extra-date-picker-field .p-datepicker-input-icon,
.extra-date-picker-field .p-datepicker-clear-icon {
  font-size: ${dt('datepicker.extend.extField.iconSize')};
  width: ${dt('datepicker.extend.extField.iconSize')};
  height: ${dt('datepicker.extend.extField.iconSize')};
  line-height: 1;
}
.extra-date-picker-field .p-datepicker-clear-icon {
  margin: 0;
  transform: translateY(-50%);
}
.extra-date-picker-field:has(.p-datepicker-input-icon-container)
  .p-datepicker-input {
  padding-inline-end: calc(${dt('datepicker.extend.extField.paddingX')} + ${dt('datepicker.extend.extField.iconSize')} + ${dt('dimension.space.100')});
}
.extra-date-picker-field:has(.p-datepicker-clear-icon):has(
    .p-datepicker-input-icon-container
  )
  .p-datepicker-input {
  padding-inline-end: calc(
    ${dt('datepicker.extend.extField.paddingX')} + (${dt('datepicker.extend.extField.iconSize')} * 2) + (${dt('dimension.space.100')} * 2)
  );
}
.extra-date-picker-field:has(.p-datepicker-input-icon-container)
  .p-datepicker-clear-icon {
  inset-inline-end: calc(${dt('datepicker.extend.extField.paddingX')} + ${dt('datepicker.extend.extField.iconSize')} + ${dt('dimension.space.100')});
}
.extra-date-picker-field.p-datepicker:has(.p-datepicker-dropdown)
  .p-datepicker-dropdown {
  width: calc(${dt('datepicker.extend.extField.paddingX')} * 2 + ${dt('datepicker.extend.extField.iconSize')});
}
.extra-date-picker-field .p-datepicker-input-icon-container {
  color: ${dt('datepicker.inputIcon.color')};
}
.extra-date-picker-panel.p-datepicker-panel {
  width: ${dt('datepicker.extend.panelWidth')};
  max-width: calc(100% - ${dt('dimension.space.400')} * 2);
}
.extra-date-picker-panel .p-datepicker-custom-header > .p-button,
.extra-date-picker-panel .p-datepicker-custom-header > p-button {
  flex: 0 0 auto;
}
.extra-date-picker-panel .p-datepicker-title > extra-select > .p-select {
  flex: 1;
  min-width: 0;
}
.extra-date-picker-panel .p-datepicker-title .p-select {
  min-width: 0;
  width: 100%;
  border-radius: ${dt('datepicker.extend.extField.borderRadius')};
}
.extra-date-picker-panel .p-datepicker-title .p-select-label {
  width: auto;
  min-width: 0;
  padding: ${dt('datepicker.extend.extField.sm.paddingY')} 0 ${dt('datepicker.extend.extField.sm.paddingY')} ${dt('datepicker.extend.extField.paddingX')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  font-size: ${dt('datepicker.extend.extField.sm.fontSize')};
  line-height: ${dt('datepicker.extend.extField.sm.lineHeight')};
}
.extra-date-picker-panel .p-datepicker-title .p-select-dropdown {
  width: calc(${dt('datepicker.extend.extField.paddingX')} + ${dt('dimension.space.100')} + ${dt('datepicker.extend.extField.sm.iconSize')});
}
.extra-date-picker-panel .p-datepicker-day-cell {
  padding: ${dt('datepicker.date.padding')};
}
.extra-date-picker-panel .p-datepicker-day,
.extra-date-picker-panel .p-datepicker-weekday {
  line-height: ${dt('fonts.lineHeight.300')};
}
.extra-date-picker-panel .p-datepicker-time-input.p-inputtext {
  width: ${dt('datepicker.extend.extTimePicker.inputWidth')};
  height: calc(${dt('fonts.lineHeight.200')} + (${dt('dimension.space.350')} * 2) + (${dt('dimension.borderWidth.100')} * 2));
  padding: ${dt('dimension.space.350')} ${dt('dimension.space.400')};
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.200')};
  border-radius: ${dt('datepicker.extend.extField.borderRadius')};
  border-color: ${dt('datepicker.extend.extField.borderColor')};
}
.extra-date-picker-panel.p-datepicker-timeonly > .p-datepicker-header {
  display: none;
}
.extra-date-picker-panel.p-datepicker-timeonly
  .p-datepicker-time-picker-custom {
  border-top: none;
}
.extra-date-picker-panel .p-datepicker-month,
.extra-date-picker-panel .p-datepicker-year {
  min-height: ${dt('datepicker.extend.navSize')};
}
.extra-date-picker-panel .p-datepicker-buttonbar .p-button {
  padding: ${dt('dimension.space.200')} ${dt('dimension.space.400')};
  font-size: ${dt('fonts.fontSize.300')};
  line-height: ${dt('fonts.lineHeight.550')};
}
.extra-date-picker-field--float .p-datepicker-input.p-inputtext {
  padding-block-start: ${dt('floatlabel.in.input.paddingTop')};
  padding-block-end: ${dt('floatlabel.in.input.paddingBottom')};
}
.extra-date-picker-body > .p-floatlabel > label {
  left: ${dt('datepicker.extend.extField.paddingX')};
  color: ${dt('floatlabel.color')};
  font-family: ${dt('fonts.fontFamily.base')};
}

.extra-date-picker-body > .p-floatlabel > label .extra-date-picker-label-icon {
  font-size: ${dt('fonts.fontSize.100')};
  pointer-events: auto;
}
.extra-date-picker-body > .p-floatlabel:has(input:not(:focus):not(.p-filled):not(:-webkit-autofill)):not(:has(.p-inputwrapper-filled)) > label {
  top: 50%;
  font-size: ${dt('fonts.fontSize.200')};
  line-height: ${dt('fonts.lineHeight.400')};
  transform: translateY(-50%);
}
.extra-date-picker-body > .p-floatlabel input:not(:focus)::placeholder {
  color: transparent;
}
.extra-date-picker-body > .p-floatlabel:has(input:focus) > label,
.extra-date-picker-body > .p-floatlabel:has(input:-webkit-autofill) > label,
.extra-date-picker-body > .p-floatlabel:has(.p-inputwrapper-filled) > label {
  top: ${dt('floatlabel.in.active.top')};
  font-size: ${dt('fonts.fontSize.100')};
  line-height: ${dt('fonts.lineHeight.200')};
  transform: none;
}

.extra-date-picker-field--small .p-datepicker-input.p-inputtext {
  font-size: ${dt('datepicker.extend.extField.sm.fontSize')};
  line-height: ${dt('datepicker.extend.extField.sm.lineHeight')};
  padding-block: ${dt('datepicker.extend.extField.sm.paddingY')};
  height: calc(${dt('datepicker.extend.extField.sm.lineHeight')} + (${dt('datepicker.extend.extField.sm.paddingY')} * 2) + (${dt('datepicker.extend.extField.borderWidth')} * 2));
}
.extra-date-picker-field--small .p-datepicker-input-icon,
.extra-date-picker-field--small .p-datepicker-clear-icon {
  font-size: ${dt('datepicker.extend.extField.sm.iconSize')};
  width: ${dt('datepicker.extend.extField.sm.iconSize')};
  height: ${dt('datepicker.extend.extField.sm.iconSize')};
}

.extra-date-picker-field--large .p-datepicker-input.p-inputtext {
  font-size: ${dt('datepicker.extend.extField.lg.fontSize')};
  line-height: ${dt('datepicker.extend.extField.lg.lineHeight')};
  padding-block: ${dt('datepicker.extend.extField.lg.paddingY')};
  height: calc(
    ${dt('datepicker.extend.extField.lg.lineHeight')} + (${dt('datepicker.extend.extField.lg.paddingY')} * 2) + (${dt('datepicker.extend.extField.borderWidth')} * 2)
  );
}
.extra-date-picker-field--large .p-datepicker-input-icon,
.extra-date-picker-field--large .p-datepicker-clear-icon {
  font-size: ${dt('datepicker.extend.extField.lg.iconSize')};
  width: ${dt('datepicker.extend.extField.lg.iconSize')};
  height: ${dt('datepicker.extend.extField.lg.iconSize')};
}

.extra-date-picker-field--xlarge .p-datepicker-input.p-inputtext {
  font-size: ${dt('datepicker.extend.extField.xlg.fontSize')};
  line-height: ${dt('datepicker.extend.extField.xlg.lineHeight')};
  padding-block: ${dt('datepicker.extend.extField.xlg.paddingY')};
  height: calc(
    ${dt('datepicker.extend.extField.xlg.lineHeight')} + (${dt('datepicker.extend.extField.xlg.paddingY')} * 2) + (${dt('datepicker.extend.extField.borderWidth')} * 2)
  );
}
.extra-date-picker-field--xlarge.p-datepicker .p-datepicker-input-icon,
.extra-date-picker-field--xlarge.p-datepicker .p-datepicker-clear-icon {
  font-size: ${dt('datepicker.extend.extField.xlg.iconSize')};
  width: ${dt('datepicker.extend.extField.xlg.iconSize')};
  height: ${dt('datepicker.extend.extField.xlg.iconSize')};
}

.extra-date-picker-field--float.p-datepicker .p-datepicker-input.p-inputtext {
  height: ${dt('datepicker.extend.extField.floatHeight')};
  padding-block-start: ${dt('floatlabel.in.input.paddingTop')};
  padding-block-end: ${dt('floatlabel.in.input.paddingBottom')};
}

.p-datepicker-panel.p-datepicker-panel {
  box-shadow: ${dt('datepicker.panel.shadow')};
  overflow: hidden;
}

.p-datepicker-calendar .p-datepicker-header {
  display: none;
}

.p-datepicker-custom-header.p-datepicker-header {
  gap: ${dt('datepicker.title.gap')};
  padding: ${dt('datepicker.header.padding')};
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.p-datepicker-day-selected:not(.p-disabled):hover {
  background: ${dt('datepicker.extend.extDate.selectedHoverBackground')};
}

.p-datepicker-title {
  display: flex;
  align-items: center;
  gap: ${dt('datepicker.title.gap')};
  width: ${dt('datepicker.extend.extTitle.width')};
  min-width: 0;
  margin: 0 auto;
}

.p-datepicker-year-select {
  min-width: ${dt('dimension.size.1000')};
}

.p-datepicker-custom-header .p-button.p-button {
  width: ${dt('datepicker.extend.navSize')};
  height: ${dt('datepicker.extend.navSize')};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-datepicker-today.p-datepicker-today
  > .p-datepicker-day:not(.p-datepicker-day-selected) {
  border: ${dt('dimension.borderWidth.100')} solid ${dt('datepicker.extend.extToday.borderColor')};
}

.p-datepicker-today.p-datepicker-today:hover
  > .p-datepicker-day:not(.p-datepicker-day-selected),
.p-datepicker-day-preview.p-datepicker-day-preview:not(
    .p-datepicker-day-selected
  ) {
  background: ${dt('datepicker.extend.extToday.hoverBackground')};
}

.p-datepicker-day-preview.p-datepicker-day-preview:not(
    .p-datepicker-day-selected
  ) {
  color: ${dt('datepicker.date.color')};
}

.p-datepicker-day-view.p-datepicker-day-view {
  width: calc(100% - (${dt('datepicker.dayView.margin')} * 2));
  border-collapse: separate;
  table-layout: fixed;
  border-spacing: 0;
  margin: ${dt('datepicker.dayView.margin')};
}

.p-datepicker-weekday {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('datepicker.weekDay.fontWeight')};
}

.p-datepicker-day {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
}

.p-datepicker-time-picker.p-datepicker-time-picker:not(
    .p-datepicker-time-picker-custom
  ) {
  display: none;
}

.p-datepicker-buttonbar.p-datepicker-buttonbar .p-button.p-button {
  background: transparent;
  color: ${dt('color.fg.default')};
  border: 0 none;
  font-family: ${dt('fonts.fontFamily.heading')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  transition: background-color ${dt('datepicker.root.transitionDuration')};
}

.p-datepicker-buttonbar.p-datepicker-buttonbar
  .p-button.p-button:not(:disabled):hover {
  background: ${dt('color.bg.neutral.weak.default')};
  color: ${dt('color.fg.default')};
}

.p-datepicker-buttonbar.p-datepicker-buttonbar
  .p-button.p-button:not(:disabled):active {
  background: ${dt('color.bg.neutral.weak.active')};
  color: ${dt('color.fg.default')};
}

.p-datepicker-clear-icon {
  display: flex;
  align-items: center;
  inset-inline-end: ${dt('datepicker.extend.extField.paddingX')};
  color: ${dt('datepicker.inputIcon.color')};
}

.p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-clear-icon {
  inset-inline-end: calc((${dt('datepicker.extend.extField.paddingX')} * 1.5) + ${dt('datepicker.extend.extField.iconSize')});
}

.p-datepicker.p-datepicker:not(.p-inputwrapper-filled) .p-datepicker-clear-icon,
.p-datepicker.p-datepicker:has(.p-datepicker-input:placeholder-shown)
  .p-datepicker-clear-icon {
  display: none;
}

.p-datepicker-time-picker-custom.p-datepicker-time-picker-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${dt('datepicker.timePicker.gap')};
  padding: ${dt('datepicker.timePicker.padding')};
  border-top: ${dt('dimension.borderWidth.100')} solid ${dt('datepicker.timePicker.borderColor')};
}

.p-datepicker-time-picker-custom .p-datepicker-time-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${dt('datepicker.timePicker.buttonGap')};
  min-width: ${dt('datepicker.extend.extTimePicker.minWidth')};
}

.p-datepicker-time-picker-custom .p-datepicker-time-label {
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.100')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.200')};
  color: ${dt('datepicker.extend.extTimePicker.color')};
}

.p-datepicker-time-picker-custom .p-inputnumber,
.p-datepicker-time-picker-custom
  .p-datepicker-time-input.p-datepicker-time-input {
  width: ${dt('datepicker.extend.extTimePicker.inputWidth')};
  min-width: ${dt('datepicker.extend.extTimePicker.minWidth')};
  text-align: center;
}

.p-datepicker-time-picker-custom .p-datepicker-separator {
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.100')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.200')};
  color: ${dt('datepicker.extend.extTimePicker.color')};
  margin-top: calc(${dt('fonts.fontSize.100')} + ${dt('datepicker.timePicker.buttonGap')});
}

:is(.p-datepicker-month-select, .p-datepicker-year-select) .p-select-dropdown {
  color: ${dt('datepicker.inputIcon.color')};
}

:is(.p-datepicker-month-select, .p-datepicker-year-select) .p-select-label {
  min-width: 0;
}

.extra-date-picker-field--inline.p-datepicker {
  width: ${dt('datepicker.extend.panelWidth')};
}
.extra-date-picker-panel.p-datepicker-panel {
  display: flex;
  flex-direction: column;
}
.extra-date-picker-panel.p-datepicker-panel-inline {
  max-width: 100%;
}
.extra-date-picker-panel .p-datepicker-weekday-cell {
  height: calc(${dt('datepicker.date.height')} + ${dt('datepicker.date.padding')} * 2);
}
.extra-date-picker-panel .p-datepicker-time-picker-custom {
  order: 1;
}
.extra-date-picker-panel .p-datepicker-buttonbar {
  order: 2;
}
.extra-date-picker-panel .p-datepicker-buttonbar .p-button.p-button {
  height: ${dt('dimension.size.1150')};
  padding: ${dt('dimension.space.200')} ${dt('dimension.space.400')};
  font-size: ${dt('fonts.fontSize.300')};
  line-height: ${dt('fonts.lineHeight.550')};
}

.extra-date-picker-panel.p-datepicker-panel {
  border: 0;
  outline: ${dt('dimension.borderWidth.100')} solid ${dt('datepicker.panel.borderColor')};
}
.extra-date-picker-panel .p-datepicker-custom-header {
  border-bottom: 0;
  box-shadow: 0 ${dt('dimension.borderWidth.100')} 0 ${dt('datepicker.header.borderColor')};
}
.extra-date-picker-panel .p-datepicker-time-picker-custom {
  border-top: 0;
  box-shadow: 0 calc(-1 * ${dt('dimension.borderWidth.100')}) 0 ${dt('datepicker.timePicker.borderColor')};
}
.extra-date-picker-panel .p-datepicker-buttonbar {
  border-top: 0;
  box-shadow: 0 calc(-1 * ${dt('dimension.borderWidth.100')}) 0 ${dt('datepicker.buttonbar.borderColor')};
}
.extra-date-picker-panel.p-datepicker-timeonly .p-datepicker-time-picker-custom {
  box-shadow: none;
}
`;
