import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Preset from '../prime-preset/theme.preset';
import { RU_TRANSLATION } from '../prime-preset/locale/ru';
import Preset from '../lib/providers/prime-preset/theme.preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    providePrimeNG({
      theme: {
        preset: Preset,
        options: {
          darkModeSelector: false,
          cssLayer: false
        }
      },
      translation: RU_TRANSLATION
    }),
    provideRouter(routes)
  ]
};
