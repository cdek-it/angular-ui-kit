import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
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
    })
  ]);
}
