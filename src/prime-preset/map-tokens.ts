import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { avatarCss } from './tokens/components/avatar';
import { buttonCss } from './tokens/components/button';
import { cardCss } from './tokens/components/card';
import { checkboxCss } from './tokens/components/checkbox';
import { inputmaskCss } from './tokens/components/inputmask';
import { inputtextCss } from './tokens/components/inputtext';
import { progressspinnerCss } from './tokens/components/progressspinner';
import { passwordCss } from './tokens/components/password';
import { tagCss } from './tokens/components/tag';
import { textareaCss } from './tokens/components/textarea';
import { tooltipCss } from './tokens/components/tooltip';
import { megamenuCss } from './tokens/components/megamenu';
import { selectCss } from './tokens/components/select';
import { messageCss } from './tokens/components/message';
import { inputotpCss } from './tokens/components/inputotp';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    avatar: {
      ...(tokens.components.avatar as unknown as ComponentsDesignTokens['avatar']),
      css: avatarCss,
    },
    card: {
      ...(tokens.components.card as unknown as ComponentsDesignTokens['card']),
      css: cardCss,
    },
    checkbox: {
      ...(tokens.components.checkbox as unknown as ComponentsDesignTokens['checkbox']),
      css: checkboxCss,
    },
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss,
    },
    message: {
      ...(tokens.components.message as unknown as ComponentsDesignTokens['message']),
      css: messageCss,
    },
    progressspinner: {
      ...(tokens.components.progressspinner as unknown as ComponentsDesignTokens['progressspinner']),
      css: progressspinnerCss,
    },
    inputotp: {
      ...(tokens.components.inputotp as unknown as ComponentsDesignTokens['inputotp']),
      css: inputotpCss,
    },
    inputtext: {
      ...(tokens.components.inputtext as unknown as ComponentsDesignTokens['inputtext']),
      css: inputtextCss,
    },
    inputmask: {
      css: inputmaskCss,
    },
    tag: {
      ...(tokens.components.tag as unknown as ComponentsDesignTokens['tag']),
      css: tagCss,
    },
    textarea: {
      ...(tokens.components.textarea as unknown as ComponentsDesignTokens['textarea']),
      css: textareaCss,
    },
    tooltip: {
      ...(tokens.components.tooltip as unknown as ComponentsDesignTokens['tooltip']),
      css: tooltipCss,
    },
    megamenu: {
      ...(tokens.components.megamenu as unknown as ComponentsDesignTokens['megamenu']),
      css: megamenuCss,
    },
    select: {
      ...(tokens.components.select as unknown as ComponentsDesignTokens['select']),
      css: selectCss,
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
