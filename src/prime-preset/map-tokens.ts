import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { avatarCss } from './tokens/components/avatar';
import { breadcrumbCss } from './tokens/components/breadcrumb';
import { buttonCss } from './tokens/components/button';
import { listboxCss } from './tokens/components/listbox';
import { tooltipCss } from './tokens/components/tooltip';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    avatar: {
      ...(tokens.components.avatar as unknown as ComponentsDesignTokens['avatar']),
      css: avatarCss,
    },
    breadcrumb: {
      ...(tokens.components.breadcrumb as unknown as ComponentsDesignTokens['breadcrumb']),
      css: breadcrumbCss,
    },
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss,
    },
    listbox: {
      ...(tokens.components.listbox as unknown as ComponentsDesignTokens['listbox']),
      css: listboxCss,
    },
    tooltip: {
      ...(tokens.components.tooltip as unknown as ComponentsDesignTokens['tooltip']),
      css: tooltipCss,
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
