import { Preset } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import primitive from './tokens/primitive-default.json';
import semantic from './tokens/semantic-default.json';
import components from './tokens/components-default.json';
import themeLight from './tokens/theme-light.json';
import themeDark from './tokens/theme-dark.json';
import sizingBase from './tokens/sizing-base.json';
import sizingSm from './tokens/sizing-sm.json';
import sizingLg from './tokens/sizing-lg.json';
import sizingXlg from './tokens/sizing-xlg.json';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive,
  semantic,
  components
};

if (presetTokens?.semantic) {
  presetTokens.semantic.colorScheme = {
    light: themeLight,
    dark: themeDark
  };
}

presetTokens.semantic = { ...presetTokens.semantic, ...sizingBase };

const semanticLink: Record<string, any> = presetTokens.semantic;

function applySizing(semantic: Record<string, any>, sizing: Record<string, any>, sizeKey: 'sm' | 'lg' | 'xlg') {
  Object.keys(sizing).forEach((key) => {
    if (semantic[key]) {
      semantic[key][sizeKey] = sizing[key]?.root ?? sizing[key];
    }
  });
}

applySizing(semanticLink, sizingSm, 'sm');
applySizing(semanticLink, sizingLg, 'lg');
applySizing(semanticLink, sizingXlg, 'xlg');

export default presetTokens;
