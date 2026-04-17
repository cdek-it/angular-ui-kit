export const inputnumberCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Кнопки увеличения/уменьшения ─── */
.p-inputnumber-button {
  border-width: ${dt('inputnumber.extend.borderWidth')};
}

.p-inputnumber-horizontal .p-inputnumber-button {
  min-height: ${dt('inputnumber.extend.extButton.height')};
  border: ${dt('inputnumber.extend.borderWidth')} solid ${dt('inputnumber.button.borderColor')};
}

.p-inputnumber-horizontal .p-inputnumber-decrement-button {
  border-right: none;
}

/* ─── Disabled состояние ─── */
.p-inputnumber-horizontal:has(.p-inputnumber-input:disabled) .p-inputnumber-button {
  background: ${dt('inputtext.root.disabledBackground')};
  color: ${dt('inputtext.root.disabledColor')};
}

/* ─── FloatLabel: кнопки на полную высоту поля ─── */
.p-floatlabel:has(.p-inputnumber-horizontal) .p-inputnumber-button {
  align-self: stretch;
}

/* ─── Extra Large ─── */
.p-inputnumber.p-inputnumber-xlg .p-inputnumber-input {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  padding: ${dt('inputtext.extend.extXlg.paddingY')} ${dt('inputtext.extend.extXlg.paddingX')};
}
`;
