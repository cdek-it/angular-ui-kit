import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { buttonCss } from './tokens/components/button';
import { metergroupCss } from './tokens/components/metergroup';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss,
    },
    metergroup: {
      ...(tokens.components.metergroup as unknown as ComponentsDesignTokens['metergroup']),
      css: metergroupCss,
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
