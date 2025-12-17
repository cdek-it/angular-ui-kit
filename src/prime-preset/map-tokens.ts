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

const semanticLink: any = presetTokens.semantic;

const sizingSmLink: any = sizingSm;
const sizingLgLink: any = sizingLg;
const sizingXlgLink: any = sizingXlg;

for (const key in sizingSm) {
  if ((semanticLink)[key]) {
    semanticLink[key].sm = sizingSmLink[key]?.root ? sizingSmLink[key].root : sizingSmLink[key];
  }
}

for (const key in sizingLg) {
  if ((semanticLink)[key]) {
    semanticLink[key].lg = sizingLgLink[key]?.root ? sizingLgLink[key].root : sizingLgLink[key];
  }
}

for (const key in sizingXlg) {
  if ((semanticLink)[key]) {
    semanticLink[key].xlg = sizingXlgLink[key]?.root ? sizingXlgLink[key].root : sizingXlgLink[key];
  }
}

export default presetTokens;
