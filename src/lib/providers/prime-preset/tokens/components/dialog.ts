/**
 * Кастомная CSS-стилизация для компонента p-dialog.
 * Подключается в map-tokens.ts: `import { dialogCss } from './tokens/components/dialog'`
 *
 * Радиусы, отступы, фон и тень приходят токенами пресета (dialog.root.*, dialog.header.* и т.д.).
 * Здесь — типографика и то, что Aura зашила сырыми значениями: рамка окна и фон подложки.
 */
export const dialogCss = ({ dt }: { dt: (token: string) => string }): string => `
  .p-dialog .p-dialog-title {
    font-family: ${dt('fonts.fontFamily.heading')};
    font-size: ${dt('dialog.title.fontSize')};
    font-weight: ${dt('dialog.title.fontWeight')};
    line-height: ${dt('fonts.lineHeight.550')};
  }

  .p-dialog .p-dialog-content {
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
    font-weight: ${dt('fonts.fontWeight.regular')};
    line-height: ${dt('fonts.lineHeight.500')};
  }

  .p-dialog .p-dialog-header {
    border-bottom: ${dt('dialog.extend.borderWidth')} solid ${dt('dialog.root.borderColor')};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .p-dialog .p-dialog-header-actions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .p-dialog .p-dialog-header-actions .p-dialog-close-button.p-button-text:focus-visible,
  .p-dialog .p-dialog-header-actions .p-dialog-close-button.p-button:focus-visible,
  .p-dialog .p-button-text:focus-visible,
  .p-dialog .p-button:focus-visible {
    outline: 0 none;
    outline-color: transparent;
    box-shadow: none;
  }

  /* Рамка окна: Aura зашивает её сырым 1px, дизайн задаёт токеном.
     Ширина по умолчанию — base; в экспорте нет ветки overlayWidth, поэтому значения
     берём с той же ступени примитивов, что рисует Figma (overlay/width: 280 / 350 / 420 / 630) */
  .p-dialog {
    border: ${dt('dialog.extend.borderWidth')} solid ${dt('dialog.root.borderColor')};
    width: ${dt('sizing.175x')};
  }

  /* Подложка: Aura держит свой цвет анимацией появления (fill-mode: forwards),
     поэтому одного правила background мало — переопределяем саму анимацию маски диалога */
  .p-dialog-mask.p-overlay-mask {
    background: ${dt('dialog.extend.backdrop')};
  }

  .p-dialog-mask.p-overlay-mask-enter {
    animation-name: p-dialog-mask-enter;
  }

  .p-dialog-mask.p-overlay-mask-leave {
    animation-name: p-dialog-mask-leave;
  }

  @keyframes p-dialog-mask-enter {
    from {
      background: transparent;
    }
    to {
      background: ${dt('dialog.extend.backdrop')};
    }
  }

  @keyframes p-dialog-mask-leave {
    from {
      background: ${dt('dialog.extend.backdrop')};
    }
    to {
      background: transparent;
    }
  }

  .p-dialog.p-component.p-dialog-sm {
    width: ${dt('sizing.140x')};
  }

  .p-dialog.p-component.p-dialog-lg {
    width: ${dt('sizing.210x')};
  }

  .p-dialog.p-component.p-dialog-xlg {
    width: ${dt('sizing.315x')};
  }
`;
