import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import primitive from './tokens/primitive';
import semantic from './tokens/semantic';
import components from './tokens/components';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: primitive as AuraBaseDesignTokens['primitive'],
  semantic: semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: components as ComponentsDesignTokens
};

export default presetTokens;
