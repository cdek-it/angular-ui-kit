import { applicationConfig, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withThemeByClassName } from '@storybook/addon-themes';
import docJson from '../documentation.json';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import Preset from '../src/prime-preset/theme.preset';

import '!style-loader!css-loader!postcss-loader!sass-loader!../src/styles.scss';

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
              darkModeSelector: DARK_MODE_SELECTOR,
              cssLayer: false
            }
          }
        })
      ]
    }),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark-mode'
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
