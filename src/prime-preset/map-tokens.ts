import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { buttonCss } from './tokens/components/button';
import { confirmDialogCss } from './tokens/components/confirm-dialog';
import { dialogCss } from './tokens/components/dialog';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss,
    },
    confirmdialog: {
      ...(tokens.components.confirmdialog as unknown as ComponentsDesignTokens['confirmdialog']),
      css: confirmDialogCss,
    },
    dialog: {
      ...(tokens.components.dialog as unknown as ComponentsDesignTokens['dialog']),
      css: dialogCss,
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
