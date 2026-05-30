/**
 * Кастомная CSS-стилизация для компонента p-datepicker.
 * Подключается в map-tokens.ts: `import { datePickerCss } from './components/date-picker'`
 */
export const datePickerCss = ({ dt }: { dt: (token: string) => string }): string => `

.p-datepicker.p-datepicker {
  display: inline-flex;
  position: relative;
  max-width: fit-content;
}

.p-datepicker-panel.p-datepicker-panel {
  box-shadow: ${dt('datepicker.panel.shadow')};
  overflow: hidden;
}

/* Скрываем нативный заголовок с кнопками выбора месяца/года;
   кастомный заголовок (pTemplate="header") рендерится вне .p-datepicker-calendar */
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

.p-datepicker-title {
  display: flex;
  align-items: center;
  gap: ${dt('datepicker.title.gap')};
  margin: 0 auto;
}

.p-datepicker-year-select {
  min-width: ${dt('datepicker.extend.extSelectYear.minWidth')};
}

.p-datepicker-custom-header .p-button.p-button {
  width: ${dt('datepicker.dropdown.width')};
  height: ${dt('datepicker.dropdown.width')};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-datepicker-today.p-datepicker-today > .p-datepicker-day:not(.p-datepicker-day-selected) {
  border: ${dt('form.borderWidth')} solid ${dt(
  'datepicker.extend.extToday.borderColor'
)};
}

.p-datepicker-today.p-datepicker-today:hover > .p-datepicker-day:not(.p-datepicker-day-selected),
.p-datepicker-day-preview.p-datepicker-day-preview:not(.p-datepicker-day-selected) {
  background: ${dt('datepicker.extend.extToday.hoverBackground')};
}

.p-datepicker-day-preview.p-datepicker-day-preview:not(.p-datepicker-day-selected) {
  color: ${dt('datepicker.date.color')};
}

.p-datepicker-day-view.p-datepicker-day-view {
  width: stretch;
  border-collapse: separate;
  table-layout: auto;
  margin: ${dt('datepicker.dayView.margin')};
}

/* ─── Weekday header text ─── */
.p-datepicker-weekday {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.300')};
  font-weight: ${dt('fonts.fontWeight.demibold')};
}

/* ─── Day cell text ─── */
.p-datepicker-day {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.300')};
  font-weight: ${dt('fonts.fontWeight.regular')};
}

/* ─── Скрываем нативный time picker (заменён кастомным в footer) ─── */
.p-datepicker-time-picker.p-datepicker-time-picker:not(.p-datepicker-time-picker-custom) {
  display: none;
}

.p-datepicker-buttonbar.p-datepicker-buttonbar .p-button.p-button {
  background: transparent;
  color: ${dt('button.colorScheme.light.text.primary.color')};
  border: 0 none;
  font-family: ${dt('fonts.fontFamily.heading')};
  font-weight: ${dt('button.root.label.fontWeight')};
  transition: background-color ${dt('button.root.transitionDuration')};
}

.p-datepicker-buttonbar.p-datepicker-buttonbar .p-button.p-button:not(:disabled):hover {
  background: ${dt('button.colorScheme.light.text.primary.hoverBackground')};
  color: ${dt('button.colorScheme.light.text.primary.color')};
}

.p-datepicker-buttonbar.p-datepicker-buttonbar .p-button.p-button:not(:disabled):active {
  background: ${dt('button.colorScheme.light.text.primary.activeBackground')};
  color: ${dt('button.colorScheme.light.text.primary.color')};
}

/* ─── Clear icon: скрываем при пустом значении ─── */
.p-datepicker.p-datepicker:not(.p-inputwrapper-filled) .p-datepicker-clear-icon,
.p-datepicker.p-datepicker:has(.p-datepicker-input:placeholder-shown) .p-datepicker-clear-icon {
  display: none;
}

/* ─── Custom time picker (InputNumber без кнопок) ─── */
.p-datepicker-time-picker-custom.p-datepicker-time-picker-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${dt('datepicker.timePicker.gap')};
  padding: ${dt('datepicker.timePicker.padding')};
  border-top: ${dt('form.borderWidth')} solid ${dt('datepicker.panel.borderColor')};
}

.p-datepicker-time-picker-custom .p-datepicker-time-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${dt('datepicker.timePicker.buttonGap')};
  width: auto;
}

.p-datepicker-time-picker-custom .p-datepicker-time-label {
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.100')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: 1;
  color: ${dt('datepicker.extend.extTimePicker.color')};
}

.p-datepicker-time-picker-custom .p-inputnumber,
.p-datepicker-time-picker-custom .p-datepicker-time-input.p-datepicker-time-input {
  width: ${dt('datepicker.extend.extTimePicker.minWidth')};
  text-align: center;
}

.p-datepicker-time-picker-custom .p-datepicker-separator {
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.100')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: 1;
  color: ${dt('datepicker.extend.extTimePicker.color')};
  margin-top: calc(${dt('fonts.fontSize.100')} + ${dt('datepicker.timePicker.buttonGap')});
}

:is(.p-datepicker-month-select, .p-datepicker-year-select) .p-select-dropdown {
  color: ${dt('datepicker.inputIcon.color')};
}

:is(.p-datepicker-month-select, .p-datepicker-year-select) .p-select-label {
  width: ${dt('sizing.24x')};
}

`;
