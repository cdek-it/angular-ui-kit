import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraInputOtpChangeEvent, ExtraInputOtpComponent } from './inputotp.component';

@Component({
  imports: [ReactiveFormsModule, ExtraInputOtpComponent],
  template: `<extra-input-otp
    [formControl]="control"
    [length]="length"
    [integerOnly]="integerOnly"
    [readonly]="readonly"
    (onChange)="events.push($event)"
  />`
})
class ReactiveHost {
  control = new FormControl<string | null>(null);
  length = 4;
  integerOnly = false;
  readonly = false;
  events: ExtraInputOtpChangeEvent[] = [];
}

@Component({
  imports: [FormsModule, ExtraInputOtpComponent],
  template: `<extra-input-otp [(ngModel)]="value" />`
})
class NgModelHost {
  value: string | null = null;
}

@Component({
  imports: [ReactiveFormsModule, ExtraInputOtpComponent],
  template: `<form [formGroup]="form"><extra-input-otp formControlName="code" /></form>`
})
class NamedHost {
  form = new FormGroup({ code: new FormControl<string | null>(null) });
}

const inputs = (el: HTMLElement): HTMLInputElement[] => [...el.querySelectorAll<HTMLInputElement>('input')];
const paste = (el: HTMLElement, value: string): void => {
  const clipboardData = new DataTransfer();
  clipboardData.setData('text', value);
  el.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
};

describe('ExtraInputOtpComponent: формы и вставка', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), provideExtraThemes()] })
  );

  it('обновляет все OnPush-ячейки после setValue и disable/enable', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    fixture.componentInstance.control.setValue('0123');
    await fixture.whenStable();
    expect(inputs(fixture.nativeElement).map((el) => el.value)).toEqual(['0', '1', '2', '3']);
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(inputs(fixture.nativeElement).every((el) => el.disabled)).toBeTrue();
    fixture.componentInstance.control.enable();
    await fixture.whenStable();
    expect(inputs(fixture.nativeElement).every((el) => !el.disabled)).toBeTrue();
    expect(fixture.componentInstance.events).toEqual([]);
  });

  it('смена длины не теряет символы внешней модели при обновлении OnPush', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    fixture.componentInstance.length = 6;
    fixture.componentInstance.control.setValue('123456');
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(inputs(fixture.nativeElement).map((el) => el.value)).toEqual(['1', '2', '3', '4', '5', '6']);
    expect(fixture.componentInstance.control.value).toBe('123456');
    expect(fixture.componentInstance.events).toEqual([]);
  });

  it('обрезает вставку до length и отправляет единственное событие', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    paste(inputs(fixture.nativeElement)[0], '012345678');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('0123');
    expect(fixture.componentInstance.events.length).toBe(1);
    expect(fixture.componentInstance.events[0].value).toBe('0123');
    expect(fixture.componentInstance.events[0].originalEvent instanceof ClipboardEvent).toBeTrue();
    expect(inputs(fixture.nativeElement).map((el) => el.value)).toEqual(['0', '1', '2', '3']);
  });

  it('integerOnly отвергает нецифровую вставку, readonly и disabled не меняют модель', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.integerOnly = true;
    fixture.componentInstance.control.setValue('1234');
    await fixture.whenStable();
    paste(inputs(fixture.nativeElement)[0], '12a4');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('1234');
    fixture.componentInstance.readonly = true;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    paste(inputs(fixture.nativeElement)[0], '9999');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('1234');
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    paste(inputs(fixture.nativeElement)[0], '8888');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('1234');
    expect(fixture.componentInstance.events).toEqual([]);
  });

  it('blur помечает форму touched без ввода', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    inputs(fixture.nativeElement)[0].focus();
    inputs(fixture.nativeElement)[0].blur();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.touched).toBeTrue();
  });

  it('ngModel поддерживает внешнее значение и вставку', async () => {
    const fixture = TestBed.createComponent(NgModelHost);
    await fixture.whenStable();
    fixture.componentInstance.value = '1234';
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(
      inputs(fixture.nativeElement)
        .map((el) => el.value)
        .join('')
    ).toBe('1234');
    paste(inputs(fixture.nativeElement)[0], '5678');
    await fixture.whenStable();
    expect(fixture.componentInstance.value).toBe('5678');
  });

  it('formControlName получает значение из вставки', async () => {
    const fixture = TestBed.createComponent(NamedHost);
    await fixture.whenStable();
    paste(inputs(fixture.nativeElement)[0], '5678');
    await fixture.whenStable();
    expect(fixture.componentInstance.form.controls.code.value).toBe('5678');
  });
});
