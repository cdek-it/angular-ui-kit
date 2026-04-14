import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { avatarCss } from './tokens/components/avatar';
import { buttonCss } from './tokens/components/button';
import { tooltipCss } from './tokens/components/tooltip';
import { megamenuCss } from './tokens/components/megamenu';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    avatar: {
      ...(tokens.components.avatar as unknown as ComponentsDesignTokens['avatar']),
      css: avatarCss,
    },
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss,
    },
    tooltip: {
      ...(tokens.components.tooltip as unknown as ComponentsDesignTokens['tooltip']),
      css: tooltipCss,
    },
    megamenu: {
      ...(tokens.components.megamenu as unknown as ComponentsDesignTokens['megamenu']),
      css: megamenuCss,
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
