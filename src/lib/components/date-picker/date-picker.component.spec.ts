import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import { RU_TRANSLATION } from '../../providers/prime-preset/locale/ru';
import { ExtraDatePickerComponent } from './date-picker.component';

const EN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const baseProviders = [provideZonelessChangeDetection(), provideNoopAnimations()];

describe('ExtraDatePickerComponent: локализация', () => {
  let fixture: ComponentFixture<ExtraDatePickerComponent>;
  let component: ExtraDatePickerComponent;

  const createInline = async (inputs: Record<string, unknown> = {}): Promise<void> => {
    fixture = TestBed.createComponent(ExtraDatePickerComponent);
    component = fixture.componentInstance;
    Object.entries({ inline: true, ...inputs }).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
    await fixture.whenStable();
  };

  const timeInputs = (of: ComponentFixture<ExtraDatePickerComponent> = fixture): HTMLInputElement[] =>
    Array.from<HTMLInputElement>(of.nativeElement.querySelectorAll('.p-datepicker-time-input'));

  const headerMonth = (): string =>
    fixture.nativeElement.querySelector('.p-datepicker-month-select .p-select-label')?.textContent?.trim() ?? '';

  const navLabels = (): (string | null)[] =>
    Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.p-datepicker-custom-header button')).map((el) =>
      el.getAttribute('aria-label')
    );

  const timeLabels = (): string[] =>
    Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.p-datepicker-time-label')).map(
      (el) => el.textContent?.trim() ?? ''
    );

  describe('с RU_TRANSLATION', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExtraDatePickerComponent],
        providers: [...baseProviders, providePrimeNG({ translation: RU_TRANSLATION })]
      });
    });

    it('показывает в шапке месяц из перевода PrimeNG', async () => {
      await createInline();

      // value — индекс месяца: его ждёт DatePicker.createMonths, и он не должен зависеть от языка
      expect(component.months).toEqual(RU_TRANSLATION.monthNames!.map((name, value) => ({ name, value })));
      expect(headerMonth()).toBe(RU_TRANSLATION.monthNames![component.dpCurrentMonth]);
    });

    it('перерисовывает месяц в шапке при смене перевода в рантайме', async () => {
      await createInline();

      TestBed.inject(PrimeNG).setTranslation({ monthNames: EN_MONTHS });
      await fixture.whenStable();

      expect(headerMonth()).toBe(EN_MONTHS[component.dpCurrentMonth]);
    });

    it('подписывает кнопки навигации для скринридера из перевода PrimeNG', async () => {
      await createInline();

      expect(navLabels()).toEqual([RU_TRANSLATION.prevMonth, RU_TRANSLATION.nextMonth]);
    });

    it('обновляет подписи кнопок навигации при смене перевода в рантайме', async () => {
      await createInline();

      TestBed.inject(PrimeNG).setTranslation({ prevMonth: 'Previous Month', nextMonth: 'Next Month' });
      await fixture.whenStable();

      expect(navLabels()).toEqual(['Previous Month', 'Next Month']);
    });

    it('в режиме выбора месяца кнопки навигации листают год — и подписаны так же', async () => {
      await createInline({ view: 'month' });

      expect(navLabels()).toEqual([RU_TRANSLATION.prevYear, RU_TRANSLATION.nextYear]);
    });
  });

  it('без настроенного перевода берёт английские месяцы PrimeNG, а не зашитые русские', async () => {
    TestBed.configureTestingModule({
      imports: [ExtraDatePickerComponent],
      providers: baseProviders
    });
    await createInline();

    expect(headerMonth()).toBe(EN_MONTHS[component.dpCurrentMonth]);
  });

  describe('подписи блока времени', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExtraDatePickerComponent],
        providers: baseProviders
      });
    });

    it('по умолчанию русские', async () => {
      await createInline({ showTime: true });

      expect(timeLabels()).toEqual(['Часы', 'Минуты']);
    });

    it('заменяются через hourLabel и minuteLabel', async () => {
      await createInline({ showTime: true });

      fixture.componentRef.setInput('hourLabel', 'Hours');
      fixture.componentRef.setInput('minuteLabel', 'Minutes');
      await fixture.whenStable();

      expect(timeLabels()).toEqual(['Hours', 'Minutes']);
    });

    it('связаны с полями ввода, чтобы скринридер называл поле', async () => {
      await createInline({ showTime: true });

      expect(timeInputs().map((input) => input.labels?.[0]?.textContent?.trim())).toEqual(['Часы', 'Минуты']);
    });

    it('не пересекаются по id между экземплярами на одной странице', async () => {
      await createInline({ showTime: true });
      const first = fixture;
      await createInline({ showTime: true });

      const ids = [first, fixture].flatMap((f) => timeInputs(f).map((input) => input.id));

      expect(new Set(ids).size).toBe(4);
    });
  });
});
