import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PrimeNG } from 'primeng/config';
import { RU_TRANSLATION } from './ru';

describe('RU_TRANSLATION', () => {
  // Полноту по типу Translation проверяет компилятор; тест ловит ключи,
  // которые есть в переводе PrimeNG по умолчанию, но не описаны в типе
  it('покрывает все ключи перевода PrimeNG', () => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    const { aria, ...top } = TestBed.inject(PrimeNG).translation;
    const { aria: ruAria, ...ruTop } = RU_TRANSLATION;

    expect(Object.keys(top).filter((key) => !(key in ruTop))).toEqual([]);
    expect(Object.keys(aria ?? {}).filter((key) => !(key in (ruAria ?? {})))).toEqual([]);
  });
});
