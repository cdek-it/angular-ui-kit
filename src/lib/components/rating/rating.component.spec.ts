import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraRatingComponent, ExtraRatingRateEvent, ExtraRatingVariant } from './rating.component';

@Component({
  imports: [ReactiveFormsModule, ExtraRatingComponent],
  template: `<extra-rating
    [formControl]="control"
    [stars]="stars"
    [readonly]="readonly"
    [variant]="variant"
    [clearable]="true"
    [autofocus]="autofocus"
    (onRate)="rates.push($event)"
    (onClear)="clears = clears + 1"
  />`
})
class ReactiveHost {
  control = new FormControl<number | null>(null);
  stars = 5;
  autofocus = false;
  readonly = false;
  variant: ExtraRatingVariant = 'interactive';
  rates: ExtraRatingRateEvent[] = [];
  clears = 0;
}

@Component({
  imports: [FormsModule, ExtraRatingComponent],
  template: `<extra-rating [(ngModel)]="value" [autofocus]="autofocus" />`
})
class NgModelHost {
  value: number | null = 2;
  autofocus = false;
}

@Component({
  imports: [ReactiveFormsModule, ExtraRatingComponent],
  template: `<form [formGroup]="form"><extra-rating formControlName="rating" /></form>`
})
class NamedHost {
  form = new FormGroup({ rating: new FormControl<number | null>(null, Validators.required) });
}

const options = (el: HTMLElement): HTMLElement[] => [...el.querySelectorAll<HTMLElement>('.p-rating-option')];
const inputs = (el: HTMLElement): HTMLInputElement[] => [...el.querySelectorAll<HTMLInputElement>('input')];
const key = (el: HTMLElement, value: string): void => {
  el.dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true }));
};

describe('ExtraRatingComponent: формы и взаимодействия', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), provideExtraThemes()] })
  );

  it('autofocus выбирает звезду по модели reactive-формы до обновления checked внутреннего ngModel', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.autofocus = true;
    fixture.componentInstance.control.setValue(4);
    await fixture.whenStable();
    expect(document.activeElement).toBe(inputs(fixture.nativeElement)[3]);
    expect(fixture.componentInstance.rates).toEqual([]);
  });

  it('autofocus учитывает исходное значение внешнего ngModel', async () => {
    const fixture = TestBed.createComponent(NgModelHost);
    fixture.componentInstance.autofocus = true;
    await fixture.whenStable();
    expect(document.activeElement).toBe(inputs(fixture.nativeElement)[1]);
  });

  it('отражает setValue/reset и disable/enable в OnPush без событий пользователя', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    fixture.componentInstance.control.setValue(4);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.ti-star-filled').length).toBe(4);
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(inputs(fixture.nativeElement).every((input) => input.disabled && input.tabIndex === -1)).toBeTrue();
    fixture.componentInstance.control.enable();
    fixture.componentInstance.control.reset();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.ti-star-filled').length).toBe(0);
    expect(fixture.componentInstance.rates).toEqual([]);
    expect(fixture.componentInstance.clears).toBe(0);
  });

  it('клик отправляет один rate с исходным событием, blur помечает touched', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    options(fixture.nativeElement)[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe(3);
    expect(fixture.componentInstance.control.dirty).toBeTrue();
    expect(fixture.componentInstance.control.touched).toBeFalse();
    expect(fixture.componentInstance.rates.length).toBe(1);
    expect(fixture.componentInstance.rates[0].value).toBe(3);
    expect(fixture.componentInstance.rates[0].originalEvent instanceof MouseEvent).toBeTrue();
    inputs(fixture.nativeElement)[2].blur();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.touched).toBeTrue();
  });

  it('повторный клик очищает через onClear, не отправляя null в числовой onRate', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.control.setValue(3);
    await fixture.whenStable();
    options(fixture.nativeElement)[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBeNull();
    expect(fixture.componentInstance.clears).toBe(1);
    expect(fixture.componentInstance.rates).toEqual([]);
  });

  it('кнопка сброса отправляет null в форму и единственный onClear', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.control.setValue(4);
    await fixture.whenStable();
    (fixture.nativeElement.querySelector('.extra-rating-clear') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBeNull();
    expect(fixture.componentInstance.clears).toBe(1);
    expect(fixture.componentInstance.rates).toEqual([]);
  });

  it('readonly, display и disabled не меняют модель от мыши или клавиатуры', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.control.setValue(2);
    for (const state of ['readonly', 'display', 'disabled']) {
      fixture.componentInstance.readonly = state === 'readonly';
      fixture.componentInstance.variant = state === 'display' ? 'display' : 'interactive';
      if (state === 'disabled') fixture.componentInstance.control.disable();
      fixture.changeDetectorRef.markForCheck();
      await fixture.whenStable();
      options(fixture.nativeElement)[4].click();
      key(inputs(fixture.nativeElement)[0], 'End');
      await fixture.whenStable();
      expect(fixture.componentInstance.control.value).withContext(state).toBe(2);
      expect(inputs(fixture.nativeElement).every((input) => input.tabIndex === -1)).toBeTrue();
    }
    expect(fixture.componentInstance.rates).toEqual([]);
    expect(fixture.componentInstance.clears).toBe(0);
  });

  it('Arrow/Home/End выбирают оценку, Space сбрасывает без двойных событий', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    inputs(fixture.nativeElement)[0].focus();
    key(inputs(fixture.nativeElement)[0], 'ArrowRight');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe(2);
    key(inputs(fixture.nativeElement)[1], 'End');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe(5);
    key(inputs(fixture.nativeElement)[4], 'Home');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe(1);
    key(inputs(fixture.nativeElement)[0], ' ');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBeNull();
    expect(fixture.componentInstance.rates.map((event) => event.value)).toEqual([2, 5, 1]);
    expect(fixture.componentInstance.rates.every((event) => event.originalEvent instanceof KeyboardEvent)).toBeTrue();
    expect(fixture.componentInstance.clears).toBe(1);
  });

  it('динамический stars перестраивает PrimeNG и сохраняет внешнюю модель', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.control.setValue(4);
    await fixture.whenStable();
    fixture.componentInstance.stars = 7;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(options(fixture.nativeElement).length).toBe(7);
    expect(fixture.nativeElement.querySelectorAll('.ti-star-filled').length).toBe(4);
    expect(fixture.componentInstance.rates).toEqual([]);
    options(fixture.nativeElement)[6].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe(7);
  });

  it('клавиатурная навигация снимает предпросмотр hover без лишнего изменения модели', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    options(fixture.nativeElement)[4].dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.extra-rating-preview').length).toBe(5);
    expect(fixture.componentInstance.control.value).toBeNull();
    inputs(fixture.nativeElement)[0].focus();
    key(inputs(fixture.nativeElement)[0], 'End');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.extra-rating-preview').length).toBe(0);
    expect(fixture.componentInstance.control.value).toBe(5);
    expect(fixture.componentInstance.rates.length).toBe(1);
  });

  it('повторный pointerover под неподвижным курсором не возвращает предпросмотр после выбора с клавиатуры', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    options(fixture.nativeElement)[4].dispatchEvent(
      new PointerEvent('pointerover', { bubbles: true, clientX: 10, clientY: 10 })
    );
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.extra-rating-preview').length).toBe(5);
    inputs(fixture.nativeElement)[0].focus();
    key(inputs(fixture.nativeElement)[0], 'End');
    await fixture.whenStable();
    options(fixture.nativeElement)[4].dispatchEvent(
      new PointerEvent('pointerover', { bubbles: true, clientX: 10, clientY: 10 })
    );
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.extra-rating-preview').length).toBe(0);
    options(fixture.nativeElement)[2].dispatchEvent(
      new PointerEvent('pointerover', { bubbles: true, clientX: 40, clientY: 10 })
    );
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.extra-rating-preview').length).toBe(3);
  });

  it('ngModel поддерживает внешние значения и выбор пользователем', async () => {
    const fixture = TestBed.createComponent(NgModelHost);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.ti-star-filled').length).toBe(2);
    fixture.componentInstance.value = 4;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.ti-star-filled').length).toBe(4);
    options(fixture.nativeElement)[0].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.value).toBe(1);
  });

  it('formControlName и внешний required-валидатор работают без вложенного ngModel в форме', async () => {
    const fixture = TestBed.createComponent(NamedHost);
    await fixture.whenStable();
    expect(fixture.componentInstance.form.invalid).toBeTrue();
    options(fixture.nativeElement)[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.form.value.rating).toBe(3);
    expect(fixture.componentInstance.form.valid).toBeTrue();
    fixture.componentInstance.form.reset();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.ti-star-filled').length).toBe(0);
    expect(fixture.componentInstance.form.invalid).toBeTrue();
  });
});
