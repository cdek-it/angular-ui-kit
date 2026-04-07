import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { breadcrumbCss } from './tokens/components/breadcrumb';
import { buttonCss } from './tokens/components/button';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    breadcrumb: {
      ...(tokens.components.breadcrumb as unknown as ComponentsDesignTokens['breadcrumb']),
      css: breadcrumbCss,
    },
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss,
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
