import { applicationConfig, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withThemeByClassName } from '@storybook/addon-themes';
import docJson from '../documentation.json';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GalleriaItemSlot } from 'primeng/galleria';
// Fix PrimeNG bug: GalleriaItemSlot's main item slot has no `type` attribute,
// so the `item` setter's forEach loop never matches and context stays stale on updates.
(function patchGalleriaItemSlot() {
    const desc = Object.getOwnPropertyDescriptor(GalleriaItemSlot.prototype, 'item');
    if (desc?.set) {
        const orig = desc.set;
        Object.defineProperty(GalleriaItemSlot.prototype, 'item', {
            ...desc,
            set(value: unknown) {
                orig.call(this, value);
                if ((this as any).context?.$implicit !== value) {
                    (this as any).context = { $implicit: value };
                }
            }
        });
    }
}());

import Preset from '../src/lib/providers/prime-preset/theme.preset';

import '!style-loader!css-loader!postcss-loader!sass-loader!../src/styles.scss';
import { RU_TRANSLATION } from '../src/lib/providers/prime-preset/locale/ru';

setCompodocJson(docJson);

const DARK_MODE_SELECTOR = '.dark-mode';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: Preset,
            options: {
              darkModeSelector: '.dark',
              cssLayer: false
            }
          },
          translation: RU_TRANSLATION
        })
      ]
    }),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark'
      },
      defaultTheme: 'light'
    })
  ],
  parameters: {
    backgrounds: { disable: true },
    docs: {
      globals: { theme: 'light' },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
