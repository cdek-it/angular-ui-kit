export const inputgroupCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Корректировка flex-layout через Angular-обёртки ─── */

/*
 * display: contents делает враппер-элементы прозрачными в layout-дереве:
 * p-inputgroupaddon и input.p-inputtext становятся прямыми flex-элементами
 * p-inputgroup. Это позволяет:
 * - align-items: stretch работать напрямую → правильная высота аддона
 * - границам быть на одном уровне → нет удвоения top/bottom border
 * - flex: 1 1 auto; width: 1% на input работать нативно через PrimeNG
 * CSS-селекторы по-прежнему работают (DOM-дерево не меняется).
 */
.p-inputgroup > input-group-addon {
  display: contents;
}

.p-inputgroup > input-text {
  display: contents;
}

/* ─── Корректировка border-radius и границ ─── */

/*
 * p-inputgroupaddon является :first-child И :last-child своего прямого родителя
 * input-group-addon, поэтому PrimeNG добавляет ему оба inline-бордера.
 * Сбрасываем их и переназначаем по позиции аддона в группе.
 */
.p-inputgroup > input-group-addon > .p-inputgroupaddon {
  border-radius: 0;
  border-inline-start: none;
  border-inline-end: none;
}

/* Первый элемент группы — аддон: левые углы + левая граница */
.p-inputgroup > input-group-addon:first-child > .p-inputgroupaddon {
  border-start-start-radius: ${dt('inputgroup.addon.borderRadius')};
  border-end-start-radius: ${dt('inputgroup.addon.borderRadius')};
  border-inline-start: ${dt('inputgroup.extend.borderWidth')} solid ${dt('inputgroup.addon.borderColor')};
}

/* Последний элемент группы — аддон: правые углы + правая граница */
.p-inputgroup > input-group-addon:last-child > .p-inputgroupaddon {
  border-start-end-radius: ${dt('inputgroup.addon.borderRadius')};
  border-end-end-radius: ${dt('inputgroup.addon.borderRadius')};
  border-inline-end: ${dt('inputgroup.extend.borderWidth')} solid ${dt('inputgroup.addon.borderColor')};
}

/* Аддон сразу после другого аддона: левая граница как разделитель */
.p-inputgroup > input-group-addon + input-group-addon > .p-inputgroupaddon {
  border-inline-start: ${dt('inputgroup.extend.borderWidth')} solid ${dt('inputgroup.addon.borderColor')};
}

/* Сброс border-radius у input внутри input-text-обёртки */
.p-inputgroup > input-text .p-inputtext {
  border-radius: 0;
  margin: 0;
}

/* Первый элемент группы — input: левые углы */
.p-inputgroup > input-text:first-child .p-inputtext {
  border-start-start-radius: ${dt('inputgroup.addon.borderRadius')};
  border-end-start-radius: ${dt('inputgroup.addon.borderRadius')};
}

/* Последний элемент группы — input: правые углы */
.p-inputgroup > input-text:last-child .p-inputtext {
  border-start-end-radius: ${dt('inputgroup.addon.borderRadius')};
  border-end-end-radius: ${dt('inputgroup.addon.borderRadius')};
}

/* ─── Addon в disabled состоянии ─── */
.p-inputgroup:has(input[disabled]) .p-inputgroupaddon,
.p-inputgroup:has(.p-inputtext[disabled]) .p-inputgroupaddon,
.p-inputgroup:has(.p-component[disabled]) .p-inputgroupaddon {
  background: ${dt('inputtext.root.disabledBackground')};
  color: ${dt('inputtext.root.disabledColor')};
}

/* ─── Иконка внутри addon ─── */
.p-inputgroup .p-inputgroupaddon i {
  font-size: ${dt('inputgroup.extend.iconSize')};
}

/* ─── Extra Large ─── */
.p-inputgroup.p-inputgroup-xlg .p-inputgroupaddon {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  padding: ${dt('inputtext.extend.extXlg.paddingY')} ${dt('inputtext.extend.extXlg.paddingX')};
}

.p-inputgroup.p-inputgroup-xlg .p-inputgroupaddon i {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
}
`;
