import type { ComponentsDesignTokens } from '@primeuix/themes/types';
import { Preset } from '@primeuix/themes/types';
// по другому импорт не работает
import type { AuraBaseDesignTokens } from '../../../../node_modules/@primeuix/themes/dist/aura/base';

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
import { inputgroupCss } from './tokens/components/inputgroup';
import { megamenuCss } from './tokens/components/megamenu';
import { selectCss } from './tokens/components/select';
import { messageCss } from './tokens/components/message';
import { inputotpCss } from './tokens/components/inputotp';
import { carouselCss } from './tokens/components/carousel';
import { galleriaCss } from './tokens/components/galleria';
import { confirmDialogCss } from './tokens/components/confirm-dialog';
import { drawerCss } from './tokens/components/drawer';
import { datePickerCss } from './tokens/components/date-picker';
import { accordionCss } from './tokens/components/accordion';
import { badgeCss } from './tokens/components/badge';
import { chipCss } from './tokens/components/chip';
import { dataTableCss } from './tokens/components/data-table';
import { dialogCss } from './tokens/components/dialog';
import { dividerCss } from './tokens/components/divider';
import { inputnumberCss } from './tokens/components/inputnumber';
import { listboxCss } from './tokens/components/listbox';
import { menuCss } from './tokens/components/menu';
import { metergroupCss } from './tokens/components/metergroup';
import { paginatorCss } from './tokens/components/paginator';
import { panelmenuCss } from './tokens/components/panelmenu';
import { progressbarCss } from './tokens/components/progressbar';
import { radiobuttonCss } from './tokens/components/radiobutton';
import { scrollPanelCss } from './tokens/components/scroll-panel';
import { skeletonCss } from './tokens/components/skeleton';
import { sliderCss } from './tokens/components/slider';
import { stepperCss } from './tokens/components/stepper';
import { tabsCss } from './tokens/components/tabs';
import { tieredmenuCss } from './tokens/components/tieredmenu';
import { timelineCss } from './tokens/components/timeline';
import { toastCss } from './tokens/components/toast';
import { toggleswitchCss } from './tokens/components/toggleswitch';
import { autocompleteCss } from './tokens/components/autocomplete';

const presetTokens: Preset<AuraBaseDesignTokens> = {
  primitive: tokens.primitive as unknown as AuraBaseDesignTokens['primitive'],
  semantic: tokens.semantic as unknown as AuraBaseDesignTokens['semantic'],
  components: {
    ...(tokens.components as unknown as ComponentsDesignTokens),
    avatar: {
      ...(tokens.components.avatar as unknown as ComponentsDesignTokens['avatar']),
      css: avatarCss
    },
    card: {
      ...(tokens.components.card as unknown as ComponentsDesignTokens['card']),
      css: cardCss
    },
    checkbox: {
      ...(tokens.components.checkbox as unknown as ComponentsDesignTokens['checkbox']),
      css: checkboxCss
    },
    button: {
      ...(tokens.components.button as unknown as ComponentsDesignTokens['button']),
      css: buttonCss
    },
    message: {
      ...(tokens.components.message as unknown as ComponentsDesignTokens['message']),
      css: messageCss
    },
    progressspinner: {
      ...(tokens.components.progressspinner as unknown as ComponentsDesignTokens['progressspinner']),
      css: progressspinnerCss
    },
    inputotp: {
      ...(tokens.components.inputotp as unknown as ComponentsDesignTokens['inputotp']),
      css: inputotpCss
    },
    inputtext: {
      ...(tokens.components.inputtext as unknown as ComponentsDesignTokens['inputtext']),
      css: inputtextCss
    },
    inputmask: {
      css: inputmaskCss
    },
    inputgroup: {
      ...(tokens.components.inputgroup as unknown as ComponentsDesignTokens['inputgroup']),
      css: inputgroupCss
    },
    tag: {
      ...(tokens.components.tag as unknown as ComponentsDesignTokens['tag']),
      css: tagCss
    },
    textarea: {
      ...(tokens.components.textarea as unknown as ComponentsDesignTokens['textarea']),
      css: textareaCss
    },
    tooltip: {
      ...(tokens.components.tooltip as unknown as ComponentsDesignTokens['tooltip']),
      css: tooltipCss
    },
    megamenu: {
      ...(tokens.components.megamenu as unknown as ComponentsDesignTokens['megamenu']),
      css: megamenuCss
    },
    select: {
      ...(tokens.components.select as unknown as ComponentsDesignTokens['select']),
      css: selectCss
    },
    passwordCss: {
      ...(tokens.components.password as unknown as ComponentsDesignTokens['password']),
      css: passwordCss
    },
    carousel: {
      ...(tokens.components.carousel as unknown as ComponentsDesignTokens['carousel']),
      css: carouselCss
    },
    galleria: {
      ...(tokens.components.galleria as unknown as ComponentsDesignTokens['galleria']),
      css: galleriaCss
    },
    confirmdialog: {
      ...(tokens.components.confirmdialog as unknown as ComponentsDesignTokens['confirmdialog']),
      css: confirmDialogCss
    },
    drawer: {
      ...(tokens.components.drawer as unknown as ComponentsDesignTokens['drawer']),
      css: drawerCss
    },
    datepicker: {
      ...(tokens.components.datepicker as unknown as ComponentsDesignTokens['datepicker']),
      css: datePickerCss
    },
    accordion: {
      ...(tokens.components.accordion as unknown as ComponentsDesignTokens['accordion']),
      css: accordionCss
    },
    badge: {
      ...(tokens.components.badge as unknown as ComponentsDesignTokens['badge']),
      css: badgeCss
    },
    chip: {
      ...(tokens.components.chip as unknown as ComponentsDesignTokens['chip']),
      css: chipCss
    },
    datatable: {
      ...(tokens.components.datatable as unknown as ComponentsDesignTokens['datatable']),
      css: dataTableCss
    },
    dialog: {
      ...(tokens.components.dialog as unknown as ComponentsDesignTokens['dialog']),
      css: dialogCss
    },
    divider: {
      ...(tokens.components.divider as unknown as ComponentsDesignTokens['divider']),
      css: dividerCss
    },
    inputnumber: {
      ...(tokens.components.inputnumber as unknown as ComponentsDesignTokens['inputnumber']),
      css: inputnumberCss
    },
    listbox: {
      ...(tokens.components.listbox as unknown as ComponentsDesignTokens['listbox']),
      css: listboxCss
    },
    menu: {
      ...(tokens.components.menu as unknown as ComponentsDesignTokens['menu']),
      css: menuCss
    },
    metergroup: {
      ...(tokens.components.metergroup as unknown as ComponentsDesignTokens['metergroup']),
      css: metergroupCss
    },
    paginator: {
      ...(tokens.components.paginator as unknown as ComponentsDesignTokens['paginator']),
      css: paginatorCss
    },
    panelmenu: {
      ...(tokens.components.panelmenu as unknown as ComponentsDesignTokens['panelmenu']),
      css: panelmenuCss
    },
    progressbar: {
      ...(tokens.components.progressbar as unknown as ComponentsDesignTokens['progressbar']),
      css: progressbarCss
    },
    radiobutton: {
      ...(tokens.components.radiobutton as unknown as ComponentsDesignTokens['radiobutton']),
      css: radiobuttonCss
    },
    scrollpanel: {
      ...(tokens.components.scrollpanel as unknown as ComponentsDesignTokens['scrollpanel']),
      css: scrollPanelCss
    },
    skeleton: {
      ...(tokens.components.skeleton as unknown as ComponentsDesignTokens['skeleton']),
      css: skeletonCss
    },
    slider: {
      ...(tokens.components.slider as unknown as ComponentsDesignTokens['slider']),
      css: sliderCss
    },
    stepper: {
      ...(tokens.components.stepper as unknown as ComponentsDesignTokens['stepper']),
      css: stepperCss
    },
    tabs: {
      ...(tokens.components.tabs as unknown as ComponentsDesignTokens['tabs']),
      css: tabsCss
    },
    tieredmenu: {
      ...(tokens.components.tieredmenu as unknown as ComponentsDesignTokens['tieredmenu']),
      css: tieredmenuCss
    },
    timeline: {
      ...(tokens.components.timeline as unknown as ComponentsDesignTokens['timeline']),
      css: timelineCss
    },
    toast: {
      ...(tokens.components.toast as unknown as ComponentsDesignTokens['toast']),
      css: toastCss
    },
    toggleswitch: {
      ...(tokens.components.toggleswitch as unknown as ComponentsDesignTokens['toggleswitch']),
      css: toggleswitchCss
    },
    autocomplete: {
      ...(tokens.components.autocomplete as unknown as ComponentsDesignTokens['autocomplete']),
      css: autocompleteCss
    }
  } as ComponentsDesignTokens
};

export default presetTokens;
