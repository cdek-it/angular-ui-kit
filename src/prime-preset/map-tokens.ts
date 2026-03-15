import { Preset } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import primitive from './tokens/primitive';
import semantic from './tokens/semantic';
import components from './tokens/index';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: primitive as any,
  semantic: semantic as any,
  components: components as any
};

export default presetTokens;
