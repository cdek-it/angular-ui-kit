export const listboxCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* ─── Listbox extend: публикуем кастомные переменные в :root ─── */
  :root {
    --p-listbox-extend-ext-option-gap:                   ${dt('listbox.extend.extOption.gap')};
    --p-listbox-extend-ext-option-label-gap:             ${dt('listbox.extend.extOption.label.gap')};
    --p-listbox-extend-ext-option-caption-color:         ${dt('listbox.extend.extOption.caption.color')};
    --p-listbox-extend-ext-option-caption-striped-color: ${dt('listbox.extend.extOption.caption.stripedColor')};
  }

  /* ─── Расположение элемента списка ─── */
  .p-listbox-option {
    display: flex;
    align-items: center;
    gap: var(--p-listbox-extend-ext-option-gap);
  }

  /* Многострочный контент (иконка + label-group): выравнивание по верху */
  .p-listbox-option:has(.p-listbox-option-label-group) {
    align-items: flex-start;
  }

  .p-listbox-option:has(.p-listbox-option-check-icon) {
    gap: unset;
  }

  /* ─── Группа: текст + подпись ─── */
  .p-listbox-option-label-group {
    display: flex;
    flex-direction: column;
    gap: var(--p-listbox-extend-ext-option-label-gap);
  }

  /* ─── Подпись элемента списка ─── */
  .p-listbox-option-caption {
    color: var(--p-listbox-extend-ext-option-caption-color);
    font-size: ${dt('fonts.fontSize.200')};
    font-family: ${dt('fonts.fontFamily.heading')};
  }

  /* ─── Галочка выбора ─── */
  .p-listbox-check-icon {
    margin-inline-start: ${dt('listbox.checkmark.gutterStart')};
    margin-inline-end: ${dt('listbox.checkmark.gutterEnd')};
  }

  .p-listbox .p-listbox-list .p-listbox-option.p-listbox-option-selected .p-listbox-option-check-icon {
    color: ${dt('listbox.option.selectedColor')};
  }
`;
