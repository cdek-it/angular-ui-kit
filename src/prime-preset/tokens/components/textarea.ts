export const textareaCss = ({ dt }: { dt: (token: string) => string }): string => `

/* --- Base --- */
.p-textarea {
  border-width: ${dt('textarea.extend.borderWidth')};
  line-height: ${dt('fonts.lineHeight.250')};
  min-height: ${dt('textarea.extend.minHeight')};
}

/* --- Sizes --- */
.p-textarea.p-textarea-xlg {
  font-size: ${dt('textarea.extend.extXlg.fontSize')};
  padding: ${dt('textarea.extend.extXlg.paddingY')} ${dt('textarea.extend.extXlg.paddingX')};
}

/* --- States --- */
.p-textarea:enabled:read-only {
  background: ${dt('textarea.extend.readonlyBackground')};
}

.p-textarea:is(.p-disabled, :disabled) {
  background: ${dt('textarea.disabled.background')};
  color: ${dt('textarea.disabled.color')};
  opacity: 1;
}

`;
