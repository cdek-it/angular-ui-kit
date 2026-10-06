import { EnvironmentProviders, inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import { RU_TRANSLATION } from './prime-preset/locale/ru';
import Preset from './prime-preset/theme.preset';
import { provideExtraThemes } from './theme-preset';

const APP_TRANSLATION = { today: 'Today' };

// Два штатных способа задать перевод в приложении: конфиг PrimeNG и setTranslation при старте
// (так делает providePrimeNgLocaleConfig из @cdek/ng-libs-20)
const viaConfig = (): EnvironmentProviders => providePrimeNG({ translation: APP_TRANSLATION });
const viaInitializer = (): EnvironmentProviders =>
  provideAppInitializer(() => inject(PrimeNG).setTranslation(APP_TRANSLATION));

const configure = (...providers: EnvironmentProviders[]): PrimeNG => {
  TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), ...providers] });
  return TestBed.inject(PrimeNG);
};

describe('provideExtraThemes', () => {
  it('подключает тему кита', () => {
    expect(configure(provideExtraThemes()).theme()?.preset).toBe(Preset);
  });

  it('по умолчанию переводит PrimeNG на русский', () => {
    const primeng = configure(provideExtraThemes());

    expect(primeng.getTranslation('today')).toBe(RU_TRANSLATION.today);
    expect(primeng.getTranslation('monthNames')).toEqual(RU_TRANSLATION.monthNames);
  });

  describe('перевод приложения важнее умолчания при любом порядке провайдеров', () => {
    const cases: [string, () => EnvironmentProviders[]][] = [
      ['providePrimeNG до provideExtraThemes', () => [viaConfig(), provideExtraThemes()]],
      ['providePrimeNG после provideExtraThemes', () => [provideExtraThemes(), viaConfig()]],
      ['setTranslation при старте до provideExtraThemes', () => [viaInitializer(), provideExtraThemes()]],
      ['setTranslation при старте после provideExtraThemes', () => [provideExtraThemes(), viaInitializer()]]
    ];

    cases.forEach(([name, providers]) => {
      it(name, () => {
        const primeng = configure(...providers());

        expect(primeng.getTranslation('today')).toBe(APP_TRANSLATION.today);
        // ключи, которых в переводе приложения нет, остаются русскими
        expect(primeng.getTranslation('clear')).toBe(RU_TRANSLATION.clear);
      });
    });
  });
});
