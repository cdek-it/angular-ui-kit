import { Preset } from '@primeuix/themes/types';
import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';

import tokens from './tokens/tokens.json';
import { autocompleteCss } from './tokens/components/autocomplete';
import { avatarCss } from './tokens/components/avatar';
import { buttonCss } from './tokens/components/button';
import { cardCss } from './tokens/components/card';
import { checkboxCss } from './tokens/components/checkbox';
import { datePickerCss } from './tokens/components/date-picker';
import { inputtextCss } from './tokens/components/inputtext';
import { megamenuCss } from './tokens/components/megamenu';
import { progressspinnerCss } from './tokens/components/progressspinner';
import { tagCss } from './tokens/components/tag';
import { tooltipCss } from './tokens/components/tooltip';
import { selectCss } from './tokens/components/select';
import { messageCss } from './tokens/components/message';
import { togglebuttonCss } from './tokens/components/togglebutton';
import { selectbuttonCss } from './tokens/components/selectbutton';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    autocomplete: {
      ...(tokens.components.autocomplete as unknown as ComponentsDesignTokens['autocomplete']),
      css: autocompleteCss,
    },
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
    datepicker: {
      ...(tokens.components.datepicker as unknown as ComponentsDesignTokens['datepicker']),
      css: datePickerCss,
    },
    inputtext: {
      ...(tokens.components.inputtext as unknown as ComponentsDesignTokens['inputtext']),
      css: inputtextCss,
    },
    megamenu: {
      ...(tokens.components.megamenu as unknown as ComponentsDesignTokens['megamenu']),
      css: megamenuCss,
    },
    progressspinner: {
      ...(tokens.components.progressspinner as unknown as ComponentsDesignTokens['progressspinner']),
      css: progressspinnerCss,
    },
    tag: {
      ...(tokens.components.tag as unknown as ComponentsDesignTokens['tag']),
      css: tagCss,
    },
    tooltip: {
      ...(tokens.components.tooltip as unknown as ComponentsDesignTokens['tooltip']),
      css: tooltipCss,
    },
    select: {
      ...(tokens.components.select as unknown as ComponentsDesignTokens['select']),
      css: selectCss,
    },
    selectbutton: {
      ...(tokens.components.selectbutton as unknown as ComponentsDesignTokens['selectbutton']),
      css: selectbuttonCss,
    },
    togglebutton: {
      ...(tokens.components.togglebutton as unknown as ComponentsDesignTokens['togglebutton']),
      css: togglebuttonCss,
    },
  } as ComponentsDesignTokens,
};

export default presetTokens;
