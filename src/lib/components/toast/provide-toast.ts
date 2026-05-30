import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * Регистрирует зависимости, необходимые для работы `ExtraToastService` и `<extra-toast>`.
 * Вызывать один раз в `ApplicationConfig.providers` или в `bootstrapApplication`.
 *
 * @example
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideExtraToast()],
 * };
 */
export function provideExtraToast(): EnvironmentProviders {
  return makeEnvironmentProviders([MessageService]);
}

