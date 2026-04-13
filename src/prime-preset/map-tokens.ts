import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { buttonCss } from './tokens/components/button';
<<<<<<< overlay.dialog
import { dialogCss } from './tokens/components/dialog';
=======
import { radiobuttonCss } from './tokens/components/radiobutton';
>>>>>>> feature/styles-debug

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss,
    },
<<<<<<< overlay.dialog
    dialog: {
      ...(tokens.components.dialog as unknown as ComponentsDesignTokens['dialog']),
      css: dialogCss,
=======
    radiobutton: {
      ...(tokens.components.radiobutton as unknown as ComponentsDesignTokens['radiobutton']),
      css: radiobuttonCss,
>>>>>>> feature/styles-debug
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
