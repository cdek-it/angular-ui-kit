import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { buttonCss } from './tokens/components/button';
import { tagCss } from './tokens/components/tag';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss,
    },
    tag: {
      ...(tokens.components.tag as unknown as ComponentsDesignTokens['tag']),
      css: tagCss,
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
