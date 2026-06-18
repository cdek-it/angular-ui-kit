export const confirmDialogCss = ({ dt }: { dt: (token: string) => string }): string => `
  /* Иконка в заголовке */
  .p-confirmdialog .p-dialog-title {
    display: flex;
    align-items: center;
    gap: ${dt('dialog.header.gap')};
  }

  .p-confirmdialog .p-dialog-title i {
    width: ${dt('confirmdialog.icon.size')};
    height: ${dt('confirmdialog.icon.size')};
    font-size: ${dt('confirmdialog.icon.size')};
    flex-shrink: 0;
  }

  /* Размеры */
  .p-confirmdialog.p-dialog {
    width: ${dt('dimension.overlayWidth.base')};
  }

  .p-confirmdialog-sm.p-dialog {
    width: ${dt('sizing.80x')};
  }

  .p-confirmdialog-lg.p-dialog {
    width: ${dt('sizing.120x')};
  }

  .p-confirmdialog-xlg.p-dialog {
    width: ${dt('sizing.128x')};
  }

  /* Цвета иконок по severity */
  .p-confirmdialog[data-pc-severity="success"] .p-dialog-title i,
  .p-confirmdialog.p-confirm-dialog-accept .p-dialog-title i {
    color: ${dt('confirmdialog.extend.extIcon.success')};
  }

  .p-confirmdialog[data-pc-severity="info"] .p-dialog-title i,
  .p-confirmdialog.p-confirm-dialog-info .p-dialog-title i {
    color: ${dt('confirmdialog.extend.extIcon.info')};
  }

  .p-confirmdialog[data-pc-severity="warn"] .p-dialog-title i,
  .p-confirmdialog.p-confirm-dialog-warn .p-dialog-title i {
    color: ${dt('confirmdialog.extend.extIcon.warn')};
  }

  .p-confirmdialog[data-pc-severity="help"] .p-dialog-title i,
  .p-confirmdialog.p-confirm-dialog-help .p-dialog-title i {
    color: ${dt('confirmdialog.extend.extIcon.help')};
  }

  .p-confirmdialog[data-pc-severity="danger"] .p-dialog-title i,
  .p-confirmdialog[data-pc-severity="error"] .p-dialog-title i,
  .p-confirmdialog.p-confirm-dialog-error .p-dialog-title i {
    color: ${dt('confirmdialog.extend.extIcon.danger')};
  }
`;
