import { applicationConfig, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { providePrimeNG } from 'primeng/config';
import Preset from '../src/prime-preset/theme.preset';
setCompodocJson(docJson);

import '!style-loader!css-loader!postcss-loader!sass-loader!../node_modules/@tabler/icons-webfont/dist/tabler-icons.min.css';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: Preset,
            options: {
              darkModeSelector: false,
              cssLayer: false
            }
          }
        })
      ]
    })
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
