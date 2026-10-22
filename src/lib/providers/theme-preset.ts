import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import { RU_TRANSLATION } from './prime-preset/locale/ru';
import Preset from './prime-preset/theme.preset';

export function provideExtraThemes(): EnvironmentProviders {
  return makeEnvironmentProviders([
    providePrimeNG({
      theme: {
        preset: Preset,
        options: {
          darkModeSelector: false,
          cssLayer: false
        }
      }
    }),
    // Русский — только умолчание. Через providePrimeNG({ translation }) он бы применялся
    // в порядке объявления провайдеров и затирал перевод приложения, заданный раньше.
    // Environment-инициализатор выполняется до всех инициализаторов приложения,
    // поэтому перевод приложения побеждает при любом порядке
    provideEnvironmentInitializer(() => inject(PrimeNG).setTranslation(RU_TRANSLATION))
  ]);
}
